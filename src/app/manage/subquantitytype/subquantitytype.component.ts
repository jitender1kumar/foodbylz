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
import { addSubQuantityType, deleteSubQuantityType, loadSubQuantityType, updateSubQuantityType } from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
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
  constructor(private service: subQuantityTypeService, private QuantitytypeService_: QuantitytypeService, private router: Router, private formedit: FormBuilder, private productPriceservice: ProductPriceService, private store: Store<{
    subQuantityTypeByNameLoad: any; subQuantityTypeLoad: any, subQuantityTypeByIdLoad: any, quantityTypeLoad: any
  }>,private SweetAlert2_:SweetAlert2) {
    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);



    this.subQuantityTypeData$ = store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    this.loading$ = store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.allTasks);
    this.loading$ = store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = store.select(state => state.subQuantityTypeByIdLoad.error);

    this.subQuantityTypeByNameData$ = store.select(state => state.subQuantityTypeByNameLoad.SubQuantityType_.allTasks);
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
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);

  }

  add(SubQuantityType_: subQuantityType): void {
    const name = this.myAddForm.value.name;
    this.service.getbyname(name.trim()).subscribe(getname => {
      this.subQuantityTypeByName = getname;
      this.subQuantityTypeByNameCheck = this.subQuantityTypeByName.allTasks;
      console.log(name);
      if (this.subQuantityTypeByNameCheck.length > 0) {
        //this.args = "";
          this.SweetAlert2_.showFancyAlertFail("Exist SubQuantity Type"); 
      }
      else {
        this.store.dispatch(addSubQuantityType({ SubQuantityType_ }));
        this.SweetAlert2_.showFancyAlertSuccess("Add SubQuantity Type"); 
         this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    
      }
    })
this.loadSubQuantityType();
  }

  loadSubQuantityType() {
    this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    this.loading$ = this.store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeLoad.error);

  }

  Update(SubQuantityType_: subQuantityType) {
    this.store.dispatch(updateSubQuantityType({ SubQuantityType_ }));
     this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
     this.SweetAlert2_.showFancyAlertSuccess("Record Updated."); 
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
      this.productrecord = this.productrecord2.allTasks;
      console.log(this.productrecord.length);
      console.log(records);
      if (this.productrecord.length == 0) {
        this.store.dispatch(deleteSubQuantityType({ _id }));
         this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    
        this.display = "display:none;";
        this.loadSubQuantityType();
        //this.args = " ";
         this.SweetAlert2_.showFancyAlertSuccess(" Record Deleted Successfully."); 
      }
      else if (this.productrecord.length > 0) {
        //alert("");
        this.SweetAlert2_.showFancyAlertFail("Can't delete because there is product available."); 
      }
    })

  }
}




