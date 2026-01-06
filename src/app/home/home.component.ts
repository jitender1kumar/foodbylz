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
import { Observable, Subscription } from 'rxjs';
import { filter,take } from 'rxjs/operators';


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
  GenratedItemKOT
} from '../core/Model/crud.model';


import { RunningItems } from '../core/Model/RunningItemsHomeModel/RunningItem.model';
import { addAddOnProductService } from '../core/Services/addOnProduct.service';
import { DatePipe } from '@angular/common';
import { HomeEnvironment } from '../environment/homeEnvironment';
import * as AddOnProductActions from '../manage/ManageStore/addOnProductStore/addOnProduct.action';
import { Actions } from '@ngrx/effects';
import { InitializeInvoice } from '../core/commanFunction/InitializeInvoice.service';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
import { InvoiceService } from '../core/Services/invoice.service';
import { CustomresService } from '../core/Services/customers.service';
import * as runningItemKOTActions from './homeStore/runningItemKOTStore/runningItemKOT.actions';
import * as RunningItemActions from './homeStore/runningItemStore/runningItem.action';
import { ManageService } from '../core/Services/manage.service';
import { HomeManageService } from './Services/homeManage.service';
import { updateRunningItemQuantity } from './homeStore/runningItemStore/runningItem.action';
// import { RunningItemsPouchdbService } from '../core/db/services/runningItemsPouchdb.service';

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
    qvalue: undefined
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
  getinvoiceid: any;
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
  public runningItemsKOTHome$?: Observable<any[]>;
  public loadAddOnProductsdata$!: Observable<any[]>;
  public myDiscountForm!: FormGroup;

  private subscriptions: Subscription[] = [];
 // invoiceData$ = new BehaviorSubject<any>(null);


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
    private store: Store<{ runningItemReducer_: any,runningItemKOTReducer_:any }>,
    private InitializeInvoice_: InitializeInvoice,
    private ManageService_:ManageService,private HomeManageService_:HomeManageService,
   // private pouch: RunningItemsPouchdbService
  ) {

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
    this.runningItemsKOTHome$ = store.select(state => state.runningItemKOTReducer_.KOTrunningorders.data);
    this.loading$ = store.select(state => state.runningItemKOTReducer_.loading);
    this.error$ = store.select(state => state.runningItemKOTReducer_.error);
    this.RunningItems_$ = store.select(state => state.runningItemReducer_.RunningItems_);
    this.loading$ = store.select(state => state.runningItemReducer_.loading);
    this.error$ = store.select(state => state.runningItemReducer_.error);
  }
KOTItemsdata:any;
AllProductWithPrice:any;
items: any[] = [];
  ngOnInit(): void {
   // this.loadData();
   
    this.loadinvoice();
    
    this.CustomerName='Guest';
    this.RecieptNumber = this.invoiceid
    // //alert("hng "+this.RecieptNumber);
    //this.RunningItems_ = [];
    // Defensive: initializeKOTItems expects Observable<GenratedItemKOT[]>, make sure runningItemsKOT$ is not undefined/null
    if (this.runningItemsKOTHome$) {
      this.KOTItemsdata = this.HomeManageService_.initializeKOTItems(this.runningItemsKOTHome$, this.invoiceid);
    } else if (this.runningItemsKOT$){
      this.KOTItemsdata = this.HomeManageService_.initializeKOTItems(this.runningItemsKOT$, this.invoiceid);
    }
    else this.KOTItemsdata=[];
   
    this.loadFood();

    // this.loadfood('DinningTable', this.invoiceid);
    this.myDiscountForm = this.fb.group({
      discount: '',
      numberInput: [0]
    });
   // this.loadProductByTopSelling();
    this.AllProductWithPrice = this.loadAllProductPriceDatabyProductId();
    
  }
  // async addData() {
  //   await this.pouch.add({
  //     name: 'Dosa',
  //     price: 50,
  //     createdAt: new Date()
  //   });
  //   this.loadData();
  // }
  // async loadData() {
  //   const res: any = await this.pouch.getAll();
  //   this.items = res.rows.map((r: any) => r.doc);
  // }
  // initializeKOTItems()
  // {
  //   if(!this.runningItemsKOT$)return;
  //   this.runningItemsKOT$?.subscribe(KOTItems=>
  //     {
       
  //       if (KOTItems) {
  //         if (Array.isArray(KOTItems)) {
  //           this.KOTItemsdata = KOTItems.filter(
  //             (item: any) => item && item.RecieptNumber === this.invoiceid  
  //           );
  //           if(!this.KOTItemsdata)this.KOTItemsdata="";
  //          // console.log(this.KOTItemsdata[0].KOTrunningorders);
  //          // console.log(this.KOTItemsdata);
  //          // this.RunningItems_
  //         } else {
  //           this.KOTItemsdata = "";
  //         }
  //       }
  //     }
  //     );
     
  // }
  loadFood()
  {
   // const runningItems = this.HomeManageService_.loadfood(this.invoiceid);
    //this.store.dispatch(RunningItemActions.loadfood({ invoiceid: this.invoiceid }));
    this.store.dispatch(RunningItemActions.loadfood({ invoiceid: this.invoiceid }));
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_.RunningItems_);
    this.loading$ = this.store.select(state => state.runningItemReducer_.loading);
    this.error$ = this.store.select(state => state.runningItemReducer_.error);
    this.calculateTotalAmount();
   // this.RunningItems_$.subscribe(data=>console.log(data));
    // console.log(runningItems);
    // if (Array.isArray(runningItems)) {
    //   this.RunningItems_ = runningItems;
    // } else {
    //   this.RunningItems_ = [];
    // }
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
  }
  quntityvalueNumber:number=0;
  onQuantityChange(d: any,quntityvalue:any): void {
    console.log("d", d, "quntityvalue", quntityvalue);
    // If input is not a positive number, set to 1 as minimum
    this.quntityvalueNumber=quntityvalue;
    if (!quntityvalue || quntityvalue < 1) {
      this.quntityvalueNumber = 1; //d.quntityvalue
    }
   // quntityvalue=this.quntityvalueNumber;
    // else
    // {
    //   d.quntityvalue = ;
    // }
const FilteredRunningItemData=this.filterProductwithPriceRunningItem(d.SelectProductId, d.SubQuantityTypeName);
   // this.RunningItems_ =  this.HomeManageService_.loadqunityvalue(d.SelectProductId,'inc', d.SubQuantityTypeName, +d.quntityvalue-1, d.ProductPrice,this.RunningItems_,this.invoiceid,FilteredRunningItemData);
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
    // console.log();
    // Optionally trigger recalculation of totals/discounts, etc.
   // this.recalculateTotals();
  }
filterProductwithPriceRunningItem(ProductId:string,SubQuantityTypeName:string)
{
  return this.AllProductWithPrice?.filter(
    (item: any) =>
      item.SelectProductId === ProductId &&
      item.SubQuantityTypeName === SubQuantityTypeName
  );
}
  // recalculateTotals(): void {
  //   // Simple sum of totalamount and itemtotalamount (assuming structure)
  //   this.totalamount = this.RunningItems_
  //     ?.reduce((sum: number, item: any) => sum + ((+item.ProductPrice) * (+item.quntityvalue)), 0) ?? 0;

  //   // If you have discount or tax routines, you can call them here as well
  //   // For example:
  //   // this.calculateTax();
  //   // this.calculateDiscount();
  //   // Finally, recalculate itemtotalamount or similar
  //   // This is example logic; adjust for your business logic if needed
  //   this.itemtotalamount = this.totalamount + (this.totaltax || 0) - (this.percent ? (this.totalamount * this.percent / 100) : 0);

  //   // If you want discountvalue to be updated as settle amount
  //   if (this.itemtotalamount < 0) {
  //     this.discountvalue = 0;
  //   } else {
  //     this.discountvalue = this.itemtotalamount;
  //   }
  // }
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

  // loadfood(msg: string, _moddata: string): void {
  //   if (msg === 'jsk') return;
  //   if (!this.invoiceid) return;
  //   const runningItemsTable = localStorage.getItem(this.invoiceid);
  //   //console.log(runningItemsTable);
  //   let runningItemsData: any = [];
  //   if (runningItemsTable) {
  //     try {
  //       runningItemsData = JSON.parse(runningItemsTable);
  //      // console.log(runningItemsData);
  //     ///  runningItemsData = [];
  //       this.intializeRunningItem(runningItemsData);
  //     } catch (e) {
  //       console.error('Error parsing RunningItemsTable from localStorage', e);
  //       runningItemsData = [];
  //     }
  //   }
  //   this.totalamount = this.gettotamount();
  //   this.getitemTotalTax();
  //   this.getitemtotalamount();
  // }

  // intializeRunningItem(Itemsdata: any): void {
  //   this.addondataarr = [];
  // //  this.RunningItems_ = [];
  //   this.itemtotalamount = 0;
  //   this.totalamount = 0;

  //   const processItems = async (invoiceData: any[], itemsData: any[]) => {
  //     if (!invoiceData || !Array.isArray(invoiceData) || invoiceData.length === 0) return;
  //     const invoiceAddOnItems = invoiceData[0].AddOnItems || [];
     
  //     let addOnProducts: any[] = [];
  //     const addOnProductsPromise = new Promise(resolve => {
  //       this.addOnProductsData$.subscribe(data => {
  //         addOnProducts = data || [];
  //         resolve(null);
  //       });
  //     });
  //     await addOnProductsPromise;

  //     // Helper to get matching add-ons for an item
  //     const getMatchingAddOns = (item: any): IAddOnItems[] => {
  //       return invoiceAddOnItems.filter((addOnItem: IAddOnItems) => {
  //         const addonItemData = addOnProducts.find(p => p._id === addOnItem._id);
  //         return (
  //           addonItemData &&
  //           item.SelectProductId === addonItemData.SelectProductId &&
  //           item.selectSubQuantityTypeID === addonItemData.SubQuantityTypeID &&
  //           addOnItem._id === addonItemData._id
  //         );
  //       });
  //     };
  //      this.itemtotalamount = 0;
  //   this.totalamount = 0;

  //     this.RunningItems_=[];
  //     itemsData.forEach(item => {
  //       const addOnItems = getMatchingAddOns(item);
  //       this.RunningItems_.push({
  //         SelectProductId: item.SelectProductId,
  //         ProductPrice: item.ProductPrice?.toString() ?? '0',
  //         ProductName: item.ProductName,
  //         selectcategoryID: item.selectcategoryID,
  //         categoryName: item.categoryName,
  //         selectQtypeID: item.selectQtypeID,
  //         QtypeName: item.QtypeName,
  //         selectSubQuantityTypeID: item.selectSubQuantityTypeID,
  //         SubQuantityTypeName: item.SubQuantityTypeName,
  //         quntityvalue: item.quntityvalue,
  //         qvalue: item.qvalue,
  //         taxnames: this.taxname,
  //         taxvalues: 'taxpercentValues',
  //         totaltaxvalue: 0,
  //         AddOnItems: addOnItems,
  //         paidStatus:false
  //       });
  //       this.itemtotalamount += (item.ProductPrice || 0) * (item.quntityvalue || 0);
  //       this.totalamount += (item.ProductPrice || 0) * (item.quntityvalue || 0);
  //     });
  //   };

  //   this.InvoiceData$?.subscribe(invoiceData => {
  //     processItems.call(this, invoiceData, Itemsdata);
  //   });
  // }

  loadAddOnProductsInitializing(_id: string) {
  //  this.store.dispatch(AddOnProductActions.getAddOnProductById({ _id }));
    if (this.addOnProductsData$) {
      const sub = this.addOnProductsData$.subscribe(data => {
        console.log(data);
      });
      this.subscriptions.push(sub);
    }
  }

  initializeTax(): void {
    this.taxname = '';
    this.totaltax = 0;
    if (this.Tax) {
      this.Tax.forEach((tax: { Status: any; name: string; perscentRate: number; }) => {
        if (tax.Status) {
          this.taxname += tax.name + ', ';
          const taxAmount = (+this.itemtotalamount * tax.perscentRate) / 100;
          this.totaltax += taxAmount;
        }
      });
    }
    this.itemtotalamount += this.totaltax;
  }

  // initializeItemsCountableData() {
  //   // this.InvoiceService_.getbyid(this.invoiceid).subscribe(getpercentval => {
  //   //   if (!getpercentval) return;
  //   //   this.getpercentvaldata2 = getpercentval;
  //     this.InvoiceData$?.subscribe(data=>{
  //       this.getpercentvaldata = data;
  //     //});
  //     const invoiceData = this.getpercentvaldata[0];
  //     this.percent = invoiceData.Discountperstage;
  //     this.itemTotalTax = invoiceData.Taxes || [];
  //     this.actualdiscountprice = (this.itemtotalamount * this.percent) / 100;
  //     this.myDiscountForm = this.fb.group({
  //       discount: '',
  //       numberInput: [invoiceData.Discountperstage]
  //     });
  //     this.discountvalue = (this.itemtotalamount - ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
  //     this.itemtotalamount = (this.itemtotalamount + ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
  //    });
  //   /////

  //     // this.getpercentvaldata = this.InvoiceData$;
  //     // const invoiceData = this.getpercentvaldata[0];
  //     // this.percent = invoiceData.Discountperstage;
  //     // this.itemTotalTax = invoiceData.Taxes || [];
  //     // this.actualdiscountprice = (this.itemtotalamount * this.percent) / 100;
  //     // this.myDiscountForm = this.fb.group({
  //     //   discount: '',
  //     //   numberInput: [invoiceData.Discountperstage]
  //     // });
  //     // this.discountvalue = (this.itemtotalamount - ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
  //     // this.itemtotalamount = (this.itemtotalamount + ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
   
  // }

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

  removerunningOrder(): void {
    // TODO: Implement or remove unused logic
  }

  genrateOrder(): void {
    (async () => {
      if (this.paybyId === 'none') {
        return;
      }
      if (typeof this.paidamount !== 'number' || this.paidamount < 0) {
        //alert('Paid amount should be greater than or equal to 0.');
        this.ClearSomeVariable();
        return;
      }
      const r = this.getRunningItemsValues();
      this.RunningItems_2 = Array.isArray(r) ? [...r] : [];
      this.getinvoiceid2 = '';
      this.getinvoiceid = '';
      this.gitems = [];
      this.gitems2 = [];
      let invoice;
      if (this.discountvalue === this.paidamount) {
        invoice = await this.genrateInvoice('Settled', true);
      } else {
        invoice = await this.genrateInvoice('Settled', false);
      }
      await this.updateInvoice(invoice);

      await this.close2();
      await this.removerunningOrder();
      await this.ClearSomeVariable();
    })();
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

  updateInvoice(invoice: any): void {
    this.InvoiceService_.update(invoice).subscribe(invoiceupdate => {
      if (!invoiceupdate) return;
      this.getinvoiceid2 = invoiceupdate;
      this.getinvoiceid = this.getinvoiceid2.createdTask;
    });
  }

  async genrateInvoice(Orderstatus:string,paidstatus:boolean): Promise<Invoice> {
    //let paidstatus: boolean = false;
    // if(!this.discountvalue){ if((this.itemtotalamount-this.paidamount)<=0) paidstatus = true;else paidstatus = false;}
    //  else {
    //   if((this.discountvalue-this.paidamount)<=0)paidstatus =true;else paidstatus = false;
    //  }
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
    this.ppalsoavailable = this.getallproducttypeprice(_id);
    const runningItemsArr = Array.isArray(this.getRunningItemsValues()) ? this.getRunningItemsValues() : [];

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
        this.deleteRunningKOTItem(kotitem,kot,"Increment");
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
  //  console.log(this.AllProductWithPrice);
  // const allppdata = this.loadAllProductPriceDatabyProductId();
  const FilteredRunningItemData=this.filterProductwithPriceRunningItem( _id, SubQuantityTypeName);
   // this.RunningItems_ =  this.HomeManageService_.loadqunityvalue(_id, 'dcre', SubQuantityTypeName, qvalue, price,this.RunningItems_,this.invoiceid,FilteredRunningItemData);
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
      this.deleteRunningKOTItem(kotitem,kot,"Delete");
    }
    else
    {
      this.deleteRunningKOTItem(kotitem,kot,"Decrement");
    }
    this.calculateTotalAmount();
  }
  // loadTax(): void {
  //   this.initializeTax();
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
     // const runningItemsArr = this.getRunningItemsValues();
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
   // this.showCommentConfime=true;
  }
  // showCommentsPopUpKOT(): void {
  //   this.showCommentPopUp = true;
  //   this.showCommentConfime=true;
  // }
  deleteKOTItem:any;
  SearchDeletingKOTItems:any;
  deleteRunningKOTItem(kotitem: any,kot:GenratedItemKOT,CommentType:string): void {
   // //alert(CommentType)
    const inv = this.invoiceid;
    this.RecieptNumber=inv;
    this.CommentType=CommentType;
    this.showCommentPopUp = true;
    this.showCommentConfime=true;
    this.deleteKOTItem=kotitem;
    this.SearchDeletingKOTItems=kot;
    // console.log(kotitem);
    // console.log(kot);
  //   // Filter out the running order with the matching SelectProductId showCommentsPopUp
  //   //kot.KOTrunningorders
  //   const KOTrunningorders = kot.KOTrunningorders.filter(
  //     (item: any) => item.SelectProductId !== kotitem.SelectProductId || item.selectSubQuantityTypeID !== kotitem.selectSubQuantityTypeID
  //   );
  //   if(KOTrunningorders.length>0)
  //   {
  //     // const KOTrunningorders = kot.KOTrunningorders.find(
  //     //   (item: any) => item.SelectProductId !== kotitem.SelectProductId
  //     // );
  //     console.log(KOTrunningorders);
  //   }
  //   else if(KOTrunningorders.length==0)
  // {
  //   console.log(kot.RecieptNumber);
  // }
  ////
    // if (!item || !item.RecieptNumber) {
    //   console.error('Invalid item or missing RecieptNumber.');
    //   return;
    // }
    // // Dispatch the action to remove item from KOT running orders
    // this.store.dispatch(runningItemActions.removeRunningItem({ RecieptNumber: item.RecieptNumber }));
    // // Optionally update local RunningItems_ array if you maintain a local cache
    // this.KOTItemsdata = this.KOTItemsdata.filter((i: any) => i.RecieptNumber !== item.RecieptNumber);
  }
  showAddonsPopUp(SelectProductId: string, selectSubQuantityTypeID: string) {
    this.showAddonPopUp = true;
    this.getAddOnItembySubQuantity_Product_ID(SelectProductId, selectSubQuantityTypeID);
  }
  splitBill() {
    // Split Bill logic - Check if there are running items available to split
    
    this.showSplitBillPopUp=true;
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
      this.updateInvoice(invoice);
      
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

  initializeComment(_comment: any): void {}

  CancelOrder(): void {
    this.cancelOrder.emit(this.invoiceid);
     // this.ClearSomeVariable2();
  
  }

  async KOT(): Promise<void> {
  // Ensure required fields for GenratedItemKOT:
  this.paidamount = 0;
  this.runningItemKOT = {
    EmployeeId:this.employeeId,
    TableId:this.table_id,
    RecieptNumber: this.invoiceid,
    createdAt: new Date().toISOString(),
    KOTrunningorders: this.getRunningItemsValues(),
    KOTStatus:'false'
    // Add/assign other required fields for GenratedItemKOT here if needed
  } as unknown as GenratedItemKOT;
   
   try {
     this.store.dispatch(runningItemKOTActions.addKOTRunningItem({ KOTrunningorder: this.runningItemKOT }));
     // Run tasks one by one, ensuring each step completes before proceeding
     const invoicePromise = this.genrateInvoice('Cooking',false);
     if (invoicePromise instanceof Promise) {
       invoicePromise.then(invoice => {
         this.updateInvoice(invoice);
         localStorage.removeItem(this.invoiceid);
         this.productsByCategoryId = [];
         this.runningItemKOT = {} as GenratedItemKOT;
         this.ManageService_.loadRunningKOT();
         this.RedirectToTable.emit("tables");
       });
     } else {
       this.updateInvoice(invoicePromise as any);
       localStorage.removeItem(this.invoiceid);
       this.productsByCategoryId = [];
       this.runningItemKOT = {} as GenratedItemKOT;
       this.ManageService_.loadRunningKOT();
       this.RedirectToTable.emit("tables");
     }
  // this.router.navigate(['/tables']);
   } catch (error) {
     console.error('Failed to dispatch running item:', error);
     // Optionally, you can show a user-facing error as well, e.g.:
     // //alert('An error occurred while processing the order.');
   }
  
  
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
          this.updateInvoice(invoice);
          // Insert any follow-up task here if needed in future
        });
      } else {
        this.updateInvoice(invoiceOrPromise);
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

