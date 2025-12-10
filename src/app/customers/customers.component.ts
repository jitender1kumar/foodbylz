import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers, CustomersEdit } from '../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { ColumnDef } from '../core/shared/dynamicTable/gird-table/gird-table.component';
// import { customersReducer } from './customersStore/customers.reducer'; 
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class CustomersComponent implements OnInit {
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


  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.

  

  colDefs: ColumnDef[] = [
    { field: "name" ,sortable:true},
    { field: "MobileNo",sortable:true },
    { field: "DOB",sortable:true },
    { field: "tag" ,sortable:true},
    { field: "DueAmount" ,sortable:true},
    { field: "Anniversary" ,sortable:true},
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

  
  loadCustomers() {
    //alert(selectcategoryID);
    this.store.dispatch(CustomersActions.loadCustomers());//state => state.LoadFloor.Floor_.data
    this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);
    this.Customersdata$?.subscribe(data => {
     // console.log(data);
    }
    );
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = r[0].row._id;
      this.tablename = "base";
      alert(this.valueid);
      if (PopupmodelComponent.delete == true) {
        this.customerservice.delete(r[0].row._id).subscribe(res => {
          alert("Successfully Delete BaseType...");
          // this.args="Successfully Deleted "+r[0].row.Basetypename;
        })
      }

    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [r[0].row._id],
        name: [r[0].row.name],
        MobileNo: [r[0].row.MobileNo],
        DOB: [r[0].row.DOB],

        tag: [r[0].row.tag],
        DueAmount: [r[0].row.DueAmount],
        Anniversary: [r[0].row.Anniversary],


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