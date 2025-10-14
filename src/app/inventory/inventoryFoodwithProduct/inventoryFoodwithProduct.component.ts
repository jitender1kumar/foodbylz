import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  InventoryFoodwithProduct,
  Goodscollection,
  InventoryFoodwithProduct2,
  GoodscollectionMergename,
  InventoryFoodwithProductforEdit
} from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { InventoryMainFoodwithProductService } from '../../core/Services/inventoryFoodWithProduct.service';
import { InventoryMFoodQuantityTypeService } from '../../core/Services/inventoryFoodQuantityType.service';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { ProductService } from '../../core/Services/product.service';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { InventoryMainFoodService } from '../../core/Services/inventoryMainFood.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addInventoryFoodwithProduct,  
  loadInventoryFoodwithProduct,
  updateInventoryFoodwithProduct,
  updateInventoryFoodwithProductFailure,
  updateInventoryFoodwithProductSuccess
} from '../inventoryStore/inventoryFoodwithProductStore/inventoryFoodwithProduct.actions';
import { loadProduct } from '../../manage/ManageStore/productStore/product.actions';
import { loadInventoryMainFood } from '../inventoryStore/inventoryMainFoodStore/inventoryMainFood.actions';
import { loadSubQuantityType } from '../../manage/ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadInventoryFoodQuantityType } from '../inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.actions';
import { ofType, Actions } from '@ngrx/effects';
import { popupenvironment } from '../../environment/popupEnvironment';
import * as InventoryFoodwithProductActions from '../inventoryStore/inventoryFoodwithProductStore/inventoryFoodwithProduct.actions';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-inventoryfood',
  templateUrl: './inventoryFoodwithProduct.component.html',
  styleUrl: './inventoryFoodwithProduct.component.css',
  standalone: false
})
export class InventoryfoodComponent implements OnInit {
  // Observables for data
  popupenvironments: any;
  inventoryQuantityTypeData$?: Observable<any[]>;
  InventoryMainFooddata$?: Observable<any[]>;
  fooddata$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  Products$?: Observable<any[]>;
  subQuantityTypeData$: any;

  // Forms
  myEditForm: FormGroup;
  myAddForm: FormGroup;

  // UI State

  showubelements = false;



  // Data
  _GoodscollectionMergename_List: GoodscollectionMergename[] = [];
  _InventoryFoodwithProduct2List: InventoryFoodwithProduct2[] = [];
  _InventoryFoodwithProduct: InventoryFoodwithProduct;
  _InventoryFoodwithProductforEdit: InventoryFoodwithProductforEdit;
  productPrice_SubQuantityType_data: any;
  productPrice_SubQuantityType_data2: any;
  quantitytypename: string = '';
  getinventoryfoodmain_id: any = '';
  inventoryfoodmaindata: any;
  addResult: any;
  a: any;
  b: any;

  // Table
  colDefs: ColDef[] = [
    { field: "ProductName" },
    { field: "SubQuantityTypeName" },
    { field: "discription", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,200, 500, 1000];

  // ViewChilds
  @ViewChild('f') categoryViewchild!: NgForm;
  @ViewChild('formupdate') formupdate!: NgForm;

  // Misc
  employeeId = "JSK";

  constructor(
    private service: InventoryMainFoodwithProductService,
    private router: Router,
    private fb: FormBuilder,
    private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService,
    private ppservice: ProductPriceService,
    private productservice: ProductService,
    private subQuantityTypeService_: subQuantityTypeService,
    private inventoryfoodmainservice: InventoryMainFoodService,
    private store: Store<{
      loadInventoryFoodQuantityType: any,
      loadInventoryMainFood: any,
      loadAssocciatedInvtoryFood: any,
      productLoad: any,
      subQuantityTypeLoad: any
    }>,
    public actions$: Actions
  ) {
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.InventoryMainFooddata$ = this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.data);
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.data);
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);

    this.loading$ = this.store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = this.store.select(state => state.loadInventoryFoodQuantityType.error);

    this.myEditForm = this.fb.group({
      _id: [''],
      quantitytypevalue: [''],
      ProductId: [''],
      ProductPrcieId: [''],
      ProductName: [''],
      SubQuantityTypeID: [''],
      quantitytypename: [''],
      SubQuantityTypeName: ['', Validators.required],
      goodscollections: [''],
      employee_id: this.employeeId
    });

    this.myAddForm = this.fb.group({
      SubQuantityTypeID: [''],
      inventoryfoodmain_id: [''],
      ProductId: [''],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });

    this._InventoryFoodwithProduct = {
      ProductId: "",
      ProductPrcieId: "",
      ProductName: "",
      SubQuantityTypeID: "",
      SubQuantityTypeName: "",
      goodscollections: this._GoodscollectionMergename_List
    };

    this._InventoryFoodwithProductforEdit = {
      _id: "",
      ProductId: "",
      ProductPrcieId: "",
      ProductName: "",
      SubQuantityTypeID: "",
      SubQuantityTypeName: "",
      goodscollections: this._GoodscollectionMergename_List,
      employee_id: "undefined"
    };
  }

  ngOnInit(): void {
    this.popupenvironments = popupenvironment;
    this.popupenvironments.args$.next(null);
    this.loadInventoryMainFood();
    this.getSubQuantityType();
    this.getProduct();
    this.loadInventoryAssocciatedFood();
  }

  getProduct() {
    this.store.dispatch(loadProduct());
  }

  loadInventoryMainFood() {
    this.store.dispatch(loadInventoryMainFood());
  }

  getProductPriceAndSubQuantityTypeDetails() {
    this._GoodscollectionMergename_List = [];
    this.productPrice_SubQuantityType_data="";
    this._InventoryFoodwithProduct2List=[];
    const productId = this.myAddForm.value.ProductId;
    this.ppservice.getbyproductid(productId).subscribe(data => {
      if (data) {
        this.productPrice_SubQuantityType_data2 = data;
        this.productPrice_SubQuantityType_data = this.productPrice_SubQuantityType_data2.data;
        if (this.Products$) {
          this.Products$.subscribe(productdata => {
            const productindex = productdata.findIndex((item: { _id: any; }) => item._id === productId);
            this._InventoryFoodwithProduct2List = [];
            for (let ii = 0; ii < this.productPrice_SubQuantityType_data.length; ii++) {
              this.subQuantityTypeData$.subscribe((subQuantityTypeData: any) => {
                const subQuantityTypeIndex = subQuantityTypeData.findIndex((item: { _id: any; }) =>
                  item._id === this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID
                );
                this._InventoryFoodwithProduct2List.push({
                  ProductId: productId,
                  ProductPrcieId: this.productPrice_SubQuantityType_data[ii]._id,
                  ProductName: productdata[productindex].name,
                  SubQuantityTypeID: this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID,
                  SubQuantityTypeName: subQuantityTypeData[subQuantityTypeIndex].name
                });
              });
            }
          });
        }
      }
    });
  }

  getsubQuantityTypeDatatypeforedit(ProductId: any) {
    this.ppservice.getbyproductid(ProductId).subscribe(data => {
      if (data) {
        this.productPrice_SubQuantityType_data2 = data;
        this.productPrice_SubQuantityType_data = this.productPrice_SubQuantityType_data2.data;
        if (this.Products$) {
          this.Products$.subscribe(productdata => {
            const productindex = productdata.findIndex((item: { _id: any; }) => item._id === ProductId);
            this._InventoryFoodwithProduct2List = [];
            for (let ii = 0; ii < this.productPrice_SubQuantityType_data.length; ii++) {
              this.subQuantityTypeData$.subscribe((subQuantityTypeData: any) => {
                const subQuantityTypeIndex = subQuantityTypeData.findIndex((item: { _id: any; }) =>
                  item._id === this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID
                );
                this._InventoryFoodwithProduct2List.push({
                  ProductId: ProductId,
                  ProductPrcieId: this.productPrice_SubQuantityType_data[ii]._id,
                  ProductName: productdata[productindex].name,
                  SubQuantityTypeID: this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID,
                  SubQuantityTypeName: subQuantityTypeData[subQuantityTypeIndex].name
                });
              });
            }
          });
        }
      }
    });
  }

  getSubQuantityType() {
    this.store.dispatch(loadSubQuantityType());
  }

  private findInventoryMainFoodIndex(inventoryfoodmaindata: any[], id: any): number {
    return inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === id);
  }

  private updateGoodsCollectionList(
    inventoryfoodmaindata: any[],
    indexP: number,
    quantitytypevalue: number,
    isEdit: boolean
  ) {
    if (quantitytypevalue > 0 && inventoryfoodmaindata[indexP].quantitytypevalue > quantitytypevalue) {
      this.popupenvironments.args$.next(null);
      const mainFoodId = inventoryfoodmaindata[indexP]._id;
      const mainFoodName = inventoryfoodmaindata[indexP].name;
      let foundIndex = this._GoodscollectionMergename_List.findIndex(
        item => item.IventoryFoodMainId === mainFoodId
      );
      if (foundIndex !== -1) {
        // Update existing
        this._GoodscollectionMergename_List[foundIndex] = {
          IventoryFoodMainId: mainFoodId,
          Name: mainFoodName,
          quantiyval: quantitytypevalue
        };
        this.popupenvironments.args$.next("Material Updated  Successfully");

      } else {
        // Add new
        this._GoodscollectionMergename_List.push({
          IventoryFoodMainId: mainFoodId,
          Name: mainFoodName,
          quantiyval: quantitytypevalue
        });
        this.popupenvironments.args$.next("Material Added  Successfully");

      }
    } else {
      this.popupenvironments.args$.next("Quantity value can not greater than Inventory stored product and can't be negative or null");

    }
  }

  addMaterialforEdit() {
    if (this.InventoryMainFooddata$) {
      this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
        const indexP = this.findInventoryMainFoodIndex(inventoryfoodmaindata, this.myEditForm.value.inventoryfoodmain_id);
        this.inventoryfoodmaindata = inventoryfoodmaindata;
        this.updateGoodsCollectionList(
          inventoryfoodmaindata,
          indexP,
          this.myEditForm.value.quantitytypevalue,
          true
        );
      });
    }
  }

  addMaterial() {
    if (this.InventoryMainFooddata$) {
      this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
        const indexP = this.findInventoryMainFoodIndex(inventoryfoodmaindata, this.myAddForm.value.inventoryfoodmain_id);
        this.updateGoodsCollectionList(
          inventoryfoodmaindata,
          indexP,
          this.myAddForm.value.quantitytypevalue,
          false
        );
      });
    }
  }

  getInventoryFoodQuantityTypeName() {
    this.store.dispatch(loadInventoryFoodQuantityType());
    if (this.InventoryMainFooddata$) {
      this.InventoryMainFooddata$.subscribe(InventoryMainFooddata => {
        const indexInvetoryMainFood = this.findInventoryMainFoodIndex(InventoryMainFooddata, this.myAddForm.value.inventoryfoodmain_id);
        if (this.inventoryQuantityTypeData$) {
          this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
            const indexP = inventoryQuantityTypeData.findIndex(
              (item: { _id: any; }) => item._id === InventoryMainFooddata[indexInvetoryMainFood].quantitytypeID
            );
            this.quantitytypename = inventoryQuantityTypeData[indexP]?.name || '';
          });
        }
      });
    }
  }

  getInventoryFoodQuantityTypeNameforedit() {
    this.store.dispatch(loadInventoryFoodQuantityType());
    if (this.InventoryMainFooddata$) {
      this.InventoryMainFooddata$.subscribe(InventoryMainFooddata => {
        const indexInvetoryMainFood = this.findInventoryMainFoodIndex(InventoryMainFooddata, this.myEditForm.value.inventoryfoodmain_id);
        if (this.inventoryQuantityTypeData$) {
          this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
            const indexP = inventoryQuantityTypeData.findIndex(
              (item: { _id: any; }) => item._id === InventoryMainFooddata[indexInvetoryMainFood].quantitytypeID
            );
            this.quantitytypename = inventoryQuantityTypeData[indexP]?.name || '';
          });
        }
      });
    }
  }

  showubelement() {
    this.service.getbyid(this.myAddForm.value.ProductId, this.myAddForm.value.SubQuantityTypeID).subscribe({
      next: (result) => {
        this.addResult = result;
        this.popupenvironments.args$.next(null);

        if (this.addResult.data != null) {
          this.popupenvironments.args$.next("Already Assocciated");

          this.showubelements = false;
        } else {
          this.showubelements = true;
        }
      },
      error: (err) => {
        if (err.status == "404") this.showubelements = true;
      }
    });
  }

  onCellClick(event: any) {
    if (event.colDef.field === 'Delete') {
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block");
      this.popupenvironments.valueid$.next(event.data._id);
      this.popupenvironments.tablename$.next("cate");

    }
    if (event.colDef.field === 'Edit') {
      this.getProduct();
      this.getsubQuantityTypeDatatypeforedit(event.data.ProductId);
      this.popupenvironments.popdata2$.next(event.data);
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
      this.popupenvironments.args$.next(null);
      if (this.InventoryMainFooddata$) {
        this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
          // No-op: code was only splicing, not used
        });
      }
      this._GoodscollectionMergename_List = [...event.data.goodscollections];
      this.myEditForm = this.fb.group({
        _id: [event.data._id],
        ProductId: [event.data.ProductId],
        ProductPrcieId: [event.data.ProductPrcieId],
        ProductName: [event.data.ProductName],
        SubQuantityTypeID: [event.data.SubQuantityTypeID],
        SubQuantityTypeName: [event.data.SubQuantityTypeName],
        quantitytypename: [event.data.quantitytypename],
        goodscollections: [event.data.goodscollections],
        inventoryfoodmain_id: [event.data.inventoryfoodmain_id],
        quantitytypevalue: [event.data.quantitytypevalue]
      });
    }
  }

  loadInventoryAssocciatedFood() {
    this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.data);
    this.loading$ = this.store.select(state => state.loadAssocciatedInvtoryFood.loading);
    this.error$ = this.store.select(state => state.loadAssocciatedInvtoryFood.error);
  }

  Update(InventoryFoodwithProductForEdit_: InventoryFoodwithProductforEdit) {
    this.store.dispatch(updateInventoryFoodwithProduct({ InventoryFoodwithProductForEdit_ }));
    this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(
      state => state.loadAssocciatedInvtoryFood?.InventoryFoodwithProduct_?.data
    );
    this.actions$.pipe(ofType(updateInventoryFoodwithProductSuccess)).subscribe(() => {

      this.popupenvironments.args$.next('Inventory updated successfully!');
      this.loadInventoryAssocciatedFood();
    });
    this.actions$.pipe(ofType(updateInventoryFoodwithProductFailure)).subscribe(({ error }: { error: any }) => {

      this.popupenvironments.args$.next('Failed to update inventory: ' + error);

    });
  }

  cDelete(_id: any) {
    // Not implemented
  }

  onFormSubmit() {
    const indexsubQuantityTypeDatatype = this._InventoryFoodwithProduct2List.findIndex(
      item => item.SubQuantityTypeID === this.myAddForm.value.SubQuantityTypeID
    );
    const selected = this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype];
    this._InventoryFoodwithProduct = {
      ProductId: selected.ProductId,
      ProductPrcieId: selected.ProductPrcieId,
      ProductName: selected.ProductName,
      SubQuantityTypeID: selected.SubQuantityTypeID,
      SubQuantityTypeName: selected.SubQuantityTypeName,
      goodscollections: this._GoodscollectionMergename_List
    };
    this.a = selected.ProductId;
    this.b = selected.SubQuantityTypeID;

    this.service.getbyid(this.a, this.b).subscribe({
      next: (result) => {
        this.addResult = result;
    
        if (!result) {
          // No record at all
          this.popupenvironments.args$.next("No record found.");
          return;
        }
    
        if (! this.addResult.data ||  this.addResult.data.length === 0) {
          // Record exists but no data inside
          // this.add(this._InventoryFoodwithProduct);
          console.log("No data inside result");
        } else {
          // Data exists
          this.popupenvironments.args$.next("Already Associated with this Product.");
        }
      },
      error: (err) => {
       
        
        if (err.status === 404) {
         // this.popupenvironments.args$.next("Record not found (404).");
         this.add(this._InventoryFoodwithProduct);
        } else if (err.status === 500) {
          this.popupenvironments.args$.next("Server error (500). Try again later.");
        } else {
          this.popupenvironments.args$.next("Unexpected error: " + err.message);
        }
       // this.popupenvironments.args$.next("Something went wrong while fetching record.");
      }
    });
    
      //error: (err) => {
      //   if (err.status == "404") 
      //     {
      //       console.log("I m in Error box");
      //     //  this.add(this._InventoryFoodwithProduct);
            
      //     }
      // }
   // });
  }

  add(InventoryFoodwithProduct_: InventoryFoodwithProduct): void {
    this.store.dispatch(addInventoryFoodwithProduct({ InventoryFoodwithProduct_ }));
   // this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(
      state => state.loadAssocciatedInvtoryFood?.InventoryFoodwithProduct_?.data
    );
    this.actions$.pipe(ofType(InventoryFoodwithProductActions.addInventoryFoodwithProductSuccess)).subscribe(() => {

      this.popupenvironments.args$.next('Inventory item added successfully!');


    });
    this.actions$.pipe(ofType(InventoryFoodwithProductActions.addInventoryFoodwithProductFailure)).subscribe(({ error }) => {

      this.popupenvironments.args$.next('Failed to add inventory item: ' + error);

    });
  }

  shows() {
    this.getProduct();
    
    
    this.popupenvironments.show$.next(true);
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.args$.next(null);

    this._GoodscollectionMergename_List = [];
    this.productPrice_SubQuantityType_data="";
    this._InventoryFoodwithProduct2List=[];
  }

  onEditForm() {
    if (this.myEditForm.valid) {
      const indexsubQuantityTypeDatatype = this._InventoryFoodwithProduct2List.findIndex(
        item => item.SubQuantityTypeID === this.myEditForm.value.SubQuantityTypeID
      );
      const selected = this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype];
      this._InventoryFoodwithProductforEdit = {
        _id: this.myEditForm.value._id,
        ProductId: selected.ProductId,
        ProductPrcieId: selected.ProductPrcieId,
        ProductName: selected.ProductName,
        SubQuantityTypeID: selected.SubQuantityTypeID,
        SubQuantityTypeName: selected.SubQuantityTypeName,
        goodscollections: this._GoodscollectionMergename_List,
        employee_id: "undefined"
      };
      this.Update(this._InventoryFoodwithProductforEdit);
    }
  }

  close() {
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);

    this._GoodscollectionMergename_List = [];
    this.productPrice_SubQuantityType_data="";
    this._InventoryFoodwithProduct2List=[];
  }

  handleChildClick() {
    this.popupenvironments.display$.next("display:none;");
  }

  deletedConfirmed(id: any) {
    this.service.delete(id).subscribe({
      next: (data) => {
        if (data) {
          this.store.dispatch(loadInventoryFoodwithProduct());
          this.fooddata$ = this.store.select(
            state => state.loadAssocciatedInvtoryFood?.InventoryFoodwithProduct_?.data
          );
          this.popupenvironments.display$.next("display:none;");
          this.popupenvironments.args$.next("Record Deleted Successfully");

        } else {
          this.popupenvironments.display$.next("display:none;");
          this.popupenvironments.args$.next("Failed to delete record (no response from server)");
        }
      },
      error: (err) => {
        this.popupenvironments.display$.next("display:none;");
        this.popupenvironments.args$.next(`Error deleting record: ${err.message || err}`);
      }
    });
  }

  deleteRawItem(id: String) {
    const index = this._GoodscollectionMergename_List.findIndex(
      item => item.IventoryFoodMainId === id
    );
    if (index !== -1) {
      this._GoodscollectionMergename_List.splice(index, 1);
    }
  }
}
