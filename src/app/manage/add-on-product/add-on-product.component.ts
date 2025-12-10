import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, Subject, take } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { popupenvironment } from '../../environment/popupEnvironment';
import * as AddOnProductActions from '../ManageStore/addOnProductStore/addOnProduct.action';
import { Actions, ofType } from '@ngrx/effects';
import { loadProduct } from '../ManageStore/productStore/product.actions';
import { loadSubQuantityTypeById } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { AddOnProduct, AddOnProductEdit, AddOnProductMerge } from '../../core/Model/crud.model';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { loadAddOnProducts } from '../ManageStore/addOnProductStore/addOnProduct.action';
import * as SubQuantityTypeAction from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import * as productAction from '../ManageStore/productStore/product.actions';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';
@Component({
  selector: 'app-add-on-product',
  standalone: false,
  templateUrl: './add-on-product.component.html',
  styleUrl: './add-on-product.component.css'
})
export class AddOnProductComponent implements OnInit {
  Products$!: Observable<any[]>;
  addOnProducts$!: Observable<any[]>;
  addOnProductsMergeData$!: Observable<any[]>;
  subQuantityTypeData$!: Observable<any[]>;
  subQuantityTypeDatabyId$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  myEditForm!: FormGroup;
  myAddForm!: FormGroup;
  employeeId: string="jsk";
  popupenvironments: any;
  quantitytypename = '';
  AddOnProduct_?: AddOnProduct;
  mergedAddOnProductWithProduct: any[] = [];
  colDefs: ColumnDef[] = [
    { field: 'name' , sortable: true},
    { field: 'Price', sortable: true },
    { field: 'description', sortable: true },
    { field: 'ProductName' , sortable: true}, 
    { field: 'SubQuantityTypeName' , sortable: true},
    { field: 'Delete', cellRenderer: BasetypDeleteButtun },
    { field: 'Edit', cellRenderer: BasetypEditButtun }
  ];

  _mergedDataLoaded: any;

  constructor(
    private store: Store<{
      productLoad: any;
      subQuantityTypeLoad: any;
      subQuantityTypeByIdLoad: any;
      addOnProductReducer_: any;
    }>,
    private router: Router,
    private formBuilder: FormBuilder,
    public actions$: Actions,
    private validationService: ValidationService
  ) {
    this.initObservables();
    this.initForms();
    //this.loadAddOnProduct();
  }

  ngOnInit(): void {
    this.popupenvironments = popupenvironment;
    this.popupenvironments.args$.next(null);

    this.loadSubQuantityType();
    this.loadProducts();
    this.loadAddOnProduct();
    this.mergeAddOnProductAndProduct();
  
  }

  private initObservables(): void {
    // this.addOnProducts$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
    // this.loading$ = this.store.select(state => state.addOnProductReducer_.loading);
    // this.error$ = this.store.select(state => state.addOnProductReducer_.error);
   
    // this.Products$ = this.store.select(state => state.productLoad.Product_.data);
    // this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
  }

  private initForms(): void {
    this.myEditForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      Price: ['', Validators.required],
      SelectProductId: ['', Validators.required],
      SubQuantityTypeID: ['', Validators.required],
      employee_id: this.employeeId
    });

    this.myAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      Price: ['', Validators.required],
      SelectProductId: ['', Validators.required],
      SubQuantityTypeID: ['', Validators.required],
      employee_id: this.employeeId
    });
  }

  // Loads AddOnProduct and Product, then merges them into a single array
 
  loadSubQuantityType() {
    this.store.dispatch(SubQuantityTypeAction.loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
 
  }
  loadProducts(): void {
    this.store.dispatch(loadProduct());
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
  }

  loadAddOnProduct(): void {
    this.store.dispatch(loadAddOnProducts());
    this.addOnProducts$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
   
  }
 
  loadSubQuantityTypeAdd(): void {
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
  //  const Products =
    this.Products$.subscribe(productList => {
      const selectedProduct = productList.find(
        item => item._id === this.myAddForm.value.SelectProductId
      );
      if (selectedProduct) {
        this.loadSubQuantityTypeByQuantityTypeId(selectedProduct.selectQtypeID);
        
      }
    });
   
  }


  // Simple function to merge AddOnProduct and Product tables into a single array
  addOnDataArray:any=[];
  mergeAddOnProductAndProduct() {
    // Only load and merge once, and store the merged data for reuse.
    // Use combineLatest to avoid multiple subscriptions and unnecessary reloads.
    this.mergedAddOnProductWithProduct=[];
    console.log(this.mergedAddOnProductWithProduct);
    this.addOnProducts$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
   this.addOnProducts$.pipe(take(2)).subscribe(addOnData=>
        {
          
         if(!addOnData)return;
          if(addOnData.length>0)
          {
            if(addOnData.length===0)return;
            for(let i=0;i<addOnData.length;i++)
              {
                const addOnProduct_: AddOnProductMerge= {
                  name: addOnData[i].name,
                  description: addOnData[i].description,
                  Price: addOnData[i].Price,
                  SelectProductId: addOnData[i].SelectProductId,
                  SubQuantityTypeID: addOnData[i].SubQuantityTypeID,
                  employee_id: addOnData[i].employee_id,
                  _id: addOnData[i]._id,
                  ProductName:this.getProductName(addOnData[i].SelectProductId) ,
                  SubQuantityTypeName: this.getSubQuantityTypeName(addOnData[i].SubQuantityTypeID) ,
                  createdAt: addOnData[i].createdAt,
                  updatedAt: addOnData[i].updatedAt,
                  __v: addOnData[i].__v
                };
                this.mergedAddOnProductWithProduct.push(addOnProduct_);
                
              }
        //      console.log(this.mergedAddOnProductWithProduct);
        this.addOnDataArray=this.mergedAddOnProductWithProduct;
          }

        }        
        );
    
    }
  

  getSubQuantityTypeName(_id:string)
  {
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);

    let SubQuantityTypeName = "";
//  const  subQuantityTypeData = 
  this.subQuantityTypeData$.subscribe(subQuantityTypeData => {
      const itemP = subQuantityTypeData.find((item: { _id: string; }) => item._id === _id);
      const indexP = subQuantityTypeData.findIndex((item: { _id: string; }) => item._id === _id);

      if (itemP._id == _id) {
        SubQuantityTypeName = subQuantityTypeData[indexP].name;
      }
    })
  
    return SubQuantityTypeName;  
  }
  getProductName(_id:string)
  {
    let ProductName = "";
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
  // const Products =
    this.Products$?.subscribe(Productnamedata => {
      console.log(Productnamedata);
      const itemP = Productnamedata.find((item: { _id: string; }) => item._id === _id);
      const indexP = Productnamedata.findIndex((item: { _id: string; }) => item._id === _id);

      if (itemP._id) {
        ProductName = Productnamedata[indexP].name;
      }

    })
    // Products.unsubscribe();
    return ProductName;
       
  }
  /**
   * Merges AddOnProduct, Product, and SubQuantityType data into a single observable array.
   * Each AddOnProduct will have its related Product and SubQuantityType attached.
   */
  
  onFormSubmit(): void {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }

  add(addOnProduct: AddOnProduct): void {
    const addOnProducts$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
    const valid = this.validationService.checkNameExistforAddForm(addOnProduct.name, addOnProducts$);

    if (valid.value) {
      this.popupenvironments.args$.next(`${addOnProduct.name} Exists.`);
    } else {
      this.store.dispatch(AddOnProductActions.addAddOnProduct({ addOnProduct: addOnProduct }));

      this.actions$.pipe(ofType(AddOnProductActions.addAddOnProductSuccess)).subscribe(() => {
        this.popupenvironments.args$.next(' Added.');
        this.mergeAddOnProductAndProduct();
      });

      this.actions$.pipe(ofType(AddOnProductActions.addAddOnProductFailure)).subscribe(() => {
        this.popupenvironments.args$.next(' Failed to add.');
      });
    }
   // this.loadAddOnProduct();
  }

  
  

  
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
     // this.deleteDisplayBlock(r[0].row);
      this.popupenvironments.modal$.next('modal');
      this.popupenvironments.display$.next('display:block');
      this.popupenvironments.valueid$.next(r[0].row._id);
      this.popupenvironments.tablename$.next('cate');
    }
    if (r[0].field == 'Edit') {
    //  this.editDisplayBlock(r[0].row);
    this.popupenvironments.showEdit$.next(true);
    this.popupenvironments.show$.next(false);
    this.popupenvironments.args$.next(null);
    
    this.myEditForm.patchValue({
      _id: r[0].row._id,
      name: r[0].row.name,
      description: r[0].row.description,
      Price: r[0].row.Price,
      SelectProductId: r[0].row.SelectProductId,
      SubQuantityTypeID: r[0].row.SubQuantityTypeID,
      employee_id: this.employeeId
    });
    this.loadSubQuantityTypeAddEdit();
    }
   }
  
  loadSubQuantityTypeAddEdit(): void {
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
  // const Products =  
  this.Products$.subscribe(productList => {
      const selectedProduct = productList.find(
        item => item._id === this.myEditForm.value.SelectProductId
      );
      if (selectedProduct) {
        this.loadSubQuantityTypeByQuantityTypeId(selectedProduct.selectQtypeID);
      }
    });
    // Products.unsubscribe();
  }
  loadSubQuantityTypeByQuantityTypeId(QuntityTypeId: string): void {
    this.store.dispatch(loadSubQuantityTypeById({ selectQtypeID: QuntityTypeId }));
    this.subQuantityTypeDatabyId$ = this.store.select(
      state => state.subQuantityTypeByIdLoad.SubQuantityType_.data
    );
  }
  onFormEdit(): void {
    if (this.myEditForm.valid) {
      // Implement update logic here if needed
      this.update(this.myEditForm.value);
    }
  }
  update(addOnProductEdit: AddOnProductEdit) {
    console.log(addOnProductEdit);
    this.addOnProducts$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
    const valid = this.validationService.checkNameExist(addOnProductEdit.name, addOnProductEdit._id, this.addOnProducts$);
    if (valid.value) {
      this.popupenvironments.args$.next(addOnProductEdit.name + ' Name Exists ');
    } else {
      this.store.dispatch(AddOnProductActions.updateAddOnProduct({ addOnProductEdit: addOnProductEdit }));

  //  const  AddOnProductActionsSuccess=  
   this.actions$.pipe(ofType(AddOnProductActions.updateAddOnProductSuccess)).subscribe(() => {
        this.popupenvironments.args$.next(addOnProductEdit.name + ' updated.');
        this.mergeAddOnProductAndProduct();
      });
       this.actions$.pipe(ofType(AddOnProductActions.updateAddOnProductFailure)).subscribe((error) => {
        // Show a more descriptive error message for failed update
        this.popupenvironments.args$.next('Failed to update data. Please try again.');
      });
      // updateAddOnProductFailure.unsubscribe();
    }
  }
  handleChildClick(): void {
    this.popupenvironments.display$.next('display:none;');
  }

  deletedConfirmed(_id: any): void {
    this.store.dispatch(AddOnProductActions.deleteAddOnProduct({ _id }));

  //  const deleteAddOnProductSuccess = 
   this.actions$.pipe(ofType(AddOnProductActions.deleteAddOnProductSuccess)).subscribe(() => {
      this.popupenvironments.args$.next(' Record Deleted Successfully ');
      this.mergeAddOnProductAndProduct();
    });
    // deleteAddOnProductSuccess.unsubscribe();
    this.actions$.pipe(ofType(AddOnProductActions.deleteAddOnProductFailure)).subscribe(() => {
      this.popupenvironments.args$.next(' Failed to Delete.');
    });

    this.popupenvironments.display$.next('display:none;');
    
  }

  shows(): void {
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(true);
    this.popupenvironments.args$.next(null);
  }

  close(): void {
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);
  }
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
