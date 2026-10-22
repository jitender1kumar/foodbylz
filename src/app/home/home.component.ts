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
import { filter, take } from 'rxjs/operators';
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
  IItems,
  CustomerPaymentHistory,
  KOTsUD
} from '../core/Model/crud.model';

import * as GentratedItemsActions from './homeStore/GentratedItemsStore/GenratedItems.action';

import * as DineTableActions from '../dine/dineStore/dinetableStore/dinetable.action';
import * as CustomerPaymentHistoryAction from './homeStore/CustomerPaymentHistoryStore/CustomerPaymentHistory.action';
import { KOTsUDService } from '../core/Services/KOTsUD.service';

import { RunningItems } from '../core/Model/RunningItemsHomeModel/RunningItem.model';
import { addAddOnProductService } from '../core/Services/addOnProduct.service';
import { DatePipe } from '@angular/common';
import { HomeEnvironment } from '../environment/homeEnvironment';
import * as AddOnProductActions from '../manage/ManageStore/addOnProductStore/addOnProduct.action';
import { Actions, ofType } from '@ngrx/effects';
import { InitializeInvoice } from '../core/commanFunction/InitializeInvoice.service';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
import { InvoiceService } from '../core/Services/invoice.service';
import { CustomresService } from '../core/Services/customers.service';
import * as RunningItemKOTActions from './homeStore/runningItemKOTStore/runningItemKOT.actions';
import * as RunningItemActions from './homeStore/runningItemStore/runningItem.action';
import { ManageService } from '../core/Services/manage.service';
import { HomeManageService } from './Services/homeManage.service';
import { updateRunningItemQuantity } from './homeStore/runningItemStore/runningItem.action';
import { selectAddSuccess } from './homeStore/GentratedItemsStore/GenratedItems.selector';
import { ChairServiceService } from '../core/Services/chairsrunningorders.serivce';
import { loadDineTables } from '../dine/dineStore/dinetableStore/dinetable.action';

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
  standalone: false
  // imports:[HomeModule]
})
export class HomeComponent implements OnInit, OnDestroy {


  @Input() runningItemsKOT$?: Observable<any[]> | null = null;
  @Input() invoiceid!: string;
  @Input() TokenNumber!: number;
  @Output() value_invoiceid_Changed = new EventEmitter<string>();
  @Output() cancelOrder = new EventEmitter<string>();
  @Output() RedirectToTable = new EventEmitter<string>();
  @Input() paybydata!: any[];
  @Input() InvoiceData$?: Observable<any[]> | null = null;
  @Input() categorynamedata$?: Observable<any[]> | null = null;
  @Input() subQuantityTypeName$?: Observable<any[]> | null = null;
  @Input() Tax: any[] | null = null;
  @Input() Qtypenamedata$?: Observable<any[]> | null = null;
  @Input() Productnamedata$?: Observable<any[]> | null = null;
  @Input() productPriceData$?: Observable<any> | null = null;
  @Input() addOnProductsData$!: Observable<any[]>;
  @Input() DineData$: any;
  @Output() pickUpOrder: EventEmitter<string> = new EventEmitter<string>();
  isPickUpNextOrder: boolean = false;
  CommentKOT: string = '';
  successItems$: any;
  subscription!: Subscription;
  @ViewChildren('dynamicInput') divs!: QueryList<ElementRef>;
  //TokenNumber:number=0;
  CommentType = "";
  public RecieptNumber: any;
  public display = 'display:none;';
  public showCustomerPopUp = false;
  public showCommentPopUp = false;
  public showDiscountForm = false;
  public showdining = false;
  public showtype = false;
  public showplaceorderPopup = false;
  public showAddonPopUp = false;
  public showSplitBillPopUp = false;
  public showPartPaymentPopUp = false;

  public closePopup = false;
  public searchQuery = '';
  public selectedType = '';
  public ProductPrice: any[] = [];
  public selectedAddOnItems: any;
  public value = '';
  public tot = 0;

  public paybyId = 'none';
  public orders_status = [{ '1': 'NewOrder', '2': 'InProgress', '3': 'Cancelled', '4': 'Settled' }];
  public chair: string[] = ['GuestTable'];
  public EmployeeId = 'JSK';
  runningItemKOT: GenratedItemKOT = {
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
  Items: IItems = {
    Productid: '',
    Productname: '',
    SubQuantityTypeID: '',
    SubQuantityTypeName: '',
    Qauntityid: '',
    Qauntityname: '',
    Quantity: 0,
    itemamount: 0,
    totalquantityamount: 0,
    employee_id: '',
    Taxes: []
  }
  GenratedItems_: GenratedItems = {
    RecieptNumber: '',
    TableId: '',
    EmployeeId: '',
    Items: [this.Items],
    _id: '',
    createdAt: new Date()
  }
  AddOnItems: IAddOnItems[] = [];
  showCommentConfime = false;
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
  // public runningItemsKOT$?: Observable<any[]>;
  public loadAddOnProductsdata$!: Observable<any[]>;
  public myDiscountForm!: FormGroup;
  public paymentForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  receiveNotification: any;
kotOrdersList: any;
   SubQuantityTypeName = "";
  SelectProductId = "";
  selectSubQuantityTypeID = "";
  qvalue = 0;
  Productprice = 0;
  runningItemsArray: any[] = [];
  filteredData: any[] = [];
      itemSuccessData: GenratedItems | null = null;
addSuccessSub: Subscription | undefined;
  ItemID: string = 'undefined';
  billFormate = "";
  KOTsUD_Data: any;
  KOTsUD_Data2: any;
  private kotDeletedIndexes = new Set<string>();
  SelectProductId_ = ""; selectSubQuantityTypeID_ = "";
  manageKOTItem: any;
  SearchManagingKOTItems: any;
   KOTItemsdata: GenratedItemKOT[] = [];
  AllProductWithPrice: ProductPriceDetails[] = [];
  items: any[] = [];
  dineData$: any;

  constructor(private KOTsUDService_: KOTsUDService,
    private router: Router,
    private formedit: FormBuilder,
    private addAddOnProductService_: addAddOnProductService,
    private InvoiceService_: InvoiceService,
    private fb: FormBuilder,
    private paymentFormBuilder: FormBuilder,
    private CustomerService_: CustomresService,
    private subQuantityTypeService_: subQuantityTypeService,
    private datePipe: DatePipe,
    public actions$: Actions,
    private store: Store<{ customerPaymentHistoryReducer_: any, runningItemReducer_: any, loadDineTables2: any, runningItemKOTReducer_: any, invoiceReducer_: any, GenratedItemsReducer_: any, dineTableReducer_: any }>,
    private InitializeInvoice_: InitializeInvoice,
    private ManageService_: ManageService, private HomeManageService_: HomeManageService,
    private chairsrunningorderservice: ChairServiceService,
    // private pouch: RunningItemsPouchdbService
  ) {
    this.table_id = "";
    //  //alert("hc "+this.invoiceid);
    //  this.RecieptNumber = this.invoiceid
    //   //alert("hc "+this.RecieptNumber);
    this.closePopup = false;
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
      mostSelling: false,
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
    this.showCommentConfime = false;
    // this.successItems$ = this.store.select(
    //   state => state.GenratedItemsReducer_.items
    // );
    // this.loading$ = store.select(state => state.GenratedItemsReducer_.loading);
    // this.error$ = store.select(state => state.GenratedItemsReducer_.error);
    //this.dineData$ = this.store.select(state => state.dineTableReducer_?.dineData);
    this.runningItemsKOT$ = store.select(state => state.runningItemKOTReducer_.KOTrunningorders.data);
    // this.loading$ = store.select(state => state.runningItemKOTReducer_.loading);
    // this.error$ = store.select(state => state.runningItemKOTReducer_.error);
    this.RunningItems_$ = store.select(state => state.runningItemReducer_.RunningItems_);
    this.loading$ = store.select(state => state.runningItemReducer_.loading);
    this.error$ = store.select(state => state.runningItemReducer_.error);
  }
 


  ngOnInit(): void {
    // this.loadRunningKOT();
    this.isKOTIndexExists();
    this.loadinvoice();
    this.CustomerName = 'Guest';
    this.RecieptNumber = this.invoiceid;
    // Initialize KOTItemsdata based on available observable
    this.AllProductWithPrice = this.loadAllProductPriceDatabyProductId();
    this.initializeKOTRunningItems();
    this.loadFood();
    this.myDiscountForm = this.fb.group({
      discount: '',
      numberInput: [0]
    });
    this.paymentForm = this.paymentFormBuilder.group({
      paidAmount: []
    });


  }
  loadFood() {
    this.store.dispatch(RunningItemActions.loadfood({ invoiceid: this.invoiceid }));
    const runningItemsSub = this.RunningItems_$
      ?.subscribe((items: RunningItems[]) => {
        console.log('Running Items Loaded:', items);
        this.runningItemsArr = Array.isArray(items) ? [...items] : [];
        console.log('Running Items Updated:', this.runningItemsArr);
      });
    if (runningItemsSub) {
      this.subscriptions.push(runningItemsSub);
    }
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
        allppdata: FilteredRunningItemData,

      })
    );
    this.calculateTotalAmount();
  }
  quntityvalueNumber: number = 0;
  onQuantityChange(d: any, quntityvalue: any): void {
    // If input is not a positive number, set to 1 as minimum
    this.quntityvalueNumber = quntityvalue;
    if (!quntityvalue || quntityvalue < 1) {
      this.quntityvalueNumber = 1; //d.quntityvalue
    }

    const FilteredRunningItemData = this.filterProductwithPriceRunningItem(d.SelectProductId, d.SubQuantityTypeName);
    console.log('FilteredRunningItemData:', FilteredRunningItemData);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: d.SelectProductId,
        action: 'inc',
        SubQuantityTypeName: d.SubQuantityTypeName,
        quntity: +this.quntityvalueNumber - 1,
        price: d.ProductPrice,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData,
      })
    );

  }
  filterProductwithPriceRunningItem(ProductId: string, SubQuantityTypeName: string) {
    return this.AllProductWithPrice?.filter(
      (item: any) =>
        item.SelectProductId === ProductId &&
        item.SubQuantityTypeName === SubQuantityTypeName
    );
  }

  loadinvoice(): void {
    const RecieptNumber = this.invoiceid;
    if (!RecieptNumber) return;
    this.InvoiceData$?.subscribe(InvoiceData => {
      const inv = InvoiceData?.[0];
      if (inv) {
        this.table_id = inv.table_id;
        this.table_name = inv.tablename;
        this.CustomerId = inv.customer_id;
        const customerName = inv.customer_id !== 'undefined' ? this.getCustomerName(inv.customer_id) : 'Guest';
        this.CustomerName = customerName ?? 'Guest';
        this.ordermode = this.table_name !== 'Pick Up' ? this.table_name : 'Pick Up';
      }
    });
  }
  getid(event: any): void {
    if (!this.chardata) return;
    const idx = event.target.value;
    if (this.chardata[idx]) {
      this.chardata[idx].status = !!event.target.checked;
    }
  }

  getpaybyid(_id: string): void {
    this.paybyId = _id;
  }

  getproductbycategory(_id: any): void {

    if (this.ordermode) {
      this.loadproductpricename(_id);
    }
  }

  removerunningOrderKOT(): void {
    // TODO: Implement or remove unused logic
    this.KOTItemsdata = [];
    // Remove runningItemsKOT in HomeManageService by RecieptNumber
    // Dispatch an action to remove the KOT running items for this invoice ID
    this.store.dispatch(RunningItemKOTActions.removeMultipleKOTRunningItems({
      KOTStatus: 'false',
      RecieptNumbers: this.invoiceid // Fixed property: should be RecieptNumbers, not RecieptNumber
    }));
    this.chairsrunningorderservice.delete(this.invoiceid).subscribe(() => {
    })
  }

  dineDataSubscription: Subscription | undefined;
  updateTableStatusByTableId(table_id: string, tablename: string): void {
    // Find the dine record for the given table_id to retrieve the floor_id
    // If you have a collection of dine objects, you may need to search there.
    // But assuming you need to get the floor_id for the current table_id from existing dine or available tables:

    this.DineData$.subscribe((dineData: any) => {
      const table = dineData.find((tbl: any) => tbl._id === table_id);
      const floor_id = table?.floor_id || '';
      const updatedDine = {
        _id: table_id,
        name: tablename,
        description: table.description || '',
        status: true,
        floor_id: floor_id,
        employee_id: this.employeeId,
      };

      this.store.dispatch(DineTableActions.updateDineTable({ IDine_: updatedDine }));
      const failureSub = this.actions$
        .pipe(
          ofType(DineTableActions.updateDineTableFailure),
        )
        .subscribe({
          next: (error: any) => {
            console.error("An error occurred while updating the table status.", error);
          },
          error: (error: any) => {
            console.error("An error occurred while updating the table status.", error);
          }
        });
      const successSub = this.actions$
        .pipe(
          ofType(DineTableActions.updateDineTableSuccess),
        )
        .subscribe({
          next: () => {
            this.store.dispatch(loadDineTables());
          },
          error: (error: any) => {
            console.error("An error occurred while updating the table status.", error);
          }
        });

      this.subscriptions.push(successSub, failureSub);
    });
  }
  placeOrderAndNext() {
    this.isPickUpNextOrder = true;
    this.placeOrder();
  }
  CancelOrder(): void {
    // Clear localStorage entries related to the given invoice ID
    this.genrateOrderFinal('Cancelled', false);

    // ✅ Step 8: Redirect
    this.RedirectToTable.emit('tables');

  }
  genrateOrder() {
    this.genrateOrderFinal('Settled', true);
  }
  genrateOrderFinal(InvoiceStatus: string, PaidStatus: boolean): void {

    const r = this.getRunningItemsValues();
    this.RunningItems_2 = Array.isArray(r) ? [...r] : [];
    console.log(this.RunningItems_2);
    this.getinvoiceid2 = '';
    this.gitems = [];
    this.gitems2 = [];
    // let invoice;
    if (this.discountvalue === this.paidamount) {

      this.genrateInvoice({ Orderstatus: InvoiceStatus, paidstatus: PaidStatus }).then(invoice => {
        this.updateInvoiceFunction({ invoice });
        const runitemarr = this.getRunningItemsValues();
        console.log(this.RunningItems_2.length);
        if (this.RunningItems_2.length > 0) {
          // alert("if");
          this.GenratedItems_ = {
            RecieptNumber: this.invoiceid,
            EmployeeId: this.employeeId,
            TableId: this.table_id === '' ? 'Pick Up' : this.table_id,
            Items: this.RunningItems_2,
            createdAt: new Date()
          } as unknown as GenratedItems;
          console.log(this.GenratedItems_);
          console.log(this.RunningItems_2);
          // ✅ Step 2: Dispatch action
          this.store.dispatch(
            GentratedItemsActions.addGenratedItems({ items: this.GenratedItems_ })
          );
        }
        if (((this.paidamount - this.discountvalue) < 0) && (this.CustomerId !== 'undefined')) {
          this.addPendingAmountToCustomerPaymentHistory(
            this.CustomerId,
            this.paidamount - this.discountvalue,
            this.invoiceid)
        }
        // Safely call updateTableStatusByTableId if invoice has needed properties

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
        if (this.router && typeof this.router.navigate === 'function' && this.ordermode != 'Pick Up') {
          this.router.navigate(['/tables']);
        }
        if (this.ordermode === 'Pick Up') {
          this.ordermode = '';
          localStorage.removeItem(this.invoiceid);
          if (this.isPickUpNextOrder) {
            this.isPickUpNextOrder = false;
            this.pickUpOrder.emit('pickup');
          }

        }
        else this.ordermode = '';
        // After settling the order, redirect to 'tables' page for next table selection

      }).catch(err => {
        console.error('Error generating invoice:', err);
      });
      this.store.dispatch(RunningItemActions.clearRunningItems());
    } else {
      this.genrateInvoice({ Orderstatus: InvoiceStatus, paidstatus: false }).then(invoice => {
        this.updateInvoiceFunction({ invoice });
        const runitemarr = this.getRunningItemsValues();
        console.log(this.RunningItems_2.length);
        if (this.RunningItems_2.length > 0) {
          this.GenratedItems_ = {
            RecieptNumber: this.invoiceid,
            EmployeeId: this.employeeId,
            TableId: this.table_id === '' ? 'Pick Up' : this.table_id,
            Items: this.RunningItems_2,
            createdAt: new Date()
          } as unknown as GenratedItems;
          console.log(this.GenratedItems_);
          console.log(this.RunningItems_2);
          // ✅ Step 2: Dispatch action
          this.store.dispatch(
            GentratedItemsActions.addGenratedItems({ items: this.GenratedItems_ })
          );
        }
        // Ensure getCustomerName exists and is callable
        if (typeof this.getCustomerName === 'function' && this.CustomerId) {
          this.getCustomerName(this.CustomerId);
        }
        if (((this.paidamount - this.discountvalue) < 0) && (this.CustomerId !== 'undefined')) {
          this.addPendingAmountToCustomerPaymentHistory(
            this.CustomerId,
            this.discountvalue - this.paidamount,
            this.invoiceid)
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
        if (this.router && typeof this.router.navigate === 'function' && this.ordermode != 'Pick Up') {
          this.router.navigate(['/tables']);
        }

        if (this.ordermode === 'Pick Up') {
          this.ordermode = '';
          localStorage.removeItem(this.invoiceid);
          if (this.isPickUpNextOrder) {
            this.isPickUpNextOrder = false;
            this.pickUpOrder.emit('pickup');

          }
          //  alert("pickup order else");
        }
        else
          this.ordermode = '';
      }).catch(err => {
        console.error('Error generating invoice:', err);
      });
      this.store.dispatch(RunningItemActions.clearRunningItems());
      //  
    }

  }



  deleteRunningKOT(): void {
    // You must dispatch with required payload if needed
    // Assuming an argument is required: provide the necessary payload (using null or proper object as per your action definition)
    this.store.dispatch(RunningItemKOTActions.removeKOTRunningItem({
      RecieptNumber: this.invoiceid
    }));
  }

  ClearSomeVariable(): void {

    //this.RunningItems_ = [];
    this.productsByCategoryId = [];
    this.discountvalue = 0;
    this.paidamount = 0;
    this.percent = 0;
    this.itemtotalamount = 0;
    this.totalamount = 0;
    this.totaltax = 0;
    this.CustomerName = 'Guest';
    this.CustomerId = 'undefined';
    this.RunningItems_2 = [];
    this.value_invoiceid_Changed.emit('');
  }
  ClearSomeVariable2(): void {
    this.ordermode = '';
    this.productsByCategoryId = [];
  }

  updateInvoiceFunction({ invoice }: { invoice: any; }): void {
    if (invoice) {
      this.actions$
        .pipe(
          ofType(InvoiceActions.updateInvoiceSuccess, InvoiceActions.updateInvoiceFailure),
          take(1)
        )
        .subscribe((action: any) => {
          if (action.type === InvoiceActions.updateInvoiceFailure.type) {
            console.error('Invoice update failed:', action.error);
            return;
          }
        });
      this.store.dispatch(InvoiceActions.updateInvoice({ invoice: invoice }));
    } else {
      console.error('No invoice provided for update.');
    }


  }

  async genrateInvoice({ Orderstatus, paidstatus }: { Orderstatus: string; paidstatus: boolean; }): Promise<Invoice> {
    console.log(this.paybyId);
    let paybleamount = this.paidamount;
    if (this.paidamount > this.discountvalue) {
      paidstatus = true;
    }

    return {
      Taxes: this.getTax(),
      Chairs: this.ichar,
      AddOnItems: this.selectedAddOnItems,
      taxpecentRate: 0,
      taxpercentValue: 0,
      createdAt: new Date(),
      DiscountId: 'jsk',
      Discountvalue: this.itemtotalamount === 0 ? 0 : this.actualdiscountprice,
      Discountperstage: this.percent,
      AdditionaldiscountAmount: 0,
      Totalvaue: this.actualdiscountprice > 0 ? this.itemtotalamount + this.actualdiscountprice : this.itemtotalamount,
      grandtotal: this.itemtotalamount === 0 ? 0 : this.discountvalue,
      RecieptNumber: +this.invoiceid,
      OrderType: this.ordermode,
      AmountPaidstatus: paidstatus,
      Orderstatus: Orderstatus,
      PaidAmount: this.itemtotalamount === 0 ? 0 : this.paidamount,
      PendingAmount: this.itemtotalamount === 0 ? 0 : ((this.paidamount - this.discountvalue) < 0 ? (this.discountvalue - this.paidamount) : 0),
      TotalTaxAmount: this.totaltax,
      TotalItemsAmount: this.itemtotalamount === 0 ? 0 : this.totalamount,
      OrderTypeName: this.chardata[0],
      paybyId: this.paybyId !== 'none' ? this.paybyId : this.paybydata?.find((paymentMethod: any) => paymentMethod?.makeMeDefault === true)?._id ?? 'none',
      table_id: String(this.table_id),
      tablename: this.table_name === '' ? 'Pick Up' : this.table_name,
      customer_id: this.CustomerId === 'undefined' ? 'undefined' : this.CustomerId,
      employee_id: String(this.employeeId),
      AssistToId: 'undefined',
      returnAmount: String(this.itemtotalamount) === '0' ? '0' : (String((this.paidamount - this.discountvalue || this.itemtotalamount - this.paidamount) > 0 ? (this.paidamount - this.discountvalue || this.itemtotalamount - this.paidamount) : 0)),
      CommentId: 'undefined',
      tokennumber: +this.TokenNumber
    };
  }

  getTax(): ITax[] {
    this.itaxarr = [];
    if (!this.Tax) return this.itaxarr;
    const r = this.runningItemsArr; //this.getRunningItemsValues();
    console.log('Running Items for Tax Calculation:', r);
    if (Array.isArray(r)) {
      for (const runningItem of r) {
        for (const tax of this.Tax) {
          if (tax.Status) {
            this.itaxarr.push({
              id: tax._id,
              name: tax.name,
              percent: tax.perscentRate,
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
  onPaidAmountChange() {

    this.paidamount = this.paymentForm.value.paidAmount;
  }
  discountChange(): void {
    const { discount, numberInput } = this.myDiscountForm.getRawValue();
    const total = Number(this.itemtotalamount);
    const input = Number(numberInput);

    // A discount is only available for totals above the minimum threshold.
    if (!Number.isFinite(total) || total <= 500) {
      this.percent = 0;
      this.discountvalue = 0;
      this.actualdiscountprice = 0;
      return;
    }

    let discountAmount = 0;
    let discountPercent = 0;

    if (Number.isFinite(input) && input > 0) {
      if (discount === '%') {
        discountPercent = input;
        discountAmount = total * discountPercent / 100;
      } else if (discount === 'Rupees') {
        discountAmount = input;
        discountPercent = discountAmount * 100 / total;
      }
    }

    // Keep both discount modes within the permitted ten percent limit.
    if (discountPercent <= 10 && discountAmount > 0 && discountAmount <= total) {
      this.percent = +discountPercent.toFixed(2);
      this.actualdiscountprice = +discountAmount.toFixed(2);
      this.discountvalue = +(total - discountAmount).toFixed(2);
      this.itemtotalamount = +(this.itemtotalamount - this.actualdiscountprice).toFixed(2);
    } else {
      this.percent = 0;
      this.discountvalue = 0;
      this.actualdiscountprice = 0;
    }
  }




  placeOrder(): void {
    if (this.paymentForm.value.paidAmount === null || this.paymentForm.value.paidAmount === undefined || this.paymentForm.value.paidAmount === '') this.paidamount = this.paidamount = this.itemtotalamount;
    if (!this.discountvalue) this.paidamount = this.itemtotalamount;
    else if (this.paidamount >= 0) this.paidamount = this.paidamount;
    else this.paidamount = this.discountvalue;

    if ((this.CustomerId === 'undefined') && (this.paidamount - this.discountvalue) < 0) {
      this.showCustomersPopUp();
      return;
    }
    this.genrateOrder();
  }

  close2(): void {
    this.showplaceorderPopup = false;
  }

  onSubmit(form: any): void {
    // this.AllProductWithPrice
    //  const allppdata = this.loadAllProductPriceDatabyProductId();
    const selectedValue = form.value.option;
    this.item_subQuantityType_ID = this.ProductPrice.find(
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
      const FilteredRunningItemData = this.filterProductwithPriceRunningItem(item.SelectProductId, item.SubQuantityTypeName);
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
          allppdata: FilteredRunningItemData,

        })
      );
    } else {
      const FilteredRunningItemData = this.filterProductwithPriceRunningItem(this.item_subQuantityType_ID.id, this.item_subQuantityType_ID.SubQuantityTypeName);
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
          allppdata: FilteredRunningItemData,

        })
      );
    }
    this.calculateTotalAmount();
    this.showtype = false;
  }




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

    // Match every product tax id with Tax._id and calculate tax from that
    // product's price (rather than applying all taxes to the invoice total).
    let totaltax = 0;
    const taxnames: string[] = [];
    const products: any[] = [];
    const runningItems = this.getRunningItemsValues();
    if (Array.isArray(runningItems)) products.push(...runningItems);
    // if (Array.isArray(this.KOTItemsdata)) {
    //   this.KOTItemsdata.forEach((kot: any) => {
    //     if (Array.isArray(kot?.KOTrunningorders)) {
    //       kot.KOTrunningorders.forEach((item: any, itemIndex: number) => {
    //         const isDeletedKOTItem = item?.KOTChange === true &&
    //           this.isKOTItemDeleted(itemIndex);

    //         if (!isDeletedKOTItem) {
    //           products.push(item);
    //         } else {
    //           console.log('Checking KOT item:', item, 'index:', itemIndex, 'isDeletedKOTItem:', isDeletedKOTItem);
    //         }

    //       });
    //     }
    //   });
    // }
     if(products && Array.isArray(products)) {
    products.forEach((product: any) => {
      const price = (+product?.ProductPrice || 0) * (+product?.quntityvalue || 0);
      const productTaxes = product?.Taxes ?? product?.taxes ?? [];
      const taxIds = Array.isArray(productTaxes) ? productTaxes : [productTaxes];

      taxIds.forEach((productTax: any) => {
        const taxId = typeof productTax === 'object'
          ? (productTax?._id ?? productTax?.id ?? productTax?.TaxId)
          : productTax;
        const tax = this.Tax!.find((availableTax: any) =>
          String(availableTax?._id) === String(taxId) &&
          (availableTax?.Status === undefined || availableTax.Status === true)
        );
        if (tax) {
          const rate = +(tax.perscentRate ?? tax.percentRate ?? tax.taxRate ?? 0) || 0;
          totaltax += (price * rate) / 100;
          if (tax.name && !taxnames.includes(tax.name)) taxnames.push(tax.name);
        }
      });
    });
  }
  this.totaltax += totaltax;
    console.log('Calculating grand total for products:', this.kotOrdersList);
    if(this.kotOrdersList && Array.isArray(this.kotOrdersList)) {
    this.kotOrdersList.forEach((product: any) => {
      const price = (+product?.ProductPrice || 0) * (+product?.quntityvalue || 0);
      const productTaxes = product?.Taxes ?? product?.taxes ?? [];
      const taxIds = Array.isArray(productTaxes) ? productTaxes : [productTaxes];

      taxIds.forEach((productTax: any) => {
        const taxId = typeof productTax === 'object'
          ? (productTax?._id ?? productTax?.id ?? productTax?.TaxId)
          : productTax;
        const tax = this.Tax!.find((availableTax: any) =>
          String(availableTax?._id) === String(taxId) &&
          (availableTax?.Status === undefined || availableTax.Status === true)
        );
        if (tax) {
          const rate = +(tax.perscentRate ?? tax.percentRate ?? tax.taxRate ?? 0) || 0;
          totaltax += (price * rate) / 100;
          if (tax.name && !taxnames.includes(tax.name)) taxnames.push(tax.name);
        }
      });
    });
  }
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

  private getItemTotal(items: any[] = [], showDeletedAlert = false): number {
    return (Array.isArray(items) ? items : []).reduce((sum: number, item: any) => {
      if (!item) {
        return sum;
      }

      const qty = Number(item?.quntityvalue ?? item?.quantity ?? 0);
      const price = Number(item?.ProductPrice ?? item?.productPrice ?? item?.price ?? 0);

      if (!Number.isFinite(qty) || !Number.isFinite(price)) {
        return sum;
      }

      return sum + qty * price;
    }, 0);
  }

  calculateTotalAmount(): void {
    const runningItems = Array.isArray(this.runningItemsArr) && this.runningItemsArr.length > 0
      ? (Array.isArray(this.getRunningItemsValues()) ? this.getRunningItemsValues() : [])
      : [];

    const kotItems = Array.isArray(this.KOTItemsdata) ? this.KOTItemsdata : [];
    if (kotItems.length === 0) {
      this.totalamount = this.getItemTotal(runningItems);
      this.grandtotal();
      return;
    }

    const updateTotal = (): void => {
      const kotOrders = Array.isArray(kotItems[0]?.KOTrunningorders)
        ? kotItems[0].KOTrunningorders
        : [];
      const deletedKots = Array.isArray(this.KOTsUD_Data2)
        ? this.KOTsUD_Data2.filter((item: any) => item?.Type === 'Delete')
        : [];
      console.log('Calculating total amount. Running items:', runningItems, 'KOT orders:', kotOrders, 'Deleted KOTs present:', deletedKots);
      // Filter into a new array so recalculating totals never mutates the source KOT data.
      const kotOrdersList: any[] = [];
      for (let index = 0; index < kotOrders.length; index++) {
        const item = kotOrders[index];
        const isDeleted = deletedKots.some((deletedKot: any) =>
          String(deletedKot?.IndexNumber) === String(index)
        );
        if (isDeleted && item?.KOT_Changed === true) {

        }
        else {
          kotOrdersList.push(item);
        }
      }
      console.log('Filtered KOT orders for total calculation:', kotOrdersList);
      this.kotOrdersList = kotOrdersList;
      this.totalamount = this.getItemTotal(runningItems) + this.getItemTotal(kotOrdersList);
      this.grandtotal();
    };

    if (Array.isArray(this.KOTsUD_Data2)) {
      updateTotal();
      return;
    }

    this.KOTsUDService_
      .getKOTsUDByReceiptNumber(this.invoiceid)
      .subscribe({
        next: (orders: any) => {
          this.KOTsUD_Data = orders;
          this.KOTsUD_Data2 = orders?.data ?? orders ?? [];
          updateTotal();
        },
        error: () => {
          console.error('Failed to load KOTsUD data for receipt number.', this.error$);
          this.KOTsUD_Data = null;
          this.KOTsUD_Data2 = [];
          this.kotDeletedIndexes = new Set();
          updateTotal();
        }
      });
  }
    shortCode(productpricedata: any) {
    const runningItems = this.getRunningItemsValues();
    const runningItemsArr = Array.isArray(runningItems) ? runningItems : [];
    const quantity = runningItemsArr.find((item: any) =>
      String(item?.SelectProductId) === String(productpricedata.SelectProductId) &&
      String(item?.selectSubQuantityTypeID ?? item?.SubQuantityTypeID) === String(productpricedata.selectSubQuantityTypeID)
    )?.quntityvalue ?? 0;
console.log('Running items array:', runningItemsArr);
    this.increment2(
      productpricedata.SelectProductId,
      this.getSubQuantityTypeName(productpricedata.selectSubQuantityTypeID),
      quantity,
      productpricedata.ProductPrice
    );
   console.log('Incrementing product with data:', productpricedata);
  
  }
  increment(_id: any): void {
    this.showtype = false;
    this.ProductPrice = this.getAllProductQuantityTypePrice(_id);
    const runningItemsArr = Array.isArray(this.getRunningItemsValues()) ? this.getRunningItemsValues() : [];
    // Ensure only one product type is available to increment
    if (
      Array.isArray(this.ProductPrice) &&
      this.ProductPrice.length === 1
    ) {
      const selectedType = this.ProductPrice[0];

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
      console.log('Incrementing product:', filteredData, 'Current quantity:', qvalue, 'Price:', selectedType.price);
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
          allppdata: filteredData,

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
    } catch (err) {
      console.error('Error previewing running items:', err);
    }
    this.calculateTotalAmount();
  }

  decrement(_id: any): void {
    this.showtype = false;
    this.ProductPrice = this.getAllProductQuantityTypePrice(_id);
    this.calculateTotalAmount();
  }
  changKOTItemsI(kotitem: any, kot: any, qvalue: number) {
    if (qvalue < 0) {
      qvalue = 1;
    }
    if (qvalue >= 0) {
      this.manageRunningKOTItem(kotitem, kot, "Increment");
      // this.loadRunningKOT();

    }

  }
  increment2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
    // console.log(this.AllProductWithPrice);
    this.showtype = false;
    // const allppdata = this.loadAllProductPriceDatabyProductId();
    // console.log(this.RunningItems_);
    const FilteredRunningItemData = this.filterProductwithPriceRunningItem(_id, SubQuantityTypeName);
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
        allppdata: FilteredRunningItemData,

      })
    );
    this.calculateTotalAmount();
  }

  decrement2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
    this.showtype = false;
    const FilteredRunningItemData = this.filterProductwithPriceRunningItem(_id, SubQuantityTypeName);
    this.store.dispatch(
      updateRunningItemQuantity({
        id: _id,
        action: 'dcre',
        SubQuantityTypeName: SubQuantityTypeName,
        quntity: qvalue,
        price: price,
        RunningItemData: this.getRunningItemsValues(),
        invoiceid: this.invoiceid,
        allppdata: FilteredRunningItemData,

      })
    );
    this.calculateTotalAmount();
  }
  changKOTItemsD(kotitem: any, kot: any, qvalue: number) {
    // TODO: Implement logic for changKOTItemsD, condition is missing
    // For now, just call deleteRunningKOTItem
    if (qvalue === 1) {
      this.manageRunningKOTItem(kotitem, kot, "Delete");
    }
    else {
      this.manageRunningKOTItem(kotitem, kot, "Decrement");
    }

  }


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
              quntityvalue: 0,
              Taxes: this.getProductTaxes(pp.SelectProductId),
              KOT_Changed: false,
            });
          }
        } catch (error) {
          console.error('Error pushing data:', error);
        }
      });
      this.subscriptions.push(sub);
    }
    return this.allppdata;
  }
  getProductTaxes(selectProductId: string): any[] {
    let productTaxes: any[] = [];

    const subscription = this.Productnamedata$?.subscribe(products => {
      const taxes = products?.find(
        (product: any) => product._id === selectProductId,
      )?.Taxes;

      if (Array.isArray(taxes)) {
        productTaxes = taxes;
      }
    });

    subscription?.unsubscribe();
    return productTaxes;
  }
  loadproductpricename(_id: any): void {

    this.productsByCategoryId = [];

    if (this.Productnamedata$) {
      const sub = this.Productnamedata$.subscribe(Productnamedata => {
        // //alert("finally");
        if (!Productnamedata) return;
        if (_id == "999") {
          this.loadProductByTopSelling();
          return;
        }
        this.initializeVegType(Productnamedata, _id);
      });
      this.subscriptions.push(sub);
    }
    this.ppname = this.productpriceallname;
  }

  initializeVegType(Productnamedata: any, _id: string) {
    this.productsByCategoryId = [];
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
      ShortCodeNumber: prod.ShortCodeNumber,
      ShortCodeString: prod.ShortCodeString,
      mostSelling: prod.mostSelling,
      quntityvalue: 0,
      veg_nonveg: prod.veg_nonveg
    });
    this.productitembackup = this.productsByCategoryId;
  }

  loadProductByTopSelling(): void {
    this.productsByCategoryId = [];
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
      ShortCodeNumber: prod.ShortCodeNumber,
      ShortCodeString: prod.ShortCodeString,
      mostSelling: prod.mostSelling,
      quntityvalue: 0,
      veg_nonveg: veg_nonveg
    });
    this.productitembackup = this.productsByCategoryId;
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




  getAllProductQuantityTypePrice(id: any): any[] {
    this.priceID = [];
    this.showtype = true;
    // alert("getAllProductQuantityTypePrice called with id: " + id);
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
        ProductName: this.getproductname(id)
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
    this.showCommentConfime = false;
  }
  closePopUpByCommentFun(close: boolean): void {
    this.showCustomerPopUp = false;
    this.showCommentPopUp = false;
    this.showCommentConfime = false;
  }

  closePopUpByChildAddon(close: any): void {
    this.showAddonPopUp = close;
    // this.getAddOnProducts();
  }
  closePopUpByChildSplitBill(close: any) {
    this.showSplitBillPopUp = close;
  }
  closePopUpByChildPartPayment(close: any) {
    this.showPartPaymentPopUp = close;
  }
  runningItemsArr: RunningItems[] = [];
  getRunningItemsValues(): RunningItems[] {
    return Array.isArray(this.runningItemsArr) ? [...this.runningItemsArr] : [];
  }
  InitializeselectedAddOnItemsCallbackFun(selectedAddOnItems: any) {
    return;
    this.selectedAddOnItems = selectedAddOnItems;
    console.log(selectedAddOnItems);

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
      console.log(addOnItems);
      addOnItems.forEach(addOnItem => {
        const addOnProductsSub = this.addOnProductsData$.subscribe((addOndatabyId: any) => {
          const addOnDataArr = Array.isArray(addOndatabyId?.data) ? addOndatabyId.data : [];
          if (!Array.isArray(gotRunningItems) || addOnDataArr.length === 0) return;

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
      //this.subscriptions.push(invoiceDataSub);
    }
  }

  showCommentsPopUp(): void {
    this.showCommentPopUp = true;
  }

  manageRunningKOTItem(kotitem: any, kot: GenratedItemKOT, CommentType: string): void {
    // //alert(CommentType) 
    this.CommentType = CommentType;
    this.updateRunningKOTItem(kotitem, kot, CommentType);
    //  this.reloadKOTRunningItems();
    //    this.calculateTotalAmount();
    // this.SearchManagingKOTItems.KOT_Changed = true;
  }
  updateRunningKOTItem(kotitem: any, kot: GenratedItemKOT, CommentType: string): void {
    const inv = this.invoiceid;
    this.RecieptNumber = inv;
    this.CommentType = CommentType;
    this.showCommentPopUp = true;
    this.showCommentConfime = true;
    this.manageKOTItem = kotitem;
    this.SearchManagingKOTItems = kot;
    // this.manageRunningKOTItem(kotitem, kot, "Delete");
    // this.reloadKOTRunningItems();
    // this.calculateTotalAmount();
  }
 
  showAddonsPopUp(SelectProductId: string, selectSubQuantityTypeID: string, SubQuantityTypeName: string, qvalue: number, Productprice: number) {
    this.showAddonPopUp = true;
    // this.getAddOnItembySubQuantity_Product_ID(SelectProductId, selectSubQuantityTypeID);
    this.store.dispatch(AddOnProductActions.getByProductIdSubQTypeIDAddOnProducts({
      SelectProductId,
      SubQuantityTypeID: selectSubQuantityTypeID
    }));

    const successSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess.type)
    ).subscribe(action => {
      this.addOnProduct = action.addOnProducts.data;
      this.subscriptions.push(successSub, failureSub);
      this.SubQuantityTypeName = SubQuantityTypeName;
      this.SelectProductId = SelectProductId;
      this.selectSubQuantityTypeID = selectSubQuantityTypeID;
      this.qvalue = qvalue;
      this.Productprice = Productprice;
      this.filteredData = this.filterProductwithPriceRunningItem(
        SelectProductId,
        SubQuantityTypeName
      );
      this.runningItemsArray = Array.isArray(this.getRunningItemsValues()) ? this.getRunningItemsValues() : [];

      const matchingRunningItem = this.runningItemsArray.find((item: any) =>
        item?.SelectProductId === SelectProductId &&
        item?.selectSubQuantityTypeID === selectSubQuantityTypeID
      );
      this.selectedAddOnItems = matchingRunningItem?.AddOnItems ?? [];
      console.log(this.addOnProduct);
    });

    const failureSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure.type)
    ).subscribe(action => {
      console.error('Failed to load AddOnProducts:', action.error);
    });


  }

  shownotesPopUp(SelectProductId: string, selectSubQuantityTypeID: string): void {
    const inv = this.invoiceid;
    this.RecieptNumber = inv;
    this.showCommentPopUp = true;
    this.showCommentConfime = true;
    // this.manageRunningKOTItem('addNotes');
    this.CommentType = "addNotes";

    // // Here you can fetch or prepare notes-related data based on the product and sub quantity type IDs if required.
    // // For now, we simply show the popup.
    this.SelectProductId_ = SelectProductId;
    this.selectSubQuantityTypeID_ = selectSubQuantityTypeID;
    // // Optionally: you might want to load notes by product ID and subquantity type ID here.
  }
  splitBill() {
    // Split Bill logic - Check if there are running items available to split

    this.showSplitBillPopUp = true;
  }
  partPayment() {
    this.showPartPaymentPopUp = true;
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
      // this.getAddOnProducts();
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
    this.genrateInvoice({ Orderstatus: 'New Order', paidstatus: false }).then(invoice => {
      this.updateInvoiceFunction({ invoice });
  if (this.CustomerId==='undefined') {
    this.CustomerName = "Guest";
  }
      this.getCustomerName(this.CustomerId);
    });
  }

  getCustomerID(invoiceid: string): void {
    this.InvoiceData$?.subscribe(InvoiceData => {
      this.CustomerId = InvoiceData[0].customer_id;
    }
    )

  }
  loadRunningKOT() {

    this.store.dispatch(RunningItemKOTActions.loadKOTRunningItems());
    this.runningItemsKOT$ = this.store.select(
      state => state.runningItemKOTReducer_?.KOTrunningorders?.data
    );
  }
  getCustomerName(customer_id: string): void {
    if (customer_id === 'undefined') return;
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
  initializeKOTRunningItems() {

    if (this.runningItemsKOT$) {

      this.HomeManageService_.initializeKOTItems(this.runningItemsKOT$ ?? null, this.invoiceid);

      let kotItems = Array.isArray(this.HomeManageService_.KOTItemsdata)
        ? this.HomeManageService_.KOTItemsdata : [];
      const products: any[] = [];
      //if (Array.isArray(kotItems)) products.push(...kotItems);
      if (Array.isArray(kotItems)) {
        kotItems.forEach((kot: any) => {
          if (Array.isArray(kot?.KOTrunningorders)) {
            products.push(...kot.KOTrunningorders);
          }
        });
      }
      console.log('Combined KOT items:', products);
      this.KOTItemsdata = kotItems;
      console.log('Initialized KOTItemsdata:', this.KOTItemsdata);
      const hasKOTChangeFlag = products.some((item: any) => item?.KOT_Changed === true);
      if (hasKOTChangeFlag) {
        this.isKOTIndexExists();

      }
    }
    else {
      this.KOTItemsdata = [];
    }
  }
  reloadKOTRunningItems(): void {

    this.runningItemsKOT$ = this.store.select(
      state => state.runningItemKOTReducer_?.KOTrunningorders?.data
    );
    if (!this.runningItemsKOT$) {
      console.warn('runningItemsKOT$ is undefined or null. Cannot reload KOT running items.');
      return;
    }
    this.runningItemsKOT$?.subscribe({
      next: (latestKOTData) => {
        if (latestKOTData) {
          this.KOTItemsdata = Array.isArray(latestKOTData) ? latestKOTData : [];
          this.calculateTotalAmount();
        }
      }
    });
   
  }
 

  isKOTIndexExists(): KOTsUD | null {
    if (this.KOTsUD_Data2 && Array.isArray(this.KOTsUD_Data2)) {
      this.kotDeletedIndexes = new Set(
        this.KOTsUD_Data2
          .filter((kotUD: any) => kotUD?.Type === 'Delete')
          .map((kotUD: any) => String(kotUD?.IndexNumber ?? ''))
          .filter((indexNumber: string) => indexNumber !== '')
      );
      return null;
    }

    this.KOTsUDService_
      .getKOTsUDByReceiptNumber(this.invoiceid)
      .subscribe({
        next: (orders: any) => {
          this.KOTsUD_Data = orders;
          this.KOTsUD_Data2 = this.KOTsUD_Data?.data ?? this.KOTsUD_Data ?? [];
          this.kotDeletedIndexes = new Set(
            (Array.isArray(this.KOTsUD_Data2) ? this.KOTsUD_Data2 : [])
              .filter((kotUD: any) => kotUD?.Type === 'Delete')
              .map((kotUD: any) => String(kotUD?.IndexNumber ?? ''))
              .filter((indexNumber: string) => indexNumber !== '')
          );
        },
        error: () => {
          const errorMessage = 'Failed to load KOTsUD data for receipt number.';
          console.error(errorMessage, this.error$);
          this.KOTsUD_Data = null;
          this.KOTsUD_Data2 = [];
          this.kotDeletedIndexes = new Set();
        }
      });

    return null;
  }

  isKOTItemDeleted(itemIndex: number): boolean {
    if (this.kotDeletedIndexes.size === 0 && !this.KOTsUD_Data2) {
      this.isKOTIndexExists();
    }

    const indexKey = itemIndex.toString();
    // console.log(`Checking if KOT item with index ${indexKey} is deleted:`, this.kotDeletedIndexes.has(indexKey));
    return this.kotDeletedIndexes.has(indexKey);
  }

  KOT_UD_data: KOTsUD | KOTsUD[] = {
    ItemsID: '',
    RecieptNumber: '',
    EmployeeId: '',
    Type: '',
    IndexNumber: '',
    CommentId: ''
  };
  loadKOT_UD(): void {
    const emptyKOTUD = (): KOTsUD => ({
      ItemsID: '',
      RecieptNumber: '',
      EmployeeId: '',
      Type: '',
      IndexNumber: '',
      CommentId: ''
    });

    const assignKOTUDData = (result: any): void => {
      this.KOT_UD_data = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
          ? result
          : [];
    };

    const request = this.KOTsUDService_?.getKOTsUDByReceiptNumber;
    if (typeof request !== 'function') {
      this.KOT_UD_data = emptyKOTUD();
      return;
    }

    let response: any;
    try {
      response = request.call(this.KOTsUDService_, this.invoiceid);
    } catch (error) {
      console.error('Failed to load KOT UD items:', error);
      this.KOT_UD_data = emptyKOTUD();
      return;
    }

    if (response && typeof response.subscribe === 'function') {
      response.subscribe({
        next: assignKOTUDData,
        error: (error: any) => {
          console.error('Failed to load KOT UD items:', error);
          this.KOT_UD_data = emptyKOTUD();
        }
      });
      return;
    }

    assignKOTUDData(response);
  }

  CustomerPaymentHistory_: CustomerPaymentHistory = {
    CustomerId: '',
    desc: '',
    PaidAt: '',
    PaidAmount: '',
    PendingAmount: '',
    InvoiceId: '',
    EmployeeId: ''
  };

  private buildCustomerPaymentHistoryRecord(
    customerId: string,
    pendingAmount: string,
    invoiceId: string
  ): CustomerPaymentHistory {
    return {
      CustomerId: customerId,
      desc: 'there no more money to pay',
      PaidAt: new Date().toDateString(),
      PaidAmount: this.paidamount.toString(),
      PendingAmount: pendingAmount,
      InvoiceId: invoiceId,
      EmployeeId: ''
    };
  }

  addPendingAmountToCustomerPaymentHistory(
    customerId: string,
    pendingAmount: number,
    invoiceId: string
  ): void {
    const customerPaymentHistory = this.buildCustomerPaymentHistoryRecord(
      customerId,
      pendingAmount.toString(),
      invoiceId
    );
    //alert("fun");
    this.store.dispatch(CustomerPaymentHistoryAction.addCustomerPaymentHistory(customerPaymentHistory));
  }

  ClearLocalStorage(): void {
    if (this.invoiceid) {
      const keysToRemove: string[] = [];
      // Gather all keys with the invoiceid as part of key
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes(this.invoiceid)) {
          keysToRemove.push(key);
        }
      }
      // Remove after iteration to avoid index issues
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }
  
  /**
   * Handles the KOT (Kitchen Order Ticket) process:
   *  1. Resets paid amount.
   *  2. Dispatches action to add the generated items to store.
   *  3. Waits for the item _id response, then builds and dispatches the KOT running item.
   *  4. Triggers invoice generation ("Cooking"), resets, and navigation.
   * Deep refactored for clarity, proper subscription management, and logical separation.
   */

  async KOT(): Promise<void> {
    this.paidamount = 0;

    // ✅ Step 1: Prepare payload
    this.GenratedItems_ = { RecieptNumber: this.invoiceid, EmployeeId: this.employeeId, TableId: this.table_id, Items: this.getRunningItemsValues(), createdAt: new Date() } as unknown as GenratedItems;

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
        const itemResponse = data.items as any;
        const itemId = itemResponse?._id || itemResponse?.data?.[0]?._id;
        if (!itemId) {
          console.error('Generated item id not found in success payload.');
          return;
        }
        this.ItemID = itemId;

        // ✅ Step 4: Prepare KOT running order
        this.runningItemKOT = { EmployeeId: this.employeeId, TableId: this.table_id, ItemsID: this.ItemID, RecieptNumber: this.invoiceid, createdAt: new Date().toISOString(), KOTrunningorders: this.getRunningItemsValues(), KOTStatus: false, Comment: this.CommentKOT || '' } as unknown as GenratedItemKOT;

        // ✅ Step 5: Dispatch KOT actions
        this.store.dispatch(
          RunningItemKOTActions.addKOTRunningItem({
            KOTrunningorder: this.runningItemKOT
          })
        );

        this.store.dispatch(
          RunningItemKOTActions.loadKOTRunningItems()
        );

        // ✅ Step 6: Handle invoice
        try {
          const invoice = await this.genrateInvoice({ Orderstatus: 'Cooking', paidstatus: false });
          this.updateInvoiceFunction({ invoice });
        } catch (err) {
          console.error('Invoice error:', err);
        }

        // ✅ Step 7: Cleanup
        localStorage.removeItem(this.invoiceid);
        this.productsByCategoryId = [];
        this.runningItemKOT = {} as GenratedItemKOT;
        //  this.store.dispatch(DineTableActions.loadDineTables());
        // ✅ Step 8: Redirect
        this.RedirectToTable.emit('tables');
      });
  }
  kotprint() {
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
 
  getBillFormat() {
    this.billFormate = "<div><h6>Delulu</h6> Invoice: " + this.invoiceid + ""
      + "<table><th><td>Name</td><td>Type</td><td>Qty</td></th>"

      + "</table></div>"
  }
  printBill(): void {
    // Attempt to locate the printable invoice section by its id or fallback to body
    const invoiceCard = document.getElementById('printable-section-KOT');
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
  async removeCustomer(CustomerName: string): Promise<void> {
    try {
        this.initializeCustomer({ _id: 'undefined', name: 'Guest' });

    } catch (error) {
      console.error('Error while removing customer:', error);
    }

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  unsbscribeAll(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
function getGItem(arg0: RunningItems, val: number): GenratedItems {
  throw new Error('Function not implemented.');
}

