import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router, RouterLink } from '@angular/router';
import { IChair, IChairsrunningorder, IDine, Invoice, ReserveDine } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { BasetypEditButtun } from ' ../../../userend/crud/editbutton/editbuttoncomponent';
// import { BasetypDeleteButtun } from '../../../userend/crud/deletebutton/deletbasetypebutton';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { ChairService } from '../../core/Services/chair.service';
import { ChairServiceService } from '../../core/Services/chairsrunningorders.serivce';
import { DatePipe, JsonPipe } from '@angular/common';
import { InvoiceService } from '../../core/Services/invoice.service';
import { min } from 'rxjs';
import { CustomresService } from '../../core/Services/customers.service';
import { ReserveDineService } from '../../core/Services/reserveDine.service';
import { GetOrderDetailsService } from '../../core/commanFunction/getOrderDetails.service';
import { InitializeInvoice } from '../../core/commanFunction/InitializeInvoice.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
  providers: [DatePipe],
  standalone: false
})
@Injectable({ providedIn: 'root' })

export class TablesComponent implements OnInit {
  // this.router.navigate(['\Home']);
  @Input() pickupOrder:any;
  @Input() CancelOrder:any;
  @Output() clearCancelOrder = new EventEmitter<string>();
  @Output() clearPickupOrder = new EventEmitter<string>();
  
  @Output() notifyManage3: EventEmitter<string> = new EventEmitter<string>();
  editreservedinefata: any;
  currentDateOnly: string = '';       // yyyy-MM-dd
  selectedDate: string = '';
  selectedTime: string = '';
  availableTimeSlots: string[] = [];
  pickupinvoiceid: number = 0;
    ordersdataforToken:any;
      get dateTimeStartControl(): FormControl {
  return this.myAddForm.get('DateTimeStart') as FormControl;
}

  TokenNumber:number=0;
  editreservedinefata2: any;
  isChecked = false;
  date: any; now: any = new Date('').getTime().toString();
  distanceday: any;
  currentdatetime = new Date();
  currentdate: any;
  isCheckedPaymentstatus: any = false;
  days: any;
  months: any;
  employeeId = "JSK";
  resevetable: ReserveDine = {
    TableId: "undefined",
    DateTimeStart: this.now,
    DateTimeEnd: "",
    CustomerId: "undefined",
    Name: "undefined",
    MobileNo: "undefined",
    BookingAmount: 0,
    Paymentstatus: false,
    RecieptNumber: "",
    Bookingstatus: true,
    TableName: "undefined",
    employee_id: this.employeeId,
    ConfirmStatus: false
  }

  runningOrderLength = 0;
  myAddForm: FormGroup;
  reservedinedata: any; reservedinedata2: any;
  editshow = false;
  deleteshow = false;
  holdreservetableid = 0;
  tablename = "";
  datecurrent: any;
  reservedLength = 0;
  button: any;
  invoiceid: string = "";
  public invoiceid2 = "";
  args: any = null;
  tab: number = 0;
  isCheckedStatus: any = true;
  invoiceidforpickup: number = 0;
  // invoice interface
  invoice:any;
  invoicepickup:any;
  invoicedelete:any;
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: '',
    employee_id: this.employeeId,
  }
  chairs: any;
  chairs2: any;
  chairsbytable_id: any;
  chairsbytable_id2: any;
  Floordata2: any;
  Floordata: any
  dinenamedata: any;
  dinenamedata2: any
  dinedata2: any;
  dinedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  tabactive0: any;
  tabactive1: any;
  tabactive2: any;
  tabactive3: any;
  Customersnamedata: any;
  Customersnamedata2: any
  myEditForm: FormGroup<{ TableId: FormControl<string | null>; DateTimeStart: FormControl<string | null>; DateTimeEnd: FormControl<string | null>; CustomerId: FormControl<string | null>; Name: FormControl<string | null>; MobileNo: FormControl<string | null>; Paymentstatus: FormControl<boolean | null>; Bookingstatus: FormControl<boolean | null>; BookingAmount: FormControl<string | null>; RecieptNumber: FormControl<any>; }>;
  date2: string = '';
  chairsrunningorderarr2: IChair[] = [];
  chairsrunningorderarr3: IChair[] = [];
  chair: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  chair2: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  chairsrunningorderarr: IChairsrunningorder = {
    Chairsrunningorder: [this.chair],
    tablename: "",
    tokennumber: 0
  };
  ordersdata: any;
  constructor(private service: DineService, private QuantitytypeService_: QuantitytypeService, private router: Router, private fb: FormBuilder, private floorservice: FloorService, private chairservice: ChairService, private chairsrunningorderservice: ChairServiceService, private _InvoiceService: InvoiceService, private formedit: FormBuilder, private customerservice: CustomresService, private reservedineservice: ReserveDineService, private datePipe: DatePipe, private GetOrderDetailsService_: GetOrderDetailsService,private InitializeInvoice_:InitializeInvoice) {
const today = new Date();
    this.currentDateOnly = today.toISOString().split('T')[0];
    this.selectedDate = this.currentDateOnly;

    this.generateTimeSlots();
    this.invoicedelete = this.InitializeInvoice_.initializeInvoice("Cancelled",this.employeeId,0);
this.invoicepickup = this.InitializeInvoice_.initializeInvoice("New Order",this.employeeId,0);
this.invoice = this.InitializeInvoice_.initializeInvoice("Cancelled",this.employeeId,0);
this.loadToken();
    this.args = null;
    this.tabactive0 = "table-tab active";
    this.tabactive1 = "table-tab ";
    this.tabactive2 = "table-tab ";
    this.tabactive3 = "table-tab ";
    //this.now=new Date().toString();
    //  this.loadbasetype();
    // this.loaddine2();
    // this.loaddine();
    // this.loadallchair();
    // this.loadrunningorder();

    this.myEditForm = this.formedit.group({
      TableId: ['',],
      DateTimeStart: ['',],
      DateTimeEnd: ['',],
      CustomerId: ['',],
      Name: ['',],
      MobileNo: ['',],
      Paymentstatus: [false,],
      Bookingstatus: [true,],
     
      BookingAmount: ['',],
      RecieptNumber: [],

    });
    this.myAddForm = this.formedit.group({
      TableId: ['',],
      DateTimeStart: new FormControl('', Validators.required),
      DateTimeEnd: ['',],
      CustomerId: ['',],
      Name: ['',],
      MobileNo: ['',],
      Paymentstatus: [false,],
      Bookingstatus: [true,],
       ConfirmStatus:[false,],
      BookingAmount: ['',],
      RecieptNumber: [this.now,]
    });
  }
  ngOnInit(): void {
    ////("2");

   this.referesh();
   if(this.CancelOrder!="")
   {
this.cancel(this.CancelOrder);
this.clearCancelOrder.emit("");
alert("Order Cancelled.");
   }
if(this.pickupOrder=="pickup")
      {
        this.TokenNumber=0;
    this.GetOrderDetailsService_.loadToday().subscribe(data => {
      this.ordersdataforToken = data;
      if(this.ordersdataforToken.length>=0)
      {
        console.log(this.ordersdataforToken.length);
        console.log(this.ordersdataforToken);
        this.TokenNumber = this.ordersdataforToken.length+1;
        this.pickup();
      }else
      {
        const d = new Date();
      this.TokenNumber= d.getDay() + d.getTime();
      this.pickup();
      }
      
    });
        
      }

  }
referesh()
{
   this.loadToken();
    this.datecurrent = this.gettoday();
    this.loadrunningorder();
    this.loaddinedata();
    //this.loadcustomers();
    this.loadfloor()
    //this.classname="";
    this.loaddine();
    this.loadallchair();
}
  Confirmedelete() {
    ////(this.holdreservetableid);
    if (this.holdreservetableid != 0) {
      this.reservedineservice.delete(this.holdreservetableid.toString()).subscribe(data => {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.allTasks;
        this.loaddinedata();
        this.deleteshow = false;
      })
    }

  }
  deletereservedine(_id: any) {
    this.args = "";
    this.deleteshow = true;
    this.holdreservetableid = _id;

  }
 generateTimeSlots() {
    // Generates slots: 10:00, 12:00, 14:00 ... 22:00
    const startHour = 10;
    const endHour = 22;
    this.availableTimeSlots = [];

    for (let hour = startHour; hour <= endHour; hour += 2) {
      const hourStr = hour.toString().padStart(2, '0');
      this.availableTimeSlots.push(`${hourStr}:00`);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    console.log(this.selectedDate);
    console.log(event.target.value);
    this.updateDateTime();
  }

  onTimeChange(event: any) {
    this.selectedTime = event.target.value;
    this.updateDateTime();
  }

  updateDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const combined = `${this.selectedDate}T${this.selectedTime}`;
      this.myAddForm.get('DateTimeStart')?.setValue(combined);
    }
  }

  editreservedine(_id: any) {
    this.args = "";
    this.editshow = true;
    this.holdreservetableid = _id;
    this.reservedineservice.getbyid(_id).subscribe(data => {
      if (data) {
        this.editreservedinefata2 = data;
        this.editreservedinefata = this.editreservedinefata2.allTasks;
        this.myEditForm = this.formedit.group({
          TableId: [this.editreservedinefata.TableId,],
          DateTimeStart: [this.editreservedinefata.DateTimeStart,],
          DateTimeEnd: [this.editreservedinefata.DateTimeEnd,],
          CustomerId: [this.editreservedinefata.CustomerId,],
          Name: [this.editreservedinefata.Name,],
          MobileNo: [this.editreservedinefata.MobileNo,],
          Paymentstatus: [this.editreservedinefata.Paymentstatus,],
          Bookingstatus: [this.editreservedinefata.Bookingstatus,],
          BookingAmount: [this.editreservedinefata.BookingAmount,],
          RecieptNumber: [this.editreservedinefata.RecieptNumber,]
        });
        // //(this.editreservedinefata[0]._id)
      }
    })
  }
  bindcustomer() {


  } splittime: string = ";"
  serchbynamecustomer = "";
  searchCustomer() {

    this.myAddForm.value.CustomerId;
    const index = this.Customersnamedata.findIndex((item: { Name: any; }) => item.Name === this.myAddForm.value.CustomerId);
    console.log(this.Customersnamedata);
    console.log(index);
    if (index > 0) {
      this.serchbynamecustomer = this.Customersnamedata[index].Name;
      console.log(this.Customersnamedata[index].Name);
    }
  }



  checkdate() {
    this.days = this.currentdatetime.getDate();
    if (this.days < 10) {
      this.days = "0" + this.days
    }
    this.months = this.currentdatetime.getMonth();
    if (this.months < 10) {
      this.months = "0" + (+this.months + 1);
    }
    this.currentdate = this.currentdatetime.getFullYear() + "-" + this.months + "-" + this.days + "T" + this.currentdatetime.getHours() + ":" + this.currentdatetime.getMinutes();
    console.log(this.currentdate);
  }
  selectdateandtime() {
    this.date = new Date(this.myAddForm.value.DateTimeStart).getTime();
    // const x = setInterval(()=>{
    this.now = new Date();
    var distance = this.date - this.now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.distanceday = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    // console.log(this.distanceday);

    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww })
    console.log(this.distanceday);

    console.log(this.myAddForm.value.DateTimeStart);
  }
  showreserveDine() {
    this.loaddine();
    this.show = true;
  }
  show: boolean = false;
  onFormEditSubmit() {

  }
  onFormSubmit() {
    // var hours = Math.floor((this.myAddForm.value.DateTimeStart+(1000*60*60*24))/(1000*60*60));
    let index = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.TableId);
    // //(this.date[0])
    this.myAddForm.value.TableName = this.dinedata[index].name;

    this.date = new Date(this.myAddForm.value.DateTimeStart).toLocaleString().split(',');
    this.now = new Date();
    var distance = this.splittime.split('T');
    const date = this.date[0].split('/');

    const time = this.date[1].split(':');
    this.myAddForm.value.DateTimeStart = date[2] + "-" + date[0] + "-" + date[1] + "T" + time[0] + ":" + time[1] + ":" + time[2];
    this.myAddForm.value.DateTimeEnd = date[2] + "-" + date[0] + "-" + date[1] + "T" + (+time[0] + 1) + ":" + time[1] + ":" + time[2];

    const d = new Date();
    this.myAddForm.value.RecieptNumber = d.getFullYear() + d.getTime();
    this.resevetable = this.myAddForm.value;
    // //(this.myAddForm.value.DateTimeEnd);
    console.log(this.resevetable);
    const DateTimeStart = this.myAddForm.value.DateTimeStart;
    const DateTimeEnd = this.myAddForm.value.DateTimeEnd;
    // this.reservedineservice.getReservedEndTime(DateTimeStart,DateTimeEnd).subscribe(result=>{
    //   if(result)
    //   {
    //     console.log(result);
    //   }
    // })
    this.reservedineservice.add(this.resevetable).subscribe(reservedine => {
      if (reservedine) {
        this.reservedinedata2 = reservedine;
        this.reservedinedata = this.reservedinedata2.allTasks;
        this.args = "Successfully Reserved";
        this.loaddinedata();
      }
    }
    )


  }

  loaddinedata() {
    ////("I am here");
    this.reservedineservice.get().subscribe(data => {
      if (data) {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.allTasks;
        this.reservedLength = this.reservedinedata.length;

      }
    })
  }
  close() {
    this.show = false;
    this.deleteshow = false;
    this.editshow = false;
  }

  loadcustomers() {
    this.customerservice.get().subscribe(data => {
      if (data) {
        this.Customersnamedata2 = data;
        this.Customersnamedata = this.Customersnamedata2.allTasks

      }
    })
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  getforinvoiceiddata2: any;
  getforinvoiceiddata: any;
  async loaddine() {
    this.service.get().subscribe(
      data => {
        if (data) {
          this.dinedata = [];
          this.dinedata2 = data;
          this.dinedata = this.dinedata2.allTasks;
          // //("loaded dine data");
        }
      }
    );
  }
  
  pickup() {
this.clearPickupOrder.emit("");
    this.loadchairsrunningorderselected("pickup");
  }
  tabshow(tab: number) {
    this.tab = tab;

    if (tab == 0) {
      this.tabactive0 = "table-tab active";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab ";
    }
    if (tab == 1) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab active";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab ";
      //this.loaddinedata();

    }
    if (tab == 2) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab active";
      this.tabactive3 = "table-tab ";

    }
    if (tab == 3) {
      this.tabactive0 = "table-tab ";
      this.tabactive1 = "table-tab ";
      this.tabactive2 = "table-tab ";
      this.tabactive3 = "table-tab active";
      this.loadBilled();
    }
    // this.loaddine();
    // this.loadallchair();
    // this.loadrunningorder();
  }
 
  cancel(InvoiceID: any) {

    ////////(arg0);
    this.chairsrunningorderservice.getbyid(InvoiceID).subscribe(data => {

      if (data) {
        // //////(arg0);
        this.runningorder_cancel_by_id = [];
        this.runningorder2_cancel_by_id = data;
        this.runningorder_cancel_by_id = this.runningorder2_cancel_by_id.allTasks;
        // //(this.runningorder_cancel_by_id[0].Chairsrunningorder.length);
        if (this.runningorder_cancel_by_id[0].Chairsrunningorder.length == 0) {

        }
        else {
          //update table status start
          ////("tableid : "+this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);
          const inde = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);

          this.dine.status = true;
          this.dine._id = this.dinedata[inde]._id;
          // //(this.dinedata[inde]._id);
          this.dine.name = this.dinedata[inde].name;
          this.dine.description = this.dinedata[inde].description;
          this.dine.floor_id = this.dinedata[inde].floor_id;
          this.service.update(this.dine).subscribe(data => {
            if (data) {
              this.dinedata2 = data;
              this.dinedata = this.dinedata2.allTasks
              this.loadallchair();

              this.loadrunningorder();
            }
          })
        }
        //end

        // //////(this.runningorder_cancel_by_id[0].Chairsrunningorder.length);
        for (var ii = 0; ii < this.runningorder_cancel_by_id[0].Chairsrunningorder.length; ii++) {
          this.chair2._id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii]._id;
          this.chair2.name = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].name;
          this.chair2.description = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].description;
          this.chair2.status = true;
          this.chair2.table_id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].table_id;
          this.chair2.chairorderstatus = "1";
          this.chairservice.update(this.chair2).subscribe(data2 => {
            if (data2) {
              //////("updated");
              // this.loadallchair();

            }

          }
          )
        }



        //////(arg0);
        this.chairsrunningorderservice.delete(InvoiceID).subscribe(data2 => {
          if (data2) {
            //////("deleted");
            //  this.loadrunningorder();



          }

        })
      }
    })
    this._InvoiceService.getbyid(InvoiceID).subscribe(data => {
      if (data) {

        // //("working");
        this.getforinvoiceiddata = [];
        this.getforinvoiceiddata2 = data;
        this.getforinvoiceiddata = this.getforinvoiceiddata2.allTasks;
        console.log(this.getforinvoiceiddata);
        //  //("length: "+this.getforinvoiceiddata.length);
        for (var ii = 0; ii < this.getforinvoiceiddata.length; ii++) {
          //  //(this.getforinvoiceiddata[ii].TotalTaxAmount);
          this.invoicedelete = {

            Taxes: this.getforinvoiceiddata[ii].Taxes,
            Chairs: this.getforinvoiceiddata[ii].Chairs,
            taxpecentRate: 0,
            taxpercentValue: 0,
            DiscountId: this.getforinvoiceiddata[ii].DiscountId,
            Discountvalue: 0,
            Discountperstage: 0,
            AdditionaldiscountAmount: 0,
            Totalvaue: 0,
            grandtotal: 0,
            RecieptNumber: this.getforinvoiceiddata[ii].RecieptNumber, //this.totalamount + this.discountvalue + d.getDate() + d.getTime() + d.getSeconds(),
            OrderType: this.getforinvoiceiddata[ii].OrderType,
            AmountPaidstatus: this.getforinvoiceiddata[ii].AmountPaidstatus,
            Orderstatus: "Cancelled",
            PaidAmount: 0,
            PendingAmount: 0,
            TotalTaxAmount: 0,
            TotalItemsAmount: 0,
            OrderTypeName: this.getforinvoiceiddata[ii].OrderTypeName,
            paybyId: this.getforinvoiceiddata[ii].paybyId,
            table_id: this.getforinvoiceiddata[ii].table_id,
            customer_id: this.getforinvoiceiddata[ii].customer_id,
            employee_id: this.getforinvoiceiddata[ii].employee_id,
            tablename: this.getforinvoiceiddata[ii].tablename,
            createdAt: this.getforinvoiceiddata[ii].createdAt,
            AssistToId: this.getforinvoiceiddata[ii].AssistToId ?? '',
            CommentId: this.getforinvoiceiddata[ii].Comment ?? '',
            returnAmount: this.getforinvoiceiddata[ii].returnAmount ?? '',

          }
        }
        //console.log(this.invoicedelete);
        this._InvoiceService.update(this.invoicedelete).subscribe(updateddata => {
          if (updateddata) {
            ////("Updated.");
            //     this.loadallchair();
            //     this.loaddine();
            // this.loadrunningorder();
          }
        })
        this.loadallchair();
        this.loaddine();
        this.loadrunningorder();
        ////(this.getforinvoiceiddata[0]._id);
      }
    });
  }


  gotohome(InvoiceID: any,TokenNumber:number) {
    this.notifyManage2.emit(InvoiceID+"jsk"+TokenNumber);
    ////////(arg0)
  }
  runningorder: any;
  runningorder2: any;
  runningorder_cancel_by_id: any;
  runningorder2_cancel_by_id: any;

  loadrunningorder() {
    this.chairsrunningorderservice.get().subscribe(data => {
      if (data) {
        this.runningorder = [];
        this.runningorder2 = data;
        this.runningorder = this.runningorder2.allTasks;
        // console.log(this.runningorder);
        this.runningOrderLength = this.runningorder.length;
      }
    })

  }
  loadfloor() {
    //////selectcategoryID);
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata = [];
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.allTasks

      }
    })
  }
  checkbox: any
  chairstatus(e: any, name: string, description: string, table_id: string) {
    this.checkbox = document.getElementById(e)
    //////  this.checkbox.checked );
    if (!this.checkbox.checked) {
      //////"in false");
      this.chairstatusupdate(e, "2", true, name, description, table_id);
    }
    else if (this.checkbox.checked) {
      // ////"in true");
      this.chairstatusupdate(e, "1", this.checkbox.checked, name, description, table_id);
    }
  }


  chairstatusupdate(id: any, chairorderstatusvalue: any, status: boolean, name: string, description: string, table_id: string) {
    this.chair._id = id;
    this.chair.name = name;
    this.chair.description = description;
    this.chair.status = status;
    this.chair.table_id = table_id;
    this.chair.chairorderstatus = chairorderstatusvalue;
    this.chairservice.update(this.chair).subscribe(res => {
      if (res) {
        //this.search(id);
        //  ////"Done");
        // this.args=null;
        // this.args="Successfully Updated...";
        //  ////"Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        // this.loadchair2();
      }
    })
  }
  loadallchair() {

    this.chairservice.get().subscribe(data => {
      if (data) {
        this.chairs = [];
        this.chairs2 = data;
        this.chairs = this.chairs2.allTasks;
      }
    })
  }
  loadchair(table_id: string) {


  }


  @Output() notifyManage2: EventEmitter<string> = new EventEmitter<string>();
  getchair(arg0: any) {
    //  this.loadchair(arg0);     
    ////"this.invoiceid: "+this.invoiceid2);




    // this.notifyManage2.emit(this.invoiceid2);                                                                    
    // this.router.navigate(['\Home']);

  }

 
  booktable(tablename: any) {
    ////(tableid);
    this.loadchairsrunningorderselected(tablename);
  }
  
  loadchairsrunningorderselected(tablename: any) {
    //this.chairsrunningorderarr.Chairsrunningorder=[];
  //  this.loadToken();
    if (tablename == "pickup") {
      const d = new Date();
      this.invoiceidforpickup = d.getFullYear() + d.getTime();
      
      this.chairsrunningorderarr = {
        Chairsrunningorder: [],
        tablename: "pickup",
        tokennumber:this.TokenNumber
      };
      this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
        // this.datecurrent = this.gettoday();
        // //(this.datecurrent);
        if (res) {
          this.chairs2 = res;
          this.pickupinvoiceid = this.chairs2.createdTask.createdAt;
         // console.log(this.invoiceid)
         // this.invoicepickup = this.InitializeInvoice_.initializeInvoice("New Order",this.employeeId,this.pickupinvoiceid);
          this.invoicepickup = {
            Taxes: [],
            Chairs: [],
            taxpecentRate: 0,
            taxpercentValue: 0,
            DiscountId: "",
            Discountvalue: 0,
            Discountperstage: 0,
            AdditionaldiscountAmount: 0,
            Totalvaue: 0,
            RecieptNumber: this.pickupinvoiceid,
            grandtotal: 0,
            OrderType: '',
            PendingAmount: 0,
            PaidAmount: 0,
            AmountPaidstatus: false,
            Orderstatus: "New Order",
            TotalTaxAmount: 0,
            TotalItemsAmount: 0,
            paybyId: 'undefined',
            OrderTypeName: "",
            table_id: "",
            customer_id: "undefined",
            employee_id: this.employeeId,
            tablename: "Pick Up",
            AssistToId: 'undefined',
            CommentId: 'undefined', 
            returnAmount: 0,
            tokennumber:this.TokenNumber,
           // createdAt: this.datecurrent
          }

          this._InvoiceService.add(this.invoicepickup).subscribe(inv => {
            if (inv) {

              this.notifyManage2.emit(this.pickupinvoiceid.toString()+"jsk"+this.TokenNumber);

            }
          });
          //  //(this.invoiceidforpickup);



        }
      });
      ////("pickup");
    } else {
      this.chairservice.getbytable_id(tablename).subscribe(data => {
        if (data) {
          // console.log(data.valueOf());                                                                      
          this.chairsbytable_id = data;
          //  console.log(this.chairsbytable_id2.allTasks.length);   
          // this.chairsbytable_id=this.chairsbytable_id2.allTasks;
          console.log(this.chairsbytable_id.allTasks);

          console.log(this.chairsbytable_id);
          for (var ii = 0; ii < this.chairsbytable_id.allTasks.length; ii++) {
            if (this.chairsbytable_id.allTasks[ii].table_id == tablename && this.chairsbytable_id.allTasks[ii].chairorderstatus == "1") {
              // ////this.chairsbytable_id.allTasks[ii].table_id);                                                                                             
              this.chairsrunningorderarr2.push({
                _id: this.chairsbytable_id.allTasks[ii]._id,
                name: this.chairsbytable_id.allTasks[ii].name,
                description: this.chairsbytable_id.allTasks[ii].description,
                //in future status can be false
                status: true,
                table_id: this.chairsbytable_id.allTasks[ii].table_id,
                //in future it can be 0
                chairorderstatus: "1",
               
              }
              );
              this.chairsrunningorderarr3 = this.chairsrunningorderarr2;
              console.log(this.chairsrunningorderarr2);
              console.log(this.chairsrunningorderarr3);

            }

          }

        }
        const inde = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == tablename);
        this.tablename = this.dinedata[inde].name
        this.chairsrunningorderarr = {
          Chairsrunningorder: this.chairsrunningorderarr3,
          tablename: this.dinedata[inde].name,
          tokennumber:this.TokenNumber
        };
        // console.log("outer");
        // ////"outer");
        console.log(this.chairsrunningorderarr);
        //  console.log(this.chairsrunningorderarr2);
        this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
          if (res) {
            let jsk = 0;
            for (var ii = 0; ii < this.chairsbytable_id.allTasks.length; ii++) {

              if (this.chairsbytable_id.allTasks[ii].table_id == tablename && this.chairsbytable_id.allTasks[ii].chairorderstatus == "1") {
                this.chair._id = this.chairsbytable_id.allTasks[ii]._id;
                this.chair.name = this.chairsbytable_id.allTasks[ii].name;
                this.chair.description = this.chairsbytable_id.allTasks[ii].description;
                //in future status can be false
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.allTasks[ii].table_id;
                //in future it can be 0
                this.chair.chairorderstatus = "1";
                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    ////"done");            
                    jsk++;
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    ////"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);                
                    if (this.chairsbytable_id.allTasks.length == jsk) {
                      ////"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                      //  this.notifyManage2.emit(this.invoiceid2);
                    }

                  }

                }
                )

              }
              else if ((this.chairsbytable_id.allTasks[ii].table_id == tablename) && (this.chairsbytable_id.allTasks[ii].chairorderstatus == "2")) {
                this.chair._id = this.chairsbytable_id.allTasks[ii]._id;
                this.chair.name = this.chairsbytable_id.allTasks[ii].name;
                this.chair.description = this.chairsbytable_id.allTasks[ii].description;
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.allTasks[ii].table_id;
                this.chair.chairorderstatus = "1";

                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    ////"done");
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    jsk++;
                    ////"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                    if (this.chairsbytable_id.allTasks.length == jsk) {
                      ////"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                      //  this.notifyManage2.emit(this.invoiceid2);
                    }
                  }
                }
                )
              }
              else if (this.chairsbytable_id.allTasks[ii].table_id == tablename && this.chairsbytable_id.allTasks[ii].chairorderstatus == "0") {
                jsk++;
                this.loadallchair();
                this.loaddine();
                this.loadrunningorder();
                if (this.chairsbytable_id.allTasks.length == jsk) {

                  ////"jsk :"+jsk+" id: "+this.invoiceid2+" lenght: "+this.chairsbytable_id.allTasks.length);
                  // this.notifyManage2.emit(this.invoiceid2);
                }
              }
            }
            this.chairs2 = res;
            this.invoiceid = this.chairs2.createdTask.createdAt
            // this.datecurrent = this.gettoday();
            // //(this.datecurrent);
            console.log(this.datecurrent);
            //adding invoice id in invoice table start
            this.invoice = {

              Taxes: [],
              Chairs: [],
              taxpecentRate: 0,
              taxpercentValue: 0,
              DiscountId: "",
              Discountvalue: 0,
              Discountperstage: 0,
              AdditionaldiscountAmount: 0,
              Totalvaue: 0,
              RecieptNumber: +this.invoiceid,
              grandtotal: 0,
              OrderType: '',
              PendingAmount: 0,
              PaidAmount: 0,
              AmountPaidstatus: false,
              Orderstatus: "New Order",
              TotalTaxAmount: 0,
              TotalItemsAmount: 0,
              paybyId: 'undefined',
              OrderTypeName: "",
              table_id: tablename,
              customer_id: "undefined",
              employee_id: this.employeeId,
              tablename: this.tablename,
              AssistToId: 'undefined',
              CommentId: 'undefined', 
              returnAmount: 0,
              tokennumber:this.TokenNumber,
             // createdAt: this.datecurrent
            }
            this._InvoiceService.add(this.invoice).subscribe(inv => {
              if (inv) {
                //  //("done.");
                this.dine.status = false;
                this.dine._id = tablename;
                this.dine.name = this.dinedata[inde].name;
                this.dine.description = this.dinedata[inde].description;
                this.dine.floor_id = this.dinedata[inde].floor_id;
                this.service.update(this.dine).subscribe(data => {
                  if (data) {
                    // this.dinedata2 = data;
                    // this.dinedata = this.dinedata2.allTasks
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    //  //(this.invoiceid);
                    this.notifyManage2.emit(this.invoiceid+"jsk"+this.TokenNumber);
                  }
                })


              }
            });
            //adding invoice id in invoice table end

            this.invoiceid2 = this.invoiceid.toString();
            ////this.invoiceid2);
            console.log(this.invoiceid);
          }

        });

      })
    }

    // const indexP = this.chairs.findIndex(item => item._id === id);
  }
 loadToken() {
this.TokenNumber=0;
    this.GetOrderDetailsService_.loadToday().subscribe(data => {
      this.ordersdataforToken = data;
      if(this.ordersdataforToken.length>=0)
      {
        console.log(this.ordersdataforToken.length);
        console.log(this.ordersdataforToken);
        this.TokenNumber = this.ordersdataforToken.length+1;
      }else
      {
        const d = new Date();
      this.TokenNumber= d.getDay() + d.getTime();
      }
      
    });
    
  }
  todayBilledLists: any = [];
  loadBilled() {
    //loadBilled 
    this.GetOrderDetailsService_.loadToday().subscribe((data: any) => {
      this.ordersdata = data;
      this.todayBilledLists = [];
      if (this.ordersdata.length > 0) {
        for (let i = 0; i < this.ordersdata.length; i++) {
          if (this.ordersdata[i].Orderstatus == "Done") {
            this.todayBilledLists.push({
              _id: this.ordersdata[i]._id,
              Orderstatus: this.ordersdata[i].Orderstatus,
              RecieptNumber: this.ordersdata[i].RecieptNumber,
              tablename: this.ordersdata[i].tablename,
              createdAt: this.ordersdata[i].createdAt,
              PaidAmount: this.ordersdata[i].PaidAmount,
              grandtotal: this.ordersdata[i].grandtotal
            });
          }
        }
        console.log(this.ordersdata);
      }

    });

  }
  gettoday(): Date {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    const createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString() + "Z"
    ////(createdAt);
    return new Date(createdAt);
  }

}
