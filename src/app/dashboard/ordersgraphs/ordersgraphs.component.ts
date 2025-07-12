import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../core/Services/invoice.service';
import { PaybyService } from '../../core/Services/paybymanage.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GetOrderDetailsService } from '../../core/commanFunction/getOrderDetails.service';

@Component({
    selector: 'app-ordersgraphs',
    templateUrl: './ordersgraphs.component.html',
    styleUrl: './ordersgraphs.component.css',
    standalone: false
})
export class OrdersgraphsComponent implements OnInit {
  [x: string]: any;
  byday: string = "";
  payByChartrecordTotalAmount = 0;
  t_element: any;
  backupstoredataforsearch: any = ""; from_date: string;
  to_date: string;
graphDayOrders:string="Today";
  ordersdata: any;
  //rowData=ordersdataloaded;
  payByChartrecord: any = [];
  graphRecord: any = [];
  RecordByPaybyId: any
  payByListsRecord: any;
  payByListsRecord2: any;
  currentDateTime: string = "";
  //orderstatus 1 for new order 2 pending 3 running 
  constructor(private invoice: InvoiceService, private router: Router, private datePipe: DatePipe, private GetOrderDetailsService_: GetOrderDetailsService, private PaybyService_: PaybyService) {



    this.from_date = "0";
    this.to_date = "0";
  }
  ngOnInit(): void {


    // this.loadinvoicedata() 
    this.getPayBy();
    this.loadtoday("pie");
    this.loadtoday("graph");
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
  loadday(byday: any) {
    //byday();
    const pie = "pie";
    if (byday == "loadtoday") this.loadtoday(pie);
    else if (byday == "loadyesterday") this.loadyesterday(pie);
    else if (byday == "loadweek") this.loadweek(pie);
    else if (byday == "loadmonth") this.loadmonth(pie);
    //alert(byday);
  }
  getPayBy() {
    this.payByChartrecord = [];
    this.PaybyService_.get().subscribe(PayByLists => {
      this.payByListsRecord2 = PayByLists;
      this.payByListsRecord = this.payByListsRecord2.allTasks;
      this.payByChartrecord.push({
        "_id": "001Pending",
        "Paybyname": "Due",
        "Amount": 0
      });
      for (let i = 0; i < this.payByListsRecord.length; i++) {
        this.payByChartrecord.push({
          "_id": this.payByListsRecord[i]._id,
          "Paybyname": this.payByListsRecord[i].Paybyname,
          "Amount": 0
        });
      }
    })
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


  todate() {
    //alert(this.to_date);
    if (this.from_date == "0") {
      alert("Please select start date by from calender.");
    }
    else {
      this.GetOrderDetailsService_.getDataByDate(this.from_date, this.to_date);
    }
  }

  fromdate() {
    //alert(this.from_date);
    if (this.to_date == "0") {

    }
    else {
      this.GetOrderDetailsService_.getDataByDate(this.from_date, this.to_date);
    }
  }


  searchdata: any;
  findorders() {
    this.ordersdata = this.backupstoredataforsearch;
    this.ordersdata = this.getFilteredData();

  }
  loadtoday(loadName: string) {
    this.GetOrderDetailsService_.loadToday().subscribe(data => {
      this.ordersdata = data;
      if (loadName == "pie")
        this.initializeDataPayByPieChart(this.ordersdata);
      else if (loadName == "graph") {
         this.initializeGraphsForTime(this.ordersdata);
         this.graphDayOrders="Today";
      }
    });

  }


  loadyesterday(loadName: string) {
    // this.date =

    this.GetOrderDetailsService_.loadYesterday().subscribe(data => {
      this.ordersdata = data;
      if (loadName == "pie")
        this.initializeDataPayByPieChart(this.ordersdata);
      else if (loadName == "graph") {
         this.initializeGraphsForTime(this.ordersdata);
         this.graphDayOrders="Yesderday";
      }
      // console.log(this.ordersdata);
    });
  }
  loadweek(loadName: string) {
    this.GetOrderDetailsService_.loadWeek().subscribe(data => {
      this.ordersdata = data;
      if (loadName == "pie")
        this.initializeDataPayByPieChart(this.ordersdata);
      else if (loadName == "graph") {
         this.initializeGraphsForTime(this.ordersdata);
         this.graphDayOrders="Week";
      }
      //  console.log(this.ordersdata);
    });

  }
  loadmonth(loadName: string) {
    //this.ordersdata = this.GetOrderDetailsService_.loadMonth();
    //  this.initializeDataforBox(this.ordersdata);   console.log(this.ordersdata);
    this.GetOrderDetailsService_.loadMonth().subscribe(data => {
      this.ordersdata = data;
      if (loadName == "pie")
        this.initializeDataPayByPieChart(this.ordersdata);
      else if (loadName == "graph"){
         this.initializeGraphsForTime(this.ordersdata);
         this.graphDayOrders="Month";
      }
      //  console.log(this.ordersdata);
    });
  }

  initializeDataPayByPieChart(ordersdata: any) {
    // 
    this.payByChartrecordTotalAmount = 0;
    //alert(this.payByChartrecord.length);
    console.log(this.payByChartrecord.length);
    for (var j = 0; j < this.payByChartrecord.length; j++) {

      this.payByChartrecord[j].Amount = 0;
      // Resetting the amount for each payby
    }

    console.log(ordersdata.length);
    if (ordersdata) {
      // this.getPayBy();
      for (var i = 1; i < this.payByChartrecord.length; i++) {
        // alert(this.payByChartrecord.length);
        for (let ii = 0; ii < ordersdata.length; ii++) {
          //cofirming that paybymanageid is equal to assign amount
          if (ordersdata[ii].paybyId == this.payByChartrecord[i]._id) {
            console.log(this.RecordByPaybyId);
            this.payByChartrecord[i].Amount = this.payByChartrecord[i].Amount + ordersdata[ii].PaidAmount;
            //below for pending amount
            this.payByChartrecord[0].Amount = this.payByChartrecord[0].Amount + ordersdata[ii].PendingAmount;
          }
        }

      }
      for (let i = 0; i < this.payByChartrecord.length; i++) {
        this.payByChartrecordTotalAmount += this.payByChartrecord[i].Amount;
      }

    }
    console.log(this.payByChartrecord);
  }

  loadGraphData() {
    this.graphRecord = [];
    this.graphRecord.push({
      "id": 0,
       "orderMode1": [{"orderMode":"Pick Up","Amount": 0}],
      "orderMode2": [{"orderMode":"Dine In","Amount": 0}],
      "startTime": "8",
      "endTime": "12",
      "Time":"08:AM - 12:00PM"
    })
    this.graphRecord.push({
      "id": 1,
       "orderMode1": [{"orderMode":"Pick Up","Amount": 0}],
      "orderMode2": [{"orderMode":"Dine In","Amount": 0}],
      "startTime": "12",
      "endTime": "16",
      "Time":"12:00PM - 04:00PM"
      
    })
    this.graphRecord.push({
      "id": 2,
      "orderMode1": [{"orderMode":"Pick Up","Amount": 0}],
      "orderMode2": [{"orderMode":"Dine In","Amount": 0}],
      "startTime": "16",
      "endTime": "20",
      "Time":"04:PM - 08:00PM"
     
    })
    this.graphRecord.push({
      "id": 3,
      "orderMode1": [{"orderMode":"Pick Up","Amount": 0}],
      "orderMode2": [{"orderMode":"Dine In","Amount": 0}],
      "startTime": "20",
      "endTime": "24",
      "Time":"08:00PM - 12:00AM"
      
    })
   
  }
  graphTotalAMount=0;
  initializeGraphsForTime(ordersdata: any) {
    this.loadGraphData();
    this.graphTotalAMount=0;
    if (this.graphRecord.length > 0 && ordersdata) {
      //const filterOrdersDate = ordersdata.filter();
      for (let i = 0; i < this.graphRecord.length; i++) {
        
        for (let ii = 0; ii < ordersdata.length; ii++) {
          const Tsplit = ordersdata[ii].createdAt.split('T');
          console.log(Tsplit);
          const subTsplit = Tsplit[1].split(':');
          console.log(subTsplit);
          const combineTime = subTsplit[0]+"."+subTsplit[1];//+""+subTsplit[2];
          const getseconds=subTsplit[2].split('.');
          const Time = combineTime+getseconds[0];
          const TimeToInt = +Time;
          console.log(TimeToInt);
           console.log(this.graphRecord[i].startTime);
          if ((ordersdata[ii].tablename == this.graphRecord[i].orderMode1[0].orderMode && ordersdata[ii].tablename=="Pick Up") ) {
          
            if( (TimeToInt > this.graphRecord[i].startTime && TimeToInt < this.graphRecord[i].endTime)){
            this.graphRecord[i].orderMode1[0].Amount = (+ordersdata[ii].grandtotal+this.graphRecord[i].orderMode1[0].Amount);
          this.graphTotalAMount += (+ordersdata[ii].grandtotal);
          }
          }
           if ((ordersdata[ii].tablename != "Pick Up" && this.graphRecord[i].orderMode2[0].orderMode != "Pick Up") && (TimeToInt > this.graphRecord[i].startTime && TimeToInt < this.graphRecord[i].endTime)) 
           {
            this.graphRecord[i].orderMode2[0].Amount = (+ordersdata[ii].grandtotal+this.graphRecord[i].orderMode2[0].Amount);
          this.graphTotalAMount += (+ordersdata[ii].grandtotal); 
          }
        }

      }
    }
    console.log(this.graphRecord);
  }

}