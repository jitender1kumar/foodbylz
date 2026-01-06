import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment,GenratedItemKOT,KOTsUD } from '../../core/Model/crud.model';
import { Router } from '@angular/router';
import { CommentService } from '../../core/Services/comment.service';
import { Observable } from 'rxjs/internal/Observable';
import { firstValueFrom } from 'rxjs';
import { KOTsUDService } from '../../core/Services/KOTsUD.service';
import { KOTrunningordersService } from '../../core/Services/KOTrunningorders.service';
import { ManageService } from '../../core/Services/manage.service';
@Component({
  selector: 'app-comment-in-invoice',
  standalone: false,
  templateUrl: './comment-in-invoice.component.html',
  styleUrl: './comment-in-invoice.component.css'
})
export class CommentInInvoiceComponent  implements OnInit{
   @Output() closePopUpByComment = new EventEmitter<boolean>();
  //  @Output() CustomersDetail = new EventEmitter<Customers>();
DisplayCustomers:string="";
myAddForm!: FormGroup<any>;
show: any;
commentData:any;
commentData2:any;
runningItems$!: Observable<any>;
@Input() RecieptNumber!: number;
@Input() InvoiceDataKOT$?: Observable<any[]> | null = null;
@Input() showPopUp!: boolean;
@Input() closePopUp!: boolean;
@Input() showConfirme!: boolean;
@Input() deleteKOTItem:any;
@Input() SearchDeletingKOTItems:GenratedItemKOT | undefined;
@Input() CommentType!:string;
KOTsUD: KOTsUD = {
  KOTsUD: { type: {} },
  RecieptNumber: '',
  deletedAt: undefined as any,
  CommentId: ''
};
// GenratedItemKOT: GenratedItemKOT = {
//   EmployeeId: '',
//   TableId: '',
//   RecieptNumber: '',
//   createdAt: new Date(),
//   KOTrunningorders: []
// };

CustomersDetails: any[] = [];
constructor( 
  private router: Router,
  private formedit: FormBuilder,
  private CommentService_: CommentService,
  private kotsUDService: KOTsUDService,
  private kOTrunningordersService: KOTrunningordersService,
 private ManageService_:ManageService
)
{
 
 // alert("cc "+this.RecieptNumber);
 this.myAddForm = this.formedit.group({
   RecieptNumber: [{ value: this.RecieptNumber || 0, disabled: true }, Validators.required],
   Comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
 });
}
  ngOnInit(): void {
   // this.loadCustomers();
  // alert("cng "+this.RecieptNumber);
   this.myAddForm = this.formedit.group({
    RecieptNumber: [{ value: this.RecieptNumber || 0, disabled: true }, Validators.required],
    Comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
  });
  } 

  async addComment() {
   
    if (this.myAddForm.valid) {
      const comment: Comment = {
        RecieptNumber: String(this.RecieptNumber), // Ensure RecieptNumber is a string
        Comment: this.myAddForm.get('Comment')?.value || '',
        _id: '',
        CommentType: this.CommentType
      };

      try {
        // Assuming you have a CommentService injected as 'CommentService_'
        // and it has an 'add' method that returns an observable
        // Call the CommentService to add the comment and handle the response accordingly
        if(this.CommentType==="Increment")
        {
          // Add data KOTrunning item increment data in KOTsUD table
          const response = await firstValueFrom(this.CommentService_.add(comment));
          // Since 'Comment' type does not have '_id', just log response for now
          // Concatenate/increment the 'quntityvalue' field by 1 in this.deleteKOTItem before calling add
          if (this.deleteKOTItem && typeof this.deleteKOTItem.quntityvalue === 'number') {
            this.deleteKOTItem = { ...this.deleteKOTItem, quntityvalue: this.deleteKOTItem.quntityvalue + 1 };
          }
          console.log('Add comment response:', response);
          this.KOTsUD = {
            KOTsUD: this.deleteKOTItem,
            RecieptNumber: response?.RecieptNumber || '',
            deletedAt: new Date(),
            CommentId: response?._id || '',
           
          };
          this.addKOTsUD(this.KOTsUD);
        }
        else if(this.CommentType==="Decrement")
          {
            const response = await firstValueFrom(this.CommentService_.add(comment));
          // Since 'Comment' type does not have '_id', just log response for now
          // Concatenate/increment the 'quntityvalue' field by 1 in this.deleteKOTItem before calling add
          if (this.deleteKOTItem && typeof this.deleteKOTItem.quntityvalue === 'number') {
            this.deleteKOTItem = { ...this.deleteKOTItem, quntityvalue: this.deleteKOTItem.quntityvalue - 1 };
          }
          console.log('Add comment response:', response);
          this.KOTsUD = {
            KOTsUD: this.deleteKOTItem,
            RecieptNumber: response?.RecieptNumber || '',
            deletedAt: new Date(),
            CommentId: response?._id || '',
           
          };
          this.addKOTsUD(this.KOTsUD);
          }
        else if(this.CommentType==="Delete")
        {
          // Add data KOTrunning item deleted data in KOTsUD table
          const response = await firstValueFrom(this.CommentService_.add(comment));
          // Since 'Comment' type does not have '_id', just log response for now
          console.log('Add comment response:', response);
          this.KOTsUD = {
            KOTsUD: this.deleteKOTItem,
            RecieptNumber: response?.RecieptNumber || '',
            deletedAt: new Date(),
            CommentId: response?._id || ''
          };
          this.addKOTsUD(this.KOTsUD);
        }
        else if(this.CommentType==="Insert")
          {
  
          }
       
        // alert('Comment added successfully!');
        // this.closePopUpByComment.emit(true);
      } catch (error) {
        alert('Failed to add comment.');
        console.error(error);
      }
    } else {
      alert('Form invalid!');
    }
  }
  async addKOTsUD(kotsudData: any) {
    // Assuming you have a KOTsUDService injected as 'kotsUDService'
    try {
      const response = await firstValueFrom(this.kotsUDService.createKOTsUD(kotsudData));
      console.log('KOTsUD added successfully:', response);
      if(this.CommentType==="Increment")
        {
          this.updateGenratedItemKOT();
        }
       else if(this.CommentType==="Decrement")
          {
            this.updateGenratedItemKOT();
          }
        else if(this.CommentType==="Delete")
          {
            this.deleteGenratedItemKOT();
          }
         
          else if(this.CommentType==="Insert")
            {
              this.updateInvoice();
            }
      // Optionally, you may want to emit an event or close popup here
    } catch (error) {
      alert('Failed to add KOTsUD.');
      console.error(error);
    }
  }
  async updateInvoice()
  {

  }
  GenratedItemKOT:any;
  async updateGenratedItemKOT()
  {
    // Streamlined update of KOT quantity and save logic with truly updated object

       // this.SearchDeletingKOTItems.KOTrunningorders = updatedKOTrunningorders;

        // Build new GenratedItemKOT object
        // Replace the item in KOTrunningorders with updated this.deleteKOTItem
         this.GenratedItemKOT = [];
        if (
          this.SearchDeletingKOTItems &&
          Array.isArray(this.SearchDeletingKOTItems.KOTrunningorders)
        ) {
          this.GenratedItemKOT = this.SearchDeletingKOTItems.KOTrunningorders.map((item: any) => {
            if (
              item.SelectProductId === this.deleteKOTItem.SelectProductId &&
              item.selectSubQuantityTypeID === this.deleteKOTItem.selectSubQuantityTypeID
            ) {
              // Replace with updated deleteKOTItem
              return {
                ...item,
                ...this.deleteKOTItem
              };
            }
            return item;
          });

          // Build new GenratedItemKOT object (if needed)
         
        
        try {
          const GenratedItemKOT = {
            ...this.SearchDeletingKOTItems,
            KOTrunningorders: this.GenratedItemKOT,
            EmployeeId: this.SearchDeletingKOTItems.EmployeeId ?? '',
            TableId: this.SearchDeletingKOTItems.TableId ?? '',
            RecieptNumber: this.SearchDeletingKOTItems.RecieptNumber ?? '',
            createdAt: this.SearchDeletingKOTItems.createdAt ?? new Date()
          };
          console.log(this.GenratedItemKOT);
          await firstValueFrom(this.kOTrunningordersService.update(GenratedItemKOT as GenratedItemKOT));
          console.log('GenratedItemKOT updated successfully (quantity increment).');
          this.dispatchLoadKOTrunningorders();
        } catch (error) {
          alert('Failed to update GenratedItemKOT.');
          console.error(error);
        }
      }
      this.closePopUpByComment.emit(true);
      }
    
  async deleteGenratedItemKOT() {
   
    // Check if SearchDeletingKOTItems is defined and is an array
    // New logic as per your prior pattern:
    // 1. Filter out the deleted item from the KOTrunningorders
    let updatedKOT = null;
    if (
      this.SearchDeletingKOTItems &&
      this.SearchDeletingKOTItems.KOTrunningorders &&
      Array.isArray(this.SearchDeletingKOTItems.KOTrunningorders)
    ) {
      const filteredOrders = this.SearchDeletingKOTItems.KOTrunningorders.filter(
        (item: any) =>
          item.SelectProductId !== this.deleteKOTItem.SelectProductId ||
          item.selectSubQuantityTypeID !== this.deleteKOTItem.selectSubQuantityTypeID
      );
//console.log(filteredOrders);
      if (filteredOrders.length > 0) {
        // Update KOTrunningorders array in the backend
        // Refactored: Create a new GenratedItemKOT object and update via service.
        try {
          const GenratedItemKOT = {
            ...this.SearchDeletingKOTItems,
            KOTrunningorders: filteredOrders ?? [],
            EmployeeId: this.SearchDeletingKOTItems.EmployeeId ?? '',
            TableId: this.SearchDeletingKOTItems.TableId ?? '',
            RecieptNumber: this.SearchDeletingKOTItems.RecieptNumber ?? '',
            createdAt: this.SearchDeletingKOTItems.createdAt ?? new Date()
          };
          console.log('Updating GenratedItemKOT:', GenratedItemKOT);
          await firstValueFrom(this.kOTrunningordersService.update(GenratedItemKOT));
          console.log('GenratedItemKOT updated successfully.');
          this.dispatchLoadKOTrunningorders();
        } catch (error) {
          alert('Failed to update GenratedItemKOT.');
          console.error(error);
        }
      } else {
        // No items left: delete the KOT entry in the backend by its _id
        try {
          await firstValueFrom(
            this.kOTrunningordersService.delete(this.SearchDeletingKOTItems.RecieptNumber)
          );
          this.dispatchLoadKOTrunningorders();
          console.log('GenratedItemKOT deleted successfully.');
        } catch (error) {
          alert('Failed to delete GenratedItemKOT.');
          console.error(error);
        }
      }
    } else {
      alert('No valid KOT running orders found for deletion/update.');
    }
    this.closePopUpByComment.emit(true);

  }
  dispatchLoadKOTrunningorders() {
    this.ManageService_.loadRunningKOT();
  }
  async confirmeKOTUpdatation()
  {
   
    await this.addComment();

    // let invoiceDataKOT = null;
    // if (this.InvoiceDataKOT$) {
    //   invoiceDataKOT = await firstValueFrom(this.InvoiceDataKOT$ ?? new Observable());
    // }
   // console.log(this.InvoiceDataKOT$);
    // console.log(this.deleteKOTItem);
    //  console.log(this.SearchDeletingKOTItems);
   // alert("Confirmed");
  }
onFormSubmit() {
 if (this.myAddForm.valid) {
   // this.add(this.myAddForm.value);
    //alert("Added");
    }
}
close() {
this.closePopUpByComment.emit(false);
}
}
