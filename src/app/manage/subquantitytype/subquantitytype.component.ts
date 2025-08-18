import { Component, Injectable, OnInit } from '@angular/core';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { subQuantityType } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SubQuantityTypeAction from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { addSubQuantityType, deleteSubQuantityType, loadSubQuantityType, updateSubQuantityType, updateSubQuantityTypeSuccess } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { Actions, ofType } from '@ngrx/effects';
import { NameExistOrNotService } from '../../core/commanFunction/NameExistOrNot.service';
@Component({
    selector: 'app-subQuantityType',
    templateUrl: './subquantitytype.component.html',
    styleUrl: './subquantitytype.component.css',
    standalone: false
})

@Injectable({ providedIn: 'root' })
export class SubQuantityTypeComponenet implements OnInit, ICellRendererAngularComp {
  subQuantityTypeData$: Observable<any[]> | undefined;
  Qtypenamedata$: Observable<any[]> | undefined;
  subQuantityTypeByIdData$: Observable<any[]> | undefined;
  subQuantityTypeByNameData$: Observable<any[]> | undefined;
  subQuantityTypeByName: any | undefined;
  subQuantityTypeByNameCheck: any | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  args: any = null;
  myEditForm: FormGroup;
  qid: any;
  id: any; basedata: any;
  popdata2: any;
  popdataId: any;
  popdatadescription: any;
  popdataname: any;
  popdataQuntityId: any;
  src: any;
  alt: any;
  content: any;
  classname: any;
  style: any;
  modal: any;
  display: any;
  id01: any;
  valueid: any;
  tablename: any;
  myAddForm: FormGroup;
  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
  }
  // Column Definitions: Defines the columns to be displayed.
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];

  productrecord: any;
  productrecord2: any;
  selectcategory: any;
  name: any;
  description: any;
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "decription", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  subQuantityType: subQuantityType = {
    _id: '',
    name: '', description: '',
    selectQtypeID: ''
  }
  selectQtypeID: any;

  categorynamedata: any;
  categorynamedata2: any
  basetypedata2: any;
  basetypedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private service: subQuantityTypeService,
    private NameExistOrNotService_:NameExistOrNotService,
     private QuantitytypeService_: QuantitytypeService, public actions$: Actions,
      private router: Router, private formedit: FormBuilder, 
      private productPriceservice: ProductPriceService, private store: Store<{
    subQuantityTypeByNameLoad: any; subQuantityTypeLoad: any,
     subQuantityTypeByIdLoad: any, quantityTypeLoad: any
  }>,private SweetAlert2_:SweetAlert2) {
    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);



    this.subQuantityTypeData$ = store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByIdLoad.error);

    this.subQuantityTypeByNameData$ = store.select(state => state.subQuantityTypeByNameLoad.SubQuantityType_.data);
    this.loading$ = store.select(state => state.subQuantityTypeByNameLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByNameLoad.error);

    this.display = "display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['',],
      selectQtypeID: ['', [Validators.required]]
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      description: ['',],
      selectQtypeID: ['', [Validators.required]]
    });
    this.loadSubQuantityType();

  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "base";
    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description],
        selectQtypeID: [event.data.selectQtypeID, [Validators.required]]
      });

    }
    this.loadSubQuantityType();
  }

  ngOnInit(): void {
    this.loadqtype();
    this.classname = "";
  }
  loadqtype() {
   
    this.store.dispatch(loadQuantityType());
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);

  }

  add(SubQuantityType_: subQuantityType): void {
    const name = this.myAddForm.value.name;
    this.service.getbyname(name.trim()).subscribe(getname => {
      this.subQuantityTypeByName = getname;
      this.subQuantityTypeByNameCheck = this.subQuantityTypeByName.data;
      console.log(name);
      if (this.subQuantityTypeByNameCheck.length > 0) {
        //this.args = "";
          this.args="SubQuantity Type Exists"; 
      }
      else {
        this.store.dispatch(addSubQuantityType({ SubQuantityType_ }));
        this.args="Add SubQuantity Type"; 
         this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    
      }
    })
this.loadSubQuantityType();
  }

  loadSubQuantityType() {
    this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    // this.loading$ = this.store.select(state => state.subQuantityTypeLoad.loading);
    // this.error$ = this.store.select(state => state.subQuantityTypeLoad.error);
 this.actions$.pipe(ofType(SubQuantityTypeAction.loadSubQuantityTypeSuccess)).subscribe(() => {
           //  this.args="Record Loaded";
             
            });
         this.actions$.pipe(ofType(SubQuantityTypeAction.loadSubQuantityTypeFailure)).subscribe(() => {
            this.SweetAlert2_.showFancyAlertFail("Loading Failed.");
              
            });
  }

  Update(SubQuantityType_: subQuantityType) {
     if(this.NameExistOrNotService_.checkNameExist(this.myEditForm.value.name,this.myEditForm.value._id,this.subQuantityTypeData$ ))
    {
     this.args = `SubQuantity Type Name: ${this.myEditForm.value.name} Exists. Please create another name.`;
    }
    else
    {
    this.store.dispatch(updateSubQuantityType({ SubQuantityType_ }));
      this.actions$.pipe(ofType(updateSubQuantityTypeSuccess)).subscribe(() => {
             this.args="Record Updated";
              this.loadSubQuantityType();
            });
         this.actions$.pipe(ofType(SubQuantityTypeAction.updateSubQuantityTypeFailure)).subscribe(() => {
             this.args="Something went wrong";
              
            });
          }
   }
  cDelete(_id: any) {
    this.loadSubQuantityType();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      this.Update(this.myEditForm.value);
    }
  }


  //show addbasetype
  show: any = false;
  showEdit: any = false;
  shows() {
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
    //alert(arg0)
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }

  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(_id: any) {

    this.productPriceservice.getbybasetypeid(_id).subscribe(records => {
      this.productrecord2 = records;
      this.productrecord = this.productrecord2.data;
      console.log(this.productrecord.length);
      console.log(records);
      if (this.productrecord.length == 0) {
        this.store.dispatch(deleteSubQuantityType({ _id }));
         this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    
        this.display = "display:none;";
        this.loadSubQuantityType();
        //this.args = " ";
       //  this.SweetAlert2_.showFancyAlertSuccess(" Record Deleted Successfully."); 
      }
      else if (this.productrecord.length > 0) {
        //alert("");
        this.SweetAlert2_.showFancyAlertFail("Can't delete because there is product available."); 
      }
    })

  }
}




