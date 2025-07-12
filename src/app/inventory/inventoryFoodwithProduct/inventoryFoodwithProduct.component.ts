import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryFoodwithProduct, Goodscollection, InventoryFoodwithProduct2, GoodscollectionMergename, InventoryFoodwithProductforEdit } from '../../core/Model/crud.model';
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
import { itemQminus } from '../../home/state/itemqunatity/itemquantity.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addInventoryFoodwithProduct, loadInventoryFoodwithProduct, updateInventoryFoodwithProduct } from '../inventoryStore/inventoryFoodwithProductStore/inventoryFoodwithProduct.actions';
import { loadProduct } from '../../manage/ManageStore/productStore/product.actions';
import { loadInventoryMainFood } from '../inventoryStore/inventoryMainFoodStore/inventoryMainFood.actions';
import { loadSubQuantityType } from '../../manage/ManageStore/subQuantityTypeStore/subQuantityType.actions';


@Injectable({ providedIn: 'root' })

@Component({
    selector: 'app-inventoryfood',
    templateUrl: './inventoryFoodwithProduct.component.html',
    styleUrl: './inventoryFoodwithProduct.component.css',
    standalone: false
})
export class InventoryfoodComponent implements OnInit {
  deleterawitems(arg0: String) {
    const index = this._GoodscollectionMergename_List.findIndex(item => item.IventoryFoodMainId === arg0);
    this._GoodscollectionMergename_List.splice(index, 1);
  }
  //lodProductCategory:ProductCategory[]=[];
  args: any = "";
  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  fooddata2: any;
  //fooddata: any;
  InventoryMainFooddata$: Observable<any[]> | undefined;
  fooddata$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  Inventoryfoodquntitytype2: any;
  Inventoryfoodquntitytype: any;

  productPrice_SubQuantityType_data: any;
  productPrice_SubQuantityType_data2: any;
  quantitytypename: string = "";
  getinventoryfoodmain_id: any = "";
  _Goodscollection_List: Goodscollection[] = [];
  _GoodscollectionMergename_List: GoodscollectionMergename[] = [];
  _Goodscollection: Goodscollection = {
    IventoryFoodMainId: "",
    quantiyval: 0
  }
  _GoodscollectionMergename: GoodscollectionMergename = {
    IventoryFoodMainId: "",
    Name: "",
    quantiyval: 0
  }
  _InventoryFoodwithProduct2List: InventoryFoodwithProduct2[] = [];
  _InventoryFoodwithProduct2: InventoryFoodwithProduct2 = {
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    SubQuantityTypeID: "",
    SubQuantityTypeName: ""
  };
  _InventoryFoodwithProduct: InventoryFoodwithProduct = {
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    SubQuantityTypeID: "",
    SubQuantityTypeName: "",
    goodscollections: this._GoodscollectionMergename_List,

  };
  _InventoryFoodwithProductforEdit: InventoryFoodwithProductforEdit = {
    _id: "",
    ProductId: "",
    ProductPrcieId: "",
    ProductName: "",
    SubQuantityTypeID: "",
    SubQuantityTypeName: "",
    goodscollections: this._GoodscollectionMergename_List,
    employee_id: "undefined"
  };
  colDefs: ColDef[] = [
    { field: "ProductName" },
    { field: "SubQuantityTypeName" },
    { field: "discription", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  discription: any;
  name: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  productPriceData2: any;
  inventoryfoodmaindata: any;
  inventoryfoodmaindata2: any;
  // productdata: any;
  // productdata2: any;
  Products$: Observable<any[]> | undefined;
  subQuantityTypeData$: any;
  subQuantityTypeDatatypedata2: any;
  showubelements: boolean = false;
  myAddForm: FormGroup;
  employeeId = "JSK";
  constructor(private service: InventoryMainFoodwithProductService, private router: Router, private formedit: FormBuilder, private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService, private ppservice: ProductPriceService, private productservice: ProductService, private subQuantityTypeService_: subQuantityTypeService, private inventoryfoodmainservice: InventoryMainFoodService, private store: Store<{ loadInventoryFoodQuantityType: any, loadInventoryMainFood: any, loadAssocciatedInvtoryFood: any, productLoad: any,subQuantityTypeLoad: any }>) {
    // this.getinventoryfoodmain_id="";
    this.fooddata$ = store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.allTasks);
    this.loading$ = store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = store.select(state => state.loadInventoryFoodQuantityType.error);

    this.InventoryMainFooddata$ = store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    this.loading$ = store.select(state => state.loadInventoryMainFood.loading);
    this.error$ = store.select(state => state.loadInventoryMainFood.error);

    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    this.loading$ = this.store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeLoad.error);


    this.Products$ = store.select(state => state.productLoad.Product_.allTasks);
    this.loading$ = store.select(state => state.productLoad.loading);
    this.error$ = store.select(state => state.productLoad.error);

    this.display = "display:none;"
    this.showubelements = false;
    this.args = "";
    this.myEditForm = this.formedit.group({
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
    this.myAddForm = this.formedit.group({

      SubQuantityTypeID: [''],
      inventoryfoodmain_id: [''],
      ProductId: [''],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });
  }
  ngOnInit(): void {
    this.args = "";
    this.loadInventoryMainFood();
    this.getSubQuantityType();
    this.getProduct();
    this.loadInventoryAssocciatedFood();
  }
  getProduct() {

    this.store.dispatch(loadProduct());
    this.store.select(state => state.productLoad.Product_.allTasks);
    this.store.select(state => state.productLoad.loading);
    this.store.select(state => state.productLoad.error);
  }
  loadInventoryMainFood() {
    this.store.dispatch(loadInventoryMainFood());
    this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    this.store.select(state => state.loadInventoryMainFood.loading);
    this.store.select(state => state.loadInventoryMainFood.error);

  }
  getProductPriceAndSubQuantityTypeDetails() {
    //alert(this.myAddForm.value.ProductId);
    this._InventoryFoodwithProduct2List = [];
    this.ppservice.getbyproductid(this.myAddForm.value.ProductId).subscribe(data => {
      if (data) {
        console.log(data);
        this.productPrice_SubQuantityType_data2 = data;
        this.productPrice_SubQuantityType_data = this.productPrice_SubQuantityType_data2.allTasks;


        this.store.select(state => state.productLoad.Product_.allTasks);

        if (this.Products$) {
          this.Products$.subscribe(productdata => {
            const productindex = productdata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.ProductId);
            // alert(productindex);
            for (var ii = 0; ii < this.productPrice_SubQuantityType_data.length; ii++) {
              this.subQuantityTypeData$.subscribe((subQuantityTypeData: any) => {
                const subQuantityTypeIndex = subQuantityTypeData.findIndex((item: { _id: any; }) => item._id === this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID);
              //alert(subQuantityTypeIndex);
              console.log(this.subQuantityTypeData$);
              this._InventoryFoodwithProduct2List.push({
                ProductId: this.myAddForm.value.ProductId,
                ProductPrcieId: this.productPrice_SubQuantityType_data[ii]._id,
                ProductName: productdata[productindex].Productname,
                SubQuantityTypeID: this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID,
                SubQuantityTypeName: subQuantityTypeData[subQuantityTypeIndex].name
              });
              });
              
            }
            console.log(this._InventoryFoodwithProduct2List)
          })
        }

      }

    })
  }
  getsubQuantityTypeDatatypeforedit(ProductId: any) {
    this._InventoryFoodwithProduct2List = [];
    this.ppservice.getbyproductid(ProductId).subscribe(data => {
      if (data) {
        console.log(data);
        this.productPrice_SubQuantityType_data = "";
        this.productPrice_SubQuantityType_data2 = data;
        this.productPrice_SubQuantityType_data = this.productPrice_SubQuantityType_data2.allTasks;


         this.store.select(state => state.productLoad.Product_.allTasks);

        if (this.Products$) {
          this.Products$.subscribe(productdata => {
            const productindex = productdata.findIndex((item: { _id: any; }) => item._id === ProductId);
            // alert(productindex);
            for (var ii = 0; ii < this.productPrice_SubQuantityType_data.length; ii++) {
              this.subQuantityTypeData$.subscribe((subQuantityTypeData: any) => {
                 const subQuantityTypeIndex = subQuantityTypeData.findIndex((item: { _id: any; }) => item._id === this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID);
              //alert(subQuantityTypeIndex);
              this._InventoryFoodwithProduct2List.push({
                ProductId: ProductId,
                ProductPrcieId: this.productPrice_SubQuantityType_data[ii]._id,
                ProductName: productdata[productindex].Productname,
                SubQuantityTypeID: this.productPrice_SubQuantityType_data[ii].selectSubQuantityTypeID,
                SubQuantityTypeName: subQuantityTypeData[subQuantityTypeIndex].name
              });
              });
             
            }
            console.log(this._InventoryFoodwithProduct2List)

          });
        }
      }
    })
  }

  getSubQuantityType() {
    this.store.dispatch(loadSubQuantityType());
   this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
     this.store.select(state => state.subQuantityTypeLoad.loading);
    this.store.select(state => state.subQuantityTypeLoad.error);
  }


  addMaterialforEdit() {
    this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    if(this.InventoryMainFooddata$){
    this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
      const indexP = inventoryfoodmaindata.findIndex((item: { _id: any; name: any }) => item._id === this.myEditForm.value.inventoryfoodmain_id);
      this.inventoryfoodmaindata = inventoryfoodmaindata;
      alert(this.inventoryfoodmaindata[indexP].quantitytypevalue);
      alert(this.myEditForm.value.quantitytypevalue);
      alert(this._GoodscollectionMergename_List.length);
      if (this.myEditForm.value.quantitytypevalue > 0 && this.inventoryfoodmaindata[indexP].quantitytypevalue > this.myEditForm.value.quantitytypevalue) {
        this.args = "";
        //belowing block for add material if length is 0
        if (this._GoodscollectionMergename_List.length == 0) {

          alert("first: ");
          //   this._Goodscollection_List.push({
          //     IventoryFoodMainId:this.inventoryfoodmaindata[indexP]._id,
          //     quantiyval: this.myAddForm.value.quantitytypevalue
          //  });
          this._GoodscollectionMergename_List = [
            ...this._GoodscollectionMergename_List,
            {
              IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
              Name: this.inventoryfoodmaindata[indexP].name,
              quantiyval: this.myEditForm.value.quantitytypevalue
            }
          ];
          // this._GoodscollectionMergename_List.push({
          //   IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
          //   Name: this.inventoryfoodmaindata[indexP].name,
          //   quantiyval: this.myEditForm.value.quantitytypevalue
          // });
          this.args = "Material Added  Successfully";
        }
        //belowing block for update material
        else if (this._GoodscollectionMergename_List.length > 0) {
          let indexgoodcollection2 = 0;
          for (var ii = 0; ii < this._GoodscollectionMergename_List.length; ii++) {
            this.getinventoryfoodmain_id = this._GoodscollectionMergename_List[ii].IventoryFoodMainId;
            // alert(this._GoodscollectionMergename_List);
            // alert(this._Goodscollection_List[ii].IventoryFoodMainId);
            if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {
              indexgoodcollection2 = ii;
              // alert(this.getinventoryfoodmain_id);
              break;
            }
            //findIndex(item=>item.IventoryFoodMainId===this.inventoryfoodmaindata[indexP]._id);
          }

          //   alert(this.getinventoryfoodmain_id + "==" + this.inventoryfoodmaindata[indexP]._id);
          if (this.getinventoryfoodmain_id == this.inventoryfoodmaindata[indexP]._id) {

            //   alert("in indexgoodcollection: " + this.getinventoryfoodmain_id);
          this._GoodscollectionMergename_List = [
  ...this._GoodscollectionMergename_List.slice(0, indexgoodcollection2),
  {
    IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
    Name: this.inventoryfoodmaindata[indexP].name,
    quantiyval: this.myEditForm.value.quantitytypevalue
  },
  ...this._GoodscollectionMergename_List.slice(indexgoodcollection2 + 1)
];

            // this._GoodscollectionMergename_List[indexgoodcollection2].IventoryFoodMainId = this.inventoryfoodmaindata[indexP]._id;
            // this._GoodscollectionMergename_List[indexgoodcollection2].Name = this.inventoryfoodmaindata[indexP].name;
            // this._GoodscollectionMergename_List[indexgoodcollection2].quantiyval = this.myEditForm.value.quantitytypevalue;
            this.args = "Material Updated  Successfully";
          }
          //belowing block for material if material > 0
          else {
            this._GoodscollectionMergename_List = [
              ...this._GoodscollectionMergename_List,
              {
                IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
                Name: this.inventoryfoodmaindata[indexP].name,
                quantiyval: this.myEditForm.value.quantitytypevalue
              }
            ];
            // this._GoodscollectionMergename_List.push({
            //   IventoryFoodMainId: this.inventoryfoodmaindata[indexP]._id,
            //   Name: this.inventoryfoodmaindata[indexP].name,
            //   quantiyval: this.myEditForm.value.quantitytypevalue
            // });
            this.args = "Material Added Successfully";
          }
        }
      }
      else {
        this.args = "Quantity value can not greater than Inventory stored product and can't be negative";
      }
      console.log(this._GoodscollectionMergename_List);
    })
  }
    //this.quantitytypename = inventoryfoodmaindata[indexP]._id ;
    //   alert(inventoryfoodmaindata[indexP]._id );
  }
  addMaterial() {
     this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
     if(this.InventoryMainFooddata$){
    this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
      const indexP = inventoryfoodmaindata.findIndex((item: { _id: any; name: any }) => item._id === this.myAddForm.value.inventoryfoodmain_id);
      console.log(inventoryfoodmaindata[indexP].quantitytypevalue);
      console.log(this.myAddForm.value.inventoryfoodmain_id);
      console.log(inventoryfoodmaindata);
      console.log(indexP);
      if (this.myAddForm.value.quantitytypevalue > 0 && inventoryfoodmaindata[indexP].quantitytypevalue > this.myAddForm.value.quantitytypevalue) {
        this.args = "";
        if (this._GoodscollectionMergename_List.length == 0) {

          alert("first: ");
          //   this._Goodscollection_List.push({
          //     IventoryFoodMainId:inventoryfoodmaindata[indexP]._id,
          //     quantiyval: this.myAddForm.value.quantitytypevalue
          //  });
          this._GoodscollectionMergename_List.push({
            IventoryFoodMainId: inventoryfoodmaindata[indexP]._id,
            Name: inventoryfoodmaindata[indexP].name,
            quantiyval: this.myAddForm.value.quantitytypevalue
          });
          this.args = "Material Added  Successfully";
        }
        else if (this._GoodscollectionMergename_List.length > 0) {
          let indexgoodcollection2 = 0;
          for (var ii = 0; ii < this._GoodscollectionMergename_List.length; ii++) {
            this.getinventoryfoodmain_id = this._GoodscollectionMergename_List[ii].IventoryFoodMainId;
            // alert(this._GoodscollectionMergename_List);
            // alert(this._Goodscollection_List[ii].IventoryFoodMainId);
            if (this.getinventoryfoodmain_id == inventoryfoodmaindata[indexP]._id) {
              indexgoodcollection2 = ii;
              // alert(this.getinventoryfoodmain_id);
              break;
            }
            //findIndex(item=>item.IventoryFoodMainId===inventoryfoodmaindata[indexP]._id);
          }

          //   alert(this.getinventoryfoodmain_id + "==" + inventoryfoodmaindata[indexP]._id);
          if (this.getinventoryfoodmain_id == inventoryfoodmaindata[indexP]._id) {

            //   alert("in indexgoodcollection: " + this.getinventoryfoodmain_id);
            this._GoodscollectionMergename_List[indexgoodcollection2].IventoryFoodMainId = inventoryfoodmaindata[indexP]._id;
            this._GoodscollectionMergename_List[indexgoodcollection2].Name = inventoryfoodmaindata[indexP].name;
            this._GoodscollectionMergename_List[indexgoodcollection2].quantiyval = this.myAddForm.value.quantitytypevalue;
            this.args = "Material Updated  Successfully";
          }
          else {
            this._GoodscollectionMergename_List.push({
              IventoryFoodMainId: inventoryfoodmaindata[indexP]._id,
              Name: inventoryfoodmaindata[indexP].name,
              quantiyval: this.myAddForm.value.quantitytypevalue
            });
            this.args = "Material Added Successfully";
          }
        }
      }
      else {
        this.args = "Quantity value can not greater than Inventory stored product and can't be negative";
      }
      console.log(this._GoodscollectionMergename_List);
    })
  }
    //this.quantitytypename = inventoryfoodmaindata[indexP]._id ;
    //   alert(inventoryfoodmaindata[indexP]._id );
  }
  getQuantityTypeName() {
    //  alert(this.myAddForm.value.inventoryfoodmain_id);
    //this.quantitytypename = this.Inventoryfoodquntitytype.find((item: { subQuantityTypeDatatype: any; }) => item.subQuantityTypeDatatype === selectedValue);
    this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    if(this.InventoryMainFooddata$){
    this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
      const indexP = inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.inventoryfoodmain_id);
      // const index = this.Inventoryfoodquntitytype
      console.log(indexP);
      console.log(inventoryfoodmaindata);
      this.quantitytypename = inventoryfoodmaindata[indexP].quantitytypename;
    })
  }
    // alert(this.quantitytypename);
  }
  getQuantityTypeNameforedit() {
    //  this.getAllInventoryFoodMain();
    //  alert(this.myAddForm.value.inventoryfoodmain_id);
    //this.quantitytypename = this.Inventoryfoodquntitytype.find((item: { subQuantityTypeDatatype: any; }) => item.subQuantityTypeDatatype === selectedValue);
    this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    if(this.InventoryMainFooddata$){
    this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
      const indexP = inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === this.myEditForm.value.inventoryfoodmain_id);
      // const index = this.Inventoryfoodquntitytype
      console.log(indexP);
      console.log(inventoryfoodmaindata);
      this.quantitytypename = inventoryfoodmaindata[indexP].quantitytypename;
    })
  }
    // alert(this.quantitytypename);
  }
  showubelement() {

    this.service.getbyid(this.myAddForm.value.ProductId, this.myAddForm.value.SubQuantityTypeID).subscribe(result => {
      this.addResult = result;
      this.args = "";
      if (this.addResult.allTasks != null) {
        this.args = "Already Assocciated";
        this.showubelements = false;
      }
      else {
        this.showubelements = true;
      }

    })
  }
  loadinventoeryfoodquantitytype() {
    this._InventoryMFoodQuantityTypeService.get().subscribe(data => {
      if (data) {
        this.Inventoryfoodquntitytype2 = data;
        this.Inventoryfoodquntitytype = this.Inventoryfoodquntitytype2.allTasks
        console.log(data);
        //this.search(id);

      }
    })
  }
  add(InventoryFoodwithProduct_: InventoryFoodwithProduct): void {
   console.log(InventoryFoodwithProduct_);
    this.store.dispatch(addInventoryFoodwithProduct({ InventoryFoodwithProduct_ }));
    this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.allTasks);
   
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {

      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "cate";
    }
    if (event.colDef.field == 'Edit') {
      //alert('Cell clicked'+event.colDef.field);
      //console.log('Custom function triggered with event:', event);
      this.getProduct();
      this.getsubQuantityTypeDatatypeforedit(event.data.ProductId);
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = "";
      this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
      if(this.InventoryMainFooddata$){
      this.InventoryMainFooddata$.subscribe(inventoryfoodmaindata => {
        console.log(inventoryfoodmaindata);
        for (var ii = 0; ii < event.data.goodscollections.length; ii++) {

          const index = inventoryfoodmaindata.findIndex((item: { _id: any; }) => item._id === event.data.goodscollections[ii].IventoryFoodMainId);
          alert(index);
          //console.log(Object.isFrozen(inventoryfoodmaindata)); // Returns true if the array is frozen
let newArray = inventoryfoodmaindata.slice(); // Make a copy
newArray.splice(index, 1);

         // inventoryfoodmaindata.splice(index, 1);
        }
        console.log(inventoryfoodmaindata);
      })}
      this._GoodscollectionMergename_List = [];
      this._GoodscollectionMergename_List = event.data.goodscollections;
      console.log(event.data.goodscollections);
      console.log(this.popdata2);
      this.myEditForm = this.formedit.group({
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
    // this.loadcategory();
  }

  loadInventoryAssocciatedFood() {
    this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.allTasks);
    this.loading$ = this.store.select(state => state.loadAssocciatedInvtoryFood.loading);
    this.error$ = this.store.select(state => state.loadAssocciatedInvtoryFood.error);
  }
  Update(InventoryFoodwithProductForEdit_: InventoryFoodwithProductforEdit) {
    this.store.dispatch(updateInventoryFoodwithProduct({ InventoryFoodwithProductForEdit_ }));
    this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.allTasks);
   
  }
  cDelete(_id: any) {

  }
  a: any;
  b: any;
  addResult: any;
  onFormSubmit() {
    const indexsubQuantityTypeDatatype = this._InventoryFoodwithProduct2List.findIndex(item => item.SubQuantityTypeID === this.myAddForm.value.SubQuantityTypeID);
    this._InventoryFoodwithProduct = {

      ProductId: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductId,
      ProductPrcieId: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductPrcieId,
      ProductName: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductName,
      SubQuantityTypeID: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].SubQuantityTypeID,
      SubQuantityTypeName: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].SubQuantityTypeName,
      goodscollections: this._GoodscollectionMergename_List
    };
    this.a = this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductId;
    this.b = this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].SubQuantityTypeID;

    //console.log( this._InventoryFoodwithProduct);
    this.service.getbyid(this.a, this.b).subscribe(result => {
      this.addResult = result;
      console.log(this.addResult);
      console.log(this.b);
      if (this.addResult.allTasks == null) {
        this.add(this._InventoryFoodwithProduct);
      }
      else {
        this.args = "Already Assocciated with this Product.";
      }
    })


  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.getProduct();
    this.loadinventoeryfoodquantitytype();
    this.show = true;
    this.showEdit = false;
    this.args = "";
    this._GoodscollectionMergename_List = [];
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      const indexsubQuantityTypeDatatype = this._InventoryFoodwithProduct2List.findIndex(item => item.SubQuantityTypeID === this.myEditForm.value.SubQuantityTypeID);
      this._InventoryFoodwithProductforEdit = {
        _id: this.myEditForm.value._id,
        ProductId: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductId,
        ProductPrcieId: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductPrcieId,
        ProductName: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].ProductName,
        SubQuantityTypeID: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].SubQuantityTypeID,
        SubQuantityTypeName: this._InventoryFoodwithProduct2List[indexsubQuantityTypeDatatype].SubQuantityTypeName,
        goodscollections: this._GoodscollectionMergename_List,
        employee_id: "undefined",
      };
      console.log(this._InventoryFoodwithProductforEdit);
      this.Update(this._InventoryFoodwithProductforEdit);
    }
  }
  close() {
    //alert(arg0)
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }
    this.myEditForm = this.formedit.group({
      _id: [''],
      quantitytypevalue: [''],
      ProductId: [''],
      ProductPrcieId: [''],
      ProductName: [''],
      SubQuantityTypeID: [''],
      SubQuantityTypeName: ['', Validators.required],
      goodscollections: [''],
      employee_id: this.employeeId

    });
    this.myAddForm = this.formedit.group({

      SubQuantityTypeID: [''],
      inventoryfoodmain_id: [''],
      ProductId: [''],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });
  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(id: any) {

    this.service.delete(id).subscribe(data => {
      if (data) {
        this.store.dispatch(loadInventoryFoodwithProduct());
    this.fooddata$ = this.store.select(state => state.loadAssocciatedInvtoryFood.InventoryFoodwithProduct_.allTasks);
   
        this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
        //  alert("Deleted.");
      }
    })



  }
}
