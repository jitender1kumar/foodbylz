import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customers } from '../../core/Model/crud.model';
import { CustomresService } from '../../core/Services/customers.service';

@Component({
  selector: 'app-addcustomers',
  standalone: false,
  templateUrl: './addcustomers.component.html',
  styleUrl: './addcustomers.component.css',
})
export class AddcustomersComponent implements OnInit{
  @Output() closePopUpByChild = new EventEmitter<boolean>();
   @Output() CustomersDetail = new EventEmitter<Customers>();
DisplayCustomers:string="";
myAddForm!: FormGroup<any>;
show: any;
customersdata:any;
customersdata2:any;
selectedItem: Customers | null = null;
@Input() showPopUp!: boolean;
@Input() closePopUp!: boolean;
CustomersDetails: any[] = [];
constructor( private router: Router,private formedit: FormBuilder,private CustomersService_:CustomresService)
{
 this.myAddForm = this.formedit.group({
       
        Name: ['', Validators.required],
        MobileNo: [''],
        DOB: [''],
        tag: [''],
         DueAmount: [0],
         Anniversary: [''],                                                                                   
      });
}
  ngOnInit(): void {
    this.loadCustomers();
  } 
loadCustomers() {
  this.CustomersService_.get().subscribe((data: Customers[]) => {
    this.customersdata2 = data;
    this.customersdata = this.customersdata2.allTasks;
  });
}
  add(cutomer:Customers): void {                                              
    this.CustomersService_.add(cutomer).subscribe(addedCustomer => {
      if (addedCustomer) {
       this.customersdata2 = addedCustomer;
    this.customersdata = this.customersdata2.createdTask;
    //poiurewpoiurewconsole.log(this.customersdata);
    this.CustomersDetail.emit(this.customersdata );
  this.close();
      }
    })
  
  }
onFormSubmit() {
 if (this.myAddForm.valid) {
    this.add(this.myAddForm.value);
    }
}
close() {
this.closePopUpByChild.emit(false);
}
onSelect(item: any) {
  if (this.selectedItem === item) {
    this.selectedItem = null; // Deselect if the same item is clicked again
  } else {
    this.selectedItem = item; // Select the new item
  }
  ;
  if(this.selectedItem) {
    this.CustomersDetails=[];
this.DisplayCustomers = this.selectedItem.Name + " - " + this.selectedItem.MobileNo;
this.CustomersDetails.push(this.selectedItem);
  }
//   if(this.selectedItem) {
//   this.myAddForm = this.formedit.group({
       
//         Name: [this.selectedItem.Name, Validators.required],
//         MobileNo: [this.selectedItem.MobileNo],
//         DOB: [''],
//         tag: [''],
//          DueAmount: [0],
//          Anniversary: [''],                                                                                   
//       });
//   //alert("Selected Item: " + JSON.stringify(this.selectedItem));
// }
}
onProceed()
{
if(this.CustomersDetails && this.CustomersDetails.length > 0)
{
  this.CustomersDetail.emit(this.CustomersDetails[0]);
  this.close();
}
}
}

