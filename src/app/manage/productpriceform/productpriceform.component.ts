import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { CategoryService } from '../../core/Services/category.service';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { ProductService } from '../../core/Services/product.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ProductPrice, ProductPriceDetails, Products } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProductPriceActions from '../ManageStore/productPriceStore/productPrice.actions';
import { loadProduct } from '../ManageStore/productStore/product.actions';
import { loadCategories } from '../ManageStore/categoryStore/category.actions';
import { loadSubQuantityType, loadSubQuantityTypeById } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadQuantityType, loadQuantityTypeFailure, loadQuantityTypeSuccess } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { addProductPrice, deleteProductPrice, loadProductPrice, loadProductPriceSuccess, updateProductPrice, updateProductPriceSuccess } from '../ManageStore/productPriceStore/productPrice.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { Actions, ofType } from '@ngrx/effects';
@Component({
  selector: 'app-productpriceform',
  templateUrl: './productpriceform.component.html',
  styleUrl: './productpriceform.component.css',
  standalone: false
})
export class ProductpriceformComponent implements OnInit {
  myAddForm: FormGroup;
  args = "";
  productPriceRecord: any;
  myEditForm: FormGroup;
  popdata2: any;
  display = "";
  tablename = "";
  valueid = "";
  employeeId = "JSK";
  modal = "";
  subQuantityTypeName2: any;
  prodata: any;
  Productname2: any;
  Productname: any;
  addProductPriceResultdata: any;
  @ViewChild('f')
  ProductPriceViewchild!: NgForm;

  categorynamedata2: any
  subQuantityTypeData2: any;

  productPrice$!: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  subQuantityTypeData$: Observable<any[]>;
  categorynamedata$: Observable<any[]> | undefined;
  subQuantityTypeName$: Observable<any[]> | undefined;
  subQuantityTypeByIdData$: Observable<any[]> | undefined;
  Qtypenamedata$: Observable<any[]> | undefined;
  Productnamedata$: Observable<any[]> | undefined;
  productPriceData$: Observable<any> | undefined;
  Qtypenamedata2: any
  Productnamedata2: any;
  //ProductPricedata$!: Observable<any[]>;
  ProductPricedata2: any;
  productPriceData2: any;
  productprices: ProductPrice =
    {
      _id: '',
      ProductPrice: 100,
      SelectProductId: '',
      selectcategoryID: '',
      selectQtypeID: '',
      selectSubQuantityTypeID: '',
      employee_id: ''
    }
  SelectProductId = "";
  selectcategoryID = "";
  selectQtypeID = "";
  selectSubQuantityTypeID = "";
  ProductPrice = "";
  colDefs: ColDef[] = [
    { field: "ProductPrice" },
    { field: "ProductName" },
    { field: "categoryName" },
    { field: "QtypeName" },
    { field: "SubQuantityTypeName" },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];

  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 200, 500, 1000];

  constructor(private service: ProductPriceService,
    public actions$: Actions,
    private ProductService_: ProductService, private QuantitytypeService_: QuantitytypeService, private CategoryService_: CategoryService, private subQuantityTypeService_: subQuantityTypeService, private router: Router, private formedit: FormBuilder, private store: Store<{ categoryLoad: any, productPriceLoad: any, productLoad: any, quantityTypeLoad: any, subQuantityTypeLoad: any, subQuantityTypeByIdLoad: any }>, private SweetAlert2_: SweetAlert2) {
    this.categorynamedata$ = store.select(state => state.categoryLoad.ProductCategory_.data);
    this.loading$ = store.select(state => state.categoryLoad.loading);
    this.error$ = store.select(state => state.categoryLoad.error);

    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);

    this.subQuantityTypeData$ = store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByIdLoad.error);

    this.Productnamedata$ = store.select(state => state.productLoad.Product_.data);
    this.loading$ = store.select(state => state.productLoad.loading);
    this.error$ = store.select(state => state.productLoad.error);

    this.productPriceData$ = store.select(state => state.productPriceLoad.ProductPrice_.data);
    this.loading$ = store.select(state => state.productPriceLoad.loading);
    this.error$ = store.select(state => state.productPriceLoad.error);


    //console.log(this.Productnamedata$);

    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      ProductPrice: ['', Validators.required],
      SelectProductId: ['', [Validators.required]],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]],
      employee_id: this.employeeId
    });
    this.myAddForm = this.formedit.group({
      ProductPrice: ['', Validators.required],
      SelectProductId: ['', [Validators.required]],
      selectcategoryID: ['', [Validators.required]],
      selectQtypeID: ['', [Validators.required]],
      selectSubQuantityTypeID: ['', [Validators.required]]
      , employee_id: this.employeeId
    });
  }
  ngOnInit(): void {

    this.refresh();
  }
  refresh() {
    this.loadSubQuantityTypeName();
    this.loadcategory();
    this.loadQtype();
    this.loadProducts();
    this.loadProductPrice();
  }

  loadProducts2() {
    //alert(this.myAddForm.value.SelectProductId);
    this.ProductService_.getbyid(this.myAddForm.value.SelectProductId).subscribe(data => {
      if (data) {
        this.Productname2 = "";
        this.Productname = "";
        this.Productname2 = data;
        this.Productname = this.Productname2.data
        this.prodata = this.Productname;
        this.loadSubQuantityTypeByQuantityTypeID(this.prodata[0].selectQtypeID);
        alert(this.prodata[0].selectQtypeID);
        this.myAddForm = this.formedit.group({
          ProductPrice: [0, Validators.required],
          SelectProductId: [this.prodata[0]._id, [Validators.required]],
          selectcategoryID: [this.prodata[0].selectcategoryID, [Validators.required]],
          selectQtypeID: [this.prodata[0].selectQtypeID, [Validators.required]],
          selectSubQuantityTypeID: [this.prodata[0].selectSubQuantityTypeID, [Validators.required]]
        });
        alert(this.prodata[0].Productname);
        console.log(this.prodata);
        //this.search(id);

      }
    })
  }
  loadProducts() {
    this.store.dispatch(loadProduct());
    this.Productnamedata$ = this.store.select(state => state.productLoad.Product_.data);
    this.loading$ = this.store.select(state => state.productLoad.loading);
    this.error$ = this.store.select(state => state.productLoad.error);

  }
  loadcategory() {

    this.store.dispatch(loadCategories());
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.loading$ = this.store.select(state => state.categoryLoad.loading);
    this.error$ = this.store.select(state => state.categoryLoad.error);


  }
    loadSubQuantityTypeByEdit() {
    this.loadSubQuantityTypeByQuantityTypeID(this.myEditForm.value.selectQtypeID); 
  }
  loadSubQuantityTypeByAdd() {
this.loadSubQuantityTypeByQuantityTypeID(this.myAddForm.value.selectQtypeID); 
  }
  loadSubQuantityTypeByQuantityTypeID(QuntityTypeId:string) {
     this.store.dispatch(loadSubQuantityTypeById({ selectQtypeID:QuntityTypeId }));
     this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.actions$.pipe(ofType(loadProductPriceSuccess)).subscribe(() => {
            
           });
        this.actions$.pipe(ofType(ProductPriceActions.addProductPriceFailure)).subscribe(() => {
            this.args="Unable to Load Product Price";
           });
     // this.loading$ = this.store.select(state => state.subQuantityTypeByIdLoad.loading);
    // this.error$ = this.store.select(state => state.subQuantityTypeByIdLoad.error);
  }
  loadQtype() {

    this.store.dispatch(loadQuantityType());
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
  this.actions$.pipe(ofType(loadQuantityTypeSuccess)).subscribe(() => {
            
           });
        this.actions$.pipe(ofType(loadQuantityTypeFailure)).subscribe(() => {
            this.args="Unable to Load QuantityType";
           });
    // this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    // this.error$ = this.store.select(state => state.quantityTypeLoad.error);
  }
  loadSubQuantityTypeName() {

    this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.loading$ = this.store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeLoad.error);
  }

  loadProductPrice() {
    this.store.dispatch(loadProductPrice());
    this.productPriceData$ = this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    this.loading$ = this.store.select(state => state.productPriceLoad.loading);
    this.error$ = this.store.select(state => state.productPriceLoad.error);

    this.loadproductpricename();
  }
  loadproductpricename() {

    this.productPriceData$ = this.store.select(state => state.productPriceLoad.ProductPrice_.data);
if( this.productPriceData$){
    this.productPriceData$.subscribe(productPriceData => {
      let mergAllProductRelatedTables: ProductPriceDetails[] = [];
      //alert(productPriceData.length);
      for (let ii = 0; ii < productPriceData.length; ii++) {
        const mergeProducts: ProductPriceDetails = {
          _id: productPriceData[ii]._id,
          ProductPrice: productPriceData[ii].ProductPrice,
          ProductName: this.getproductname(productPriceData[ii].SelectProductId),
          categoryName: this.getcategoryname(productPriceData[ii].selectcategoryID),
          QtypeName: this.getqtypnamename(productPriceData[ii].selectQtypeID),
          SubQuantityTypeName: this.getSubQuantityTypeName(productPriceData[ii].selectSubQuantityTypeID),
          SelectProductId: productPriceData[ii].SelectProductId,
          selectcategoryID: productPriceData[ii].selectcategoryID,
          selectQtypeID: productPriceData[ii].selectQtypeID,
          selectSubQuantityTypeID: productPriceData[ii].selectSubQuantityTypeID,
          quntityvalue: 0,
          veg_nonveg: productPriceData[ii].veg_nonveg
        };
        mergAllProductRelatedTables.push(mergeProducts);
      }
      this.productPriceRecord = mergAllProductRelatedTables;

    });

  }

  }
  getproductname(id: string) {
    let ProductName = "";
    this.Productnamedata$ = this.store.select(state => state.productLoad.Product_.data);
    this.Productnamedata$.subscribe(Productnamedata => {
      const itemP = Productnamedata.find((item: { _id: string; }) => item._id === id);
      const indexP = Productnamedata.findIndex((item: { _id: string; }) => item._id === id);

      if (itemP._id) {
        ProductName = Productnamedata[indexP].Productname;
      }

    })
    return ProductName;
  }
  getqtypnamename(id: string) {
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    let QuantityTypeName = "";
    this.Qtypenamedata$.subscribe(Qtypenamedata => {
      const itemP = Qtypenamedata.find((item: { _id: string; }) => item._id === id);
      const indexP = Qtypenamedata.findIndex((item: { _id: string; }) => item._id === id);

      if (itemP._id) {
        QuantityTypeName = Qtypenamedata[indexP].name;
      }
    })
    return QuantityTypeName;
  }
  getcategoryname(id: string) {
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    let CategoryName = "";
    this.categorynamedata$.subscribe(categorynamedata => {
      const itemP = categorynamedata.find((item: { _id: string; }) => item._id === id);
      const indexP = categorynamedata.findIndex((item: { _id: string; }) => item._id === id);

      if (itemP._id) {
        CategoryName = categorynamedata[indexP].name;
      }
    })
    return CategoryName;
  }


  getSubQuantityTypeName(id: string) {
   this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);

    let SubQuantityTypeName = "";
    this.subQuantityTypeData$.subscribe(subQuantityTypeData => {
      const itemP = subQuantityTypeData.find((item: { _id: string; }) => item._id === id);
      const indexP = subQuantityTypeData.findIndex((item: { _id: string; }) => item._id === id);

      if (itemP._id == id) {
        SubQuantityTypeName = subQuantityTypeData[indexP].name;
      }
    })
    return SubQuantityTypeName;
  }
  add(ProductPrice_: ProductPrice) {
   // ProductPrice_.selectcategoryID, ProductPrice_.selectQtypeID,
   try{
      this.service.getbyid(ProductPrice_.SelectProductId, ProductPrice_.selectSubQuantityTypeID, ProductPrice_.selectQtypeID, ProductPrice_.selectcategoryID).subscribe(result => {
        // alert(selectcategoryID)

      console.log(result);
         this.addProductPriceResultdata = result;
        console.log(this.addProductPriceResultdata.data);
        console.log(this.addProductPriceResultdata.length);
        if (this.addProductPriceResultdata.data.length == 0) {

          this.store.dispatch(addProductPrice({ ProductPrice_ }));
          // this.SweetAlert2_.showFancyAlertSuccess(" Added.");
          // this.productpriceallname=[];  
          this.actions$.pipe(ofType(ProductPriceActions.addProductPriceSuccess)).subscribe(() => {
            this.args = "Product Price Added";
          // 
          

          });
          this.actions$.pipe(ofType(ProductPriceActions.addProductPriceFailure)).subscribe(() => {
            this.args = "Something went wrong with Product Price";

          });

        }
        else {
          //alert("");  
          this.args ="Already exists data.";
        }
     
      })
    }
    catch(error)
    {
      console.log(error);
     // console.log(r);
    }

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }

  }
  onFormUpdateSubmit() {
    this.Update(this.myEditForm.value);
  }
  Update(ProductPrice_: ProductPrice) {

    this.store.dispatch(updateProductPrice({ ProductPrice_ }));
    this.actions$.pipe(ofType(ProductPriceActions.updateProductPriceSuccess)).subscribe(() => {
      this.args = "Product Price Updated";
      // this.productPriceRecord = [];
      this.refresh();

    });
    this.actions$.pipe(ofType(ProductPriceActions.updateProductPriceFailure)).subscribe(() => {
      this.args = "Something went wrong with Product Price";

    });
  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;";
      this.valueid = event.data._id;
      this.tablename = "prodpric";

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.loadSubQuantityTypeByQuantityTypeID(event.data.selectQtypeID);
      this.showEdit = true;
      this.show = false;
      this.args = "";
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        ProductPrice: [event.data.ProductPrice, Validators.required],
        SelectProductId: [event.data.SelectProductId, [Validators.required]],
        selectcategoryID: [event.data.selectcategoryID, [Validators.required]],
        selectQtypeID: [event.data.selectQtypeID, [Validators.required]],
        selectSubQuantityTypeID: [event.data.selectSubQuantityTypeID, [Validators.required]]

      });

    }

  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.show = true;
    this.showEdit = false;
    this.args = "";
  }
  close() {
    //alert(arg0)
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }
      this.refresh();
 this.productPriceRecord = [];

  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(_id: any) {
    this.store.dispatch(deleteProductPrice({ _id }));
    this.actions$.pipe(ofType(ProductPriceActions.deleteProductPriceSuccess)).subscribe(() => {
      this.productPriceRecord = [];
      this.refresh();
    });
    this.actions$.pipe(ofType(ProductPriceActions.deleteProductPriceFailure)).subscribe(() => {
     // this.args = "Something went wrong with Product Price";
this.SweetAlert2_.showFancyAlertFail("Something went wrong with Product Price.");
    });
  }
}
