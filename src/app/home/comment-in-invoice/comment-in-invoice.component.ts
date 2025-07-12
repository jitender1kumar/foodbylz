import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customers } from '../../core/Model/crud.model';
import { Router } from '@angular/router';
import { CustomresService } from '../../core/Services/customers.service';

@Component({
  selector: 'app-comment-in-invoice',
  standalone: false,
  templateUrl: './comment-in-invoice.component.html',
  styleUrl: './comment-in-invoice.component.css'
})
export class CommentInInvoiceComponent  implements OnInit{
  @Output() closePopUpByChild = new EventEmitter<boolean>();
   @Output() CustomersDetail = new EventEmitter<Customers>();
DisplayCustomers:string="";
myAddForm!: FormGroup<any>;
show: any;
commentData:any;
commentData2:any;
@Input() showPopUp!: boolean;
@Input() closePopUp!: boolean;
CustomersDetails: any[] = [];
constructor( private router: Router,private formedit: FormBuilder,private CommentService_:CustomresService)
{
 this.myAddForm = this.formedit.group({
       
        RecieptNumber: ['', Validators.required],
        Comment: [''],
                                                                                         
      });
}
  ngOnInit(): void {
    this.loadCustomers();
  } 
loadCustomers() {
  this.CommentService_.get().subscribe((data: Customers[]) => {
    this.commentData2 = data;
    this.commentData = this.commentData2.allTasks;
  });
}
  add(cutomer:Customers): void {                                              
    this.CommentService_.add(cutomer).subscribe(addedCustomer => {
      if (addedCustomer) {
       this.commentData2 = addedCustomer;
    this.commentData = this.commentData2.createdTask;
    //poiurewpoiurewconsole.log(this.customersdata);
    this.CustomersDetail.emit(this.commentData );
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
}
