import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscribable, Subscription } from 'rxjs';
import { filter,take } from 'rxjs/operators';
import * as InvoiceActions from '../core/store/invoiceStor/invoice.actions';


import {
  ProductPrice,
  ProductPriceDetails,
  Invoice,
  GenratedItems,
  ITax,
  IChair,
  InventoryFoodMain2,
  IDine,
  IAddOnItems,
  AddOnProductEdit,
  GenratedItemKOT,
  IItems
} from '../core/Model/crud.model';

import * as GentratedItemsActions from './homeStore/GentratedItemsStore/GenratedItems.action';

import * as DineTableActions from '../dine/dineStore/dinetableStore/dinetable.action';


import { RunningItems } from '../core/Model/RunningItemsHomeModel/RunningItem.model';
import { addAddOnProductService } from '../core/Services/addOnProduct.service';
import { DatePipe } from '@angular/common';
import { HomeEnvironment } from '../environment/homeEnvironment';
import * as AddOnProductActions from '../manage/ManageStore/addOnProductStore/addOnProduct.action';
import { Actions,ofType  } from '@ngrx/effects';
import { InitializeInvoice } from '../core/commanFunction/InitializeInvoice.service';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
import { InvoiceService } from '../core/Services/invoice.service';
import { CustomresService } from '../core/Services/customers.service';
import * as runningItemKOTActions from './homeStore/runningItemKOTStore/runningItemKOT.actions';
import * as RunningItemActions from './homeStore/runningItemStore/runningItem.action';
import { ManageService } from '../core/Services/manage.service';
import { HomeManageService } from './Services/homeManage.service';
import { updateRunningItemQuantity } from './homeStore/runningItemStore/runningItem.action';
import { selectAddSuccess } from './homeStore/GentratedItemsStore/GenratedItems.selector';
import { ChairServiceService } from '../core/Services/chairsrunningorders.serivce';

type Nullable<T> = T | null | undefined;
export interface InvoiceTableData {
  tableId: string;
  tableName: string;
  customerId: string;
  customerName: string;
  orderMode: string;
}

export interface RunningItemsDoc {
  _id: string;              // invoice_123
  type: 'running_items';
  invoiceId: string;
  items: RunningItems[];
  updatedAt: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe],
  standalone:false
 // imports:[HomeModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() runningItemsKOT$?: Observable<any[]> | null = null;
  @Input() invoiceid!: string;
  @Input() TokenNumber!: number;
  @Output() value_invoiceid_Changed = new EventEmitter<string>();
  @Output() cancelOrder = new EventEmitter<string>();
  @Output() RedirectToTable = new EventEmitter<string>();
  @Input() paybydata: any[] = [];
  @Input() InvoiceData$?: Observable<any[]> | null = null;
  @Input() categorynamedata$?: Observable<any[]> | null = null;
  @Input() subQuantityTypeName$?: Observable<any[]> | null = null;
  @Input() Tax: any[] | null = null;
  @Input() Qtypenamedata$?: Observable<any[]> | null = null;
  @Input() Productnamedata$?: Observable<any[]> | null = null;
  @Input() productPriceData$?: Observable<any> | null = null;
  @Input() addOnProductsData$!: Observable<any[]>;
  @Input() DineData$: any;
  CommentKOT:string='';
  successItems$: any;
  
  @ViewChildren('dynamicInput') divs!: QueryList<ElementRef>;
  //TokenNumber:number=0;
  CommentType="";
  public RecieptNumber:any;
  public display = 'display:none;';
  public showCustomerPopUp = false;
  public showCommentPopUp = false;
  public showDiscountForm = false;
  public showdining = false;
  public showtype = false;
  public showplaceorderPopup = false;
  public showAddonPopUp = false;
  public showSplitBillPopUp=false;
  public showPartPaymentPopUp=false;
  
  public closePopup = false;
  public searchQuery = '';
  public selectedType = '';
  public ppalsoavailable: any[] = [];
  public selectedAddOnItems: any;
  public value = '';
  public tot = 0;

  public paybyId = 'none';
  public orders_status = [{ '1': 'NewOrder', '2': 'InProgress', '3': 'Cancelled', '4': 'Settled' }];
  public chair: string[] = ['GuestTable'];
  public EmployeeId = 'JSK';
  runningItemKOT: GenratedItemKOT={
    TableId: '',
    RecieptNumber: '',
    KOTStatus: 'false',
    KOTrunningorders: [],
    createdAt: new Date(),
    EmployeeId: '',
    quntityvalue: undefined,
    qvalue: undefined,
    Comment: '',
    ItemsID: '',
    _id: ''
  };
 // RunningItems_: RunningItems[] = [];
  RunningItems_2: RunningItems[] = [];
  addOnProduct: any;
  productpriceallname: ProductPriceDetails[] = [];
  productsByCategoryId: ProductPriceDetails[] = [];
  productitembackup: ProductPriceDetails[] = [];
  itaxarr: ITax[] = [];
  ichar: IChair[] = [];
  addonitems: AddOnProductEdit[] = [];
  updataAddOnDataInRunningItem: AddOnProductEdit;
  gitems: GenratedItems[] = [];
  gitems2: GenratedItems[] = [];
  Items: IItems={
    Productid: '',
    Productname: '',
    SubQuantityTypeID: '',
    SubQuantityTypeName: '',
    Qauntityid: '',
    Qauntityname: '',
    Quantity: 0,
    itemamount: 0,
    totalquantityamount: 0,
    employee_id: ''
  }
  GenratedItems_:GenratedItems={
    RecieptNumber: '',
    TableId: '',
    EmployeeId: '',
    Items: [this.Items],
    _id: '',
    createdAt: new Date()
  }
  AddOnItems: IAddOnItems[] = [];
  showCommentConfime=false;
  allppdata: any[] = [];
  ppname: any[] = [];
  typeprice: any[] = [];
  priceID: any[] = [];
  replaceFilteredData: any[] = [];
  chardata: any[] = [];
  Itemsdata: any[] = [];
  Itemsdata2: any[] = [];
  quntityoffoodarray: any[] = [];
  item_subQuantityType_ID: any;
  item_subQuantityTypeId: any;
  getCustomer: any;
  getCustomerdata: any;
  statusselectall = false;
  gettableid2: any;
  gettableid: any;
  tabledata: any;
  tabledata2: any;
  getinvoiceid2: any;
  innvoicedata2: any;
  innvoicedata: any;
  ifmwpdata: any;
  ifmwpdata2: any;
  imfsdata2: any;
  imfsdata: any;
  updatefmsdata2: any;
  updatefmsdata: any;
  getpercentvaldata: any;
  getpercentvaldata2: any;
  addondata: any;
  addondataarr: IAddOnItems[] = [];

  CustomerName = 'Guest';
  CustomerId = 'undefined';
  deletedInvoiceId: string = 'false';
  replacedInvoiceId: string = '';
  ordermode = '';
  table_name = '';
  table_id: string = '';
  employeeId = 'JSK';
  paidamount: number = 0;
  itemtotalamount: number = 0;
  totalamount: number = 0;
  totaltax: number = 0;
  percent: number = 0;
  discountvalue: number = 0;
  actualdiscountprice: number = 0;
  getpercentOnebyOne: number = 0;
  taxname: string = '';
  itemTotalTax: { taxname: string; taxpercent: number }[] = [];

   InvoiceTableData_: InvoiceTableData = {
    tableId: '',
    tableName: '',
    customerId: '',
    customerName: '',
    orderMode: ''
  };
  dine: IDine = {
    _id: '',
    name: '',
    description: '',
    status: true,
    floor_id: '',
    employee_id: this.employeeId
  };
  inventoryfoodmain: InventoryFoodMain2;
  productprices: ProductPrice;
  invoice: Invoice;
  invoiceData: any;

 

  public loading$?: Observable<boolean>;
  public error$?: Observable<string | null>;
  public subQuantityTypeByIdData$?: Observable<any[]>;
  public RunningItems_$?: Observable<any[]>;
  //public runningItemsKOTHome$?: Observable<any[]>;
  public loadAddOnProductsdata$!: Observable<any[]>;
  public myDiscountForm!: FormGroup;

  private subscriptions: Subscription[] = [];
  receiveNotification: any;
 
  constructor(
    private router: Router,
    private formedit: FormBuilder,
    private addAddOnProductService_: addAddOnProductService,
    private InvoiceService_: InvoiceService,
    private fb: FormBuilder,
    private CustomerService_: CustomresService,
    private subQuantityTypeService_: subQuantityTypeService,
    private datePipe: DatePipe,
    public actions$: Actions,
    private store: Store<{ runningItemReducer_: any,runningItemKOTReducer_:any,invoiceReducer_:any ,GenratedItemsReducer_:any,dineTableReducer_:any}>,
    private InitializeInvoice_: InitializeInvoice,
    private ManageService_:ManageService,private HomeManageService_:HomeManageService,
    private chairsrunningorderservice: ChairServiceService,
   // private pouch: RunningItemsPouchdbService
  ) {
    this.table_id="";
  //  //alert("hc "+this.invoiceid);
  //  this.RecieptNumber = this.invoiceid
 //   //alert("hc "+this.RecieptNumber);
    this.closePopup=false;
    this.updataAddOnDataInRunningItem = {
      _id: '',
      name: '',
      description: '',
      Price: 0,
      SelectProductId: '',
      SubQuantityTypeID: '',
      employee_id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: undefined
    };
    this.inventoryfoodmain = {
      _id: 'undefined',
      name: 'undefined',
      description: 'undefined',
      quantitytypeID: 'undefined',
      quantitytypename: 'undefined',
      quantitytypevalue: 0,
      employee_id: this.employeeId,
      createdAt: 'undefined'
    };
    this.productprices = {
      _id: '',
      ProductPrice: 100,
      SelectProductId: '',
      selectcategoryID: '',
      selectQtypeID: '',
      selectSubQuantityTypeID: '',
      ShortCodeNumber: 0,
      ShortCodeString: '',
      mostSelling:false,
      employee_id: this.employeeId
    };
    this.invoice = this.InitializeInvoice_.initializeInvoiceDefault() as unknown as Invoice;
    this.display = 'display:none;';
    this.itemtotalamount = 0;
    this.totaltax = 0;
    //this.RunningItems_=[];
    this.productpriceallname = [];
    this.productsByCategoryId = [];
    this.showtype = false;
    this.replacedInvoiceId = this.invoiceid;
    this.showCommentConfime=false;
    // this.successItems$ = this.store.select(
    //   state => state.GenratedItemsReducer_.items
    // );
    // this.loading$ = store.select(state => state.GenratedItemsReducer_.loading);
    // this.error$ = store.select(state => state.GenratedItemsReducer_.error);
    //this.dineData$ = this.store.select(state => state.dineTableReducer_?.dineData);
    // this.runningItemsKOTHome$ = store.select(state => state.runningItemKOTReducer_.KOTrunningorders.data);
    // this.loading$ = store.select(state => state.runningItemKOTReducer_.loading);
    // this.error$ = store.select(state => state.runningItemKOTReducer_.error);
    this.RunningItems_$ = store.select(state => state.runningItemReducer_.RunningItems_);
    this.loading$ = store.select(state => state.runningItemReducer_.loading);
    this.error$ = store.select(state => state.runningItemReducer_.error);
  }
KOTItemsdata:any;
AllProductWithPrice:any;
items: any[] = [];
  dineData$: any;

  

  ngOnInit(): void {
    //this.getDineDataByNgRx();
    this.loadinvoice();

    this.CustomerName = 'Guest';
    this.RecieptNumber = this.invoiceid;

    // Initialize KOTItemsdata based on available observable
   
   this.initializeKOTRunningItems();

    this.loadFood();

    this.myDiscountForm = this.fb.group({
      discount: '',
      numberInput: [0]
    });

    this.AllProductWithPrice = this.loadAllProductPriceDatabyProductId();
  }

  // getDineDataByNgRx() {
  //   // Assume that the store has a dineData slice managed by NgRx
  //   // Dispatch NgRx action to load dinedata (dine tables)
  //   this.store.dispatch(DineTableActions.loadDineTables());
  //   this.dineData$ = this.store.select(state => state.dineTableReducer_?.dineData);
  // }    

  loadFood()
  {
    this.store.dispatch(RunningItemActions.loadfood({ invoiceid: this.invoiceid }));
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    this.loading$ = this.store.select(state => state.runningItemReducer_.loading);
    this.error$ = this.store.select(state => state.runningItemReducer_.error);
    this.calculateTotalAmount();
  
  }
  deleteRunningItem(d: any): void {
    
    // Avoid mutating d as it may be a readonly object (NgRx state, pure pipe, etc)
    //const quntityvalue = d.quntityvalue && d.quntityvalue > 1 ? d.quntityvalue : 1;
    const quntityvalue = 0;
    const FilteredRunningItemData = this.filterProductwithPriceRunningItem(d.SelectProductId, d.SubQuantityTypeName);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: d.SelectProductId,
        action: 'dcre',
        SubQuantityTypeName: d.SubQuantityTypeName,
        quntity: quntityvalue,
        price: d.ProductPrice,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
  this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
  this.calculateTotalAmount();
  }
  quntityvalueNumber:number=0;
  onQuantityChange(d: any,quntityvalue:any): void {
    console.log("d", d, "quntityvalue", quntityvalue);
    // If input is not a positive number, set to 1 as minimum
    this.quntityvalueNumber=quntityvalue;
    if (!quntityvalue || quntityvalue < 1) {
      this.quntityvalueNumber = 1; //d.quntityvalue
    }
   
const FilteredRunningItemData=this.filterProductwithPriceRunningItem(d.SelectProductId, d.SubQuantityTypeName);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: d.SelectProductId,
        action: 'inc',
        SubQuantityTypeName: d.SubQuantityTypeName,
        quntity: +this.quntityvalueNumber-1,
        price: d.ProductPrice,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    
  }
filterProductwithPriceRunningItem(ProductId:string,SubQuantityTypeName:string)
{
  return this.AllProductWithPrice?.filter(
    (item: any) =>
      item.SelectProductId === ProductId &&
      item.SubQuantityTypeName === SubQuantityTypeName
  );
}
 
  loadinvoice(): void {
    const RecieptNumber = this.invoiceid;
    if (!RecieptNumber) return;

    this.InvoiceData$?.subscribe(InvoiceData=>{

   
       const inv = InvoiceData?.[0];
      // console.log(InvoiceData);
      // console.log(inv);
      if (inv) {
        this.table_id = inv.table_id;
        this.table_name = inv.tablename;
        this.CustomerId = inv.customer_id;
        const customerName = inv.customer_id !== 'undefined' ? this.getCustomerName(inv.customer_id) : 'Guest';
        this.CustomerName = customerName ?? 'Guest';
        this.ordermode = this.table_name !== 'Pick Up' ? this.table_name : 'Pick Up';
      }
    });
    //const invoiceData = this.HomeManageService_.loadinvoice(this.invoiceid, this.InvoiceData$) 
    
    console.log(this.InvoiceTableData_);
  }
  getid(event: any): void {
    if (!this.chardata) return;
    const idx = event.target.value;
    if (this.chardata[idx]) {
      this.chardata[idx].status = !!event.target.checked;
    }
  }

  getpaybyid(_id:string): void {
    //this.paybydata;
    this.paybyId=_id;
    console.log(this.paybyId);
  }

  getproductbycategory(_id: any): void {
   
    if (this.ordermode) {
      console.log(_id);
     
      this.loadproductpricename(_id);
    }
  }

  removerunningOrderKOT(): void {
    // TODO: Implement or remove unused logic
  this.KOTItemsdata = [];
  // Remove runningItemsKOT in HomeManageService by RecieptNumber
  // Dispatch an action to remove the KOT running items for this invoice ID
  this.store.dispatch(runningItemKOTActions.removeMultipleKOTRunningItems({
    KOTStatus: 'false',
    RecieptNumbers: this.invoiceid // Fixed property: should be RecieptNumbers, not RecieptNumber
  }));
  this.chairsrunningorderservice.delete(this.invoiceid).subscribe(deleted=>
  {
if(deleted) console.log(deleted);
  })
  }
  dineDataSubscription:Subscription | undefined;
  updateTableStatusByTableId(table_id: string,tablename:string): void {
    // Find the dine record for the given table_id to retrieve the floor_id
    // If you have a collection of dine objects, you may need to search there.
    // But assuming you need to get the floor_id for the current table_id from existing dine or available tables:
    // this.dineDataSubscription =
      this.DineData$.subscribe((dineData: any) => {
      if (!dineData) return;

      const table = dineData.find((tbl: any) => tbl._id === table_id);
      const floor_id = table?.floor_id || '';

      if (!floor_id) {
      //    this.dineDataSubscription?.unsubscribe();
        return;
      }

      this.dine = {
        _id: table_id,
        name: tablename,
        description: '',
        status: true,
        floor_id: floor_id,
        employee_id: this.employeeId,
      };

      console.log('Updated dine object:', this.dine);

      this.store.dispatch(DineTableActions.updateDineTable({ IDine_: this.dine }));
     // this.dineDataSubscription?.unsubscribe();
    });
  
   
  }
  genrateOrder(): void {
    
      const r = this.getRunningItemsValues();
      this.RunningItems_2 = Array.isArray(r) ? [...r] : [];
      this.getinvoiceid2 = '';
      this.gitems = [];
      this.gitems2 = [];
     // let invoice;
      if (this.discountvalue === this.paidamount) {
        this.genrateInvoice('Sattled', true).then(invoice => {
          this.updateInvoiceFunction(invoice);

          // Safely call updateTableStatusByTableId if invoice has needed properties
          if (
            invoice &&
            typeof this.updateTableStatusByTableId === 'function' &&
            invoice.table_id &&
            invoice.tablename !== 'Pick Up'
          ) {
           
            this.updateTableStatusByTableId(invoice.table_id, invoice.tablename);
            this.deleteRunningKOT();
          //  alert("table updated");
          }
          if (typeof this.removerunningOrderKOT === 'function') {
            this.removerunningOrderKOT();
          }

          // Ensure ClearSomeVariable exists and is callable
          if (typeof this.ClearSomeVariable === 'function') {
            this.ClearSomeVariable();
          }
          // Ensure close2 exists and is callable
          if (typeof this.close2 === 'function') {
            this.close2();
          }
        // After settling the order, redirect to 'tables' page for next table selection
        if (this.router && typeof this.router.navigate === 'function') {
          this.router.navigate(['/tables']);
        }
        if (typeof this.receiveNotification === 'function') {
          this.receiveNotification('tables');
        }
        }).catch(err => {
          console.error('Error generating invoice:', err);
        });
      } else {
        this.genrateInvoice('Sattled', false).then(invoice => {
          this.updateInvoiceFunction(invoice);

          // Ensure getCustomerName exists and is callable
          if (typeof this.getCustomerName === 'function' && this.CustomerId) {
            this.getCustomerName(this.CustomerId);
          }

          // Ensure close2 exists and is callable
          if (
            invoice &&
            typeof this.updateTableStatusByTableId === 'function' &&
            invoice.table_id &&
            invoice.tablename !== 'Pick Up'
          ) {
           
            this.updateTableStatusByTableId(invoice.table_id, invoice.tablename);
          //  alert("table updated");
          this.deleteRunningKOT();
          }
          if (typeof this.removerunningOrderKOT === 'function') {
            this.removerunningOrderKOT();
          }

          // Ensure ClearSomeVariable exists and is callable
          if (typeof this.ClearSomeVariable === 'function') {
            this.ClearSomeVariable();
          }
          // Ensure close2 exists and is callable
          if (typeof this.close2 === 'function') {
            this.close2();
          }
        // After settling the order, redirect to 'tables' page for next table selection
        if (this.router && typeof this.router.navigate === 'function') {
          this.router.navigate(['/tables']);
        }
        if (typeof this.receiveNotification === 'function') {
          this.receiveNotification('tables');
        }
        if(this.ordermode==='Pick Up')
        {
          localStorage.removeItem(this.invoiceid);
        }
        }).catch(err => {
          console.error('Error generating invoice:', err);
        });
      }

      this.store.dispatch(RunningItemActions.clearRunningItems());
      this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
   
    // })();
  }
deleteRunningKOT(): void {
  // You must dispatch with required payload if needed
  // Assuming an argument is required: provide the necessary payload (using null or proper object as per your action definition)
  this.store.dispatch(runningItemKOTActions.removeKOTRunningItem({
    RecieptNumber: this.invoiceid
  }));
}

ClearSomeVariable(): void {
  this.ordermode = '';
    //this.RunningItems_ = [];
    this.productsByCategoryId = [];
    this.value_invoiceid_Changed.emit('');
  }
  ClearSomeVariable2(): void {
    this.ordermode = '';
    //this.RunningItems_ = [];
    this.productsByCategoryId = [];
   // this.valueChanged.emit('');
  }

  updateInvoiceFunction(invoice: any): void {
    if (invoice) {
      console.log(invoice);
      this.store.dispatch(InvoiceActions.updateInvoice({ invoice:invoice }));
    } else {
      console.error('No invoice provided for update.');
    }
  
    
  }

  async genrateInvoice(Orderstatus:string,paidstatus:boolean): Promise<Invoice> {
  if(this.paidamount>this.discountvalue){
    paidstatus=true;
  }
    return {
      Taxes: this.getTax(),
      Chairs: this.ichar,
      AddOnItems: this.selectedAddOnItems,
      taxpecentRate: 0,
      taxpercentValue: 0,
      createdAt: new Date(),
      DiscountId: 'jsk',
      Discountvalue: this.actualdiscountprice,
      Discountperstage: this.percent,
      AdditionaldiscountAmount: 0,
      Totalvaue: this.itemtotalamount,
      grandtotal: this.discountvalue,
      RecieptNumber: +this.invoiceid,
      OrderType: this.ordermode,
      AmountPaidstatus: paidstatus,
      Orderstatus: Orderstatus,
      PaidAmount: this.paidamount,
      PendingAmount: (this.paidamount - this.discountvalue) < 0 ? (this.discountvalue - this.paidamount) : 0,
      TotalTaxAmount: this.totaltax,
      TotalItemsAmount: this.totalamount,
      OrderTypeName: this.chardata[0],
      paybyId: this.paybyId,
      table_id: String(this.table_id),
      tablename: this.table_name === '' ? 'Pick Up' : this.table_name,
      customer_id: this.CustomerId === 'undefined' ? 'undefined' : this.CustomerId,
      employee_id: String(this.employeeId),
      AssistToId: 'undefined',
      returnAmount: String((this.paidamount - this.discountvalue || this.itemtotalamount-this.paidamount) > 0 ? (this.paidamount - this.discountvalue || this.itemtotalamount-this.paidamount) : 0),
      CommentId: 'undefined',
      tokennumber: +this.TokenNumber
    };
  }

  getTax(): ITax[] {
    this.itaxarr = [];
    if (!this.Tax) return this.itaxarr;
    const r = this.getRunningItemsValues();
    if (Array.isArray(r)) {
      for (const runningItem of r) {
        for (const tax of this.Tax) {
          if (tax.Status) {
            this.itaxarr.push({
              id: tax._id,
              name: tax.name,
              percentt: tax.perscentRate,
              amount: ((+runningItem.ProductPrice * runningItem.quntityvalue) * tax.perscentRate) / 100,
              productid: runningItem.SelectProductId,
              productname: runningItem.ProductName
            });
          }
        }
      }
    }
    return this.itaxarr;
  }

  discountChange(): void {
    const { discount, numberInput } = this.myDiscountForm.value;
    if (this.itemtotalamount <= 500) {
      return;
    }
    if (discount === '%') {
      if (numberInput > 0 && numberInput <= 10) {
        this.percent = +numberInput.toFixed(2);
        this.discountvalue = +((+this.itemtotalamount) - (+this.itemtotalamount * this.percent / 100)).toFixed(2);
        this.actualdiscountprice = (+this.itemtotalamount) - this.discountvalue;
      }
    } else if (discount === 'Rupees') {
      this.discountvalue = Math.floor((+this.itemtotalamount) - numberInput);
      this.percent = ((numberInput * 100) / this.itemtotalamount);
      if (numberInput > 0 && this.percent <= 10) {
        this.percent = +this.percent.toFixed(2);
        this.actualdiscountprice = numberInput;
      } else {
        this.discountvalue = 0;
        this.percent = 0;
      }
    }
  }

  placeOrder(): void {
    if(!this.discountvalue) this.paidamount=this.itemtotalamount;
     else this.paidamount = this.discountvalue;
    this.showplaceorderPopup = true;
  }

  close2(): void {
    this.showplaceorderPopup = false;
  }
  shortCode(productpricedata:any)
  {
    this.loadAllProductPriceDatabyProductId();
//console.log(data);
this.increment(productpricedata.SelectProductId);
// this.increment2(productpricedata.SelectProductId, 
//   this.getSubQuantityTypeName(productpricedata.selectSubQuantityTypeID) , +1, productpricedata.ProductPrice);
// ////alert(data);
  }
  onSubmit(form: any): void {
   // this.AllProductWithPrice
console.log(this.AllProductWithPrice);
  //  const allppdata = this.loadAllProductPriceDatabyProductId();
    const selectedValue = form.value.option;
    this.item_subQuantityType_ID = this.ppalsoavailable.find(
      (item: any) => item.SubQuantityTypeName === selectedValue
    );
    const r = this.getRunningItemsValues();
    let item: any = null;
    if (Array.isArray(r) && this.item_subQuantityType_ID) {
      item = r.find(
        (itm: any) =>
          itm.SubQuantityTypeName === selectedValue &&
          itm.SelectProductId === this.item_subQuantityType_ID.id
      );
    }
    if (item?.SelectProductId) {
      const FilteredRunningItemData=this.filterProductwithPriceRunningItem(item.SelectProductId, item.SubQuantityTypeName);
     // this.RunningItems_ =  this.HomeManageService_.loadqunityvalue(item.SelectProductId, 'inc', item.SubQuantityTypeName, +item.quntityvalue, +item.ProductPrice,this.RunningItems_,this.invoiceid,FilteredRunningItemData);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: item.SelectProductId,
        action: 'inc',
        SubQuantityTypeName: item.SubQuantityTypeName,
        quntity: item.quntityvalue,
        price: item.ProductPrice,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    } else {
      const FilteredRunningItemData=this.filterProductwithPriceRunningItem(this.item_subQuantityType_ID.id, this.item_subQuantityType_ID.SubQuantityTypeName);
      //this.RunningItems_ =  this.HomeManageService_.loadqunityvalue(this.item_subQuantityType_ID.id, 'inc', this.item_subQuantityType_ID.SubQuantityTypeName, 0, this.item_subQuantityType_ID.price,this.RunningItems_,this.invoiceid,FilteredRunningItemData);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: this.item_subQuantityType_ID.id,
        action: 'inc',
        SubQuantityTypeName: this.item_subQuantityType_ID.SubQuantityTypeName,
        quntity: 0,
        price: this.item_subQuantityType_ID.price,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    }
    this.calculateTotalAmount();
    this.showtype = false;
  }
  
  
  // loadKOTfun()
  // {
  // this.ManageService_.loadRunningKOT();
  // this.RunningItems$ = this.ManageService_.runningKOTItems$;
  // }

  close(): void {
    this.showtype = false;
  }
  // Calculate totalamount from RunningItems_$ and KOTItemsdata
  grandtotal(): void {
    // Reset previous totals
    this.itemtotalamount = 0;
    this.totaltax = 0;
    this.taxname = '';

    if (!this.totalamount || !Array.isArray(this.Tax)) {
      this.itemtotalamount = this.totalamount || 0;
      return;
    }

    // Calculate total tax amount and build taxname string
    let totaltax = 0;
    let taxnames: string[] = [];
    this.Tax.forEach((tax: any) => {
      if (tax && tax.Status) {
        const thisTax = ((+this.totalamount) * (+tax.perscentRate || 0)) / 100;
        totaltax += thisTax;
        if (tax.name) {
          taxnames.push(tax.name);
        }
      }
    });

    this.totaltax = totaltax;
    this.taxname = taxnames.join(', ');

    // Calculate itemtotalamount (total + totaltax - discount)
    let discountValue = 0;
    if (this.myDiscountForm && this.myDiscountForm.value) {
      const discountType = this.myDiscountForm.value.discount;
      const numberInput = +this.myDiscountForm.value.numberInput || 0;
      if (discountType === "%") {
        discountValue = (this.totalamount * numberInput) / 100;
        this.percent = numberInput;
      } else if (discountType === "Rupees") {
        discountValue = numberInput;
        this.percent = 0;
      } else {
        this.percent = 0;
      }
    }

    this.itemtotalamount = (this.totalamount + this.totaltax) - discountValue;

    // For backward compatibility, set discountvalue as final settle amount
    this.discountvalue = this.itemtotalamount < 0 ? 0 : this.itemtotalamount;
  }
  calculateTotalAmount(): void {
    let runningItemsTotal = 0;
    let kotItemsTotal = 0;

    // Calculate from RunningItems_$
    if (this.RunningItems_$ && typeof this.RunningItems_$.subscribe === 'function') {
      const subscription = this.RunningItems_$.subscribe((items: any[]) => {
        if (Array.isArray(items)) {
          runningItemsTotal = items.reduce((sum, item) => {
            const qty = +item?.quntityvalue || 0;
            const price = +item?.ProductPrice || 0;
            return sum + (qty * price);
          }, 0);
        }
      });
      // This is just a calculation, unsubscribe immediately
      subscription.unsubscribe();
    }

    // Calculate from KOTItemsdata if available
    if (Array.isArray(this.KOTItemsdata)) {
      kotItemsTotal = this.KOTItemsdata.reduce((sum, kot) => {
        // KOT can have structure: { KOTrunningorders: [...] }
        if (kot && Array.isArray(kot.KOTrunningorders)) {
          return sum + kot.KOTrunningorders.reduce((kotsum: number, item: any) => {
            const qty = +item?.quntityvalue || 0;
            const price = +item?.ProductPrice || 0;
            return kotsum + (qty * price);
          }, 0);
        }
        return sum;
      }, 0);
    }

    // Set as class property, you can adapt to sum both or use only one
    this.totalamount = runningItemsTotal + kotItemsTotal;
    this.grandtotal();
  }
  increment(_id: any): void {
    this.showtype = false;
    console.log(_id);
    this.ppalsoavailable = this.getallproducttypeprice(_id);
    const runningItemsArr = Array.isArray(this.getRunningItemsValues()) ? this.getRunningItemsValues() : [];
console.log(runningItemsArr);
    // Ensure only one product type is available to increment
    if (
      Array.isArray(this.ppalsoavailable) &&
      this.ppalsoavailable.length === 1
    ) {
      const selectedType = this.ppalsoavailable[0];

      // Guard against incomplete data
      if (!selectedType?.SubQuantityTypeName || !selectedType?.id) {
        console.warn('Invalid product type data for increment:', selectedType);
        return;
      }
      // Try to find the index of the running item, if it exists
      const index = Array.isArray(runningItemsArr)
        ? runningItemsArr.findIndex(
            (item: any) =>
              item?.SubQuantityTypeName === selectedType.SubQuantityTypeName &&
              item?.SelectProductId === selectedType.id
          )
        : -1;

      // Get quantity value if running item is found, default to 0
      const qvalue = index >= 0 &&
        Array.isArray(runningItemsArr) &&
        typeof runningItemsArr[index] === 'object' &&
        runningItemsArr[index] !== null &&
        typeof runningItemsArr[index] === 'object' &&
        runningItemsArr[index] &&
        // Safer check for quntityvalue property and its type to prevent lint and runtime errors
        (() => {
          if (
            index >= 0 &&
            Array.isArray(runningItemsArr) &&
            runningItemsArr[index] &&
            typeof runningItemsArr[index] === 'object' &&
            'quntityvalue' in runningItemsArr[index]
          ) {
            const val = runningItemsArr[index]['quntityvalue'];
            const num = typeof val === 'string' || typeof val === 'number' ? +val : 0;
            return isNaN(num) ? 0 : num;
          }
          return 0;
        })();

        const filteredData = this.filterProductwithPriceRunningItem(
        selectedType.id,
        selectedType.SubQuantityTypeName
      );

      // Dispatch the increment
      this.store.dispatch(
        updateRunningItemQuantity({
          id: selectedType.id,
          action: 'inc',
          SubQuantityTypeName: selectedType.SubQuantityTypeName,
          quntity: qvalue,
          price: selectedType.price,
          RunningItemData: runningItemsArr,
          invoiceid: this.invoiceid,
          allppdata: filteredData
        })
      );

      this.RunningItems_$ = this.store.select(
        state => state.runningItemReducer_.RunningItems_
      );
    }

    // Preview (mainly for debugging, can be removed for production)
    try {
      const preview = this.getRunningItemsValues();
      if (Array.isArray(preview)) {
        // Remove invalid/undefined ProductName if needed
        // This is just a pass-through filter since result isn't used
        preview.filter(item => item?.ProductName !== undefined);
      }
      console.log(preview);
    } catch (err) {
      console.error('Error previewing running items:', err);
    }
    this.calculateTotalAmount();
  }

  decrement(_id: any): void {
    this.showtype = false;
    this.ppalsoavailable = this.getallproducttypeprice(_id);
    this.calculateTotalAmount();
  }
  changKOTItemsI(kotitem:any,kot:any,qvalue:number)
  {
    if(qvalue<0)
      {
        qvalue=1;
      }
    if(qvalue>=0)
      {
        this.manageRunningKOTItem(kotitem,kot,"Increment");
      }
    this.calculateTotalAmount();
  }
  increment2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
   // console.log(this.AllProductWithPrice);
    this.showtype = false;
   // const allppdata = this.loadAllProductPriceDatabyProductId();
   // console.log(this.RunningItems_);
   const FilteredRunningItemData=this.filterProductwithPriceRunningItem( _id, SubQuantityTypeName);
console.log(FilteredRunningItemData);
    //this.RunningItems_ =  this.HomeManageService_.loadqunityvalue(_id, 'inc', SubQuantityTypeName, qvalue, price,this.RunningItems_,this.invoiceid,FilteredRunningItemData);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: _id,
        action: 'inc',
        SubQuantityTypeName: SubQuantityTypeName,
        quntity: qvalue,
        price: price,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    this.calculateTotalAmount();
    // console.log(this.RunningItems_);
  }

  decrement2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
    this.showtype = false;
  const FilteredRunningItemData=this.filterProductwithPriceRunningItem( _id, SubQuantityTypeName);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: _id,
        action: 'dcre',
        SubQuantityTypeName: SubQuantityTypeName,
        quntity: qvalue,
        price: price,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData
      })
    );
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    this.calculateTotalAmount();
}
  changKOTItemsD(kotitem:any,kot:any,qvalue:number)
  {
    // TODO: Implement logic for changKOTItemsD, condition is missing
    // For now, just call deleteRunningKOTItem
    if(qvalue===1)
    {
      this.manageRunningKOTItem(kotitem,kot,"Delete");
    }
    else
    {
      this.manageRunningKOTItem(kotitem,kot,"Decrement");
    }
    this.calculateTotalAmount();
  }
 
  // }

 
  loadAllProductPriceDatabyProductId(): any {
    this.allppdata = [];
    if (this.productPriceData$) {
      const sub = this.productPriceData$.subscribe(productPriceData => {
        if (!productPriceData) return;
        try {
          for (const pp of productPriceData) {
            this.allppdata.push({
              _id: pp._id,
              ProductPrice: this.getproductprice(pp.SelectProductId),
              ProductName: this.getproductname(pp.SelectProductId),
              categoryName: this.getcategoryname(pp.selectcategoryID),
              QtypeName: this.getqtypnamename(pp.selectQtypeID),
              SubQuantityTypeName: this.getSubQuantityTypeName(pp.selectSubQuantityTypeID),
              SelectProductId: pp.SelectProductId,
              selectcategoryID: pp.selectcategoryID,
              selectQtypeID: pp.selectQtypeID,
              selectSubQuantityTypeID: pp.selectSubQuantityTypeID,
              quntityvalue: 0
            });
          }
        } catch (error) {
          console.error('Error pushing data:', error);
        }
      });
      this.subscriptions.push(sub);
    }
    return  this.allppdata;
  }

  loadproductpricename(_id: any): void {
   
    this.productsByCategoryId = [];
   
    if (this.Productnamedata$) {
      const sub = this.Productnamedata$.subscribe(Productnamedata => {
       // //alert("finally");
        if (!Productnamedata) return;
        if(_id=="999")
        {
          this.loadProductByTopSelling();
          return;
        }
        console.log(Productnamedata);
        this.initializeVegType(Productnamedata, _id);
      });
      this.subscriptions.push(sub);
    }
    this.ppname = this.productpriceallname;
  }

  initializeVegType(Productnamedata: any, _id: string) {
    
    for (const prod of Productnamedata) {
      if (prod.selectcategoryID === _id) {
        if (HomeEnvironment.VegType$.value === prod.veg_nonveg.toString() || HomeEnvironment.VegType$.value == "") {
          this.initilalizvegTypeFinal(prod);
        }
      }
    }
  }
  initilalizvegTypeFinal(prod: any) {
   
    this.productsByCategoryId.push({
      _id: prod._id,
      ProductPrice: this.getproductprice(prod._id).toString(),
      ProductName: this.getproductname(prod._id),
      categoryName: this.getcategoryname(prod.selectcategoryID),
      QtypeName: this.getqtypnamename(prod.selectQtypeID),
      SubQuantityTypeName: this.getSubQuantityTypeName(prod.selectSubQuantityTypeID),
      SelectProductId: prod._id,
      selectcategoryID: prod.selectcategoryID,
      selectQtypeID: prod.selectQtypeID,
      selectSubQuantityTypeID: prod.selectSubQuantityTypeID,
      ShortCodeNumber:prod.ShortCodeNumber,
      ShortCodeString: prod.ShortCodeString,
      mostSelling: prod.mostSelling,
      quntityvalue: 0,
      veg_nonveg: prod.veg_nonveg
    });
   // this.productitembackup=[];
      this.productitembackup=this.productsByCategoryId;
  }
 
  loadProductByTopSelling(): void {
    this.productPriceData$
      ?.pipe(take(1))
      .subscribe(productList => {
        if (!Array.isArray(productList)) return;

        const vegType = HomeEnvironment.VegType$.value.toString();
        // Get Veg/NonVeg mapping once for performance
        const vegNonVegMap = new Map<string, any>();
        this.Productnamedata$
          ?.pipe(take(1))
          .subscribe(productData => {
            if (Array.isArray(productData)) {
              for (const item of productData) {
                vegNonVegMap.set(item._id, item.veg_nonveg);
              }
            }

            const topSellingItems = productList.filter(item => item.mostSelling === true);
            // Only keep those that pass veg filter
            const filteredItems = topSellingItems.filter(prod =>
              vegType === "" ||
              vegType === (vegNonVegMap.get(prod.SelectProductId) ?? "").toString()
            );

            filteredItems.forEach(prod => {
              this.initilalizvegTypeFinalTopselling(
                prod,
                vegNonVegMap.get(prod.SelectProductId)
              );
            });

            console.log("Top Selling Items: ", filteredItems);
          });
      });
  }
  initilalizvegTypeFinalTopselling(prod: any, veg_nonveg: any) {
   
    this.productsByCategoryId.push({
      _id: prod.SelectProductId,
      ProductPrice: prod.ProductPrice,
      ProductName: this.getproductname(prod.SelectProductId),
      categoryName: this.getcategoryname(prod.selectcategoryID),
      QtypeName: this.getqtypnamename(prod.selectQtypeID),
      SubQuantityTypeName: this.getSubQuantityTypeName(prod.selectSubQuantityTypeID),
      SelectProductId: prod.SelectProductId,
      selectcategoryID: prod.selectcategoryID,
      selectQtypeID: prod.selectQtypeID,
      selectSubQuantityTypeID: prod.selectSubQuantityTypeID,
      ShortCodeNumber:prod.ShortCodeNumber,
      ShortCodeString: prod.ShortCodeString,
      mostSelling: prod.mostSelling,
      quntityvalue: 0,
      veg_nonveg: veg_nonveg
      });
    //  this.productitembackup=[];
      this.productitembackup=this.productsByCategoryId;
     // console.log("veg_nonveg: ", veg_nonveg);
  }

  returnVegNonVeg(_id: string): boolean {
    let vegNonVeg = false;
  
    this.Productnamedata$
      ?.pipe(take(1))
      .subscribe(data => {
        const item = data?.find(p => p._id === _id);
        if (item) vegNonVeg = item.veg_nonveg;
      });
  
    return vegNonVeg;
  }
  

  

  getallproducttypeprice(id: any): any[] {
    this.priceID = [];
    this.showtype = true;
    if (this.productPriceData$) {
      const sub = this.productPriceData$.subscribe(productPriceData => {
        if (!productPriceData) return;
        for (const pp of productPriceData) {
          if (pp.SelectProductId === id) {
            this.priceID.push({
              _id: pp._id,
              SubQuantityTypeID: pp.selectSubQuantityTypeID
            });
          }
        }
      });
      this.subscriptions.push(sub);
    }
    this.typeprice = [];
    for (const price of this.priceID) {
      this.typeprice.push({
        id: id,
        productPriceId: price._id,
        SubQuantityTypeID: price.SubQuantityTypeID,
        SubQuantityTypeName: this.getSubQuantityTypeName(price.SubQuantityTypeID),
        price: this.getproductprice2(price._id),
        ProductName:this.getproductname(id)
      });
      if (this.priceID.length == 1) this.showtype = false;
    }
    return this.typeprice;
  }

  getproductprice2(_id: string): number {
    let productPrice = 0;
    if (this.productPriceData$) {
      const sub = this.productPriceData$.subscribe(productPriceData => {
        if (!productPriceData) return;
        const idx = productPriceData.findIndex((item: any) => item._id === _id);
        if (idx !== -1) {
          productPrice = productPriceData[idx].ProductPrice;
        }
      });
      this.subscriptions.push(sub);
    }
    return productPrice;
  }

  getproductprice(id: string): number {
    let productPrice = 0;
    if (this.productPriceData$) {
      const sub = this.productPriceData$.subscribe(productPriceData => {
        if (!productPriceData) return;
        const idx = productPriceData.findIndex((item: any) => item.SelectProductId === id);
        if (idx !== -1) {
          productPrice = productPriceData[idx].ProductPrice;
        }
      });
      this.subscriptions.push(sub);
    }
    return productPrice;
  }
  getSubQuantityTypeName(id: string): string {
    return this.subQuantityTypeService_.getSubQuantityTypeName(id);
  }
  getproductname(_id: string): string {
    let productname = '';
    if (this.Productnamedata$) {
      const sub = this.Productnamedata$.subscribe(Productnamedata => {
        if (!Productnamedata) return;
        const idx = Productnamedata.findIndex((item: any) => item._id === _id);
        if (idx !== -1) {
          productname = Productnamedata[idx].name;
        }
      });
      this.subscriptions.push(sub);
    }
    return productname;
  }

  getqtypnamename(id: string): string {
    let qtypename = '';
    if (this.Qtypenamedata$) {
      const sub = this.Qtypenamedata$.subscribe(Qtypenamedata => {
        if (!Qtypenamedata) return;
        const idx = Qtypenamedata.findIndex((item: any) => item._id === id);
        if (idx !== -1) {
          qtypename = Qtypenamedata[idx].name;
        }
      });
      this.subscriptions.push(sub);
    }
    return qtypename;
  }

  getcategoryname(id: string): string {
    let categoryname = '';
    if (this.categorynamedata$) {
      const sub = this.categorynamedata$.subscribe(categorynamedata => {
        if (!categorynamedata) return;
        const idx = categorynamedata.findIndex((item: any) => item._id === id);
        if (idx !== -1) {
          categoryname = categorynamedata[idx].name;
        }
      });
      this.subscriptions.push(sub);
    }
    return categoryname;
  }

  showCustomersPopUp(): void {
    this.showCustomerPopUp = true;
  }
  closePopUpBychild(close: boolean): void {
    this.showCustomerPopUp = false;
    this.showCommentPopUp = false;
    this.showCommentConfime=false;
  }
  closePopUpByCommentFun(close: boolean): void {
    this.showCustomerPopUp = false;
    this.showCommentPopUp = false;
    this.showCommentConfime=false;
  }

  closePopUpByChildAddon(close: any): void {
    this.showAddonPopUp = close;
    this.getAddOnProducts();
  }
  closePopUpByChildSplitBill(close: any)
  {
    this.showSplitBillPopUp = close;
  }
  closePopUpByChildPartPayment(close: any)
  {
    this.showPartPaymentPopUp = close;
  }
  runningItemsArr:any;
 getRunningItemsValues(): RunningItems {
   // If already an array, return as is.
   if (Array.isArray(this.RunningItems_$)) {
     this.runningItemsArr = this.RunningItems_$;
     return this.runningItemsArr;
   }

   // If it's an observable (has .subscribe), try to get the latest value synchronously.
   if (
     this.RunningItems_$ &&
     typeof (this.RunningItems_$ as any).subscribe === 'function'
   ) {
     let items: any[] = [];
     // Try to use getValue() for BehaviorSubject/ReplaySubject if available
     if (typeof (this.RunningItems_$ as any).getValue === 'function') {
       items = (this.RunningItems_$ as any).getValue();
     } else {
       // Fallback: try synchronous subscription. Only works if hot observable (BehaviorSubject).
       const observable = this.RunningItems_$ as any;
       let subscription = observable.subscribe(
         (value: any[] | undefined) => { items = value ?? []; }
       );
       if (subscription && typeof subscription.unsubscribe === 'function') {
         subscription.unsubscribe();
       }
     }
     this.runningItemsArr = Array.isArray(items) ? items : [];
     return this.runningItemsArr;
   }

   // If it's a function (very rarely, but keeping as fallback), call it.
   // If it's a function (very rarely, but keeping as fallback), call it.
   // Fix: Ensure RunningItems_$ cannot be called if its type is never to avoid TS error.
   if (typeof this.RunningItems_$ === 'function') {
     try {
       // Type guard: Only call if not 'never'
       const fn = this.RunningItems_$ as unknown;
       if (typeof fn === 'function') {
         const result = (fn as (...args: any[]) => any)();
         this.runningItemsArr = Array.isArray(result) ? result : [];
       } else {
         this.runningItemsArr = [];
       }
     } catch {
       this.runningItemsArr = [];
     }
   }
    
   

   // Default: empty array
   this.runningItemsArr = [];
   return this.runningItemsArr;
 }
  InitializeselectedAddOnItemsCallbackFun(selectedAddOnItems: any) {
    this.selectedAddOnItems = selectedAddOnItems;
    // Convert this.RunningItems_$ (which may be an Observable) to an array value if possible
    // Only safe way is to check if it's an array already, otherwise set empty array
   const gotRunningItems = this.getRunningItemsValues();

    const invoiceDataSub = this.InvoiceData$?.subscribe(data => {
      if (!data) return;

      this.innvoicedata = data;
      const invoiceDataArr = this.innvoicedata?.data || [];
      this.selectedAddOnItems = invoiceDataArr[0]?.AddOnItems ?? [];
      this.invoiceData = invoiceDataArr;

      const addOnItems = invoiceDataArr[0]?.AddOnItems;
      if (!Array.isArray(addOnItems) || addOnItems.length === 0) return;

      // Clear previous AddOnItems in running items
      if (Array.isArray(gotRunningItems)) {
        for (const runningItem of gotRunningItems) {
          runningItem.AddOnItems = [];
        }
      }

      addOnItems.forEach(addOnItem => {
        const addOnProductsSub = this.addOnProductsData$.subscribe((addOndatabyId: any) => {
          const addOnDataArr = Array.isArray(addOndatabyId?.data) ? addOndatabyId.data : [];
          if (!Array.isArray(gotRunningItems ) || addOnDataArr.length === 0) return;

          const addOnData = addOnDataArr[0];
          const runningItem = gotRunningItems.find(
            (item: any) =>
              item.SelectProductId === addOnData.SelectProductId &&
              item.selectSubQuantityTypeID === addOnData.SubQuantityTypeID
          );

          if (runningItem) {
            runningItem.AddOnItems = Array.isArray(runningItem.AddOnItems) ? runningItem.AddOnItems : [];
            const exists = runningItem.AddOnItems.some((item: any) => item._id === addOnItem._id);
            if (!exists) {
              runningItem.AddOnItems.push({ ...addOnItem });
            }
          }
        });

        if (this.subscriptions) {
          this.subscriptions.push(addOnProductsSub);
        }
      });
    });

    if (invoiceDataSub && this.subscriptions) {
      this.subscriptions.push(invoiceDataSub);
    }
  }
  
  showCommentsPopUp(): void {
    this.showCommentPopUp = true;
  }

  manageKOTItem:any;
  SearchManagingKOTItems:any;
  manageRunningKOTItem(kotitem: any,kot:GenratedItemKOT,CommentType:string): void {
   // //alert(CommentType)
    const inv = this.invoiceid;
    this.RecieptNumber=inv;
    this.CommentType=CommentType;
    this.showCommentPopUp = true;
    this.showCommentConfime=true;
    this.manageKOTItem=kotitem;
    this.SearchManagingKOTItems=kot;
  }
  showAddonsPopUp(SelectProductId: string, selectSubQuantityTypeID: string) {
    this.showAddonPopUp = true;
    this.getAddOnItembySubQuantity_Product_ID(SelectProductId, selectSubQuantityTypeID);
  }
  SelectProductId_="";selectSubQuantityTypeID_="";
  shownotesPopUp(SelectProductId: string, selectSubQuantityTypeID: string): void {
    const inv = this.invoiceid;
    this.RecieptNumber=inv;
    this.showCommentPopUp = true;
    this.showCommentConfime=true;
   // this.manageRunningKOTItem('addNotes');
   this.CommentType="addNotes";
   
    // // Here you can fetch or prepare notes-related data based on the product and sub quantity type IDs if required.
    // // For now, we simply show the popup.
    this.SelectProductId_ = SelectProductId;
    this.selectSubQuantityTypeID_ = selectSubQuantityTypeID;
   // // Optionally: you might want to load notes by product ID and subquantity type ID here.
  }
  splitBill() {
    // Split Bill logic - Check if there are running items available to split
    
    this.showSplitBillPopUp=true;
    }
    partPayment()
    {
      this.showPartPaymentPopUp=true;
    }
  getAddOnProducts() {
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
      if (data) {
        this.innvoicedata = data;
        this.selectedAddOnItems = this.innvoicedata.data[0].AddOnItems;
        this.invoiceData = this.innvoicedata.data;
      }
    });
  }

  getAddOnItembySubQuantity_Product_ID(SelectProductId: string, selectSubQuantityTypeID: string) {
    this.store.dispatch(AddOnProductActions.getByProductIdSubQTypeIDAddOnProducts({
      SelectProductId,
      SubQuantityTypeID: selectSubQuantityTypeID
    }));

    const successSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess.type)
    ).subscribe(action => {
      this.addOnProduct = action.addOnProducts.data;
      this.getAddOnProducts();
    });

    const failureSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure.type)
    ).subscribe(action => {
      console.error('Failed to load AddOnProducts:', action.error);
    });

    this.subscriptions.push(successSub, failureSub);
  }

  initializeCustomer(CustomerDetail: any): void {
    this.CustomerId = CustomerDetail._id;
    // Generate the invoice, then update it. After update is completed, get customer name.
    this.genrateInvoice('New Order',false).then(invoice => {
      this.updateInvoiceFunction(invoice);
      
      this.getCustomerName(this.CustomerId);
    });
  }

  getCustomerID(invoiceid: string): void {
    this.InvoiceData$?.subscribe(InvoiceData=>
    {
      this.CustomerId = InvoiceData[0].customer_id;
    }
    )
    
  }

  getCustomerName(customer_id: string): void {
    this.CustomerService_.getbyid(customer_id).subscribe({
      next: (response: any) => {
        this.getCustomerdata = response;
        this.getCustomer = (this.getCustomerdata && this.getCustomerdata.data) ? this.getCustomerdata.data : [];
        this.CustomerName = (this.getCustomer.length && this.getCustomer[0].name) ? this.getCustomer[0].name : "Guest";
      },
      error: (err) => {
        console.error('Failed to load customer name:', err);
        this.CustomerName = "Guest";
        this.getCustomer = [];
      }
    });
  }
  initializeKOTRunningItems()
  {
  //   if (this.runningItemsKOTHome$) {
  //     this.KOTItemsdata = [];
  //    this.KOTItemsdata = this.HomeManageService_.initializeKOTItems(this.runningItemsKOTHome$, this.invoiceid);
  //  } 
  //  else
    if (this.runningItemsKOT$) {
      this.KOTItemsdata = [];
     this.KOTItemsdata = this.HomeManageService_.initializeKOTItems(this.runningItemsKOT$, this.invoiceid);
   } 
   else {
     this.KOTItemsdata = [];
   }
  }
  reloadKOTRunningItems(): void {
  // Reinitialize Input decorator value for runningItemsKOT$ after load running KOT
   // Run ManageService_.initRunningKOT(), then loadRunningKOT() after completion, then update runningItemsKOT$, then reinitialize KOTItemsdata.
  // this.ManageService_.initRunningKOT();
  /**
   * Deep-refactored reloadKOTRunningItems method:
   * 1. Dispatch reload action for KOT running items.
   * 2. Use a single subscription to update runningItemsKOT$ and re-initialize KOTItemsdata
   *    when store emits latest KOTRunningorders for this invoice.
   * 3. Unsubscribe immediately after update to avoid leaks.
   */
  this.store.dispatch(runningItemKOTActions.loadKOTRunningItems());

  const subscription = this.store
    .select(state => state.runningItemKOTReducer_?.KOTrunningorders?.data)
    .subscribe((latestKOTData) => {
      this.runningItemsKOT$ = this.store.select(
        state => state.runningItemKOTReducer_?.KOTrunningorders?.data
      );
      // Defensive: Ensure we only reinitialize on defined value.
      if (latestKOTData !== undefined) {
        this.KOTItemsdata = this.HomeManageService_.initializeKOTItems(this.runningItemsKOT$, this.invoiceid);
        subscription.unsubscribe(); // Clean up after one update
      }
    });
  }

  CancelOrder(): void {
    this.cancelOrder.emit(this.invoiceid);
  
  }
  addSuccessSub: Subscription | undefined;
 
ItemID:string='undefined';
  /**
   * Handles the KOT (Kitchen Order Ticket) process:
   *  1. Resets paid amount.
   *  2. Dispatches action to add the generated items to store.
   *  3. Waits for the item _id response, then builds and dispatches the KOT running item.
   *  4. Triggers invoice generation ("Cooking"), resets, and navigation.
   * Deep refactored for clarity, proper subscription management, and logical separation.
   */
  itemSuccessData: any;

  async KOT(): Promise<void> {
    this.paidamount = 0;
  
    // ✅ Step 1: Prepare payload
    this.GenratedItems_ = { RecieptNumber: this.invoiceid, EmployeeId: this.employeeId, TableId: this.table_id, Items: this.getRunningItemsValues(), createdAt:new Date() } as unknown as GenratedItems;
  
    // ✅ Step 2: Dispatch action
    this.store.dispatch(
      GentratedItemsActions.addGenratedItems({ items: this.GenratedItems_ })
    );
  
    // ❌ Avoid multiple subscriptions
    // ✅ Take only one success response
    this.actions$
      .pipe(
        ofType(GentratedItemsActions.addGenratedItemsSuccess),
        take(1) // ✅ auto unsubscribe
      )
      .subscribe(async (data) => {
        if (!data) return;
        this.itemSuccessData = data.items;
        // ✅ Step 3: Extract ID
        const itemId = this.itemSuccessData.data[0]._id;
        this.ItemID = itemId;
  
        // ✅ Step 4: Prepare KOT running order
        this.runningItemKOT = { EmployeeId: this.employeeId, TableId: this.table_id, ItemsID: this.ItemID, RecieptNumber: this.invoiceid, createdAt: new Date().toISOString(), KOTrunningorders: this.getRunningItemsValues(), KOTStatus: false,  Comment: this.CommentKOT || '' } as unknown as GenratedItemKOT;
  
        // ✅ Step 5: Dispatch KOT actions
        this.store.dispatch(
          runningItemKOTActions.addKOTRunningItem({
            KOTrunningorder: this.runningItemKOT
          })
        );
  
        this.store.dispatch(
          runningItemKOTActions.loadKOTRunningItems()
        );
  
        // ✅ Step 6: Handle invoice
        try {
          const invoice = await this.genrateInvoice('Cooking', false);
          this.updateInvoiceFunction(invoice);
        } catch (err) {
          console.error('Invoice error:', err);
        }
  
        // ✅ Step 7: Cleanup
        localStorage.removeItem(this.invoiceid);
        this.productsByCategoryId = [];
        this.runningItemKOT = {} as GenratedItemKOT;
  
        // ✅ Step 8: Redirect
        this.RedirectToTable.emit('tables');
      });
  }
kotprint()
{
  this.close2();
  const invoiceCard = document.getElementById('printable-section-KOT');
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
  printBill(): void {
    // Attempt to locate the printable invoice section by its id or fallback to body
    const invoiceCard = document.getElementById('printable-section-INVOICE');
    let printContent = '';
    if (invoiceCard) {
      // Clone the node to avoid manipulating DOM structure directly
      const clone = invoiceCard.cloneNode(true) as HTMLElement;
      // Optionally, remove unwanted interactive UI elements from print
      clone.querySelectorAll('button, form, .item-header').forEach(node => node.remove());
      printContent = clone.innerHTML;
    } else {
      // Fallback: print the whole page
      printContent = document.body.innerHTML;
    }
    const WindowPrt = window.open('', '', 'width=800,height=800');
    if (WindowPrt && printContent) {
      WindowPrt.document.writeln('<html><head><title>Print Invoice</title>');
      // Optionally add any required styles for print here
      WindowPrt.document.writeln('</head><body>');
      WindowPrt.document.writeln(printContent);
      WindowPrt.document.writeln('</body></html>');
      WindowPrt.document.close();
      WindowPrt.focus();
      // Print after a minimal delay to ensure rendering
      setTimeout(() => {
        WindowPrt.print();
        WindowPrt.close();
      }, 200);
    }
  }



  removeCustomer(): void {
    // Reset the CustomerName to 'Guest' and potentially notify other parts of the app if needed.
    // Fetch invoice data by id, then after it's loaded, run the next steps in sequence
    this.ManageService_.getInvoiceDataById(this.invoiceid);
    setTimeout(() => {
      const invoiceData = this.ManageService_.invoiceData$.getValue();
      this.CustomerName = 'Guest';
      this.CustomerId = "undefined";
      const invoiceOrPromise = this.genrateInvoice(invoiceData[0].Orderstatus,false);
      // Handle if genrateInvoice is async (returns a promise)
      if (invoiceOrPromise instanceof Promise) {
        invoiceOrPromise.then(invoice => {
          this.updateInvoiceFunction(invoice);
          // Insert any follow-up task here if needed in future
        });
      } else {
        this.updateInvoiceFunction(invoiceOrPromise);
        // Insert any follow-up task here if needed in future
      }
    }, 0);
    // If there are other customer details, clear or reset them here as well.
    // For more robust design, emit an event or update parent component/service if necessary.
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
function getGItem(arg0: RunningItems, val: number): GenratedItems {
  throw new Error('Function not implemented.');
}

