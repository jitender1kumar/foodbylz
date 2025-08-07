import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/Services/product.service';
import {  subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { CategoryService } from '../../core/Services/category.service';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { Products} from '../../core/Model/crud.model';
import { FormGroup,FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCategories } from '../ManageStore/categoryStore/category.actions';
import {  loadSubQuantityTypeById } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import {loadQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { addProduct, deleteProduct, loadProduct, updateProduct } from '../ManageStore/productStore/product.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ProductPriceService } from '../../core/Services/productprice.service';
@Component({
    selector: 'app-productform',
    templateUrl: './productform.component.html',
    styleUrl: './productform.component.css',
    standalone: false
})
@Injectable({providedIn: 'root'})
export class ProductformComponent implements OnInit{
  isChecked = false;
  args:any=null;
  myEditForm: FormGroup;
  employeeId="JSK";
  @ViewChild('f')
  productsViewchild!: NgForm;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
   subQuantityTypeData$: Observable<any[]>;
  categorynamedata$:  Observable<any[]> | undefined;
   subQuantityTypeByIdData$:  Observable<any[]> | undefined;
   Qtypenamedata$:  Observable<any[]> | undefined;
   Products$:  Observable<any[]> | undefined;
   ProductName:any;
   Productnamedata2:any;
  products:Products={
    _id: '',
    Productname: '',
    Productdesc: '',
    selectcategoryID: '',
    selectQtypeID: '',
    selectSubQuantityTypeID: '',
    availablity: true,
    veg_nonveg: false,
    Status: true,
    employee_id: "undefined"
  }
Productname: any;
Productdesc: any;
selectcategoryID: any;
selectQtypeID: any;
selectSubQuantityTypeID: any;
  popdata2: any;
display: any;
tablename: any;
valueid: any;
modal: any;
myAddForm: FormGroup;
isCheckedveg_nonveg: any=false;
isCheckedavailablity: any=true;
isCheckedStatus: any=true;
  constructor(private service: ProductService,private ProductPriceService_:ProductPriceService, private QuantitytypeService_:QuantitytypeService,private CategoryService_:CategoryService,private subQuantityTypeService_:subQuantityTypeService,private router: Router,private formedit: FormBuilder, private store: Store<{ categoryLoad: any,productLoad:any,quantityTypeLoad:any,subQuantityTypeLoad:any, subQuantityTypeByIdLoad:any }>,private SweetAlert2_:SweetAlert2)
  {
        
    this.subQuantityTypeData$ = store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    this.loading$ = store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.allTasks);
    this.loading$ = store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByIdLoad.error);

    this.categorynamedata$ = store.select(state => state.categoryLoad.ProductCategory_.allTasks);
    this.loading$ = store.select(state => state.categoryLoad.loading);
    this.error$ = store.select(state => state.categoryLoad.error);

    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);


    this.Products$ = store.select(state => state.productLoad.Product_.allTasks);
    this.loading$ = store.select(state => state.productLoad.loading);
    this.error$ = store.select(state => state.productLoad.error);
     this.display="display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      Productname: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true],
      employee_id:this.employeeId
    });
    this.myAddForm = this.formedit.group({
      Productname: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true],
      employee_id:this.employeeId
    });
  }
  ngOnInit(): void {
    this.loadcategory()
    this.loadQtype()
    this.loadProducts();
  }
  loadcategory() {
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.allTasks);
    this.store.dispatch(loadCategories());
    }

loadSubQuantityType()
{
  this.store.dispatch(loadSubQuantityTypeById({selectQtypeID:this.myAddForm.value.selectQtypeID}));
  this.subQuantityTypeByIdData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.allTasks);
  this.loading$ = this.store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeByIdLoad.error);
}
loadQtype()
{
  this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
 
}
loadProducts()
{  
  this.store.dispatch(loadProduct());
  this.Products$ = this.store.select(state => state.productLoad.Product_.allTasks);
}
onFormSubmit() {
  if (this.myAddForm.valid) {
    this.add(this.myAddForm.value);
       }
 console.log(this.myAddForm.value);
  }
onEditForm()
{
  if (this.myEditForm.valid) {
this.Update(this.myEditForm.value);
   }
//console.log(this.myEditForm.value);
}
add(Product_:Products):void
  {
    // console.log(products);
    // console.log(products.Productname);
     this.service.getbyname(Product_.Productname).subscribe(data => {
      this.Productnamedata2=data;
      this.ProductName=this.Productnamedata2.allTasks
      if (this.ProductName.length==0) {
      this.store.dispatch(addProduct({Product_}));
      this.store.dispatch(loadProduct());
      this.SweetAlert2_.showFancyAlertSuccess("Product "+Product_.Productname+" added.");
  this.Products$ = this.store.select(state => state.productLoad.Product_.allTasks);
      }
      else if(this.ProductName.length>0)
      {
        //this.args="Item already exist and add another Item "+Product_.Productname;
        this.SweetAlert2_.showFancyAlertFail("Item already exist and add another Item "+Product_.Productname);
      }
    })
   
  }
  Update(Product_:Products) {
    this.store.dispatch(updateProduct({Product_}));
    this.store.dispatch(loadProduct());
  this.Products$ = this.store.select(state => state.productLoad.Product_.allTasks);
  this.SweetAlert2_.showFancyAlertSuccess("Product "+Product_.Productname+" updated.");
    }
    cDelete(_id: any) {
      
    }
      
      colDefs: ColDef[] = [
        { field: "Productname" },
        { field: "Productdesc",flex: 2 },
         { field: "Delete",cellRenderer:BasetypDeleteButtun},
         { field: "Edit",cellRenderer:BasetypEditButtun}
      
      ];
      pagination = true;
      paginationPageSize = 10;
      paginationPageSizeSelector = [200, 500, 1000];
onCellClick(event: any) {
    
  if(event.colDef.field=='Delete')
  {
    alert("working body");
    this.modal="modal";
    this.display="display:block"
    this.valueid=event.data._id;
    this.tablename="prod";
  }
  if(event.colDef.field=='Edit')
    {
      this.popdata2=event.data;
      this.args=null;
     
this.myEditForm = this.formedit.group({
  _id: [event.data._id],
  Productname: [event.data.Productname, Validators.required],
  Productdesc: [event.data.Productdesc],
  selectcategoryID: [event.data.selectcategoryID, [Validators.required]],
  selectQtypeID: [event.data.selectQtypeID, [Validators.required]],
  selectSubQuantityTypeID: [event.data.selectSubQuantityTypeID, [Validators.required]],
  availablity: [event.data.availablity],
      veg_nonveg: [event.data.veg_nonveg],
      Status: [event.data.Status]
});
this.loadSubQuantityType()

this.showEdit=true;
this.show=false;
    }
 
}
      show: any=false;
showEdit:any=false;
    shows() {
  this.show=true;
  this.showEdit=false;
  this.args=null;
  }
 
  close() {
    //alert(arg0)
    if(this.showEdit==true)
    {
      this.showEdit=false;
    }
    if(this.show==true)
      {
        this.show=false;
      }
    
    }
    handleChildClick() {
      this.display="display:none;";
    }
    ProductIdExistData:any;
    deletedConfirmed(_id:any)
    {
     this.ProductPriceService_.getbyproductid(_id).subscribe(ProductIdExist => {
      this.ProductIdExistData = ProductIdExist;
      
      console.log(this.ProductIdExistData.allTasks.length);
      if(this.ProductIdExistData.allTasks.length==0)
      {
            this.store.dispatch(deleteProduct({_id}));
      this.store.dispatch(loadProduct());
  this.Products$ = this.store.select(state => state.productLoad.Product_.allTasks);
  this.SweetAlert2_.showFancyAlertSuccess("Deleted.");
      this.display="display:none;";
      }
   else
        {
          this.SweetAlert2_.showFancyAlertFail("Assocciated with Sub Quantity Type. Can't Delete");
              this.display="display:none;";
        }
     });
  
     // this.args = " Record Deleted Successfully ";
    }
}
