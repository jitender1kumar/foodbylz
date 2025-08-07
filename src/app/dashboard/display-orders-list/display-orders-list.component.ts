import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../core/Services/invoice.service';
import { DatePipe } from '@angular/common';
import { GetOrderDetailsService } from '../../core/commanFunction/getOrderDetails.service';
import { Observable } from 'rxjs';
import { ItemsService } from '../../core/Services/items.service';
import { CustomresService } from '../../core/Services/customers.service';
import { Customers } from '../../core/Model/crud.model';
@Component({
  selector: 'app-display-orders-list',
  templateUrl: './display-orders-list.component.html',
  styleUrl: './display-orders-list.component.css',
  providers: [DatePipe],
  standalone: false
})
export class DisplayOrdersListComponent implements OnInit {
  t_element: any;
  showPopUp = false;
  closePopUp = false;
  EditOrderItems: any;
  EditOrderItems2: any;
  backupstoredataforsearch: any = ""; from_date: string;
  to_date: string;
  EditOrder: any;
  customersRecord: Customers = {
    Name: 'Guest',
    MobileNo: '0000',
    DOB: '0000',
    type: 'undefined',
    tag: 'undefined',
    DueAmount: 0,
    Anniversary: 'undefined',
    Paymentstatus: 0,
    RecieptNumber: 0,
    employee_id: 'undefined'
  }
  ordersdata: any;
  //rowData=ordersdataloaded;
  customeralltask: any;
  customers: any;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];
  colDefs: ColDef[] = [
    { field: "RecieptNumber", maxWidth: 170 },
    ///  { field: "OrderTypeName" ,maxWidth:100},
    { field: "Orderstatus", maxWidth: 100 },
    { field: "createdAt", headerName: "Date", maxWidth: 220 },
    { field: "tablename", headerName: "Table", maxWidth: 100 },
    /// { field: "TotalItemsAmount",maxWidth:140},
    { field: "AmountPaidstatus", headerName: "Paid Status", maxWidth: 120 },
    { field: "Discountperstage", headerName: "Discount(%)", maxWidth: 120 },
    { field: "Totalvaue", headerName: "Tot. Amount", maxWidth: 120 },
    { field: "PaidAmount", headerName: "Paid Amount", maxWidth: 120 },
    { field: "returnAmount", headerName: "Return Amount", maxWidth: 120 },
    { field: "PendingAmount", headerName: "Pending", maxWidth: 100 },
    { field: "grandtotal", headerName: "Grand Total", maxWidth: 120 },
    //  { field: "Delete",cellRenderer:BasetypDeleteButtun},
    { field: "Edit", cellRenderer: BasetypEditButtun, maxWidth: 100 },

  ];
  myEditForm: any;
  currentDateTime: string = "";
  //orderstatus 1 for new order 2 pending 3 running 
  constructor(private invoice: InvoiceService, private router: Router, private formedit: FormBuilder, private datePipe: DatePipe, private GetOrderDetailsService_: GetOrderDetailsService, private ItemsService_: ItemsService, private CustomresService_: CustomresService) {

    this.showPopUp = false;
    this.myEditForm = this.formedit.group({
      RecieptNumber: [""],
      OrderTypeName: [""],
      Orderstatus: [1],
      AmountPaidstatus: [false],
      PendingAmount: [0],
      createdAt: [""],
      TotalItemsAmount: [0],
      Totalvaue: [0],
      Discountvalue: [0],
      Discountperstage: [0],
      grandtotal: [0]


    });
    this.from_date = "0";
    this.to_date = "0";
  }
  ngOnInit(): void {


    // this.loadinvoicedata()                       
    this.loadtoday()
  }
  ordercount = 0;
  totalorderamount = 0;
  totaldiscountamount = 0;
  totalpendingamount = 0;
  getFilteredData() {
    return this.ordersdata.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(this.searchdata.toLowerCase())
      );
    });
  }

  validateto() {
    const todaydate = new Date();
    this.t_element = document.getElementById("t");
    const today = this.datePipe.transform(todaydate, 'yyyy-MM-dd');
    this.t_element.max = today;
    console.log(today);
    console.log(this.from_date);
    this.t_element.min = this.from_date;
    // alert(this.datePipe.transform(todaydate, 'dd-MM-yyyy'));
  }
  validate() {
    const todaydate = new Date();
    this.t_element = document.getElementById("f");
    // this.t_element.min = this.from_date;
    const today = this.datePipe.transform(todaydate, 'yyyy-MM-dd');
    this.t_element.max = today;
    console.log(today);
    console.log(this.to_date);
    // alert(this.datePipe.transform(todaydate, 'dd-MM-yyyy'));
  }

// this.startdate=formattedyesterday+"T00:00:00.000+00:00";
//    this.enddate=formattedyesterday+"T23:59:59.000+00:00";
  todate() {
    //alert(this.to_date);
    console.log(this.to_date);
    if (this.from_date == "0") {
      alert("Please select start date by from calender.");
    }
    else {
      this.GetOrderDetailsService_.getDataByDate(this.from_date+"T00:00:00.000+00:00", this.to_date+"T23:59:59.000+00:00").subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });
    }
  }

  fromdate() {
    console.log(this.from_date);
    //alert(this.from_date);
    if (this.to_date == "0") {

    }
    else {
     this.GetOrderDetailsService_.getDataByDate(this.from_date+"T00:00:00.000+00:00", this.to_date+"T23:59:59.000+00:00").subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });
    }
  }


  searchdata: any;
  findorders() {
    this.ordersdata = this.backupstoredataforsearch;
    this.ordersdata = this.getFilteredData();

  }
  loadtoday() {

    this.GetOrderDetailsService_.loadToday().subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });
    //this.date 
    //  
    // this.gettodaydate();
    // this.getDataByDate(this.startdate,this.enddate);

  }
  initializeDataforBox(ordersdata: any) {
    //alert("Initialize Data for Box");
    this.ordercount = 0;
    this.totalorderamount = 0;
    this.totaldiscountamount = 0;
    this.totalpendingamount = 0;
    this.backupstoredataforsearch = ordersdata;
    if (ordersdata) {
      for (var ii = 0; ii < ordersdata.length; ii++) {
        this.ordercount = ii + 1;
        this.totalorderamount += ordersdata[ii].grandtotal;
        this.totaldiscountamount += ordersdata[ii].Discountvalue;
        this.totalpendingamount += ordersdata[ii].PendingAmount;
      }
    }
  }



  loadyesterday() {
    // this.date =

    this.GetOrderDetailsService_.loadYesterday().subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });
  }
  loadweek() {
    this.GetOrderDetailsService_.loadWeek().subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });

  }
  loadmonth() {
    //this.ordersdata = this.GetOrderDetailsService_.loadMonth();
    //  this.initializeDataforBox(this.ordersdata);   console.log(this.ordersdata);
    this.GetOrderDetailsService_.loadMonth().subscribe(data => {
      this.ordersdata = data;
      this.initializeDataforBox(this.ordersdata);
      console.log(this.ordersdata);
    });
  }

  onCellClick(event: any) {
    //alert(event.colDef.field);
    if (event.colDef.field == 'Delete') {

    }
    if (event.colDef.field == 'Items') {

    }
    if (event.colDef.field == 'Edit') {
      this.showPopUp = true;

      //alert("Items");
      this.EditOrder = event.data;
      this.ItemsService_.getbyid(event.data.RecieptNumber).subscribe(Items => {
        this.EditOrderItems2 = Items;
        this.EditOrderItems = this.EditOrderItems2.allTasks;
      })
      this.customeralltask = "";
      this.customers = "";
      if (event.data.customer_id != 'undefined') {
        this.CustomresService_.getbyid(event.data.customer_id).subscribe(customer => {
          if (customer) {
            // 
            // alert("inside");
            this.customeralltask = customer;
            console.log(this.customeralltask.allTasks);
            if (this.customeralltask.allTasks.length > 0) {
              this.customers = this.customeralltask.allTasks;
              this.customersRecord = {
                Name: this.customers[0].Name,
                MobileNo: this.customers[0].MobileNo,
                DOB: this.customers[0].DOB,
                type: this.customers[0].type,
                tag: this.customers[0].tag,
                DueAmount: this.customers[0].DueAmount,
                Anniversary: this.customers[0].Anniversary,
                Paymentstatus: this.customers[0].Paymentstatus,
                RecieptNumber: this.customers[0].RecieptNumber,
                employee_id: this.customers[0].employee_id
              }
            }


          }

        }
        );
      }
      else {
        //alert("Else block");
        this.customersRecord = {
          Name: 'Guest',
          MobileNo: '0000',
          DOB: '0000',
          type: 'undefined',
          tag: 'undefined',
          DueAmount: event.data.PendingAmount,
          Anniversary: 'undefined',
          Paymentstatus: event.data.AmountPaidstatus,
          RecieptNumber: event.data.RecieptNumber,
          employee_id: event.data.employee_id
        }
        console.log(this.customersRecord);
      }
      // this.myEditForm = this.formedit.group({
      //   RecieptNumber: [event.data.RecieptNumber],
      //   Orderstatus : [event.data.Orderstatus],
      //   AmountPaidstatus: [event.data.AmountPaidstatus],
      //   PendingAmount: [event.data.PendingAmount],
      //   TotalItemsAmount: [event.data.TotalItemsAmount],
      //   Totalvaue: [event.data.Totalvaue],
      //   Discountvalue: [event.data.Discountvalue],
      //   Discountperstage: [event.data.Discountperstage],
      //   grandtotal: [event.data.grandtotal]


      // });
    }

  }
  closePopUpByChild(close: any) {

    this.showPopUp = close;
  }
}
