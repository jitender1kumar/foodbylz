import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitializeInvoice } from '../../core/commanFunction/InitializeInvoice.service';
import { InvoiceService } from '../../core/Services/invoice.service';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import  * as InvoiceActions from '../../core/store/invoiceStor/invoice.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CustomerPaymentHistory } from '../../core/Model/crud.model';
import * as CustomerPaymentHistoryActions from '../../home/homeStore/CustomerPaymentHistoryStore/CustomerPaymentHistory.action';
import {KOTsUDService} from '../../core/Services/KOTsUD.service';
import {CommentService} from '../../core/Services/comment.service';

@Component({
  selector: 'app-order-diplay-in-pop-up',
  standalone: false,
  templateUrl: './order-diplay-in-pop-up.component.html',
  styleUrl: './order-diplay-in-pop-up.component.css'
})
export class OrderDiplayInPopUpComponent implements OnInit {
  @Input() customers: any;
  @Input() EditOrderInvoice: any
  EditOrderInvoiceUpdated:any;
  @Input() EditOrderItems: any;
  @Input() closePopUp: any;
  @Input() showPopUp: any;
  //@Input() CustomerPaymentHistory$?:CustomerPaymentHistory[];
  @Input() CustomerPaymentHistory$?: Observable<any[]> | null = null;
  @Output() closePopUpByChild = new EventEmitter<boolean>();
  @Output() ReInitializeEditOrderInvoice = new EventEmitter<string>();
  myEditForm: FormGroup<any>;
  showprint=false;
  invoice: any;
  invoice$?: Observable<any[]>;
  activeTab: 'invoice' | 'payments' | 'kots' = 'invoice';
  CustomerPaymentHistory_:CustomerPaymentHistory={
    CustomerId: '',
    desc: '',
    PaidAt: '',
    PaidAmount: '',
    PendingAmount: '',
    InvoiceId: '',
    EmployeeId: ''
  }
  constructor(private CommentService_:CommentService, private KOTsUDService_:KOTsUDService, private router: Router, private formedit: FormBuilder, private InitializeInvoice_: InitializeInvoice, private InvoiceService_: InvoiceService, private SweetAlert2_: SweetAlert2,private store: Store<{customerPaymentHistoryReducer_:any,invoiceReducer_:any}>) {
    this.invoice = this.InitializeInvoice_.initializeInvoiceDefault();
    this.invoice$ = this.store.select(state => state.invoiceReducer_.invoice.data);
    this.showPopUp = false;
    this.myEditForm = this.formedit.group({
      _id: [''],
      PendingAmount: ['', [Validators.required, Validators.min(0.01)]]
    });
this.CommentData = null;
  }

  ngOnInit(): void {
this.CommentData = null;
  }
  updateInvoice() {

  }
  print()
  {
   
    const invoiceCard = document.getElementById('printable-section-order');
    let printContent = '';
    if (invoiceCard) {
      // Clone the node to manipulate without affecting the original
      const clone = invoiceCard.cloneNode(true) as HTMLElement;
    
      // Remove specific buttons by class or tag
      const buttons = clone.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.remove();
      });
      const forms = clone.querySelectorAll('form');
      forms.forEach(frm => {
        frm.remove();
      });
      const inputs = clone.querySelectorAll('input');
      inputs.forEach(inpt => {
        inpt.remove();
      });
      // Get modified HTML
      printContent = clone.innerHTML;
    
      const WindowPrt = window.open('', '', 'width=600,height=600');
      if (WindowPrt && printContent) {
        WindowPrt.document.writeln('<html><head><title>Print</title></head><body>');
        WindowPrt.document.writeln(printContent);
        WindowPrt.document.writeln('</body></html>');
        WindowPrt.focus();
        WindowPrt.document.close();
        WindowPrt.print();
        WindowPrt.close();
      }
    }
    
  }

  loadInvoice(invoiceId: string): void {
    if (!invoiceId) {
      return;
    }

    this.ReInitializeEditOrderInvoice.emit(invoiceId);
   
  }

  loadCommentByRecieptNumber(reciptNumber: string): void {
    this.CommentData = null;

    if (!reciptNumber) {
      return;
    }

    const commentServiceAny = this.CommentService_ as any;
    const commentByReceipt$ = typeof commentServiceAny.getByRecieptNumber === 'function'
      ? commentServiceAny.getByRecieptNumber(reciptNumber)
      : typeof commentServiceAny.getByReceiptNumber === 'function'
        ? commentServiceAny.getByReceiptNumber(reciptNumber)
        : null;

    if (commentByReceipt$ && typeof commentByReceipt$.subscribe === 'function') {
      commentByReceipt$.subscribe({
        next: (comment: any) => {
          this.CommentData = comment?.data ?? comment ?? null;
        },
        error: () => {
          this.CommentData = null;
        }
      });
      return;
    }

    const commentId = this.EditOrderInvoice?.CommentId;
    if (!commentId) {
      return;
    }

    this.CommentService_
      .getById(commentId)
      .subscribe({
        next: (comment: any) => {
          this.CommentData = comment?.data ?? comment ?? null;
        },
        error: () => {
          this.CommentData = null;
        }
      });
  }

KOTsUD_Data:any;
KOTsUD_Data2:any;
CommentData: any;
MergDataOfCommentAndKOTsUD: any;
  loadKOTOrder(indexNumber: number, itemsID: string): void {
    console.log(indexNumber);
    console.log(itemsID);
    if (indexNumber<0 || !itemsID) {
      return;
    }

    this.KOTsUDService_
      .getKOTsUDByIndexNumberAndItemsID(indexNumber.toString(), itemsID)
      .subscribe({
        next: (orders: any) => {
          const kotOrder = orders?.data ?? orders ?? null;
         // this.KOTsUD_Data = orders;
          this.KOTsUD_Data = kotOrder;
          this.CommentData = null;
console.log(this.KOTsUD_Data);
          const kotOrders = Array.isArray(kotOrder)
            ? kotOrder
            : kotOrder
              ? [kotOrder]
              : [];
          const commentIds = [...new Set(kotOrders
            .map((item: any) => item?.CommentId)
            .filter((id: any) => id))];
console.log(commentIds);
          if (commentIds.length) {
            this.CommentService_
              .getByRecieptNumber(kotOrders[0]?.RecieptNumber)
              .subscribe({
                next: (comment: any) => {
                  const commentData = comment?.data ?? comment ?? null;
                  this.CommentData = Array.isArray(commentData)
                    ? commentData
                    : commentData
                      ? [commentData]
                      : [];
                  console.log(this.CommentData);
                  const comments = this.CommentData;
                  this.MergDataOfCommentAndKOTsUD = kotOrders.map((kotOrder: any) => {
                    const matchingComment = comments.find(
                      (item: any) => item?._id === kotOrder?.CommentId
                    );
                    return matchingComment ? { ...kotOrder, ...matchingComment } : { ...kotOrder };
                  });
                  console.log(this.MergDataOfCommentAndKOTsUD);
                },
                error: () => {
                  this.CommentData = null;
                }
              });
          } else {
            this.MergDataOfCommentAndKOTsUD = kotOrders.map((item: any) => ({ ...item }));
          }
        },
        error: () => {
          this.KOTsUD_Data = null;
         // this.KOTsUD_Data2 = null;
          this.CommentData = null;
        }
      });
  }
  
  onFormEdit() {
    const amount = Number(this.myEditForm.value.PendingAmount);
    const pendingAmount = Number(this.EditOrderInvoice?.PendingAmount);

    if (this.myEditForm.invalid || !Number.isFinite(amount) || amount <= 0 || amount > pendingAmount) {
      return;
    }

    if (this.EditOrderInvoice) {
      this.invoice = {
        Taxes: this.EditOrderInvoice.Taxes,
        Chairs: this.EditOrderInvoice.Chairs,
        taxpecentRate: this.EditOrderInvoice.taxpecentRate,
        taxpercentValue: this.EditOrderInvoice.taxpercentValue,
        DiscountId: this.EditOrderInvoice.DiscountId,
        Discountvalue: this.EditOrderInvoice.Discountvalue,
        Discountperstage: this.EditOrderInvoice.Discountperstage,
        AdditionaldiscountAmount: this.EditOrderInvoice.AdditionaldiscountAmount,
        Totalvaue: this.EditOrderInvoice.Totalvaue,
        RecieptNumber: this.EditOrderInvoice.RecieptNumber,
        grandtotal: this.EditOrderInvoice.grandtotal,
        OrderType: this.EditOrderInvoice.OrderType,
        PendingAmount: pendingAmount - amount,
        PaidAmount: Number(this.EditOrderInvoice.PaidAmount || 0) + amount,
        AmountPaidstatus: (pendingAmount - amount) === 0 ? true : this.EditOrderInvoice.AmountPaidstatus,
        Orderstatus: this.EditOrderInvoice.Orderstatus,
        TotalTaxAmount: this.EditOrderInvoice.TotalTaxAmount,
        TotalItemsAmount: this.EditOrderInvoice.TotalItemsAmount,
       // createdAt: this.InitializeInvoice_.gettoday(),
        OrderTypeName: this.EditOrderInvoice.OrderTypeName,
        paybyId: this.EditOrderInvoice.paybyId,
        table_id: this.EditOrderInvoice.table_id,
        tablename: this.EditOrderInvoice.tablename,
        customer_id: this.EditOrderInvoice.customer_id,
        employee_id: this.EditOrderInvoice.employee_id,
        AssistToId: this.EditOrderInvoice.AssistToId,
        CommentId: this.EditOrderInvoice.CommentId, returnAmount: this.EditOrderInvoice.returnAmount,

      }
      this.store.dispatch(InvoiceActions.updateInvoice({invoice:this.invoice}));

this.CustomerPaymentHistory_ = {
        CustomerId: this.EditOrderInvoice.customer_id,
        desc: `Payment received for invoice ${this.EditOrderInvoice.RecieptNumber}`,
        PaidAt: new Date().toDateString(),
        PaidAmount: amount.toString(),
        PendingAmount: (+pendingAmount - (+amount)).toString(),
        InvoiceId: this.EditOrderInvoice.RecieptNumber,
        EmployeeId: this.EditOrderInvoice.employee_id
      };
      this.store.dispatch(CustomerPaymentHistoryActions.addCustomerPaymentHistory(this.CustomerPaymentHistory_));

      // this.InvoiceService_.update(this.invoice).subscribe(success => {
      //   if (success) {
      //     this.EditOrderInvoiceUpdated=success;
      //    // this.EditOrderInvoice=this.EditOrderInvoiceUpdated.data;
          this.ReInitializeEditOrderInvoice.emit(this.EditOrderInvoice.RecieptNumber);
      //     this.SweetAlert2_.showFancyAlertSuccess("Updated.");
      //   }
      // });
      //alert(this.myEditForm.value.PendingAmount);
      
    }
    this.myEditForm.reset({
      _id: '',
      PendingAmount: ''
    });
  }
  
  close() {
    console.log(this.EditOrderInvoice);
    console.log(this.EditOrderItems);
    this.closePopUpByChild.emit(false);
    //this.showPopUp = false;
  }
}
