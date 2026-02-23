import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-partpayment',
  standalone: false,
  templateUrl: './partpayment.component.html',
  styleUrl: './partpayment.component.css',
})
export class PartpaymentComponent implements OnInit{

// INSERT_YOUR_CODE
@Input() closePopUp!: any;
@Input() showPopUp!: any;
@Input() itemtotalamount!:any;
@Input() paybydata!:any;
@Output() closePopUpByChildPartPayment = new EventEmitter<boolean>();
// Properties that match the template
ngOnInit(): void {
 console.log(this.paybydata);
}
// State for part payment form (manages two pay modes/amounts)
// State for form: holds selected pay modes and their entered amounts

partPay: {
  payMode1?: string;
  amount1?: number;
  payMode2?: string;
  amount2?: number;
} = {};

paymentRemark: string = '';

partPayments: {
  amount: number;
  mode: string;
  remarks?: string;
  date: Date;
}[] = [];

remainingAmount: number = 0;

// Called when user submits the part payment form
onPartPaySubmit(): void {
  this.partPayments=[];
  const amount1 = Number(this.partPay.amount1) || 0;
  const amount2 = Number(this.partPay.amount2) || 0;
  const totalBill = Number(this.itemtotalamount) || 0;

  // Validate required fields and business logic
  const isPayMode1Selected = !!this.partPay.payMode1;
  const isPayMode2Selected = !!this.partPay.payMode2;
  const isAmount1Valid = amount1 > 0;
  const arePayModesDistinct = this.partPay.payMode1 !== this.partPay.payMode2;
  const isTotalCorrect = (amount1 + amount2) === totalBill;

  if (
    !isPayMode1Selected ||
    !isPayMode2Selected ||
    !isAmount1Valid ||
    !arePayModesDistinct ||
    !isTotalCorrect
  ) {
    return;
  }

  const remark = this.paymentRemark || '';
  const paymentDate = new Date();

  this.partPayments.push({
    amount: amount1,
    mode: this.getPayModeName(this.partPay.payMode1 ?? ''),
    remarks: remark,
    date: paymentDate
  });

  if (amount2 > 0) {
    this.partPayments.push({
      amount: amount2,
      mode: this.getPayModeName(this.partPay.payMode2 ?? ''),
      remarks: remark,
      date: paymentDate
    });
  }

  this.partPay = {};
  this.paymentRemark = '';
  this.updateRemainingAmount();
}

// Used by the cancel button in the template
close() {
  this.closePopUpByChildPartPayment.emit(false);
}

// Calculate the outstanding amount for display
updateRemainingAmount() {
  const paid = this.partPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  this.remainingAmount = Math.max((+this.itemtotalamount || 0) - paid, 0);
}

// Helper to get payment mode name from ID (as used in template)
getPayModeName(modeId: string): string {
  if (!this.paybydata) return '';
  const found = this.paybydata.find((d: any) => d._id === modeId);
  return found ? found.name : modeId;
}


}
