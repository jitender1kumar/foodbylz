import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InitializeInvoice } from '../../core/commanFunction/InitializeInvoice.service';
import { InvoiceService } from '../../core/Services/invoice.service';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import  * as InvoiceActions from '../../core/store/invoiceStor/invoice.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
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
  @Output() closePopUpByChild = new EventEmitter<boolean>();
  @Output() ReInitializeEditOrderInvoice = new EventEmitter<boolean>();
  myEditForm: FormGroup<any>;
  showprint=false;
  invoice: any;
  invoice$?: Observable<any[]>;
  constructor(private router: Router, private formedit: FormBuilder, private InitializeInvoice_: InitializeInvoice, private InvoiceService_: InvoiceService, private SweetAlert2_: SweetAlert2,private store: Store<{invoiceReducer_:any}>) {
    this.invoice = this.InitializeInvoice_.initializeInvoiceDefault();
    this.invoice$ = this.store.select(state => state.invoiceReducer_.invoice.data);
    this.showPopUp = false;
    this.myEditForm = this.formedit.group({
      _id: [''],
      PendingAmount: ['']
    });

  }
  ngOnInit(): void {

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
  
  onFormEdit() {

    if (this.myEditForm.value.PendingAmount) {
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
        PendingAmount: (this.EditOrderInvoice.PendingAmount) - this.myEditForm.value.PendingAmount,
        PaidAmount: this.EditOrderInvoice.PaidAmount + this.myEditForm.value.PendingAmount,
        AmountPaidstatus: ((this.EditOrderInvoice.PendingAmount) - this.myEditForm.value.PendingAmount) == 0 ? true : this.EditOrderInvoice.AmountPaidstatus,
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

  }
  close() {
    console.log(this.EditOrderInvoice);
    console.log(this.EditOrderItems);
    this.closePopUpByChild.emit(false);
    //this.showPopUp = false;
  }
}
