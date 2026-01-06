import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  QuantitytypeService
} from '../../core/Services/quantitytype.service';
import {
  Router
} from '@angular/router';
import {
  IChair,
  IChairsrunningorder,
  IDine,
  IFloorMergeWithDine,
  ReserveDine,
  ReserveDineEdit
} from '../../core/Model/crud.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  ICellRendererParams
} from 'ag-grid-community';
import {
  DineService
} from '../../core/Services/dine.service';
import {
  FloorService
} from '../../core/Services/floor.service';
import {
  ChairService
} from '../../core/Services/chair.service';
import {
  ChairServiceService
} from '../../core/Services/chairsrunningorders.serivce';
import {
  DatePipe
} from '@angular/common';
import {
  InvoiceService
} from '../../core/Services/invoice.service';
import {
  CustomresService
} from '../../core/Services/customers.service';
import {
  ReserveDineService
} from '../../core/Services/reserveDine.service';
import {
  GetOrderDetailsService
} from '../../core/commanFunction/getOrderDetails.service';
import {
  InitializeInvoice
} from '../../core/commanFunction/InitializeInvoice.service';
import {
  Store
} from '@ngrx/store';
import {
  Observable
} from 'rxjs/internal/Observable';
import { ManageService } from '../../core/Services/manage.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
  providers: [DatePipe],
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class TablesComponent implements OnInit {
  @Input() Floordata$: any;
  @Input() DineData$: any;
 // @Input() TokenNumber: any;
 TokenNumber:number;
  @Input() runningItemsKOT$?: Observable<any[]>;
  @Input() pickupOrder: any;
  @Input() CancelOrder: any;

  @Output() clearCancelOrder = new EventEmitter<string>();
  @Output() clearPickupOrder = new EventEmitter<string>();
  @Output() notifyManage3 = new EventEmitter<string>();
  @Output() notifyManage2 = new EventEmitter<string>();

  // State
  MergeFloorNameWithDineList: IFloorMergeWithDine[] = [];
  FloorWithDineData: IFloorMergeWithDine[] = [];
  selectedTimeforEdit: string = '';
  currentTime: string = '';
  editreservedinefata: any;
  editreservedinefata2: any;
  currentDateOnly = '';
  selectedDate = '';
  selectedTime = '';
  availableTimeSlots: string[] = [];
  pickupinvoiceid = 0;
  // ordersdataforToken: any;
  isChecked = false;
  date: any;
  now: any = new Date().getTime().toString();
  distanceday: any;
  currentdatetime = new Date();
  currentdate: any;
  // isCheckedPaymentstatus: any = false;
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
  //datecurrent: any;
  reservedLength = 0;
  // button: any;
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
  dinedata2: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  tabactive0: any;
  tabactive1: any;
  tabactive2: any;
  tabactive3: any;
  tabactive4: any;
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
  reserveTableEdit?: ReserveDineEdit;
  resevetable: ReserveDine;
  dine: IDine;
  chair: IChair;
  chair2: IChair;
  chairsrunningorderarr: IChairsrunningorder;
  checkbox: any | null;
  ReservedTable$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  patchCustomer: any;
  reserveCustomer: any;
  invoiceRecords: any;

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
    private store: Store<{ reserveTableReducer_: any }>,
    private manageService:ManageService
  ) {
   // this.ReservedTable$ = this.store.select(state => state.reserveTableReducer_.ReserveTables.data);
    const today = new Date();
    this.currentTime = `${today.getHours() > 12 ? today.getHours() - 12 : today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    this.currentDateOnly = today.toISOString().split('T')[0];
    this.selectedDate = this.currentDateOnly;
    this.generateTimeSlots();
    // this.invoicedelete = this.initializeInvoice.initializeInvoice("Cancelled", this.employeeId, 0);
    // this.invoicepickup = this.initializeInvoice.initializeInvoice("New Order", this.employeeId, 0);
    // this.invoice = this.initializeInvoice.initializeInvoice("Cancelled", this.employeeId, 0);
    this.TokenNumber=0;
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
      Name: ['', new FormControl({ value: '', disabled: true })],
      MobileNo: ['', new FormControl({ value: '', disabled: true })],
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
      Name: ['', new FormControl({ value: '', disabled: true })],
      MobileNo: ['', new FormControl({ value: '', disabled: true })],
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
     // alert("Cancel "+this.CancelOrder);
     //this.CancelOrder === invoiceID
      this.cancel(this.CancelOrder);
      this.clearCancelOrder.emit("");
    }
    if (this.pickupOrder === "pickup") {
      this.TokenNumber = 0;
      this.manageService.loadToken();
      this.TokenNumber = +this.manageService.TokenNumber$.getValue();
      this.pickup();
      // this.getOrderDetailsService.loadToday().subscribe(data => {
      //   this.ordersdataforToken = data;
      //   if (this.ordersdataforToken.data.length >= 0) {
      //     this.TokenNumber = this.ordersdataforToken.data.length + 1;
      //     this.pickup();
      //   } else {
      //     const d = new Date();
      //     this.TokenNumber = d.getDay() + d.getTime();
      //     this.pickup();
      //   }
      // });
    }
  }

  get dateTimeStartControl(): FormControl {
    return this.myAddForm.get('ReservedDate') as FormControl;
  }

  referesh(): void {
   // this.datecurrent = this.gettoday();
    this.loadrunningorder();
    this.loadReservedDineData();
    this.loadallchair();
  }

  Confirmedelete(): void {
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

  deletereservedine(_id: any): void {
    this.args = "";
    this.deleteshow = true;
    this.holdreservetableid = _id;
  }

  generateTimeSlots(): void {
    const startHour = 10;
    const endHour = 22;
    this.availableTimeSlots = [];
    for (let hour = startHour; hour <= endHour; hour += 2) {
      const hourStr = hour.toString().padStart(2, '0');
      this.availableTimeSlots.push(`${hourStr}:00`);
    }
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.updateDateTime();
  }

  onTimeChange(event: any): void {
    this.selectedTime = event.target.value;
    this.updateDateTime();
  }

  updateDateTime(): void {
    if (this.selectedDate && this.selectedTime) {
      const combined = `${this.selectedDate}T${this.selectedTime}`;
      this.myAddForm.get('ReservedDate')?.setValue(combined);
    }
  }
  goToHomeKOTedTable(tableId: any, tableName: string): void {
   
    const KOTTable = this.runningorder?.find((item: any) =>
      item?.Chairsrunningorder?.some((chair: any) => chair.table_id === tableId)
    );
    if (KOTTable?.receiptnumber && KOTTable?.tokennumber !== undefined) {
      this.gotohome(KOTTable.receiptnumber, KOTTable.tokennumber);
    }
    // console.log(`Go to Running KOT for Table: ${tableName} (ID: ${tableId})`);

    // Insert your implementation here as needed.
  }

  editReserveDine2(_id: any): void {
    this.mergeFloorNameWithDine();
    this.editreservedine(_id);
  }

  editreservedine(_id: any): void {
    this.args = "";
    this.editshow = true;
    this.holdreservetableid = _id;
    this.reservedineservice.getbyid(_id).subscribe(data => {
      if (data) {
        this.editreservedinefata2 = data;
        this.editreservedinefata = this.editreservedinefata2.data;
        const splitTime = this.editreservedinefata[0].ReservedDate.split('T');
        const selectedDatepart = this.datePipe.transform(splitTime[0], 'yyyy-MM-dd')?.toString();
        this.selectedDate = selectedDatepart || '';
        const selectedTimepart = splitTime[1].split(":");
        this.selectedTimeforEdit = selectedTimepart[0] + ":00";
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
  }

  showCustomersPopUp(): void {
    this.showCustomerPopUp = true;
  }

  closePopUpByChild(close: boolean): void {
    this.showCustomerPopUp = close;
  }

  initializeCustomer(CustomerDetail: any): void {
    this.CustomerId = CustomerDetail._id;
    this.getCustomerName(this.CustomerId);
    alert(this.CustomerId);
  }

  getCustomerName(customer_id: string): void {
    this.customerservice.getbyid(customer_id).subscribe(CustomerName => {
      this.patchCustomer = CustomerName;
      if (this.show) {
        this.myAddForm.patchValue({
          CustomerId: customer_id,
          Name: this.patchCustomer.data[0].name,
          MobileNo: this.patchCustomer.data[0].MobileNo
        });
      }
      if (this.editshow) {
        this.myEditForm.patchValue({
          CustomerId: customer_id,
          Name: this.patchCustomer.data[0].name,
          MobileNo: this.patchCustomer.data[0].MobileNo
        });
      }
    });
  }

  bindcustomer(): void {
    // Future implementation
  }

  confirmReserveDine(_id: string): void {
    this.reserveCustomer = this.reservedinedata.find((item: { _id: string }) => item._id === _id);
    if (!this.reserveCustomer) return;
    this.myEditForm.patchValue({
      _id,
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
    this.reservedineservice.update(this.reserveTableEdit).subscribe(reservedUpdated => {
      if (reservedUpdated) {
        this.booktable(this.reserveCustomer.TableId);
        this.loadReservedDineData();
      }
    });
  }

  searchCustomer(): void {
    const index = this.Customersnamedata.findIndex((item: { name: any }) => item.name === this.myAddForm.value.CustomerId);
    if (index > 0) {
      this.serchbynamecustomer = this.Customersnamedata[index].name;
    }
  }

  checkdate(): void {
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

  selectdateandtime(): void {
    this.date = new Date(this.myAddForm.value.ReservedDate).getTime();
    this.now = new Date();
    const distance = this.date - this.now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.distanceday = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  showreserveDine(): void {
    this.mergeFloorNameWithDine();
    this.show = true;
  }

  updateReserveDine(ReserveDine_: ReserveDineEdit): void {
    this.reservedineservice.update(ReserveDine_).subscribe(data => {
      if (data) console.log(data);
    });
  }

  onFormSubmit(): void {
    if (this.myAddForm.valid) {
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
        RecieptNumber: (new Date().getDate() + new Date().getTime()).toString(),
        TableName: this.getTableName(this.myAddForm.value.TableId),
        employee_id: ''
      };

      this.store.dispatch({
        type: '[ReserveTable] Add ReserveTable',
        reserveTable
      });
      this.error$?.subscribe(error => {
        if (!error) {
          this.args = 'Reservation successful!';
        }
      });
    }
  }

  onFormEditSubmit(): void {
    if (this.myEditForm.valid) {
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
          this.args = 'Reservation updated successfully!';
        }
      });
    }
  }

  loadReservedDineData(): void {
    this.reservedineservice.get().subscribe(data => {
      if (data) {
        this.reservedinedata2 = data;
        this.reservedinedata = this.reservedinedata2.data;
        this.reservedLength = this.reservedinedata.length;
      }
    });
  }

  close(): void {
    this.show = false;
    this.deleteshow = false;
    this.editshow = false;
  }

  loadcustomers(): void {
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

  pickup(): void {
    this.clearPickupOrder.emit("");
    this.loadchairsrunningorderselected("pickup");
  }

  loadRunningKOT(receiptNumber: any): void {
    // To be implemented
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
    return Object.keys(grouped).map(RecieptNumber => ({
      RecieptNumber,
      items: grouped[RecieptNumber]
    }));
  }

  tabshow(tab: number): void {
    this.tab = tab;
    this.tabactive0 = "table-tab ";
    this.tabactive1 = "table-tab ";
    this.tabactive2 = "table-tab ";
    this.tabactive3 = "table-tab ";
    this.tabactive4 = "table-tab ";
    switch (tab) {
      case 0: this.tabactive0 += "active"; break;
      case 1: this.tabactive1 += "active"; break;
      case 2: this.tabactive2 += "active"; break;
      case 3:
        this.tabactive3 += "active";
        this.loadBilled();
        break;
      case 4: this.tabactive4 += "active"; break;
    }
  }

  cancel(InvoiceID: any): void {
    this.chairsrunningorderservice.getbyid(InvoiceID).subscribe(data => {
      if (!data) return;

      this.runningorder2_cancel_by_id = data;
      this.runningorder_cancel_by_id = this.runningorder2_cancel_by_id.data;

      const runningOrder = Array.isArray(this.runningorder_cancel_by_id)
        ? this.runningorder_cancel_by_id[0]
        : undefined;
      const chairs = runningOrder?.Chairsrunningorder || [];

      if (chairs.length > 0) {
        const tableId = chairs[0]?.table_id;
        // this.DineData$.subscribe((DineData: any) => {
        //   this.dinedata2 = DineData.data;
        // });
        this.DineData$.subscribe((DineData: any) => {
          this.dinedata2 = DineData?.data || DineData || [];
        });
        console.log(this.dinedata2);
        if (Array.isArray(this.dinedata2)) {
          const dine = this.dinedata2.find((itm: { _id: any }) => itm._id === tableId);
          console.log(dine);
          if (dine) {
            const updatedDine = {
              _id: dine._id,
              name: dine.name,
              description: dine.description,
              status: true,
              floor_id: dine.floor_id,
              employee_id: this.employeeId
            };
            this.service.update(updatedDine).subscribe(resp => {
              if (!resp) return;
                this.referesh();
                this.service.loaddine();
                this.DineData$ = this.service.dinedataSubject$;
                chairs.forEach((chair: any) => {
                  const updatedChair = {
                    ...this.chair2,
                    _id: chair._id,
                    name: chair.name,
                    description: chair.description,
                    status: true,
                    table_id: chair.table_id,
                    chairorderstatus: "1"
                  };
                  this.chairservice.update(updatedChair).subscribe(updated=>
                  {
                    if(!updated)return;
                    this.chairsrunningorderservice.delete(InvoiceID).subscribe(deleted=>
                    {
                      if(!deleted)return;
                      this.invoiceService.getbyid(InvoiceID).subscribe((invoiceResp: any) => {
                        if (!invoiceResp) return;
                        let invoices: any[] = [];
                        if (Array.isArray(invoiceResp.data)) {
                          invoices = invoiceResp.data;
                        } else if (Array.isArray(invoiceResp)) {
                          invoices = invoiceResp;
                        } else {
                          if (invoiceResp.data) invoices = [invoiceResp.data];
                          else if (invoiceResp) invoices = [invoiceResp];
                        }
                        invoices.forEach((inv: any) => {
                          const cancelInvoice = {
                            ...inv,
                            AddOnItems: [],
                            taxpecentRate: 0,
                            taxpercentValue: 0,
                            Discountvalue: 0,
                            Discountperstage: 0,
                            AdditionaldiscountAmount: 0,
                            Totalvaue: 0,
                            grandtotal: 0,
                            PaidAmount: 0,
                            PendingAmount: 0,
                            TotalTaxAmount: 0,
                            TotalItemsAmount: 0,
                            Orderstatus: "Cancelled",
                            AssistToId: inv.AssistToId ?? '',
                            CommentId: inv.Comment ?? '',
                            returnAmount: inv.returnAmount ?? ''
                          };
                          this.invoiceService.update(cancelInvoice).subscribe(updateddata => {
                            if (updateddata) {
                              this.referesh();
                            }
                          });
                        });
                      });
                    }
                    );
                  }
                  );
                });
               });
          }
        }
      }

     

     

      
    });
  }
  loadrunningorder(): void {
    this.chairsrunningorderservice.get().subscribe(data => {
      if (data) {
        this.runningorder = [];
        this.runningorder2 = data;
        this.runningorder = this.runningorder2.data;
      }
    });
  }
  goToHomeBookedTable(_id: string, tablename: string): void {
   // alert("Home");
    const reservedTable = this.runningorder?.find((item: any) =>
      item?.Chairsrunningorder?.some((chair: any) => chair.table_id === _id)
    );
    if (reservedTable?.receiptnumber && reservedTable?.tokennumber !== undefined) {
      this.gotohome(reservedTable.receiptnumber, reservedTable.tokennumber);
    }
  }

  redirectto_gotohome(RecieptNumber: string): void {
    const reservedTable = this.runningorder?.find(
      (item: any) => item?.receiptnumber === RecieptNumber
    );
    if (reservedTable?.receiptnumber && reservedTable?.tokennumber !== undefined) {
      this.gotohome(reservedTable.receiptnumber, reservedTable.tokennumber);
    }
  }

  gotohome(InvoiceID: any, TokenNumber: number): void {
    const combinedToken = `${InvoiceID}jsk${TokenNumber}`;
    this.notifyManage2.emit(combinedToken);
  }

  

  mergeFloorNameWithDine(): void {
    this.DineData$.subscribe((dineArr: any) => {
      if (!Array.isArray(dineArr)) return;
      this.MergeFloorNameWithDineList = dineArr.map((dine: any) => ({
        _id: String(dine._id),
        FloorName: this.getFloorName(String(dine.floor_id)),
        name: String(dine.name),
        description: String(dine.description),
        status: dine.status,
        floor_id: dine.floor_id
      }));
      this.FloorWithDineData = [...this.MergeFloorNameWithDineList];
    });
  }

  getFloorName(floor_id: string): string {
    let floorName = '';
    this.Floordata$.subscribe((Floordata: any) => {
      const floor = Floordata.find((item: { _id: string }) => item._id === floor_id);
      floorName = floor && typeof floor.name === 'string' ? floor.name : '';
    });
    return floorName;
  }

  getTableName(table_id: string): string {
    let name = '';
    this.DineData$.subscribe((DineData: any) => {
      const table = DineData.find((item: { _id: string }) => item._id === table_id);
      name = table && typeof table.name === 'string' ? table.name : '';
    });
    return name;
  }

  chairstatus(e: any, name: string, description: string, table_id: string): void {
    this.checkbox = document.getElementById(e);
    if (!this.checkbox.checked) {
      this.chairstatusupdate(e, "2", true, name, description, table_id);
    } else if (this.checkbox.checked) {
      this.chairstatusupdate(e, "1", this.checkbox.checked, name, description, table_id);
    }
  }

  chairstatusupdate(id: any, chairorderstatusvalue: any, status: boolean, name: string, description: string, table_id: string): void {
    this.chair._id = id;
    this.chair.name = name;
    this.chair.description = description;
    this.chair.status = status;
    this.chair.table_id = table_id;
    this.chair.chairorderstatus = chairorderstatusvalue;
    this.chairservice.update(this.chair).subscribe();
  }

  loadallchair(): void {
    this.chairservice.get().subscribe(data => {
      if (data) {
        this.chairs = [];
        this.chairs2 = data;
        this.chairs = this.chairs2.data;
      }
    });
  }

  loadchair(table_id: string): void {
    // Placeholder
  }
  getchair(arg0: any): void {
    // Placeholder
  }

  booktable(tablename: any): void {
    this.loadchairsrunningorderselected(tablename);
  }

  loadchairsrunningorderselected(tablename: any): void {
    const now = new Date();
    if(!this.TokenNumber || this.TokenNumber==0) 
    {
      this.manageService.loadToken();
      this.TokenNumber = +this.manageService.TokenNumber$.getValue();
    }

    this.invoiceidforpickup = now.getFullYear() + now.getTime();
    if (tablename === "pickup") {
      const chairsRunningOrder = {
        Chairsrunningorder: [],
        tablename: "pickup",
        receiptnumber: this.invoiceidforpickup.toString(),
        tokennumber: this.TokenNumber
      };

      this.chairsrunningorderservice.add(chairsRunningOrder).subscribe(res => {
        if (res && res.data) {
          this.chairs2 = res;
          this.pickupinvoiceid = res.data.receiptnumber;
          const invoicepickup = {
            Taxes: [],
            Chairs: [],
            AddOnItems: [],
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
            returnAmount: "0",
            tokennumber: this.TokenNumber,
            createdAt: new Date()
          };
          this.invoiceService.add(invoicepickup).subscribe(inv => {
            if (inv) {
              this.notifyManage2.emit(`${this.pickupinvoiceid}jsk${this.TokenNumber}`);
            }
          });
        }
      });
    } else {
      this.chairservice.getbytable_id(tablename).subscribe(data => {
        if (!data) return;
        this.chairsbytable_id = data;
        const runningChairs = (this.chairsbytable_id.data || [])
          .filter((chair: any) => chair.table_id === tablename && chair.chairorderstatus === "1")
          .map((chair: any) => ({
            _id: chair._id,
            name: chair.name,
            description: chair.description,
            status: true,
            table_id: chair.table_id,
            chairorderstatus: "1"
          }));
        this.chairsrunningorderarr3 = runningChairs;
       let dineDataArray: any[] = [];
       const dineDataSub = this.DineData$.subscribe((data: any[]) => {
         dineDataArray = data;
       });


       
          const tableObj = Array.isArray(dineDataArray)
            ? dineDataArray.find((itm: { _id: any }) => itm._id === tablename)
            : undefined;
          this.tablename = tableObj && tableObj.name ? tableObj.name : "";
          const chairsRunningOrder = {
            Chairsrunningorder: this.chairsrunningorderarr3,
            tablename: this.tablename,
            receiptnumber: this.reserveCustomer?.RecieptNumber ?? this.invoiceidforpickup.toString(),
            tokennumber: this.TokenNumber
          };
          this.chairsrunningorderservice.add(chairsRunningOrder).subscribe(res => {
            if (res && res.data) {
              for (const chair of this.chairsbytable_id.data) {
                if (chair.table_id === tablename) {
                  if (chair.chairorderstatus === "1" || chair.chairorderstatus === "2") {
                    this.chair = {
                      _id: chair._id,
                      name: chair.name,
                      description: chair.description,
                      status: true,
                      table_id: chair.table_id,
                      chairorderstatus: "1"
                    };
                    this.chairservice.update(this.chair).subscribe(uData => {
                      if (uData) {
                        this.loadallchair();
                        this.loadrunningorder();
                      }
                    });
                  } else if (chair.chairorderstatus === "0") {
                    this.loadallchair();
                    this.loadrunningorder();
                  }
                }
              }
              this.chairs2 = res;
              this.invoiceid = this.reserveCustomer?.RecieptNumber ?? this.chairs2.data.receiptnumber;
              const invoice = {
                Taxes: [],
                Chairs: [],
                AddOnItems: [],
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
                table_id: this.reserveCustomer ? this.reserveCustomer.TableId : tablename,
                customer_id: this.reserveCustomer ? this.reserveCustomer.CustomerId : "undefined",
                employee_id: this.employeeId,
                tablename: this.reserveCustomer ? this.reserveCustomer.TableName : this.tablename,
                AssistToId: 'undefined',
                CommentId: 'undefined',
                returnAmount: 0,
                tokennumber: this.TokenNumber,
                createdAt: new Date().toISOString()
              };
              (this.invoiceService.add(invoice as any)).subscribe(inv => {
                if (inv) {
                  this.dine.status = false;
                  this.dine._id = tablename;
                  this.DineData$.subscribe((updateDineArr: any[]) => {
                    const dine = Array.isArray(updateDineArr)
                      ? updateDineArr.find((item: any) => item._id === tablename)
                      : null;
                    this.dine.name = dine ? dine.name : '';
                    this.dine.description = dine ? dine.description : '';
                    this.dine.floor_id = dine ? dine.floor_id : '';
                    this.service.update(this.dine).subscribe(data => {
                      if (data) {
                        this.notifyManage2.emit(`${this.invoiceid}jsk${this.TokenNumber}`);
                      }
                    });
                  });
                }
              });
              this.invoiceid2 = this.invoiceid.toString();
            }
          });
        
      });
    }
  }

  loadBilled(): void {
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

  
}