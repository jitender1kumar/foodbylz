import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customers, CustomersEdit, Floor, IChair, IChairMergeDineName } from '../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { CustomresService } from '../core/Services/customers.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as CustomersActions from './customersStore/customers.actions';
import { ValidationService } from '../core/commanFunction/Validation.service';
import { Actions, ofType } from '@ngrx/effects';
// import { customersReducer } from './customersStore/customers.reducer'; 
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class CustomersComponent implements OnInit, ICellRendererAngularComp {
  args: any = null;
  myEditForm: FormGroup;
  qid: any;
  id: any; basedata: any;
  popdata2: any;
  popdataId: any;
  popdataBasetypedesc: any;
  popdataBasetypeName: any;
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
  isCheckedStatus: any = true;
  myAddForm: FormGroup;


  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 50, 500, 1000];


  colDefs: ColDef[] = [
    { field: "name" },
    { field: "MobileNo" },
    { field: "DOB" },
    { field: "tag" },
    { field: "DueAmount" },
    { field: "Anniversary" },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  customer: Customers = {
    name: "undefined",
    MobileNo: "undefined",
    DOB: "",
    type: "",
    tag: "Friend",
    DueAmount: 0,
    Anniversary: "undefined",
    Paymentstatus: 0,
    RecieptNumber: 0,
    employee_id: "undefined"
  }

  
 
  Customersdata$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  constructor(private customerservice: CustomresService, private router: Router, private formedit: FormBuilder, private store: Store<{ customersReducer_: any }>,
    private validationService: ValidationService,public actions$: Actions,
  ) {
    this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);
    this.display = "display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['undefined', Validators.required],
      MobileNo: [''],
      DOB: [''],
      tag: ['Friend'],
      DueAmount: [0],
      Anniversary: ["undefined"]
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      MobileNo: [''],
      DOB: [''],
      tag: ['Friend'],
      DueAmount: [0],
      Anniversary: ["undefined"]
    });
    //  this.loadbasetype();
    this.loadCustomers();
  }
  ngOnInit(): void {
    // this.loaddine2();
    this.classname = "";
    this.loadCustomers();

  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  loadCustomers() {
    //alert(selectcategoryID);
    this.store.dispatch(CustomersActions.loadCustomers());//state => state.LoadFloor.Floor_.data
    this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);
    this.Customersdata$?.subscribe(data => {
     // console.log(data);
    }
    );
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "base";
      alert(this.valueid);
      if (PopupmodelComponent.delete == true) {
        this.customerservice.delete(event.data._id).subscribe(res => {
          alert("Successfully Delete BaseType...");
          // this.args="Successfully Deleted "+event.data.Basetypename;
        })
      }


    }
    if (event.colDef.field == 'Edit') {
      //  this.loaddine2();
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name],
        MobileNo: [event.data.MobileNo],
        DOB: [event.data.DOB],

        tag: [event.data.tag],
        DueAmount: [event.data.DueAmount],
        Anniversary: [event.data.Anniversary],


      });

    }
   
  }


  SearchedCustomerData: any;
  add(customer: Customers): void {
    this.SearchedCustomerData = "";
    // this.store.dispatch(CustomersActions.getCustomerByMobileNumber({ mobileNo: cutomer.MobileNo }));
    // this.customerservice.getbyMobileNumber(cutomer.MobileNo)
    // this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data); 
    this.customerservice.getbyMobileNumber(customer.MobileNo).subscribe(Customer => {
      console.log(Customer);
      if (Customer) {
        this.SearchedCustomerData = Customer;
        if (this.SearchedCustomerData.data.length > 0) {
          this.args = "Another Customer Exists: " + this.SearchedCustomerData.data[0].name + " - " + this.SearchedCustomerData.data[0].MobileNo;
        }
        else {
          this.store.dispatch(CustomersActions.addCustomer({ customer: customer }));
          this.actions$.pipe(ofType(CustomersActions.addCustomerSuccess)).subscribe(() => {
            this.args = "Added: " + this.SearchedCustomerData.data[0].name + " - " + this.SearchedCustomerData.data[0].MobileNo;
            this.loadCustomers();
          });
    
          this.actions$.pipe(ofType(CustomersActions.addCustomerFailure)).subscribe((error) => {
            // Show a more descriptive error message for failed update
            this.args = "Failed to Add: " + this.SearchedCustomerData.data[0].name ;
          });
        }
      }
    }
    );


  }



  Update(customerEdit: CustomersEdit,Customersdata$:any) {
    //this.SearchedCustomerData = "";
    // this.store.dispatch(CustomersActions.getCustomerByMobileNumber({ mobileNo: customer.MobileNo }));
    // this.customerservice.getbyMobileNumber(customerEdit.MobileNo).subscribe(Customer => {
    //   console.log(Customer);
    this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);
    
      const valid = this.validationService.checkAnotherMobileNumberExist(this.myEditForm.value.MobileNo,this.myEditForm.value._id,Customersdata$);
      console.log(valid.value);
      
      if (valid.value) {
       // this.SearchedCustomerData = Customer;
        //if (this.SearchedCustomerData.data.length > 0 && customerEdit.name != customerEdit.name) {
          this.args = "Another Customer Exists: " + customerEdit.name + " - " + customerEdit.MobileNo;
        }
        else {
          this.store.dispatch(CustomersActions.updateCustomer({ customerEdit: customerEdit }));
          this.actions$.pipe(ofType(CustomersActions.updateCustomerSuccess)).subscribe(() => {
            this.args = "Updated: " + customerEdit.name + " - " + customerEdit.MobileNo;
            this.loadCustomers();

           
          });
    
          this.actions$.pipe(ofType(CustomersActions.updateCustomerFailure)).subscribe((error) => {
            // Show a more descriptive error message for failed update
            this.args = "Failed to Updated: " + customerEdit.name ;
          });
        }
        
      }
    // }
    // );



  //}
  cDelete(_id: any) {
    //this.loadbasetype();
    this.loadCustomers();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    //  this.loadCustomers();
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
     
     
      this.Update(this.myEditForm.value,this.Customersdata$);
      // this.myEditForm.patchValue({
      //   _id: [customerEdit._id],
      //   name: [customerEdit.name],
      //   MobileNo: [customerEdit.MobileNo],
      //   DOB: [customerEdit.DOB],
      //   tag: [customerEdit.tag],
      //   DueAmount: [customerEdit.DueAmount],
      //   Anniversary: [customerEdit.Anniversary],
      // });
     // this.loadCustomers();
    }
  }
  changeMobileNumber()
  {
    //alert("ok");
    //console.log(event$);
    console.log(this.myEditForm.value.MobileNo);
    this.myEditForm.patchValue({
        _id: [this.myEditForm.value._id],
        name: [this.myEditForm.value.name],
        MobileNo: [this.myEditForm.value.MobileNo],
        DOB: [this.myEditForm.value.DOB],
        tag: [this.myEditForm.value.tag],
        DueAmount: [this.myEditForm.value.DueAmount],
        Anniversary: [this.myEditForm.value.Anniversary],
      });
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
    this.store.dispatch(CustomersActions.deleteCustomer({ _id: _id }));

    this.actions$.pipe(ofType(CustomersActions.deleteCustomerSuccess)).subscribe(() => {
      this.args = "Deleted: " + this.SearchedCustomerData.data[0].name + " - " + this.SearchedCustomerData.data[0].MobileNo;
      this.loadCustomers();
    });

    this.actions$.pipe(ofType(CustomersActions.deleteCustomerFailure)).subscribe((error) => {
      // Show a more descriptive error message for failed update
      this.args = "Failed to Delete: " + this.SearchedCustomerData.data[0].name ;
    });
    this.display = "display:none;";
    this.loadCustomers();
    this.args = " Record Deleted Successfully ";
  }




}