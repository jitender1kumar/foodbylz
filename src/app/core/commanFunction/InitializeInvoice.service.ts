import { Invoice, IChair, ITax } from "../../core/Model/crud.model";
import { DatePipe } from "@angular/common";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',

})
export class InitializeInvoice {
    datecurrent: any;
    date: any;
    ichar: IChair[] = [];
    itaxarr: ITax[] = [{ id: "", name: "", percentt: 0, amount: 0, productid: "", productname: "" }];
invoice: Invoice = {
    Taxes: this.itaxarr,
    Chairs: this.ichar,
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: "",
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    RecieptNumber: 0,
    grandtotal: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: "New Order",
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    createdAt: this.gettoday(),
    OrderTypeName: "",
    paybyId: 'undefined',
    table_id: 'undefined',
    tablename: 'Pick Up',
    customer_id: 'undefined',
    employee_id: "undefined",
    AssistToId: 'undefined',
    CommentId: 'undefined',
    returnAmount: '',
    tokennumber: 0
}
    constructor(private datePipe: DatePipe) {
this.datecurrent=this.gettoday();
    }
    initializeInvoiceDefault() {
        this.invoice = {
            Taxes: this.itaxarr,
            Chairs: this.ichar,
            taxpecentRate: 0,
            taxpercentValue: 0,
            DiscountId: "",
            Discountvalue: 0,
            Discountperstage: 0,
            AdditionaldiscountAmount: 0,
            Totalvaue: 0,
            RecieptNumber: 0,
            grandtotal: 0,
            OrderType: '',
            PendingAmount: 0,
            PaidAmount: 0,
            AmountPaidstatus: false,
            Orderstatus: "New Order",
            TotalTaxAmount: 0,
            TotalItemsAmount: 0,
            createdAt: this.gettoday(),
            OrderTypeName: "",
            paybyId: 'undefined',
            table_id: 'undefined',
            tablename: 'Pick Up',
            customer_id: 'undefined',
            employee_id: "undefined",
            AssistToId: 'undefined',
            CommentId: 'undefined', returnAmount: '',
            tokennumber: 0
        }
    }
    initializeInvoice(Orderstatus:string,employee_id:string,pickupinvoiceid:number) {
        this.invoice = {
            Taxes: this.itaxarr,
            Chairs: this.ichar,
            taxpecentRate: 0,
            taxpercentValue: 0,
            DiscountId: "",
            Discountvalue: 0,
            Discountperstage: 0,
            AdditionaldiscountAmount: 0,
            Totalvaue: 0,
            RecieptNumber: pickupinvoiceid,
            grandtotal: 0,
            OrderType: '',
            PendingAmount: 0,
            PaidAmount: 0,
            AmountPaidstatus: false,
            Orderstatus: Orderstatus,
            TotalTaxAmount: 0,
            TotalItemsAmount: 0,
            createdAt: this.gettoday(),
            OrderTypeName: "",
            paybyId: 'undefined',
            table_id: 'undefined',
            tablename: 'Pick Up',
            customer_id: 'undefined',
            employee_id: employee_id,
            AssistToId: 'undefined',
            CommentId: 'undefined', returnAmount: '',
            tokennumber: 0
        }
    }
initializeInvoiceData(InitializeInvoiceData:Invoice) {
        this.invoice = {
            Taxes: InitializeInvoiceData.Taxes,
            Chairs: InitializeInvoiceData.Chairs,
            taxpecentRate: InitializeInvoiceData.taxpecentRate,
            taxpercentValue: InitializeInvoiceData.taxpercentValue,
            DiscountId: InitializeInvoiceData.DiscountId,
            Discountvalue: InitializeInvoiceData.Discountvalue,
            Discountperstage: InitializeInvoiceData.Discountperstage,
            AdditionaldiscountAmount: InitializeInvoiceData.AdditionaldiscountAmount,
            Totalvaue: InitializeInvoiceData.Totalvaue,
            RecieptNumber: InitializeInvoiceData.RecieptNumber,
            grandtotal: InitializeInvoiceData.grandtotal,
            OrderType: InitializeInvoiceData.OrderType,
            PendingAmount: InitializeInvoiceData.PendingAmount,
            PaidAmount: InitializeInvoiceData.PaidAmount,
            AmountPaidstatus: InitializeInvoiceData.AmountPaidstatus,
            Orderstatus: InitializeInvoiceData.Orderstatus,
            TotalTaxAmount: InitializeInvoiceData.TotalTaxAmount,
            TotalItemsAmount: InitializeInvoiceData.TotalItemsAmount,
            createdAt: this.gettoday(),
            OrderTypeName: InitializeInvoiceData.OrderTypeName,
            paybyId: InitializeInvoiceData.paybyId,
            table_id: InitializeInvoiceData.table_id,
            tablename: InitializeInvoiceData.tablename,
            customer_id: InitializeInvoiceData.customer_id,
            employee_id: InitializeInvoiceData.employee_id,
            AssistToId: InitializeInvoiceData.AssistToId,
            CommentId: InitializeInvoiceData.CommentId,
         returnAmount:InitializeInvoiceData.returnAmount,
         tokennumber: 0
        }
    }
    gettoday(): Date {

        
        return new Date();
    }
}