import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { IChair, IChairsrunningorder, IDine, IFloorMergeWithDine, ReserveDine, ReserveDineEdit } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-community';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { ChairService } from '../../core/Services/chair.service';
import { ChairServiceService } from '../../core/Services/chairsrunningorders.serivce';
import { DatePipe } from '@angular/common';
import { InvoiceService } from '../../core/Services/invoice.service';
import { CustomresService } from '../../core/Services/customers.service';
import { ReserveDineService } from '../../core/Services/reserveDine.service';
import { GetOrderDetailsService } from '../../core/commanFunction/getOrderDetails.service';
import { InitializeInvoice } from '../../core/commanFunction/InitializeInvoice.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
  providers: [DatePipe],
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class TablesComponent implements OnInit {
  //last step
  @Input() runningItemsKOT$?: Observable<any[]> | null = null;
  @Input() pickupOrder: any;
  @Input() CancelOrder: any;
  @Output() clearCancelOrder = new EventEmitter<string>();
  @Output() clearPickupOrder = new EventEmitter<string>();
  @Output() notifyManage3: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyManage2: EventEmitter<string> = new EventEmitter<string>();

  // State variables
  MergeFloorNameWithDineList: IFloorMergeWithDine[] = [];
  FloorWithDineData: IFloorMergeWithDine[] = [];
  selectedTimeforEdit: any;
  currentTime: any;
  editreservedinefata: any;
  editreservedinefata2: any;
  currentDateOnly = '';
  selectedDate = '';
  selectedTime = '';
  availableTimeSlots: string[] = [];
  pickupinvoiceid = 0;
  ordersdataforToken: any;
  TokenNumber = 0;
  isChecked = false;
  date: any;
  now: any = new Date('').getTime().toString();
  distanceday: any;
  currentdatetime = new Date();
  currentdate: any;
  isCheckedPaymentstatus: any = false;
  days: any;
  months: any;
  employeeId = "JSK";
  runningOrderLength = 0;
  reservedinedata: any;
  reservedinedata2: any;
  editshow = false;
  deleteshow = false;
  holdreservetableid = 0;
  tablename = "";
  datecurrent: any;
  reservedLength = 0;
  button: any;
  invoiceid: string = "";
  invoiceid2 = "";
  args: any = null;
  tab = 0;
  isCheckedStatus: any = true;
  invoiceidforpickup = 0;
  invoice: any;
  invoicepickup: any;
  invoicedelete: any;
  chairs: any;
  chairs2: any;
  chairsbytable_id: any;
  chairsbytable_id2: any;
  Floordata2: any;
  Floordata: any;
  dinenamedata: any;
  dinenamedata2: any;
  dinedata2: any;
  dinedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  tabactive0: any;
  tabactive1: any;
  tabactive2: any;
  tabactive3: any;
  tabactive4:any;
  Customersnamedata: any;
  Customersnamedata2: any;
  date2 = '';
  chairsrunningorderarr2: IChair[] = [];
  chairsrunningorderarr3: IChair[] = [];
  ordersdata: any;
  showCustomerPopUp = false;
  closePopUp = false;
  show = false;
  splittime = ";";
  serchbynamecustomer = "";
  getforinvoiceiddata2: any;
  getforinvoiceiddata: any;
  runningorder: any;
  runningorder2: any;
  runningorder_cancel_by_id: any;
  runningorder2_cancel_by_id: any;
  ordersdata2: any;
  todayBilledLists: any = [];
  CustomerId = "";
 
  // Form groups
  myAddForm: FormGroup;
  myEditForm: FormGroup<{
    _id: FormControl<string | null>;
    TableId: FormControl<string | null>;
    ReservedDate: FormControl<string | null>;
    ReservedTimeSlot: FormControl<string | null>;
    CustomerId: FormControl<string | null>;
    Name: FormControl<string | null>;
    MobileNo: FormControl<string | null>;
    Paymentstatus: FormControl<boolean | null>;
    Bookingstatus: FormControl<boolean | null>;
    BookingAmount: FormControl<string | null>;
    RecieptNumber: FormControl<any>;
  }>;

  // Models
  reserveTableEdit: ReserveDineEdit | undefined;
  resevetable: ReserveDine;
  dine: IDine;
  chair: IChair;
  chair2: IChair;
  chairsrunningorderarr: IChairsrunningorder;
  checkbox: any | null;
  ReservedTable$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  constructor(
    private service: DineService,
    private quantitytypeService: QuantitytypeService,
    private router: Router,
    private fb: FormBuilder,
    private floorservice: FloorService,
    private chairservice: ChairService,
    private chairsrunningorderservice: ChairServiceService,
    private invoiceService: InvoiceService,
    private formedit: FormBuilder,
    private customerservice: CustomresService,
    private reservedineservice: ReserveDineService,
    private datePipe: DatePipe,
    private getOrderDetailsService: GetOrderDetailsService,
    private initializeInvoice: InitializeInvoice,
    private store: Store<{ reserveTableReducer_: any}>
  ) {
   
    this.ReservedTable$ = this.store.select(state => state.reserveTableReducer_.ReserveTables.data);
    const today = new Date();
    this.currentTime = (today.getHours() > 12 ? today.getHours() - 12 : today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.currentDateOnly = today.toISOString().split('T')[0];
    this.selectedDate = this.currentDateOnly;
    this.generateTimeSlots();

    this.invoicedelete = this.initializeInvoice.initializeInvoice("Cancelled", this.employeeId, 0);
    this.invoicepickup = this.initializeInvoice.initializeInvoice("New Order", this.employeeId, 0);
    this.invoice = this.initializeInvoice.initializeInvoice("Cancelled", this.employeeId, 0);

    this.loadToken();
    this.args = null;
    this.tabactive0 = "table-tab active";
    this.tabactive1 = "table-tab ";
    this.tabactive2 = "table-tab ";
    this.tabactive3 = "table-tab ";
    
    this.myEditForm = this.formedit.group({
      _id: [''],
      TableId: [''],
      ReservedDate: [''],
      ReservedTimeSlot: [''],
      CustomerId: [''],
      Name: ['',new FormControl({value: '', disabled: true})],
      MobileNo: ['',new FormControl({value: '', disabled: true})],
      Paymentstatus: [false],
      Bookingstatus: [false],
      BookingAmount: [''],
      RecieptNumber: []
    });

    this.myAddForm = this.formedit.group({
      TableId: [''],
      ReservedDate: new FormControl('', Validators.required),
      ReservedTimeSlot: [''],
      CustomerId: [''],
      Name: ['',new FormControl({value: '', disabled: true})],
      MobileNo: ['',new FormControl({value: '', disabled: true})],
      Paymentstatus: [false],
      Bookingstatus: [false],
      ConfirmStatus: [false],
      BookingAmount: [''],
      RecieptNumber: [this.now]
    });

    this.reserveTableEdit = {
      _id: '',
      TableId: '',
      ReservedDate: '',
      ReservedTimeSlot: '',
      CustomerId: '',
      Name: '',
      MobileNo: '',
      Paymentstatus: false,
      Bookingstatus: false,
      BookingAmount: 0,
      RecieptNumber: '',
      TableName: '',
      employee_id: this.employeeId,
      ConfirmStatus: false
    };

    this.resevetable = {
      TableId: "undefined",
      ReservedDate: this.now,
      ReservedTimeSlot: "",
      CustomerId: "undefined",
      Name: "undefined",
      MobileNo: "undefined",
      BookingAmount: 0,
      Paymentstatus: false,
      RecieptNumber: "",
      Bookingstatus: false,
      TableName: "undefined",
      employee_id: this.employeeId,
      ConfirmStatus: false
    };

    this.dine = {
      _id: "",
      name: "",
      description: '',
      status: true,
      floor_id: '',
      employee_id: this.employeeId
    };

    this.chair = {
      _id: "",
      name: "",
      description: '',
      status: true,
      table_id: '',
      chairorderstatus: '1'
    };

    this.chair2 = { ...this.chair };

    this.chairsrunningorderarr = {
      Chairsrunningorder: [this.chair],
      tablename: "",
      receiptnumber: '',
      tokennumber: 0
    };
  }

  ngOnInit(): void {
   
    this.referesh();
    if (this.CancelOrder) {
      this.cancel(this.CancelOrder);
      this.clearCancelOrder.emit("");
    }
    if (this.pickupOrder === "pickup") {
      this.TokenNumber = 0;
      this.getOrderDetailsService.loadToday().subscribe(data => {
        this.ordersdataforToken = data;
        if (this.ordersdataforToken.data.length >= 0) {
          this.TokenNumber = this.ordersdataforToken.data.length + 1;
          this.pickup();
        } else {
          const d = new Date();
          this.TokenNumber = d.getDay() + d.getTime();
          this.pickup();
        }
      });
    }
  }

  get dateTimeStartControl(): FormControl {
    return this.myAddForm.get('ReservedDate') as FormControl;
  }

  referesh() {
    this.loadToken();
    this.datecurrent = this.gettoday();
    this.loadrunningorder();
    this.loadReservedDineData();
    this.loadfloor();
    this.loaddine();
    this.loadallchair();
  }

  Confirmedelete() {
    // deleting reserved table of customer 
    if (this.holdreservetableid !== 0) {
      this.reservedineservice.delete(this.holdreservetableid.toString()).subscribe(data => {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.data;
        this.loadReservedDineData();
        this.deleteshow = false;
      });
    }
  }
  hasRunningItem(runningItems: any[], receiptNumber: any): boolean {
    if (!runningItems || !receiptNumber) return false;
    return runningItems.some(item => item.RecieptNumber === receiptNumber);
  }
  
  deletereservedine(_id: any) {
    this.args = "";
    this.deleteshow = true;
    this.holdreservetableid = _id;
  }

  generateTimeSlots() {
    // genrating time slots 
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
    this.updateDateTime();
  }

  onTimeChange(event: any) {
    this.selectedTime = event.target.value;
    this.updateDateTime();
  }

  updateDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const combined = `${this.selectedDate}T${this.selectedTime}`;
      this.myAddForm.get('ReservedDate')?.setValue(combined);
    }
  }
  editReserveDine2(_id: any) {
    this.loadfloor();
    this.loaddine();
    this.mergeFloorNameWithDine();
    this.editreservedine(_id);

  }
  loadfloor() {
    // loading floors
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata = [];
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.data;
      }
    });
  }
  loaddine() {
    //getting all tables data
    this.service.get().subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.data;
       // this.mergeFloorNameWithDine();
      }
    });
  }

  editreservedine(_id: any) {
    // for manupulating reservedine

    // this.mergeFloorNameWithDine();
    this.args = "";
    this.editshow = true;
    this.holdreservetableid = _id;
    this.reservedineservice.getbyid(_id).subscribe(data => {
      if (data) {
        this.editreservedinefata2 = data;
        this.editreservedinefata = this.editreservedinefata2.data;
        //editreservedine
        const splitTime = this.editreservedinefata[0].ReservedDate.split('T');
        console.log(splitTime);
        console.log(this.editreservedinefata[0].ReservedDate);
        console.log(splitTime[0] + "," + splitTime[1]);
        const selectedDatepart = this.datePipe.transform(splitTime[0], 'yyyy-MM-dd')?.toString();
        this.selectedDate = selectedDatepart || '';
        const selectedTimepart = splitTime[1].split(":");
        this.selectedTimeforEdit = selectedTimepart[0] + ":00";
        console.log(this.selectedTimeforEdit.trim());
        this.myEditForm = this.formedit.group({
          _id: [_id],
          TableId: [this.editreservedinefata[0].TableId],
          ReservedDate: [this.editreservedinefata[0].ReservedDate],
          ReservedTimeSlot: [this.editreservedinefata[0].ReservedTimeSlot],
          CustomerId: [this.editreservedinefata[0].CustomerId],
          Name: [this.editreservedinefata[0].Name],
          MobileNo: [this.editreservedinefata[0].MobileNo],
          Paymentstatus: [this.editreservedinefata[0].Paymentstatus],
          Bookingstatus: [this.editreservedinefata[0].Bookingstatus],
          BookingAmount: [this.editreservedinefata[0].BookingAmount],
          RecieptNumber: [this.editreservedinefata[0].RecieptNumber]
        });
      }
    });
    this.loadfloor();
    this.loaddine();
  }

  showCustomersPopUp() {
    this.showCustomerPopUp = true;
  }

  closePopUpByChild(close: any) {
    this.showCustomerPopUp = close;
  }

  initializeCustomer(CustomerDetail: any) {
    this.CustomerId = CustomerDetail._id;
    this.getCustomerName(this.CustomerId);
    alert(this.CustomerId);
  }
  patchCustomer: any;
  getCustomerName(customer_id: string) {
    this.customerservice.getbyid(customer_id).subscribe(CustomerName => {
      this.patchCustomer = CustomerName;
      console.log(CustomerName);
      if (this.show) {
        this.myAddForm.patchValue({
          CustomerId: customer_id,
          Name: this.patchCustomer.data[0].name,
          MobileNo: this.patchCustomer.data[0].MobileNo
        })
      }
      if (this.editshow) {
        this.myEditForm.patchValue({
          CustomerId: customer_id,
          Name: this.patchCustomer.data[0].name,
          MobileNo: this.patchCustomer.data[0].MobileNo
        })
      }
    });
  }

  bindcustomer() {
    // Placeholder for future customer binding logic
  }
  reserveCustomer: any;
  confirmReserveDine(_id: string) {
    this.reserveCustomer = this.reservedinedata.find((item: { _id: string; }) => item._id === _id);
    // let index = this.reservedinedata.findIndex((item: { _id: string; })=>item._id===_id);
    console.log(this.reserveCustomer);
    this.myEditForm.patchValue({
      _id: _id,
      TableId: this.reserveCustomer.TableId,
      ReservedDate: this.reserveCustomer.ReservedDate,
      ReservedTimeSlot: this.reserveCustomer.ReservedTimeSlot,
      CustomerId: this.reserveCustomer.CustomerId,
      Name: this.reserveCustomer.Name,
      MobileNo: this.reserveCustomer.MobileNo,
      Paymentstatus: this.reserveCustomer.Paymentstatus,
      Bookingstatus: true,
      BookingAmount: this.reserveCustomer.BookingAmount,
      RecieptNumber: this.reserveCustomer.RecieptNumber
    });
    this.reserveTableEdit = {
      ...this.myEditForm.value,
      _id: this.reserveCustomer._id ?? '',
      TableId: this.reserveCustomer.TableId ?? '',
      ReservedDate: this.reserveCustomer.ReservedDate ?? '',
      ReservedTimeSlot: this.reserveCustomer.ReservedTimeSlot ?? '',
      CustomerId: this.reserveCustomer.CustomerId ?? '',
      Name: this.reserveCustomer.Name ?? '',
      MobileNo: this.reserveCustomer.MobileNo ?? '',
      Paymentstatus: this.reserveCustomer.Paymentstatus ?? '',
      Bookingstatus: true,
      BookingAmount: this.reserveCustomer.BookingAmount ?? '',
      RecieptNumber: this.reserveCustomer.RecieptNumber ?? '',
      TableName: this.reserveCustomer.TableName ?? '',
      employee_id: this.reserveCustomer.employee_id ?? '',
      ConfirmStatus: true
    };

    //   Paymentstatus: this.reserveCustomer.Paymentstatus,
    //   RecieptNumber: this.reserveCustomer.RecieptNumber,
    //   Bookingstatus: true,
    //   TableName: this.reserveCustomer.TableName,
    //   employee_id: this.reserveCustomer.employee_id,
    //   ConfirmStatus: true
    // };
    if (this.reserveCustomer) {
      this.reservedineservice.update(this.reserveTableEdit).subscribe(reservedUpdated => {
        if (reservedUpdated) {
          console.log("Reserved Dine Updated");
          this.booktable(this.reserveCustomer.TableId)
          this.loadReservedDineData();
        }
      });


    }
    // console.log(index);

  }
  searchCustomer() {

    const index = this.Customersnamedata.findIndex((item: { name: any; }) => item.name === this.myAddForm.value.CustomerId);
    if (index > 0) {
      this.serchbynamecustomer = this.Customersnamedata[index].name;
    }
  }

  checkdate() {

    this.days = +this.currentdatetime.getDate();
    if (this.days < 10) {
      this.days = "0" + this.days;
      this.months = +this.currentdatetime.getMonth();
    }
    if (this.months < 10) {
      this.months = "0" + (+this.months + 1);
      this.currentdate = `${this.currentdatetime.getFullYear()}-${this.months}-${this.days}T${this.currentdatetime.getHours()}:${this.currentdatetime.getMinutes()}`;
    }
  }
  selectdateandtime() {
    // for reserve table end date
    this.date = new Date(this.myAddForm.value.ReservedDate).getTime();
    this.now = new Date();
    const distance = this.date - this.now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.distanceday = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  showreserveDine() {
    this.loaddine();
    this.mergeFloorNameWithDine();
    this.show = true;
  }
updateReserveDine(ReserveDine_:ReserveDineEdit)
{
  this.reservedineservice.update(ReserveDine_).subscribe(data=>
  {
    if(data)
    console.log(data);
  }
  );
}
onFormSubmit()
{
  if (this.myAddForm.valid) {
    // Gather edited form values
  // Dispatch action to add a reserved table using ngrx store
  const reserveTable: ReserveDine = {
    TableId: this.myAddForm.value.TableId,
    ReservedDate: this.myAddForm.value.ReservedDate,
    ReservedTimeSlot: this.myAddForm.value.ReservedTimeSlot,
    CustomerId: this.myAddForm.value.CustomerId,
    Name: this.myAddForm.value.Name,
    MobileNo: this.myAddForm.value.MobileNo,
    Paymentstatus: this.myAddForm.value.Paymentstatus,
    Bookingstatus: this.myAddForm.value.Bookingstatus,
    ConfirmStatus: this.myAddForm.value.ConfirmStatus,
    BookingAmount: this.myAddForm.value.BookingAmount,
    RecieptNumber:  (new Date().getDate()+ new Date().getTime()).toString(),
    TableName: this.getTableName(this.myAddForm.value.TableId),
    employee_id: ''
  };

  this.store.dispatch({
    type: '[ReserveTable] Add ReserveTable',
    reserveTable
  });
  this.error$?.subscribe(error => {
    if (!error) {
      this.args='Reservation successful!'; // Or use a better UI feedback system
    }
  });
  }
}
  onFormEditSubmit() {
    if (this.myEditForm.valid) {
      // Gather edited form values
    const reserveTableEdit: ReserveDineEdit = {
      _id: this.editreservedinefata[0]._id,
      TableId: this.myEditForm.value.TableId ?? '',
      ReservedDate: this.myEditForm.value.ReservedDate ?? '',
      ReservedTimeSlot: this.myEditForm.value.ReservedTimeSlot ?? '',
      CustomerId: this.myEditForm.value.CustomerId ?? '',
      Name: this.myEditForm.value.Name ?? '',
      MobileNo: this.myEditForm.value.MobileNo ?? '',
      Paymentstatus: this.myEditForm.value.Paymentstatus ?? false,
      Bookingstatus: this.myEditForm.value.Bookingstatus ?? false,
      // ConfirmStatus is not in the type, so do not include it to avoid TS error
      BookingAmount: Number(this.myEditForm.value.BookingAmount ?? 0),
      RecieptNumber: this.editreservedinefata[0]?.RecieptNumber ?? '',
      TableName: this.getTableName(this.myEditForm.value.TableId ?? ''),
      employee_id: '',
      ConfirmStatus: false
    };
    this.store.dispatch({
      type: '[ReserveTable] Update ReserveTable',
      reserveTableEdit
    });
    this.error$?.subscribe(error => {
      if (!error) {
        this.args='Reservation updated successfully!';
      }
    });
    }
  }

  loadReservedDineData() {
    // load reserved Tables
    this.reservedineservice.get().subscribe(data => {
      if (data) {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.data;
        this.reservedLength = this.reservedinedata.length;
        this.checkReservedOrderDone();
      }
    });
  }
  invoiceRecords: any;
  checkReservedOrderDone() {
    for (let i = 0; i < this.reservedinedata.length; i++) {
      this.invoiceService.getbyid(this.reservedinedata[i].RecieptNumber).subscribe(invoiceRecord => {
        if (invoiceRecord) {
          this.invoiceRecords = invoiceRecord;
          console.log(this.invoiceRecords);
         // console.log(this.invoiceRecords.data[0].Orderstatus);
          if(this.invoiceRecords.data.length>0){
          if (this.invoiceRecords.data[0].Orderstatus == 'Done') {
            this.reservedineservice.delete(this.reservedinedata[i]._id).subscribe(ReservedDineDeleted => {
              if (ReservedDineDeleted) {
                this.loadReservedDineData();
              }
            })
          }
        }
        }
      });
    }
  }
  close() {
    // close popup
    this.show = false;
    this.deleteshow = false;
    this.editshow = false;
  }

  loadcustomers() {
    // load all customers
    this.customerservice.get().subscribe(data => {
      if (data) {
        this.Customersnamedata2 = data;
        this.Customersnamedata = this.Customersnamedata2.data;
      }
    });
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }


  pickup() {
    // clicking pickup button on orders page and then redirect to table to home page
    this.clearPickupOrder.emit("");
    this.loadchairsrunningorderselected("pickup");
  }
  groupByReceiptNumber(runningItemsKOT: any[]): { RecieptNumber: any, items: any[] }[] {
    if (!Array.isArray(runningItemsKOT)) return [];
    const grouped: { [key: string]: any[] } = {};
    for (const item of runningItemsKOT) {
      const recNo = item.RecieptNumber || item.receiptnumber || 'Unknown';
      if (!grouped[recNo]) {
        grouped[recNo] = [];
      }
      grouped[recNo].push(item);
    }
    // Convert object to array of { RecieptNumber, items }
    return Object.keys(grouped).map(RecieptNumber => ({
      RecieptNumber,
      items: grouped[RecieptNumber]
    }));
  }

  tabshow(tab: number) {

    this.tab = tab;
    this.tabactive0 = "table-tab ";
    this.tabactive1 = "table-tab ";
    this.tabactive2 = "table-tab ";
    this.tabactive3 = "table-tab ";
    this.tabactive4 = "table-tab ";
    switch (tab) {
      case 0:
        this.tabactive0 += "active";
        break;
      case 1:
        this.tabactive1 += "active";
        break;
      case 2:
        this.tabactive2 += "active";
        break;
      case 3:
        this.tabactive3 += "active";
        this.loadBilled();
        break;
        case 4:
          this.tabactive4 += "active";
          break;
      default:
        // Do nothing for other tabs
        break;
    }
  }

  cancel(InvoiceID: any) {
    //cancelling running order
    this.chairsrunningorderservice.getbyid(InvoiceID).subscribe(data => {
      if (data) {
        this.runningorder_cancel_by_id = [];
        this.runningorder2_cancel_by_id = data;
        this.runningorder_cancel_by_id = this.runningorder2_cancel_by_id.data;
        if (this.runningorder_cancel_by_id[0].Chairsrunningorder.length > 0) {
          let dineUpdateRecordindex;
          this.service.get().subscribe(data => {
            if (data) {
              this.dinedata2 = data;
              this.dinedata = this.dinedata2.data;
              dineUpdateRecordindex = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == this.runningorder_cancel_by_id[0].Chairsrunningorder[0].table_id);
              if (dineUpdateRecordindex > 0) {
                this.dine = {
                  _id: this.dinedata[dineUpdateRecordindex]._id,
                  name: this.dinedata[dineUpdateRecordindex].name,
                  description: this.dinedata[dineUpdateRecordindex].description,
                  status: true,
                  floor_id: this.dinedata[dineUpdateRecordindex].floor_id,
                  employee_id: this.employeeId
                };
                this.service.update(this.dine).subscribe(data => {
                  if (data) {
                    this.loadallchair();
                    this.loadrunningorder();
                  }
                });
              }
            }
          });
        }

        for (let ii = 0; ii < this.runningorder_cancel_by_id[0].Chairsrunningorder.length; ii++) {
          this.chair2._id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii]._id;
          this.chair2.name = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].name;
          this.chair2.description = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].description;
          this.chair2.status = true;
          this.chair2.table_id = this.runningorder_cancel_by_id[0].Chairsrunningorder[ii].table_id;
          this.chair2.chairorderstatus = "1";
          this.chairservice.update(this.chair2).subscribe();
        }

        this.chairsrunningorderservice.delete(InvoiceID).subscribe();
        this.invoiceService.getbyid(InvoiceID).subscribe(data => {
          if (data) {
            this.getforinvoiceiddata = [];
            this.getforinvoiceiddata2 = data;
            this.getforinvoiceiddata = this.getforinvoiceiddata2.data;
            for (let ii = 0; ii < this.getforinvoiceiddata.length; ii++) {
              this.invoicedelete = {
                Taxes: this.getforinvoiceiddata[ii].Taxes,
                Chairs: this.getforinvoiceiddata[ii].Chairs,
                AddOnItems:[],
                taxpecentRate: 0,
                taxpercentValue: 0,
                DiscountId: this.getforinvoiceiddata[ii].DiscountId,
                Discountvalue: 0,
                Discountperstage: 0,
                AdditionaldiscountAmount: 0,
                Totalvaue: 0,
                grandtotal: 0,
                RecieptNumber: this.getforinvoiceiddata[ii].RecieptNumber,
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
              };
            }
            this.invoiceService.update(this.invoicedelete).subscribe(updateddata => {
              if (updateddata) {
                this.referesh();
              }
            });
          }
        });
      }
    });
  }
  goToHomeBookedTable(_id:string,tablename:string)
  {
    console.log(_id);
    console.log( this.runningorder);
    // First, try to find in this.runningorder by table_id directly
    // let reservedTable = this.runningorder.find(
    //   (item: { tablename: string }) => item.tablename === tablename
    // );
    // If not found, check nested Chairsrunningorder
    //if (!reservedTable) {
    const  reservedTable = this.runningorder.find(
        (item: { Chairsrunningorder?: any[] }) => 
          item.Chairsrunningorder &&
          item.Chairsrunningorder.find(
            (chair: { table_id: string }) => chair.table_id === _id
          )
      );
      console.log(reservedTable);
    //}
   // console.log(reservedTable);
    if (reservedTable) {
       this.gotohome(reservedTable.receiptnumber, reservedTable.tokennumber);
    
    }
  }
  redirectto_gotohome(RecieptNumber: string) {

    console.log(RecieptNumber);
    console.log(this.runningorder[0].receiptnumber);
    const reservedTable = this.runningorder.find((item: { receiptnumber: string }) => item.receiptnumber === RecieptNumber);
    console.log(reservedTable);
    if (reservedTable) {
      this.gotohome(reservedTable.receiptnumber, reservedTable.tokennumber);
      // console.log(reservedTable);
    }
  }
  gotohome(InvoiceID: any, TokenNumber: number) {
    // redirect to home page with Invoice ID and TokenNumber and jsk use for split by jsk
    this.notifyManage2.emit(InvoiceID + "jsk" + TokenNumber);
  }

  loadrunningorder() {
    // loading chairs for using data in another functions
    this.chairsrunningorderservice.get().subscribe(data => {
      if (data) {
        this.runningorder = [];
        this.runningorder2 = data;
        this.runningorder = this.runningorder2.data;
        this.runningOrderLength = this.runningorder.length;
      }
    });
  }


  mergeFloorNameWithDine(): void {
    this.MergeFloorNameWithDineList = this.dinedata.map((dine: { _id: any; floor_id: any; name: any; description: any; status: any; }) => ({
      _id: String(dine._id),
      FloorName: this.getFloorName(String(dine.floor_id)),
      name: String(dine.name),
      description: String(dine.description),
      status: dine.status,
      floor_id: dine.floor_id
    }));
    this.FloorWithDineData = this.MergeFloorNameWithDineList;
  }

  getFloorName(floor_id: string): string {
    const floor = this.Floordata.find((item: { _id: string }) => item._id === floor_id);
    return floor ? floor.name : '';
  }
  getTableName(table_id: string): string {
  const table = this.dinedata.find((item: { _id: string }) => item._id === table_id);
  return table ? table.name : '';
  }
  chairstatus(e: any, name: string, description: string, table_id: string) {
    // checking chair status for selecting chairs .. this further use coding
    this.checkbox = document.getElementById(e);
    if (!this.checkbox.checked) {
      this.chairstatusupdate(e, "2", true, name, description, table_id);
    } else if (this.checkbox.checked) {
      this.chairstatusupdate(e, "1", this.checkbox.checked, name, description, table_id);
    }
  }

  chairstatusupdate(id: any, chairorderstatusvalue: any, status: boolean, name: string, description: string, table_id: string) {
    // updating chair status for selecting chairs .. this further use coding
    this.chair._id = id;
    this.chair.name = name;
    this.chair.description = description;
    this.chair.status = status;
    this.chair.table_id = table_id;
    this.chair.chairorderstatus = chairorderstatusvalue;
    this.chairservice.update(this.chair).subscribe();
  }

  loadallchair() {
    this.chairservice.get().subscribe(data => {
      if (data) {
        this.chairs = [];
        this.chairs2 = data;
        this.chairs = this.chairs2.data;
      }
    });
  }

  loadchair(table_id: string) {
    // Placeholder for loading a single chair by table_id
  }

  getchair(arg0: any) {
    // Placeholder for getchair logic
  }

  booktable(tablename: any) {
    //call function booking table by table of pickup
    this.loadchairsrunningorderselected(tablename);
  }

  loadchairsrunningorderselected(tablename: any) {
    //receive function booking table by table of pickup
    const d = new Date();
    this.invoiceidforpickup = d.getFullYear() + d.getTime();
    if (tablename === "pickup") {
      this.invoiceidforpickup = d.getFullYear() + d.getTime();
      this.chairsrunningorderarr = {
        Chairsrunningorder: [],
        tablename: "pickup",
        receiptnumber: this.invoiceidforpickup.toString(),
        tokennumber: this.TokenNumber
      };
      this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
        if (res) {
          this.chairs2 = res;
          this.pickupinvoiceid = this.chairs2.data.receiptnumber;
          this.invoicepickup = {
            Taxes: [],
            Chairs: [],
            AddOnItems:[],
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
            tokennumber: this.TokenNumber,
          };
          this.invoiceService.add(this.invoicepickup).subscribe(inv => {
            if (inv) {
              this.notifyManage2.emit(this.pickupinvoiceid.toString() + "jsk" + this.TokenNumber);
            }
          });
        }
      });
    } else {
      this.chairservice.getbytable_id(tablename).subscribe(data => {
        if (data) {
          this.chairsbytable_id = data;
          for (let ii = 0; ii < this.chairsbytable_id.data.length; ii++) {
            if (this.chairsbytable_id.data[ii].table_id == tablename && this.chairsbytable_id.data[ii].chairorderstatus == "1") {
              this.chairsrunningorderarr2.push({
                _id: this.chairsbytable_id.data[ii]._id,
                name: this.chairsbytable_id.data[ii].name,
                description: this.chairsbytable_id.data[ii].description,
                status: true,
                table_id: this.chairsbytable_id.data[ii].table_id,
                chairorderstatus: "1",
              });
              this.chairsrunningorderarr3 = this.chairsrunningorderarr2;
            }
          }
        }
        const inde = this.dinedata.findIndex((Itm: { _id: any; }) => Itm._id == tablename);
        this.tablename = this.dinedata[inde].name;
        this.chairsrunningorderarr = {
          Chairsrunningorder: this.chairsrunningorderarr3,
          tablename: this.dinedata[inde].name,
          receiptnumber: this.reserveCustomer != undefined ? this.reserveCustomer.RecieptNumber : this.invoiceidforpickup.toString(),
          tokennumber: this.TokenNumber
        };
        this.chairsrunningorderservice.add(this.chairsrunningorderarr).subscribe(res => {
          if (res) {
            let jsk = 0;
            for (let ii = 0; ii < this.chairsbytable_id.data.length; ii++) {
              if (this.chairsbytable_id.data[ii].table_id == tablename && this.chairsbytable_id.data[ii].chairorderstatus == "1") {
                this.chair._id = this.chairsbytable_id.data[ii]._id;
                this.chair.name = this.chairsbytable_id.data[ii].name;
                this.chair.description = this.chairsbytable_id.data[ii].description;
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.data[ii].table_id;
                this.chair.chairorderstatus = "1";
                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    jsk++;
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                  }
                });
              } else if (this.chairsbytable_id.data[ii].table_id == tablename && this.chairsbytable_id.data[ii].chairorderstatus == "2") {
                this.chair._id = this.chairsbytable_id.data[ii]._id;
                this.chair.name = this.chairsbytable_id.data[ii].name;
                this.chair.description = this.chairsbytable_id.data[ii].description;
                this.chair.status = true;
                this.chair.table_id = this.chairsbytable_id.data[ii].table_id;
                this.chair.chairorderstatus = "1";
                this.chairservice.update(this.chair).subscribe(data => {
                  if (data) {
                    this.loadallchair();
                    this.loaddine();
                    this.loadrunningorder();
                    jsk++;
                  }
                });
              } else if (this.chairsbytable_id.data[ii].table_id == tablename && this.chairsbytable_id.data[ii].chairorderstatus == "0") {
                jsk++;
                this.loadallchair();
                this.loaddine();
                this.loadrunningorder();
              }
            }
            console.log(this.reserveCustomer);
            this.chairs2 = res;
            if (this.reserveCustomer != undefined) {
              this.invoiceid = this.reserveCustomer.RecieptNumber;
            }
            else {
              this.invoiceid = this.chairs2.data.receiptnumber;
            }


            this.invoice = {
              Taxes: [],
              Chairs: [],
              AddOnItems:[],
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
              table_id: this.reserveCustomer != undefined ? this.reserveCustomer.TableId : tablename,
              customer_id: this.reserveCustomer != undefined ? this.reserveCustomer.CustomerId : "undefined",
              employee_id: this.employeeId,
              tablename: this.reserveCustomer != undefined ? this.reserveCustomer.TableName : this.tablename,
              AssistToId: 'undefined',
              CommentId: 'undefined',
              returnAmount: 0,
              tokennumber: this.TokenNumber,
            };
            this.invoiceService.add(this.invoice).subscribe(inv => {
              if (inv) {
                this.dine.status = false;
                this.dine._id = tablename;
                this.dine.name = this.dinedata[inde].name;
                this.dine.description = this.dinedata[inde].description;
                this.dine.floor_id = this.dinedata[inde].floor_id;
                this.service.update(this.dine).subscribe(data => {
                  if (data) {
                    // this.loadallchair();
                    // this.loaddine();
                    // this.loadrunningorder();
                    this.notifyManage2.emit(this.invoiceid + "jsk" + this.TokenNumber);
                  }
                });
              }
            });
            this.invoiceid2 = this.invoiceid.toString();
          }
        });
      });
    }
  }

  loadToken() {
    // this function is resposible for making token number
    this.TokenNumber = 0;
    this.getOrderDetailsService.loadToday().subscribe(data => {
      this.ordersdataforToken = data;
      if (this.ordersdataforToken.data.length >= 0) {
        this.TokenNumber = this.ordersdataforToken.data.length + 1;
      } else {
        const d = new Date();
        this.TokenNumber = d.getDay() + d.getTime();
      }
    });
  }

  loadBilled() {
    // this is loading by today date all sattled bill
    this.getOrderDetailsService.loadToday().subscribe((todaydata: any) => {
      this.ordersdata2 = todaydata;
      this.ordersdata = this.ordersdata2.data;
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
      }
    });
  }

  gettoday(): Date {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
    this.date = yesterday.toISOString().split('T')[0];
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    const createdAt = `${formattedyesterday}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}Z`;
    return new Date(createdAt);
  }

}