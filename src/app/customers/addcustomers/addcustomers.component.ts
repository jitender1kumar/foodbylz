import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customers } from '../../core/Model/crud.model';
import { CustomresService } from '../../core/Services/customers.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as CustomersActions from '../customersStore/customers.actions';
import { customersReducer } from '../customersStore/customers.reducer'; 
import { Actions, ofType } from '@ngrx/effects';
@Component({
  selector: 'app-addcustomers',
  standalone: false,
  templateUrl: './addcustomers.component.html',
  styleUrl: './addcustomers.component.css',
})
export class AddcustomersComponent implements OnInit {
  @Output() closePopUpByChild = new EventEmitter<boolean>();
  @Output() CustomersDetail = new EventEmitter<Customers>();
  DisplayCustomers: string = "";
  myAddForm!: FormGroup<any>;
  myCustomerSearchForm!: FormGroup<any>;
  show: any;
  customersdata: any;
  customersdata2: any;
  selectedItem: Customers | null = null;
  @Input() showPopUp!: boolean;
  @Input() closePopUp!: boolean;
  CustomersDetails: any[] = [];
  Customersdata$?: Observable<any[]>;
  constructor(private router: Router,public actions$: Actions, private formedit: FormBuilder, private CustomersService_: CustomresService, private store:Store<{customersReducer_:any}>) {
    this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);   
    // this.myAddForm = new FormGroup({
    //   Name: new FormControl('', Validators.required),
    //   MobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    // });
    // this.myCustomerSearchForm = new FormGroup({
    //   MobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    // });
     this.myAddForm = this.formedit.group({
            name: ['', Validators.required],
            MobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]]
                                                                                            
          });
  }
  ngOnInit(): void {
    this.loadCustomers();
  }
  loadCustomers() {
    // this.CustomersService_.get().subscribe((data: Customers[]) => {
    //   this.customersdata2 = data;
    //   this.customersdata = this.customersdata2.data;
    // });
    this.store.dispatch({ type: '[Customers] Load Customers' });
this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);
  }
  add(customer: Customers): void {
  
    this.CustomersService_.getbyMobileNumber(customer.MobileNo).subscribe(Customer => {
      console.log(Customer);
      if (Customer) {
        this.SearchedCustomerData = Customer;
        if (this.SearchedCustomerData.data.length > 0) {
          this.DisplayCustomers = "Another Customer Exists: " + this.SearchedCustomerData.data[0].name + " - " + this.SearchedCustomerData.data[0].MobileNo;
        }
        else {
          this.CustomersService_.add(customer).subscribe(addedCustomer => {
            if (addedCustomer) {
              this.customersdata2 = addedCustomer;
              this.customersdata = this.customersdata2.data;
              //poiurewpoiurewconsole.log(this.customersdata);
              this.CustomersDetail.emit(this.customersdata);
              this.close();
              this.loadCustomers();
            }
          })
        }
      }
    }
    );
 
   // alert(this.SearchedCustomerData.data[0].Name);
  

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onCustomerSearch() {
    if (this.myCustomerSearchForm.valid) {
      this.SearchCustomer(this.myCustomerSearchForm.value.MobileNo);
    }
  }
  SearchedCustomerData: any;
  SearchCustomer(MobileNo: string) {
    this.SearchedCustomerData="";
    this.store.dispatch(CustomersActions.getCustomerByMobileNumber({ MobileNo: MobileNo }));
     this.Customersdata$ = this.store.select(state => state.customersReducer_.customers.data);   
    console.log(this.Customersdata$);
    this.Customersdata$?.subscribe(Customer => {
      console.log(Customer);
      if (Customer) {
        
        this.SearchedCustomerData = Customer;
        // console.log( this.SearchedCustomerData.data);
        // console.log( this.SearchedCustomerData.data[0]);
        // console.log( this.SearchedCustomerData.data.length);
        if (this.SearchedCustomerData.length > 0) {
         
          this.DisplayCustomers = this.SearchedCustomerData.data[0].name + " - " + this.SearchedCustomerData.data[0].MobileNo;
         console.log(this.DisplayCustomers);
        
        }
        else
        {
          alert("No Custmer Exists");
        }
      }
    }
    );
  }
  close() {
    this.closePopUpByChild.emit(false);
  }

  onProceed() {
    if (this.SearchedCustomerData && this.SearchedCustomerData.data.length > 0) {
      this.CustomersDetail.emit(this.SearchedCustomerData.data[0]);
      this.close();
    }
  }
}

