import { Component, EventEmitter, Output } from '@angular/core';
import { ChairServiceService } from '../../../src/app/core/Services/chairsrunningorders.serivce';
import { Router } from '@angular/router';
import { IChair, IDine, Invoice } from '../../../src/app/core/Model/crud.model';
import { ChairService } from '../../../src/app/core/Services/chair.service';
import { InvoiceService } from '../../../src/app/core/Services/invoice.service';
import { DineService } from '../../../src/app/core/Services/dine.service';
import { DatePipe } from '@angular/common';
import { InitializeInvoice } from '../../../src/app/core/commanFunction/InitializeInvoice.service';

@Component({
    selector: 'app-runningorders',
    templateUrl: './runningorders.component.html',
    styleUrl: './runningorders.component.css',
    providers: [DatePipe],
    standalone: false
})
export class RunningordersComponent {
  chair2:IChair={
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  TokenNumber:number=0;
  invoice:any;
  date: string = '';
  gettoday()
  {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    
    const  createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString()+"Z"
   
    return new Date(createdAt);
  }
  constructor(private router: Router,private chairsrunningorderservice:ChairServiceService,private chairservice:ChairService,private InvoiceService_:InvoiceService,private DineService_:DineService,private datePipe: DatePipe,private InitializeInvoice_:InitializeInvoice)
  {
  //  this.loadbasetype();
  this.invoice = InitializeInvoice_.initializeInvoiceDefault();
  this.loaddine();
  this.loadrunningorder();
  }
  // invoice: Invoice = {
  //   Taxes: [],
  //   Chairs: [],
  //   taxpecentRate: 0,
  //   taxpercentValue: 0,
  //   DiscountId: "",
  //   Discountvalue: 0,
  //   Discountperstage: 0,
  //   AdditionaldiscountAmount: 0,
  //   Totalvaue: 0,
  //   RecieptNumber: 0,
  //   grandtotal: 0,
  //   OrderType: '',
  //   PendingAmount: 0,
  //   PaidAmount: 0,
  //   AmountPaidstatus: false,
  //   Orderstatus: "New Order",
  //   TotalTaxAmount: 0,
  //   TotalItemsAmount: 0,
  //   createdAt: this.gettoday(),
  //   OrderTypeName: "",
  //   paybyId: 'undefined',
  //   table_id: 'undefined',
  //   tablename: 'undefined',
  //   customer_id: 'undefined',
  //   employee_id: 'undefined',
  //   AssistToId: 'String', returnAmount: '',
  //   CommentId: 'undefined',
  //   tokennumber: 0
  // }
  getforinvoiceiddata2:any;
  getforinvoiceiddata:any;
  dine:IDine={
    _id: "undefined",
    name: "undefined",
    description: '',
    status: true,
    floor_id: "undefined",
    employee_id: "undefined"
  }
  dinedata:any;
  dinedata2:any;
  loaddine()
  {
this.DineService_.get().subscribe(
  data=>{
    if(data)
    {
      this.dinedata2 = data;
      this.dinedata = this.dinedata2.allTasks;
    }
  }
);
  }
cancel(arg0: any) {
  
    
  //////alert(arg0);
  this.chairsrunningorderservice.getbyid(arg0).subscribe(data=>{
    if(data)
    {
     // ////alert(arg0);
      this.runningorder2_cancel_by_id = data;
      this.runningorder_cancel_by_id = this.runningorder2_cancel_by_id.allTasks;
//update table status start
//alert("tableid : "+this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);
const inde=this.dinedata.findIndex((Itm: { _id: any; })=>Itm._id == this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);
  this.dine.status=true;
  this.dine._id=this.dinedata[inde]._id;
 // alert(this.dinedata[inde]._id);
this.dine.name=this.dinedata[inde].name;
this.dine.description=this.dinedata[inde].description;
this.dine.floor_id=this.dinedata[inde].floor_id;
  this.DineService_.update(this.dine).subscribe(data => {
    if (data) {
      this.dinedata2 = data;
      this.dinedata = this.dinedata2.allTasks

    }
  })
  
//end

    // ////alert(this.runningorder_cancel_by_id[0].Chairsrunningorder.length);
for(var ii = 0; ii<this.runningorder_cancel_by_id[0].Chairsrunningorder.length;ii++)
{
  this.chair2._id=this.runningorder_cancel_by_id[0].Chairsrunningorder[ii]._id;
  this.chair2.name=this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].name;
  this.chair2.description=this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].description;
  this.chair2.status=true ;
  this.chair2.table_id=this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].table_id;
  this.chair2.chairorderstatus="1";
  this.chairservice.update(this.chair2).subscribe(data2=>
    {
      if(data2)
      {
        ////alert("updated");
      }                                                               
      
    }
    )
}
 
    }
    ////alert(arg0);
    this.chairsrunningorderservice.delete(arg0).subscribe(data2=>{
      if(data2)
      {
        ////alert("deleted");
        this.InvoiceService_.getbyid(arg0).subscribe(data=>{
          if(data)
          {
          
           // alert("working");
            this.getforinvoiceiddata2=data;
            this.getforinvoiceiddata=this.getforinvoiceiddata2.allTasks;
            console.log(this.getforinvoiceiddata);
          //  alert("length: "+this.getforinvoiceiddata.length);
      for(var ii=0;ii<this.getforinvoiceiddata.length;ii++)
      {
      //  alert(this.getforinvoiceiddata[ii].TotalTaxAmount);
        this.invoice = {
          
          Taxes: this.getforinvoiceiddata[ii].Taxes,
          Chairs:this.getforinvoiceiddata[ii].Chairs,
          taxpecentRate: this.getforinvoiceiddata[ii].taxpecentRate,
          taxpercentValue: this.getforinvoiceiddata[ii].taxpercentValue,
          DiscountId: this.getforinvoiceiddata[ii].DiscountId,
          Discountvalue: this.getforinvoiceiddata[ii].Discountvalue,
          Discountperstage: this.getforinvoiceiddata[ii].Discountperstage,
          AdditionaldiscountAmount: this.getforinvoiceiddata[ii].AdditionaldiscountAmount,
          Totalvaue: this.getforinvoiceiddata[ii].Totalvaue,
          grandtotal: this.getforinvoiceiddata[ii].grandtotal,
          RecieptNumber: this.getforinvoiceiddata[ii].RecieptNumber, //this.totalamount + this.discountvalue + d.getDate() + d.getTime() + d.getSeconds(),
          OrderType:this.getforinvoiceiddata[ii].OrderType,
          AmountPaidstatus:this.getforinvoiceiddata[ii].AmountPaidstatus,
          Orderstatus:"Cancelled",
          PaidAmount:this.getforinvoiceiddata[ii].PaidAmount,
          PendingAmount:this.getforinvoiceiddata[ii].PendingAmount,
          TotalTaxAmount:this.getforinvoiceiddata[ii].TotalTaxAmount,
          TotalItemsAmount:this.getforinvoiceiddata[ii].TotalItemsAmount,
          OrderTypeName:this.getforinvoiceiddata[ii].OrderTypeName,
          paybyId:this.getforinvoiceiddata[ii].paybyId,
          table_id: this.getforinvoiceiddata[ii].table_id,
          tablename: this.getforinvoiceiddata[ii].tablename, 
          customer_id: this.getforinvoiceiddata[ii].customer_id,
          employee_id: this.getforinvoiceiddata[ii].employee_id,                                                     
          createdAt:this.getforinvoiceiddata[ii].createdAt,
          AssistToId: this.getforinvoiceiddata[ii].AssistToId ?? '', // Add this line, default to empty string if undefined
          CommentId: this.getforinvoiceiddata[ii].Comment ?? '', // Add this line, default to empty string if undefined
          returnAmount:this.getforinvoiceiddata[ii].returnAmount ?? '',
          tokennumber: this.getforinvoiceiddata[ii].tokennumber
        }
      }
      console.log(this.invoice);
        this.InvoiceService_.update(this.invoice).subscribe(updateddata=>{
          if(updateddata)
          {
            //alert("Updated.");
          }
        })
      
            //alert(this.getforinvoiceiddata[0]._id);
          }
         });
          
        this.loadrunningorder();
      }
    } )
  })

     
}
  @Output() notifyManage3: EventEmitter<string> = new EventEmitter<string>(); 

gotohome(arg0: any,tokennumber:number) {
  this.notifyManage3.emit(arg0+"jsk"+tokennumber);
  //////alert(arg0)
}
  runningorder:any;
  runningorder2:any;
  runningorder_cancel_by_id:any;
  runningorder2_cancel_by_id:any;
 
  loadrunningorder()
  {
    this.chairsrunningorderservice.get().subscribe(data=>{
      if(data)
      {
this.runningorder2 = data;
this.runningorder = this.runningorder2.allTasks;
console.log(this.runningorder);
      }
    })
    
  }
}
