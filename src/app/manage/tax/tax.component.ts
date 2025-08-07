import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tax } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { TaxService } from '../../core/Services/tax.service';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addTax, deleteTax, deleteTaxSuccess, loadTax } from '../ManageStore/taxStore/tax.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ofType } from '@ngrx/effects';
@Component({
    selector: 'app-tax',
    templateUrl: './tax.component.html',
    styleUrl: './tax.component.css',
    standalone: false
})
export class TaxComponent implements OnInit {
  tax$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  args: any = null;
  myEditForm: FormGroup;
  popdata2: any;
  display: any;
  tablename: any = "qtyp";
  valueid: any;
  modal: any;
  taxnamedata: any;
  taxnamedata2: any;

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "Description" },
    { field: "perscentRate" },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];
  actions$: any;
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  @ViewChild('f')
  quantitytypeViewchild!: NgForm;
  categorynamedata: any;
  categorynamedata2: any;

  Tax: Tax = {
    _id: '',
    name: '',
    Description: '',
    perscentRate: 0,
    Status: true

  }
  name: any;
  Desc: any;
  myAddForm: FormGroup;
  constructor(private service: TaxService, private router: Router, private formedit: FormBuilder, private store: Store<{ taxLoad: any }>,private SweetAlert2_:SweetAlert2) {
    this.tax$ = store.select(state => state.taxLoad.Tax_.allTasks);
    this.loading$ = store.select(state => state.taxLoad.loading);
    this.error$ = store.select(state => state.taxLoad.error);
    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      Description: [''],
      perscentRate: [0, Validators.required],
      Status: [true, Validators.required]
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      Description: [''],
      perscentRate: [0, Validators.required],
      Status: [true, Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadTax();
    this.handleDeleteConfirmed();
    
  }
  onFormUpdateSubmit() {
    this.Update(this.myEditForm.value);
  }
  Update(Tax_: Tax) {
    this.service.update(Tax_).subscribe(res => {
      if (res) {
        //this.args = "Successfully Updated quantity types..." + Tax.name;
         this.SweetAlert2_.showFancyAlertSuccess("Successfully updated Tax: " + Tax_.name);
         this.store.dispatch(loadTax());
  this.tax$ = this.store.select(state => state.taxLoad.Tax_.allTasks);
 
      }
    })

  }
  cDelete(_id: any) {


  }

  add(Tax_: Tax): void {

    this.store.dispatch(addTax({ Tax_ }));
   // this.args = "Successfully Added quantity types..." + Tax_.name;
     this.SweetAlert2_.showFancyAlertSuccess("Successfully Added Tax: " + Tax_.name);
    //alert("Successfully Created quantity types...");
    this.store.dispatch(loadTax());
    this.tax$ = this.store.select(state => state.taxLoad.Tax_.allTasks);

  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "qtyp";

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        Description: [event.data.Description],
        perscentRate: [event.data.perscentRate, Validators.required],
        Status: [event.data.Status, Validators.required]
      });
    }
  }

  loadTax() {
    this.store.dispatch(loadTax());
    this.tax$ = this.store.select(state => state.taxLoad.Tax_.allTasks);
    this.loading$ = this.store.select(state => state.taxLoad.loading);
    this.error$ = this.store.select(state => state.taxLoad.error);

  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
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
  // deletedConfirmed(_id: any) {
  //   this.store.dispatch(deleteTax({ _id }));
  //   this.store.dispatch(loadTax());
  //   this.tax$ = this.store.select(state => state.taxLoad.Tax_.allTasks);
  //   this.display = "display:none;";
  //    this.SweetAlert2_.showFancyAlertSuccess("Record Deleted Successfully.");
  //   //this.args = " Record Deleted Successfully ";
  // }
  deletedConfirmed(_id: any) {
    console.log(_id);
  this.store.dispatch(deleteTax({ _id }));
  }
handleDeleteConfirmed()
{
  this.tax$ = this.store.select(state => state.taxLoad.Tax_.allTasks);

  this.store.select(state => state.taxLoad.error)
    .pipe(filter(error => !!error))
    .subscribe(error => {
      console.error('Delete failed:', error);
      this.SweetAlert2_.showFancyAlertError('Failed to delete record.');
    });

  this.actions$.pipe(
    ofType(deleteTaxSuccess)
  ).subscribe(() => {
    this.SweetAlert2_.showFancyAlertSuccess('Record deleted successfully.');
    this.display = 'display:none;';
  });
}
}

