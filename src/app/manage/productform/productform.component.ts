import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/Services/product.service';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { CategoryService } from '../../core/Services/category.service';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { Products } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ProductActions from '../ManageStore/productStore/product.actions';
import { loadCategories } from '../ManageStore/categoryStore/category.actions';
import { loadSubQuantityTypeById } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, loadProduct, updateProduct, updateProductSuccess } from '../ManageStore/productStore/product.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { Actions, ofType } from '@ngrx/effects';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { ManageDataEnvironment } from '../../environment/dataEnvironment';
import { popupenvironment } from '../../environment/popupEnvironment';
@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class ProductformComponent implements OnInit {
  ManageDataEnvironments:any;
  popupenvironments:any;
  isChecked = false;
 
  myEditForm: FormGroup;
  employeeId = "JSK";
  @ViewChild('f')
  productsViewchild!: NgForm;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  subQuantityTypeData$: Observable<any[]>;
  categorynamedata$: Observable<any[]> | undefined;
  subQuantityTypeByIdData$: Observable<any[]> | undefined;
  Qtypenamedata$: Observable<any[]> | undefined;
  Products$: Observable<any[]> | undefined;
  popdata2:any;
  products: Products = {
    _id: '',
    name: '',
    Productdesc: '',
    selectcategoryID: '',
    selectQtypeID: '',
    selectSubQuantityTypeID: '',
    availablity: true,
    veg_nonveg: false,
    Status: true,
    employee_id: "undefined"
  }
  name: any;
  Productdesc: any;
  selectcategoryID: any;
  selectQtypeID: any;
  selectSubQuantityTypeID: any;
  
  myAddForm: FormGroup;
  isCheckedveg_nonveg: any = false;
  isCheckedavailablity: any = true;
  isCheckedStatus: any = true;
  
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "Productdesc", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,200, 500, 1000];


  constructor(private service: ProductService, public actions$: Actions,
    private ValidationService_:ValidationService,
    private ProductPriceService_: ProductPriceService, private QuantitytypeService_: QuantitytypeService, private CategoryService_: CategoryService, private subQuantityTypeService_: subQuantityTypeService, private router: Router, private formedit: FormBuilder, private store: Store<{ categoryLoad: any, productLoad: any, quantityTypeLoad: any, subQuantityTypeLoad: any, subQuantityTypeByIdLoad: any }>, private SweetAlert2_: SweetAlert2) {

    this.subQuantityTypeData$ = store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByIdLoad.error);

    this.categorynamedata$ = store.select(state => state.categoryLoad.ProductCategory_.data);
    this.loading$ = store.select(state => state.categoryLoad.loading);
    this.error$ = store.select(state => state.categoryLoad.error);

    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);


    this.Products$ = store.select(state => state.productLoad.Product_.data);
    this.loading$ = store.select(state => state.productLoad.loading);
    this.error$ = store.select(state => state.productLoad.error);
    

    this.ManageDataEnvironments=ManageDataEnvironment;
    this.popupenvironments=popupenvironment;
    this.popupenvironments.display$.next("display:none;");

    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true],
      employee_id: this.employeeId
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      Productdesc: [''],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]],
      availablity: [true],
      veg_nonveg: [false],
      Status: [true],
      employee_id: this.employeeId
    });
  }
  ngOnInit(): void {
    this.loadcategory()
    this.loadQtype()
    this.loadProducts();
  }
  loadcategory() {
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.store.dispatch(loadCategories());
  }
  loadSubQuantityTypeEdit()
  {
this.loadSubQuantityTypeByQuantityTypeId(this.myEditForm.value.selectQtypeID);
  }
loadSubQuantityTypeAdd()
  {
this.loadSubQuantityTypeByQuantityTypeId(this.myAddForm.value.selectQtypeID);
  }
  loadSubQuantityTypeByQuantityTypeId(QuntityTypeId:string) {
    this.store.dispatch(loadSubQuantityTypeById({ selectQtypeID: QuntityTypeId }));
    this.subQuantityTypeByIdData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.loading$ = this.store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeByIdLoad.error);
  }
  loadQtype() {
    this.store.dispatch(loadQuantityType());
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);

  }
  loadProducts() {
    this.store.dispatch(loadProduct());
    this.Products$ = this.store.select(state => state.productLoad.Product_.data);
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
    console.log(this.myAddForm.value);
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      this.Update(this.myEditForm.value);
    }
    //console.log(this.myEditForm.value);
  }
  add(Product_: Products): void {
    // console.log(products);
    // console.log(products.name);
    const valid = this.ValidationService_.checkNameExistforProductAddForm(this.myAddForm.value.name,this.Products$ );
    console.log(valid);
    console.log(valid.value);
    // this.service.getbyname(Product_.name).subscribe(data => {
    //   this.namedata2 = data;
    //   this.name = this.namedata2.data
      if (!valid.value) {
        this.store.dispatch(addProduct({ Product_ }));
          this.actions$.pipe(ofType(addProductSuccess)).subscribe(() => {
                // this.args="Product Updated";
                 this.popupenvironments.args$.next("Product Added");
                  this.loadProducts();
                });
             this.actions$.pipe(ofType(ProductActions.addProductFailure)).subscribe(() => {
                 
                 this.popupenvironments.args$.next("Failed to add Product");
                 
                });
        // this.loadProducts();
        // this.args="Product " + Product_.name + " added.";
        // this.Products$ = this.store.select(state => state.productLoad.Product_.data);
      }
      else if (valid.value) {
        //this.args="Item already exist and add another Item "+Product_.name;
        this.popupenvironments.args$.next("Item already exist and add another Item ");
        // +Product_.name
       // this.SweetAlert2_.showFancyAlertFail("Item already exist and add another Item " + Product_.name);
      }
   // })

  }
  Update(Product_: Products) {
    console.log(this.Products$);
    const valid = this.ValidationService_.checkNameExist(this.myEditForm.value.name,this.myEditForm.value._id,this.Products$ )
   console.log(valid.value);
    if(valid.value)
    {
    
     this.popupenvironments.args$.next("Product Exists.");
    }
    else
    {
    this.store.dispatch(updateProduct({ Product_ }));
     this.actions$.pipe(ofType(updateProductSuccess)).subscribe(() => {
                
                 this.popupenvironments.args$.next("Record Updated");
                
                  this.loadProducts();
                });
             this.actions$.pipe(ofType(ProductActions.updateProductFailure)).subscribe(() => {
                 this.SweetAlert2_.showFancyAlertFail("Something went wrong");
                  
                });
              }
    // this.store.dispatch(loadProduct());
    // this.Products$ = this.store.select(state => state.productLoad.Product_.data);
    // this.SweetAlert2_.showFancyAlertSuccess("Product " + Product_.name + " updated.");
  }
  cDelete(_id: any) {

  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      alert("working body");
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block;");
      this.popupenvironments.valueid$.next(event.data._id);
      this.popupenvironments.tablename$.next("prod");
      
    }
    if (event.colDef.field == 'Edit') {
      
      this.popupenvironments.popdata2$.next(event.data);
      this.popdata2=event.data;
      this.popupenvironments.args$.next(null);
      
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        Productdesc: [event.data.Productdesc],
        selectcategoryID: [event.data.selectcategoryID, [Validators.required]],
        selectQtypeID: [event.data.selectQtypeID, [Validators.required]],
        selectSubQuantityTypeID: [event.data.selectSubQuantityTypeID, [Validators.required]],
        availablity: [event.data.availablity],
        veg_nonveg: [event.data.veg_nonveg],
        Status: [event.data.Status]
      });
      this.loadSubQuantityTypeByQuantityTypeId(event.data.selectQtypeID);
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
     
    }

  }
  
  shows() {
    this.popupenvironments.show$.next(true);
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.args$.next(null);
    
    
  }

  close() {
    //alert(arg0)
    this.popupenvironments.show$.next(false);
    this.popupenvironments.showEdit$.next(false);
  }
  handleChildClick() {
   
    this.popupenvironments.display$.next("display:none;");
    
  }
  ProductIdExistData: any;
  deletedConfirmed(_id: any) {
    this.ProductPriceService_.getbyproductid(_id).subscribe(ProductIdExist => {
     // this.ProductIdExistData = ProductIdExist;
     this.ManageDataEnvironments.Product$.next(ProductIdExist);
      console.log(this.ManageDataEnvironments.Product$.value.data.length);
      if (this.ManageDataEnvironments.Product$.value.data.length === 0) {
        this.store.dispatch(deleteProduct({ _id }));
        this.actions$.pipe(ofType(deleteProductSuccess)).subscribe(() => {
                 //this.args="Product Updated";
                  this.loadProducts();
                });
             this.actions$.pipe(ofType(ProductActions.deleteProductFailure)).subscribe(() => {
                 this.SweetAlert2_.showFancyAlertFail("Failed to delete");
                });
        // this.store.dispatch(loadProduct());
        // this.Products$ = this.store.select(state => state.productLoad.Product_.data);
        //this.SweetAlert2_.showFancyAlertSuccess("Deleted.");
       
        this.popupenvironments.display$.next("display:none;");
      }
      else {
        this.SweetAlert2_.showFancyAlertFail("Assocciated with Product Price. Can't Delete");
       
        this.popupenvironments.display$.next("display:none;");
      }
    });

    // this.args = " Record Deleted Successfully ";
  }
}
