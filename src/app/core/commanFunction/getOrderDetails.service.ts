import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { InvoiceService } from '../../core/Services/invoice.service';
import { DatePipe } from "@angular/common";
import {  Observable } from 'rxjs';
import { Invoice } from "../Model/crud.model";
import { environment } from "../Services/indexService";
@Injectable({
  providedIn: 'root',
  
})
export class GetOrderDetailsService {
   private invoiceUrl: string = environment.api+"invoice";
    private OrderRecordurl: string = environment.api+"getOrderRecordByDate";
  
   ordersdata: any;
  date: string = '';
 
startdate:any;enddate:any;
 
  ordersdata2:any;
 t_element:any;
   
    totalorderamount: number | undefined;
    totaldiscountamount: number | undefined;
    totalpendingamount: number | undefined;
    ordercount: number | undefined;
  searchdata: string;
  from_date: string;
  to_date: string;
     constructor(private invoice: InvoiceService,private datePipe:DatePipe,private http: HttpClient ) {
    
      this.searchdata="";
      this.from_date="0";
      this.to_date="0";
      this.startdate="";
      this.enddate="";
      this.totalorderamount=0;
      this.totaldiscountamount=0;
      this.totalpendingamount=0;
      this.ordercount=0;

    }





todate() {
//alert(this.to_date);
if(this.from_date=="0")
{
  alert("Please select start date by from calender.");
}
else
{
  this.getDataByDate(this.from_date,this.to_date);
}
}

fromdate() {
//alert(this.from_date);
if(this.to_date=="0")
  {
   
  }
  else
  {
    this.getDataByDate(this.from_date,this.to_date);
  }
}
  
 
loadToday()
  { 
    //this.date = 
     this.gettodaydate();
   return this.getDataByDate(this.startdate,this.enddate);
 
  } 
 
  gettodaydate()
  {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
   // console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.startdate="";
   this.enddate="";
   this.startdate=formattedyesterday+"T00:00:00.000+00:00";
   this.enddate=formattedyesterday+"T23:59:59.000+00:00";
  //  const  createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString()+".000+00:00"
   
  //   createdAt;
  }
  getweek(){
    const today = new Date();
    const today2 = new Date(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 7); // Subtract one day
    today2.setDate(today.getDate());
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    const date2  = today2.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    const formattedyesterday2 = this.datePipe.transform(date2, 'yyyy-MM-dd');
    this.startdate="";
   this.enddate="";
   this.startdate=formattedyesterday+"T00:00:00.000+00:00";
   this.enddate=formattedyesterday2+"T23:59:59.000+00:00";
  
  }
  splitformattedyesterday2:any;
  getmonths(){
    const today = new Date();
    const today2 = new Date(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    today2.setDate(today.getDate());
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    const date2  = today2.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    const formattedyesterday2 = this.datePipe.transform(date2, 'yyyy-MM-dd');
     this.splitformattedyesterday2=formattedyesterday2?.split("-");
    this.startdate="";
   this.enddate="";
   this.startdate= this.splitformattedyesterday2[0]+"-"+this.splitformattedyesterday2[1]+"-01T00:00:00.000+00:00";
   this.enddate=formattedyesterday+"T23:59:59.000+00:00";
  }
  getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    
   // const  createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString()+".000+00:00"
   this.startdate="";
   this.enddate="";
   this.startdate=formattedyesterday+"T00:00:00.000+00:00";
   this.enddate=formattedyesterday+"T23:59:59.000+00:00";
   }
getDataByDate(startdate: string, enddate: string): Observable<Invoice> {
  //  this.synchronized(async () => {
  //   console.log('startdate', startdate);
  //   console.log('enddate', enddate);

  //   const data: Invoice = await firstValueFrom(
  return this.http.get<Invoice>(`${this.OrderRecordurl}/${startdate}/${enddate}`);

  // return data;
}

 
  loadYesterday()
  {
   // this.date =
     this.getYesterdayDate();
   return this.getDataByDate(this.startdate,this.enddate);

  }
  loadWeek()
  {
   // this.date = 
    this.getweek();
   return this.getDataByDate(this.startdate,this.enddate);
  //  this.getDataByDate(this.date);
  }
  loadMonth()
  {
this.getmonths();
 return this.getDataByDate(this.startdate,this.enddate);
  }                                                       
  // getbystartenddate(startdate: string, enddate: string): Observable<Invoice> {
  //    // const params = new HttpParams().set('createdAt', createdAt);
  //    // return this.http.get<any>(`${this.url3}/${params}`);
    
  //  }

  
}