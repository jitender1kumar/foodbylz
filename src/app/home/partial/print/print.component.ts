import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-print',
  standalone: false,
  templateUrl: './print.component.html',
  styleUrl: './print.component.css',
})
export class PrintComponent implements OnInit {
  @Output() closePopUpByPrint = new EventEmitter<boolean>();
  @Input() invoiceid="";
   @Input() addOnProducts!: any[];
  @Input() showKot_PrintPop: boolean | undefined;
  @Input() showBill_PrintPop: boolean | undefined;
  @Input() printrunningItemsArr: any[] = [];
  @Input() KOTItemsdata: any[] = [];
  @Input() genratedInvoice: any;
constructor()
{

}
  ngOnInit(): void {
   console.log(this.printrunningItemsArr)
  }
  close() {
    console.log("working: ",this.printrunningItemsArr);
    this.closePopUpByPrint.emit();
  }

  printBill(): void {
      const invoiceCard = document.getElementsByClassName('print-card bill-print').item(0);
    if (invoiceCard) {
      const clone = invoiceCard.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('button, form, .item-header').forEach(node => node.remove());
      const printContent = clone.innerHTML;
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
  
}
