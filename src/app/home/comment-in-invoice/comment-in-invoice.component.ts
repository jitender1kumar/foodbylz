import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment,GenratedItemKOT,GenratedItems,KOTsUD } from '../../core/Model/crud.model';
import { Router } from '@angular/router';
import { CommentService } from '../../core/Services/comment.service';
import { Observable } from 'rxjs/internal/Observable';
import { firstValueFrom, take } from 'rxjs';
import { KOTsUDService } from '../../core/Services/KOTsUD.service';
import { KOTrunningordersService } from '../../core/Services/KOTrunningorders.service';
import { ManageService } from '../../core/Services/manage.service';
import { Store } from '@ngrx/store';
import * as GentratedItemsActions from '../../home/homeStore/GentratedItemsStore/GenratedItems.action';
import { updateRunningItemNotes } from '../homeStore/runningItemStore/runningItem.action';

@Component({
  selector: 'app-comment-in-invoice',
  standalone: false,
  templateUrl: './comment-in-invoice.component.html',
  styleUrl: './comment-in-invoice.component.css'
})
export class CommentInInvoiceComponent  implements OnInit{
   @Output() closePopUpByComment = new EventEmitter<boolean>();
  // @Output() loadKOT = new EventEmitter<boolean>();
   
  //  @Output() CustomersDetail = new EventEmitter<Customers>();
DisplayCustomers:string="";
myAddForm!: FormGroup<any>;
show: any;
commentData:any;
commentData2:any;
//runningItems$!: Observable<any>;
// @Input() RunningItems$!: Observable<any>;
@Input() RunningItems$!:any;
@Input() selectSubQuantityTypeID_!: any;
@Input() SelectProductId_!: any;
@Input() RecieptNumber!: number;
@Input() InvoiceDataKOT$?: Observable<any[]> | null = null;
@Input() showPopUp!: boolean;
@Input() closePopUp!: boolean;
@Input() showConfirme!: boolean;
@Input() manageKOTItem:any;
@Input() SearchManagingKOTItems:GenratedItemKOT | undefined;
@Input() CommentType!:string;
KOTsUD: KOTsUD = {
  ItemsID:'',
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
 private ManageService_: ManageService,
 private store: Store<{ runningItemReducer_: any,runningItemKOTReducer_:any,invoiceReducer_:any ,GenratedItemsReducer_:any}>,
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
   // performing update delete in KOTsUD or other
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
        switch (this.CommentType) {
          case "addNotes":
              // Perform update notes in running items via addNotesInRunningItems (ngrx action)
              if (
                this.SelectProductId_ &&
                this.selectSubQuantityTypeID_ &&
                this.RecieptNumber
              ) {
                
                // Dispatch action to update notes for a running item
                const notes = this.myAddForm.get('Comment')?.value || '';
                const id = this.SelectProductId_;
                const selectSubQuantityTypeID = this.selectSubQuantityTypeID_;
                const invoiceid = String(this.RecieptNumber);

                // To avoid trying to mutate a frozen/readonly observable, extract the array value.
                let runningItemData: any[] = [];
                if (this.RunningItems$ && typeof (this.RunningItems$ as any).getValue === 'function') {
                  // BehaviorSubject or ReplaySubject: getValue is available
                  runningItemData = (this.RunningItems$ as any).getValue();
                } else if (
                  this.RunningItems$ && 
                  typeof (this.RunningItems$ as any).subscribe === 'function'
                ) {
                  // Observable: try to get a synchronous value (works if BehaviorSubject hot observable)
                  let tmpVal: any;
                  const sub = (this.RunningItems$ as any).subscribe((v: any) => { tmpVal = v; });
                  if (sub && typeof sub.unsubscribe === 'function') sub.unsubscribe();
                  runningItemData = tmpVal;
                } else if (Array.isArray(this.RunningItems$)) {
                  runningItemData = this.RunningItems$;
                }

                // As a fallback, default to empty array, and always clone (to prevent downstream mutation of Angular's redux state!)
                runningItemData = Array.isArray(runningItemData) 
                  ? runningItemData.map((item: any) => ({...item})) 
                  : [];
                 // alert("notes : "+id+" "+subQuantityTypeName+" "+notes+" "+runningItemData+" "+invoiceid);
                this.store.dispatch(
                  updateRunningItemNotes({
                    id,
                    selectSubQuantityTypeID: selectSubQuantityTypeID,
                    notes,
                    RunningItemData: runningItemData,
                    invoiceid
                  })
                );
              }
              this.RunningItems$ = this.store.select(
                state => state.runningItemReducer_.RunningItems_
              );
              this.RunningItems$.subscribe((data: any)=>{
                console.log(data);
              });
             
              this.closePopUpByComment.emit(true);
              //this.loadKOT.emit();
              // // For "addNotes", update notes in running items by SelectProductId and selectSubQuantityTypeID
              // // Ensure manageKOTItem and SearchManagingKOTItems exist and are properly structured
              // if (
              //   this.manageKOTItem &&
              //   this.SearchManagingKOTItems &&
              //   this.SelectProductId_ &&
              //   this.selectSubQuantityTypeID_
              // ) {
              //   // Update notes in KOTrunningorders data for the running KOT item
              //   const updatedItems = this.ManageService_.updateNotesInRunningItems(
              //     this.SearchManagingKOTItems.KOTrunningorders,
              //     this.SelectProductId_,
              //     this.selectSubQuantityTypeID_,
              //     this.myAddForm.get('Comment')?.value || ''
              //   );
              //   // Type check: only assign if updatedItems is actually an array
              //   if (Array.isArray(updatedItems)) {
              //     this.SearchManagingKOTItems.KOTrunningorders = updatedItems;
              //   } else {
              //     console.error('updateNotesInRunningItems did not return an array:', updatedItems);
              //   }
              //   // If using localStorage, update it as well by RecieptNumber
              //   if (this.RecieptNumber) {
              //     // Get all running items for this RecieptNumber from localStorage
              //     let runningItemsTable: any = localStorage.getItem(String(this.RecieptNumber));
              //     if (runningItemsTable) {
              //       try {
              //         let runningItemsData = JSON.parse(runningItemsTable);
              //         // Update notes in the main running items as well
              //         const newData = this.ManageService_.updateNotesInRunningItems(
              //           runningItemsData,
              //           this.SelectProductId_,
              //           this.selectSubQuantityTypeID_,
              //           this.myAddForm.get('Comment')?.value || ''
              //         );
              //         localStorage.setItem(String(this.RecieptNumber), JSON.stringify(newData));
              //       } catch (e) {
              //         console.error('Failed to parse or update runningItems in localStorage:', e);
              //       }
              //     }
              //   }
              // }
              // this.updateGenratedItemKOT();
            break;
          case "Increment": {
            // Add data KOTrunning item increment data in KOTsUD table
            const response = await firstValueFrom(this.CommentService_.add(comment));
            // Since 'Comment' type does not have '_id', just log response for now
            // Concatenate/increment the 'quntityvalue' field by 1 in this.deleteKOTItem before calling add
            if (this.manageKOTItem && typeof this.manageKOTItem.quntityvalue === 'number') {
              this.manageKOTItem = { ...this.manageKOTItem, quntityvalue: this.manageKOTItem.quntityvalue + 1 };
            }
            console.log('Add comment response:', response);
            this.KOTsUD = {
              ItemsID: this.SearchManagingKOTItems?.ItemsID?.toString() || '',
              RecieptNumber: response?.RecieptNumber || '',
              deletedAt: new Date(),
              CommentId: response?._id || '',
            };
            
            this.addKOTsUD(this.KOTsUD);
            break;
          }
          case "Decrement": {
            const response = await firstValueFrom(this.CommentService_.add(comment));
            // Since 'Comment' type does not have '_id', just log response for now
            // Concatenate/increment the 'quntityvalue' field by 1 in this.deleteKOTItem before calling add
            if (this.manageKOTItem && typeof this.manageKOTItem.quntityvalue === 'number') {
              this.manageKOTItem = { ...this.manageKOTItem, quntityvalue: this.manageKOTItem.quntityvalue - 1 };
            }
            console.log('Add comment response:', response);
            this.KOTsUD = {
              ItemsID: this.SearchManagingKOTItems?.ItemsID?.toString() || '',
              RecieptNumber: response?.RecieptNumber || '',
              deletedAt: new Date(),
              CommentId: response?._id || '',
            };
            this.addKOTsUD(this.KOTsUD);
            break;
          }
          case "Delete": {
            // Add data KOTrunning item deleted data in KOTsUD table
            const response = await firstValueFrom(this.CommentService_.add(comment));
            // Since 'Comment' type does not have '_id', just log response for now
            console.log('Add comment response:', response);
            this.KOTsUD = {
              ItemsID: this.SearchManagingKOTItems?.ItemsID?.toString() || '',
              RecieptNumber: response?.RecieptNumber || '',
              deletedAt: new Date(),
              CommentId: response?._id || ''
            };
            this.addKOTsUD(this.KOTsUD);
            break;
          }
          case "Insert":
            // No action implemented for "Insert"
            break;
          default:
            // Optionally handle unexpected CommentTypes
            break;
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
  async deleteItem(itemId: any) {
    try {
      // Optionally: call a service to delete the item by id (adapt as needed)
      // Example: await firstValueFrom(this.itemsService.delete(itemId));
      this.store.dispatch({
        type: '[RunningItemKOT] Delete Item',
        payload: itemId
      });
      // Optionally emit event or close popup/list refresh
      // this.closePopUpByComment.emit(true);
    } catch (error) {
      alert('Failed to delete item.');
      console.error(error);
    }
  }
  async updateItems(_id:string,items: GenratedItems) {
    // Using ngrx store to dispatch an update for the item
    // Replace 'updateItem' with your actual update action
    console.log(items);
    try {
      this.store.dispatch(GentratedItemsActions.updateGenratedItems({ items:items }));
      // Optionally close popup or refresh list
     // this.closePopUpByComment.emit(true);
    } catch (error) {
      alert('Failed to update item.');
      console.error(error);
    }
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
          this.SearchManagingKOTItems &&
          Array.isArray(this.SearchManagingKOTItems.KOTrunningorders)
        ) {
          this.GenratedItemKOT = this.SearchManagingKOTItems.KOTrunningorders.map((item: any) => {
            if (
              item.SelectProductId === this.manageKOTItem.SelectProductId &&
              item.selectSubQuantityTypeID === this.manageKOTItem.selectSubQuantityTypeID
            ) {
              // Replace with updated deleteKOTItem
              return {
                ...item,
                ...this.manageKOTItem
              };
            }
            return item;
          });

          // Build new GenratedItemKOT object (if needed)
         
        
        try {
          const GenratedItemKOT = {
            ...this.SearchManagingKOTItems,
            _id:this.SearchManagingKOTItems._id ?? '',
            KOTrunningorders: this.GenratedItemKOT,
            EmployeeId: this.SearchManagingKOTItems.EmployeeId ?? '',
            TableId: this.SearchManagingKOTItems.TableId ?? '',
            RecieptNumber: this.SearchManagingKOTItems.RecieptNumber ?? '',
            createdAt: this.SearchManagingKOTItems.createdAt ?? new Date()
          };
         

          console.log(this.GenratedItemKOT);
          await firstValueFrom(this.kOTrunningordersService.update(GenratedItemKOT as GenratedItemKOT));
          console.log('GenratedItemKOT updated successfully (quantity increment).');

         
         
         


          // Refactored: Construct GenratedItems payload with clearer object structure and meaningful defaults
          const GenratedItems: GenratedItems = {
            Items: this.GenratedItemKOT, // Updated KOTrunningorders
            EmployeeId: this.SearchManagingKOTItems?.EmployeeId ?? '',
            TableId: this.SearchManagingKOTItems?.TableId ?? '',
            RecieptNumber: this.SearchManagingKOTItems?.RecieptNumber ?? '',
            _id: this.SearchManagingKOTItems?.ItemsID ?? '',
            createdAt: this.SearchManagingKOTItems?.createdAt ?? new Date()
          };

          // Log for debugging (shows the update payload)
          console.log('Dispatching update for GenratedItems:', GenratedItems);

          // Call the item update function with the new payload
          this.updateItems(this.SearchManagingKOTItems?.ItemsID,GenratedItems as GenratedItems);
        } catch (error) {
          alert('Failed to update GenratedItemKOT.');
          console.error(error);
        }
      }
     
      this.closePopUpByComment.emit(true);
      this.dispatchLoadKOTrunningorders();
      //this.loadKOT.emit();
      }
    
  async deleteGenratedItemKOT() {
   
    // Check if SearchDeletingKOTItems is defined and is an array
    // New logic as per your prior pattern:
    // 1. Filter out the deleted item from the KOTrunningorders
    let updatedKOT = null;
    if (
      this.SearchManagingKOTItems &&
      this.SearchManagingKOTItems.KOTrunningorders &&
      Array.isArray(this.SearchManagingKOTItems.KOTrunningorders)
    ) {
      const filteredOrders = this.SearchManagingKOTItems.KOTrunningorders.filter(
        (item: any) =>
          item.SelectProductId !== this.manageKOTItem.SelectProductId ||
          item.selectSubQuantityTypeID !== this.manageKOTItem.selectSubQuantityTypeID
      );
//console.log(filteredOrders);
      if (filteredOrders.length > 0) {
        // Update KOTrunningorders array in the backend
        // Refactored: Create a new GenratedItemKOT object and update via service.
        try {
          const GenratedItemKOT = {
            ...this.SearchManagingKOTItems,
            KOTrunningorders: filteredOrders ?? [],
            EmployeeId: this.SearchManagingKOTItems.EmployeeId ?? '',
            TableId: this.SearchManagingKOTItems.TableId ?? '',
            RecieptNumber: this.SearchManagingKOTItems.RecieptNumber ?? '',
            createdAt: this.SearchManagingKOTItems.createdAt ?? new Date()
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
            this.kOTrunningordersService.delete(this.SearchManagingKOTItems.RecieptNumber)
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
    //this.loadKOT.emit();
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
