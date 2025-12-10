import { Component, Injectable, OnInit } from '@angular/core';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { subQuantityType } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SubQuantityTypeAction from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import {
  addSubQuantityType,
  deleteSubQuantityType,
  loadSubQuantityType,
  updateSubQuantityType,
  updateSubQuantityTypeSuccess
} from '../ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { Actions, ofType } from '@ngrx/effects';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
  selector: 'app-subQuantityType',
  templateUrl: './subquantitytype.component.html',
  styleUrl: './subquantitytype.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class SubQuantityTypeComponenet implements OnInit {
  // Observables for data and UI state
  subQuantityTypeData$!: Observable<any[]>;
  Qtypenamedata$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // Form groups
  myAddForm: FormGroup;
  myEditForm: FormGroup;

  // UI state
  show = false;
  showEdit = false;
  args: string | null = null;
  display = 'display:none;';
  modal: string | null = null;
  valueid: any = null;
  tablename: string | null = null;
  classname = '';

  // Miscellaneous
  id: any;
  popdata2: any;
  productrecord: any;

  // Table config
  
  colDefs: ColumnDef[] = [
    { field: 'name',sortable:true },
    { field: 'decription', sortable:true},
    { field: 'Delete', cellRenderer: BasetypDeleteButtun },
    { field: 'Edit', cellRenderer: BasetypEditButtun }
  ];

  constructor(
    private service: subQuantityTypeService,
    private ValidationService_: ValidationService,
    private quantitytypeService: QuantitytypeService,
    public actions$: Actions,
    private router: Router,
    private fb: FormBuilder,
    private productPriceService: ProductPriceService,
    private store: Store<{
      subQuantityTypeByNameLoad: any;
      subQuantityTypeLoad: any;
      subQuantityTypeByIdLoad: any;
      quantityTypeLoad: any;
    }>,
    private sweetAlert2: SweetAlert2
  ) {
    // Initialize forms
    this.myAddForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      selectQtypeID: ['', Validators.required]
    });
    this.myEditForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      selectQtypeID: ['', Validators.required]
    });

    // Initialize data observables
    this.initSelectors();

    // Initial data load
    this.loadSubQuantityType();
  }

  private initSelectors() {
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);

    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    // loading$ and error$ for subQuantityType can be overwritten if needed
  }

  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    // Not implemented for now
    return false;
  }

  ngOnInit(): void {
    this.loadQType();
    this.classname = '';
  }

  loadQType() {
    this.store.dispatch(loadQuantityType());
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);
  }

  loadSubQuantityType() {
    this.store.dispatch(loadSubQuantityType());
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);

    this.actions$.pipe(ofType(SubQuantityTypeAction.loadSubQuantityTypeSuccess)).subscribe(() => {
      // Optionally handle success
    });
    this.actions$.pipe(ofType(SubQuantityTypeAction.loadSubQuantityTypeFailure)).subscribe(() => {
      this.sweetAlert2.showFancyAlertFail('Loading Failed.');
    });
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = 'modal';
      this.display = 'display:block;';
      this.valueid = r[0].row._id;
      this.tablename = 'base';
    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm.patchValue({
        _id: r[0].row._id,
        name: r[0].row.name,
        description: r[0].row.description,
        selectQtypeID: r[0].row.selectQtypeID
      });
    }
   }
 

  add(subQuantityType_: subQuantityType): void {
    const name = this.myAddForm.value.name.trim();
    this.service.getbyname(name).subscribe((getname: any) => {
      const subQuantityTypeByNameCheck = Array.isArray(getname) ? getname : (getname && Array.isArray(getname.data) ? getname.data : []);
      if (subQuantityTypeByNameCheck.length > 0) {
        this.args = 'SubQuantity Type Exists';
      } else {
        this.store.dispatch(addSubQuantityType({ SubQuantityType_: subQuantityType_ }));
        this.args = 'Add SubQuantity Type';
        this.loadSubQuantityType();
      }
    });
  }

  Update(subQuantityType_: subQuantityType) {
    if (
      this.ValidationService_.checkNameExist(
        this.myEditForm.value.name,
        this.myEditForm.value._id,
        this.subQuantityTypeData$
      )
    ) {
      this.args = `SubQuantity Type Name: ${this.myEditForm.value.name} Exists. Please create another name.`;
    } else {
      this.store.dispatch(updateSubQuantityType({ SubQuantityType_: subQuantityType_ }));
      this.actions$.pipe(ofType(updateSubQuantityTypeSuccess)).subscribe(() => {
        this.args = 'Record Updated';
        this.loadSubQuantityType();
      });
      this.actions$.pipe(ofType(SubQuantityTypeAction.updateSubQuantityTypeFailure)).subscribe(() => {
        this.args = 'Something went wrong';
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

  shows() {
    this.classname = '';
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }

  close() {
    if (this.showEdit) {
      this.showEdit = false;
    }
    if (this.show) {
      this.show = false;
    }
  }

  handleChildClick() {
    this.display = 'display:none;';
  }

  deletedConfirmed(_id: any) {
    this.productPriceService.getbybasetypeid(_id).subscribe((records: any) => {
      const productrecord = Array.isArray(records) ? records : (records && Array.isArray(records.data) ? records.data : []);
      if (productrecord.length === 0) {
        this.store.dispatch(deleteSubQuantityType({ _id }));
        this.loadSubQuantityType();
        this.display = 'display:none;';
      } else {
        this.sweetAlert2.showFancyAlertFail("Can't delete because there is product available.");
      }
    });
  }
}
