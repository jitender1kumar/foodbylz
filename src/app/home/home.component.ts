import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription, catchError, combineLatest, filter, forkJoin, map, of, pipe, switchMap } from 'rxjs';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
import { CategoryService } from '../core/Services/category.service';
import { InvoiceService } from '../core/Services/invoice.service';
import { ProductService } from '../core/Services/product.service';
import { ItemsService } from '../core/Services/items.service';
import { ProductPriceService } from '../core/Services/productprice.service';
import { QuantitytypeService } from '../core/Services/quantitytype.service';
import { TaxService } from '../core/Services/tax.service';
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
  AddOnProductEdit
} from '../core/Model/crud.model';
import { RunningItems } from '../model/category.model';
import { DineService } from '../core/Services/dine.service';
import { ChairService } from '../core/Services/chair.service';
import { InventoryMainFoodwithProductService } from '../core/Services/inventoryFoodWithProduct.service';
import { InventoryMainFoodService } from '../core/Services/inventoryMainFood.service';
import { PaybyService } from '../core/Services/paybymanage.service';
import { ChairServiceService } from '../core/Services/chairsrunningorders.serivce';
import { DatePipe } from '@angular/common';
import { loadCategories } from '../manage/ManageStore/categoryStore/category.actions';
import { loadQuantityType } from '../manage/ManageStore/quntityTypeStore/quntityType.actions';
import { loadSubQuantityType } from '../manage/ManageStore/subQuantityTypeStore/subQuantityType.actions';
import { loadProductPrice } from '../manage/ManageStore/productPriceStore/productPrice.actions';
import { loadProduct } from '../manage/ManageStore/productStore/product.actions';
import { SweetAlert2 } from '../core/commanFunction/sweetalert';
import { CustomresService } from '../core/Services/customers.service';
import { InitializeInvoice } from '../core/commanFunction/InitializeInvoice.service';
import { HomeEnvironment } from '../environment/homeEnvironment'
import * as AddOnProductActions from '../manage/ManageStore/addOnProductStore/addOnProduct.action';
import { Actions, ofType } from '@ngrx/effects';
import * as RunningItemActions from './homeStore/runningItemStore/runningItem.actions';
import { addAddOnProductService } from '../core/Services/addOnProduct.service';

type Nullable<T> = T | null | undefined;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe],
  standalone: false
})
export class HomeComponent implements OnInit {
  // Inputs/Outputs
  @Input() invoiceid!: string;
  @Input() TokenNumber!: number;
  @Output() valueChanged = new EventEmitter<string>();
  @Output() cancelOrder = new EventEmitter<string>();

  // ViewChildren
  @ViewChildren('dynamicInput') divs!: QueryList<ElementRef>;

  // UI State
  invoiceData: any;
  selectedAddOnItems: any;
  tot: number = 0;
  showCustomerPopUp = false;
  showCommentPopUp = false;
  closePopUp = false;
  showDiscountForm = false;
  showdining = false;
  showtype = false;
  showplaceorderPopup = false;
  display = 'display:none;';


  // Data State
  addOnProduct: any;
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
  RunningItems_: RunningItems[] = [];
  RunningItems_2: RunningItems[] = [];
  RunningItems_$?: Observable<RunningItems[]>;
  productsByCategoryId: ProductPriceDetails[] = [];
  productpriceallname: ProductPriceDetails[] = [];
  itemTotalTax: { taxname: string; taxpercent: number }[] = [];
  itaxarr: ITax[] = [];
  ichar: IChair[] = [];
  addonitems: AddOnProductEdit[] = [];
  updataAddOnDataInRunningItem: AddOnProductEdit = {
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
  gitems: GenratedItems[] = [];
  gitems2: GenratedItems[] = [];
  AddOnItems: IAddOnItems[] = [];
  allppdata: any[] = [];
  ppalsoavailable: any[] = [];
  ppname: any[] = [];
  typeprice: any[] = [];
  priceID: any[] = [];
  replaceFilteredData: any[] = [];
  chardata: any[] = [];
  Itemsdata: any[] = [];
  Itemsdata2: any[] = [];
  paybydata: any[] = [];
  paybydata2: any[] = [];
  searchQuery: string = '';
  selectedType: string = '';
  toggle_i: any;
  inputValue: any;
  quntityoffoodarray: any[] = [];
  item_subQuantityType_ID: any;
  item_subQuantityTypeId: any;
  getCustomer: any;
  getCustomerdata: any;
  statusselectall = false;
  paybyId: string = 'none';
  orders_status = [{ '1': 'NewOrder', '2': 'InProgress', '3': 'Cancelled', '4': 'Settled' }];
  chair: string[] = ['GuestTable'];
  gettableid2: any;
  gettableid: any;
  tabledata: any;
  tabledata2: any;

  dine: IDine = {
    _id: '',
    name: '',
    description: '',
    status: true,
    floor_id: '',
    employee_id: this.employeeId
  };
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
  inventoryfoodmain: InventoryFoodMain2 = {
    _id: 'undefined',
    name: 'undefined',
    description: 'undefined',
    quantitytypeID: 'undefined',
    quantitytypename: 'undefined',
    quantitytypevalue: 0,
    employee_id: this.employeeId,
    createdAt: 'undefined'
  };
  productprices: ProductPrice = {
    _id: '',
    ProductPrice: 100,
    SelectProductId: '',
    selectcategoryID: '',
    selectQtypeID: '',
    selectSubQuantityTypeID: '',
    employee_id: this.employeeId
  };
  getpercentvaldata: any;
  getpercentvaldata2: any;
  taxname: string = '';
  taxnamedata2: any;
  taxnamedata: any;
addondata: any; addondataarr: IAddOnItems[] = [];
  // Observables
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  subQuantityTypeData$?: Observable<any[]>;
  categorynamedata$?: Observable<any[]>;
  subQuantityTypeName$?: Observable<any[]>;
  subQuantityTypeByIdData$?: Observable<any[]>;
  Qtypenamedata$?: Observable<any[]>;
  Productnamedata$?: Observable<any[]>;
  productPriceData$?: Observable<any>;
  addOnProductsData$!: Observable<any[]>;
  loadAddOnProductsdata$!: Observable<any[]>;
  // Forms
  myDiscountForm!: FormGroup;

  // Invoice
  invoice: Invoice;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private service: ProductPriceService,
    private ProductService_: ProductService,
    private QuantitytypeService_: QuantitytypeService,
    private CategoryService_: CategoryService,
    private subQuantityTypeService_: subQuantityTypeService,
    private router: Router,
    private formedit: FormBuilder,
    private taxService: TaxService,
    private fb: FormBuilder,
    private InvoiceService_: InvoiceService,
    private ItemsService_: ItemsService,
    private dineservice: DineService,
    private chairservice: ChairService,
    private chairsrunningorderservice: ChairServiceService,
    private InventoryMainFoodwithProductService_: InventoryMainFoodwithProductService,
    private InventoryMainFoodService_: InventoryMainFoodService,
    private PaybyService_: PaybyService,
    private datePipe: DatePipe,
    private addAddOnProductService_: addAddOnProductService,
    public actions$: Actions,
    private store: Store<{
      categoryLoad: any;
      productPriceLoad: any;
      productLoad: any;
      quantityTypeLoad: any;
      subQuantityTypeLoad: any;
      subQuantityTypeByIdLoad: any;
      addOnProductReducer_: any;
      runningItemReducer_: any;
      loadAddOnProductReducer_:any
    }>,
    private SweetAlert2_: SweetAlert2,
    private CustomerService_: CustomresService,
    private InitializeInvoice_: InitializeInvoice
  ) {
    const invoiceDefault = this.InitializeInvoice_.initializeInvoiceDefault();
    this.invoice = invoiceDefault as unknown as Invoice;
    this.initObservables();
    this.display = 'display:none;';
    this.itemtotalamount = 0;
    this.totaltax = 0;
    this.productpriceallname = [];
    this.productsByCategoryId = [];
    this.showtype = false;
    this.replacedInvoiceId = this.invoiceid;
  }
  ngOnInit(): void {
    this.load_AddOnProductsdata();
    this.refresh();
    this.loadTax();
    this.loadinvoice();
    this.loadfood('DinningTable', this.invoiceid);
    this.myDiscountForm = this.fb.group({
      discount: '',
      numberInput: [0]
    });
  
  }

  private initObservables() {
    this.loadAddOnProductsdata$ = this.store.select(state => state.loadAddOnProductReducer_.addOnProductsdata.data);
   
    this.addOnProductsData$ = this.store.select(state => state.addOnProductReducer_.addOnProducts.data);
    this.loading$ = this.store.select(state => state.addOnProductReducer_.loading);
    this.error$ = this.store.select(state => state.addOnProductReducer_.error);
    this.RunningItems_$ = this.store.select(state => state.runningItemReducer_?.item?.data ?? []);
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.subQuantityTypeByIdData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.Productnamedata$ = this.store.select(state => state.productLoad.Product_.data);
    this.productPriceData$ = this.store.select(state => state.productPriceLoad.ProductPrice_.data);

    // Loading/Error
    this.loading$ = combineLatest([
      this.store.select(state => state.categoryLoad.loading),
      this.store.select(state => state.quantityTypeLoad.loading),
      this.store.select(state => state.subQuantityTypeLoad.loading),
      this.store.select(state => state.subQuantityTypeByIdLoad.loading),
    ]).pipe(
      map(loadings => loadings.some(loading => loading === true))
    );
    this.store.select(state => state.productLoad.loading),
      this.store.select(state => state.productPriceLoad.loading)
    this.loading$ = combineLatest([
      this.store.select(state => state.categoryLoad.loading),
      this.store.select(state => state.quantityTypeLoad.loading),
      this.store.select(state => state.subQuantityTypeLoad.loading),
      this.store.select(state => state.subQuantityTypeByIdLoad.loading),
      this.store.select(state => state.productLoad.loading),
      this.store.select(state => state.productPriceLoad.loading)
    ]).pipe(
      map(loadings => loadings.some(loading => loading === true))
    );

    this.error$ = combineLatest([
      this.store.select(state => state.categoryLoad.error),
      this.store.select(state => state.quantityTypeLoad.error),
      this.store.select(state => state.subQuantityTypeLoad.error),
      this.store.select(state => state.subQuantityTypeByIdLoad.error),
    ]).pipe(
      map(errors => {
        // Return the first non-null, non-undefined error, or null if none
        return errors.find(error => error != null) ?? null;
      })
    );
    this.error$ = combineLatest([
      this.store.select(state => state.categoryLoad.error),
      this.store.select(state => state.quantityTypeLoad.error),
      this.store.select(state => state.subQuantityTypeLoad.error),
      this.store.select(state => state.subQuantityTypeByIdLoad.error),
      this.store.select(state => state.productLoad.error),
      this.store.select(state => state.productPriceLoad.error)
    ]).pipe(
      map(errors => {
        // Return the first non-null, non-undefined error, or null if none
        return errors.find(error => error != null) ?? null;
      })
    );

  }

  refresh(): void {
  //  this.loadAddOnProducts();
    this.loadcategory();
    this.loadQtype();
    this.loadSubQuantityTypeName();
    this.loadProducts('jsk');
    this.loadProductPrices();
   
  }

  getid(event: any): void {
    if (!this.chardata) return;
    const idx = event.target.value;
    if (this.chardata[idx]) {
      this.chardata[idx].status = !!event.target.checked;
    }
  }
  load_AddOnProductsdata()
  {
   // this.addAddOnProductService_.get
    this.store.dispatch(AddOnProductActions.loadAllAddOnProducts());
   this.loadAddOnProductsdata$ = this.store.select(state => state.loadAddOnProductReducer_.addOnProductsdata.data);
   this.loadAddOnProductsdata$.subscribe(data=>
   {
    console.log(data);
   }
   );
  }
// @ViewChildren('addonLi') addonLis!: QueryList<ElementRef>;

// ngAfterViewInit() {
//   if (Array.isArray(this.RunningItems_)) {
//     this.RunningItems_.forEach(runningItem => {
//       if (runningItem && Array.isArray(runningItem.AddOnItems)) {
//         runningItem.AddOnItems.forEach((item: any) => {
//           if (item && item._id) {
//             this.loadAddOnProductsInitializing(item._id);
//           }
//         });
//       }
//     });
//   }
// }


  loadinvoice(): void {
    const RecieptNumber = this.invoiceid;
    if (!RecieptNumber) return;
    this.InvoiceService_.getbyid(RecieptNumber).subscribe(invoiceData => {
      this.innvoicedata2 = invoiceData;
      this.innvoicedata = this.innvoicedata2.data;
      const inv = this.innvoicedata[0];
      this.table_id = inv.table_id;
      this.table_name = inv.tablename;
      this.CustomerId = inv.customer_id;
      const customerName = inv.customer_id !== 'undefined' ? this.getCustomerName(inv.customer_id) : 'Guest';
      this.CustomerName = customerName ?? 'Guest';
      this.ordermode = this.table_name !== 'Pick Up' ? this.table_name : 'Pick Up';
    });
  }

  loadfood(msg: string, moddata: string): void {
   

    if (msg === 'jsk') {
       this.refresh();
      return;
    }

    if (!this.invoiceid) return;

    this.ItemsService_.getbyid(this.invoiceid).subscribe((data2: any) => {
      if (!data2 || !Array.isArray(data2.data)) return;

      this.Itemsdata2 = data2;
      this.Itemsdata = data2.data;

      if (!this.Itemsdata.length) {
          this.refresh();
        return;
      }

      //this.refresh();

      // Reset running items and totals
     
      this.intializeRunningItem(this.Itemsdata);
       this.addAddOnTotalAmount();
     // this.initializeItemsCountableData();
      // this.loadTax();
      // this.loadAddOnProductsForRunningItems_();
      // Build tax name string

     

      // Get invoice details for discount and taxes

    });
  }
  
  intializeRunningItem(Itemsdata: any) {
    this.addondataarr = [];
    this.RunningItems_ = [];
    this.itemtotalamount = 0;
    this.totalamount = 0;

    if (!this.innvoicedata || !this.innvoicedata[0]) return;

    const invoiceAddOnItems = this.innvoicedata[0].AddOnItems || [];

    console.log(this.innvoicedata);
    console.log(Itemsdata);

    // Helper function to get all AddOnItems for an item
    const getMatchingAddOns = async (item: any): Promise<IAddOnItems[]> => {
      const matches: IAddOnItems[] = [];
      const requests: Promise<void>[] = [];

      if (!invoiceAddOnItems.length) return Promise.resolve([]);

      invoiceAddOnItems.forEach((addOnItem: IAddOnItems) => {
        requests.push(
          new Promise<void>(resolve => {
            this.addAddOnProductService_.getById(addOnItem._id).subscribe((addOndata: any) => {
              const addOnDataArr = addOndata?.data || [];
              for (let ii = 0; ii < addOnDataArr.length; ii++) {
                const data = addOnDataArr[ii];
                if (
                  item.Productid === data.SelectProductId &&
                  item.SubQuantityTypeID === data.SubQuantityTypeID &&
                  addOnItem._id === data._id
                ) {
                  matches.push(addOnItem);
                  break;
                }
              }
              resolve();
            });
          })
        );
      });

      await Promise.all(requests);
      return matches;
    };

    // Asynchronously gather RunningItems and handle add-ons
    const processAllItems = async () => {
      for (let itemIdx = 0; itemIdx < Itemsdata.length; itemIdx++) {
        const item = Itemsdata[itemIdx];
        const addOnItems: IAddOnItems[] = await getMatchingAddOns(item);

        // Push to RunningItems_
        this.RunningItems_.push({
          _idPP: item.Productid,
          ProductPrice: item.itemamount?.toString() ?? '0',
          SelectProductId: item.Productid,
          ProductName: item.Productname,
          selectcategoryID: '',
          categoryName: '',
          selectQtypeID: item.Qauntityid,
          QtypeName: item.Qauntityname,
          selectSubQuantityTypeID: item.SubQuantityTypeID,
          SubQuantityTypeName: item.SubQuantityTypeName,
          quntityvalue: item.Quantity,
          qvalue: item.Quantity,
          taxnames: this.taxname,
          taxvalues: 'taxpercentValues',
          totaltaxvalue: 0,
          AddOnItems: addOnItems
        });

        // Fix: Correctly access AddOnItems property of the just-pushed RunningItem object,
        // and also check item.AddOnItems before accessing in for loop


        this.itemtotalamount += (item.itemamount || 0) * (item.Quantity || 0);
        this.totalamount += (item.itemamount || 0) * (item.Quantity || 0);
       
      }
     

      this.loadTax();
    
    //  this.gettotamount();
      console.log(this.RunningItems_);
      // Push the RunningItems_ array into the store using the addRunningItem action
     
      
    };
  

    // Run the processing (needed for addOn observables to all resolve before dispatch)
    processAllItems();
   
    // this.totalamount = this.gettotamount();
    // this.getitemTotalTax();
    // this.getitemtotalamount();
  }
 addAddOnTotalAmount()
 {
  
  // const lastRunningItem = this.RunningItems_[this.RunningItems_.length - 1];
  // if (lastRunningItem.AddOnItems?.length) {
  //   lastRunningItem.AddOnItems.forEach(addOnItem => {
  //     this.store.dispatch(AddOnProductActions.getAddOnProductById({ _id: addOnItem._id }));

  //     const addOnProductSubscription = this.addOnProductsData$.subscribe(addOnProducts => {
  //       const matchedAddOn = Array.isArray(addOnProducts)
  //         ? addOnProducts.find((p: any) => p._id === addOnItem._id)
  //         : null;
  //       const addOnPrice = matchedAddOn && typeof matchedAddOn.Price === 'string'
  //         ? +matchedAddOn.Price
  //         : 0;
  //       const quantity = addOnItem.numberofQuantity ? +addOnItem.numberofQuantity : 0;
  //       this.itemtotalamount += addOnPrice * quantity;
  //       this.totalamount += addOnPrice * quantity;
  //       addOnProductSubscription.unsubscribe();
  //     });
  //   });
  // }
 }
  loadAddOnProductsInitializing(_id:string)
  {
this.store.dispatch(AddOnProductActions.getAddOnProductById({_id:_id}));
this.addOnProductsData$.subscribe(data=>
{
  console.log(data);
}
)
  }
  intializeRunningItemFinal() {

  }
  initializeTax() {
    this.taxname = '';
    if (this.taxnamedata) {
      this.taxnamedata.forEach((tax: { Status: any; name: string; }) => {
        if (tax.Status) {
          this.taxname += tax.name + ', ';
        }
      });
    }
    this.totaltax = 0;
    if (this.taxnamedata) {
      this.taxnamedata.forEach((tax: { Status: any; perscentRate: number; }) => {
        if (tax.Status) {
          const taxAmount = (+this.itemtotalamount * tax.perscentRate) / 100;
          this.totaltax += taxAmount;
        }
      });
    }
    this.itemtotalamount = this.itemtotalamount+this.totaltax;
  }
  initializeItemsCountableData() {
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(getpercentval => {
      if (!getpercentval) return;

      this.getpercentvaldata2 = getpercentval;
      this.getpercentvaldata = this.getpercentvaldata2.data;

      const invoiceData = this.getpercentvaldata[0];
      this.percent = invoiceData.Discountperstage;
      this.itemTotalTax = invoiceData.Taxes || [];
      this.actualdiscountprice = (this.itemtotalamount * this.percent) / 100;

      // Calculate total tax

     
      // Setup discount form
      this.myDiscountForm = this.fb.group({
        discount: '',
        numberInput: [invoiceData.Discountperstage]
      });
     
      // Calculate discount value and update item total amount
      this.discountvalue = (this.itemtotalamount - ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
      this.itemtotalamount = (this.itemtotalamount + ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
      // this.totalamount = this.gettotamount();
      // this.getitemTotalTax();
      // this.getitemtotalamount();
      
    });
   
  }
  loadchair(): void {
    // Reserved for future implementation
  }

  getpaybyid(): void {
    console.log(this.paybyId);
  }

  loadpaybyMode(): void {
    this.PaybyService_.get().subscribe((data: any) => {
      if (!data || !Array.isArray(data.data)) {
        this.paybydata = [];
        return;
      }
      this.paybydata2 = data;
      this.paybydata = data.data;
      console.log(this.paybydata);
    });
  }

  getproductbycategory(_id: any): void {
    if (this.ordermode) {
      this.loadproductpricename(_id);
    } else {
      this.SweetAlert2_.showFancyAlertFail('Please Select Dinning Table First.');
    }
  }

  updatemainfood(IventoryFoodMainId: any, qvalue: any): void {
    // Reserved for future implementation
  }

  removerunningOrder(): void {
    this.chairsrunningorderservice.getbyid(this.invoiceid).subscribe(data => {
      if (!data) return;
      this.gettableid2 = data;
      this.gettableid = this.gettableid2.data;
      this.dineservice.getbyid(this.gettableid[0].Chairsrunningorder[0].table_id).subscribe(tabldata => {
        if (!tabldata) return;
        this.tabledata2 = tabldata;
        this.tabledata = this.tabledata2.data;
        this.dine = {
          _id: this.tabledata[0]._id,
          name: this.tabledata[0].name,
          description: this.tabledata[0].description,
          status: true,
          floor_id: this.tabledata[0].floor_id,
          employee_id: this.employeeId
        };
        this.dineservice.update(this.dine).subscribe();
      });
    });
    this.chairsrunningorderservice.delete(this.invoiceid).subscribe(data2 => {
      if (data2) alert('deleted');
    });
  }

  genrateOrder(): void {
    if (this.paybyId === 'none') {
      this.SweetAlert2_.showFancyAlertFail('Select Pay Mode for further proceed.');
      // this.ClearSomeVariable();
      return;
    }
    if (typeof this.paidamount !== 'number' || this.paidamount < 0) {
      alert('Paid amount should be greater than or equal to 0.');
      this.SweetAlert2_.showFancyAlertFail('Please Enter Valid Value.');
      this.ClearSomeVariable();
      return;
    }
    this.RunningItems_2 = [...this.RunningItems_];
    this.getinvoiceid2 = '';
    this.getinvoiceid = '';
    this.inventoryFoodCalculation();
    this.gitems = [];
    this.gitems2 = [];
    const invoice = this.genrateInvoice();
    this.updateInvoice(invoice);
    this.close2();

    this.removerunningOrder();
    this.ClearSomeVariable();

  }

  ClearSomeVariable(): void {
    this.ordermode = '';
    this.RunningItems_ = [];
    this.productsByCategoryId = [];
    this.valueChanged.emit('');
  }

  updateInvoice(invoice: any): void {
    this.InvoiceService_.update(invoice).subscribe(invoiceupdate => {
      if (!invoiceupdate) return;
      this.getinvoiceid2 = invoiceupdate;
      this.getinvoiceid = this.getinvoiceid2.createdTask;
    });
  }

  genrateInvoice(): Invoice {
    //const CustomerId = this.getCustomerID(this.invoiceid);
    return {
      Taxes: this.getTax(),
      Chairs: this.ichar,
      AddOnItems: this.selectedAddOnItems,
      taxpecentRate: 0,
      taxpercentValue: 0,
      createdAt: new Date(), // Add required property 'createdAt'
      DiscountId: 'jsk',
      Discountvalue: this.actualdiscountprice,
      Discountperstage: this.percent,
      AdditionaldiscountAmount: 0,
      Totalvaue: this.itemtotalamount,
      grandtotal: this.discountvalue,
      RecieptNumber: +this.invoiceid,
      OrderType: this.ordermode,
      AmountPaidstatus: (this.discountvalue - this.paidamount) > 0 ? false : true,
      Orderstatus: 'Done',
      PaidAmount: this.paidamount,
      PendingAmount: (this.paidamount - this.discountvalue) < 0 ? (this.discountvalue - this.paidamount) : 0,
      TotalTaxAmount: this.totaltax,
      TotalItemsAmount: this.totalamount,
      OrderTypeName: this.chardata[0],
      paybyId: this.paybyId,
      table_id: String(this.table_id),
      tablename: this.table_name === '' ? 'Pick Up' : this.table_name,
      customer_id: this.CustomerId === 'undefined' ? 'undefined' : this.CustomerId, //String(this.getCustomerID(this.invoiceid)),//String(this.CustomerId),
      employee_id: String(this.employeeId),
      AssistToId: 'undefined',
      returnAmount: String((this.paidamount - this.discountvalue) > 0 ? (this.paidamount - this.discountvalue) : 0),
      CommentId: 'undefined',
      tokennumber: +this.TokenNumber
    }
  }

  goodsCollectionsRecord: any;
  // ifmwpdata2:any;
  inventoryFoodCalculation(): void {
    // Iterate over each running item and update inventory accordingly
    for (const runningItem of this.RunningItems_2) {
      this.InventoryMainFoodwithProductService_
        .getbyid(runningItem.SelectProductId, runningItem.selectSubQuantityTypeID)
        .pipe(
          catchError(err => {
            console.error("Get InventoryMainFoodWithProduct failed:", err);
            return of(null); // prevents breaking stream
          }),
          filter(ifwp => !!ifwp),
          switchMap(ifwp => {
            this.ifmwpdata2 = ifwp;
            this.ifmwpdata = this.ifmwpdata2.data;
            if (!this.ifmwpdata) return EMPTY;

            this.goodsCollectionsRecord = this.ifmwpdata.goodscollections;
            const indexidqvalue = this.RunningItems_2.findIndex(
              item =>
                item.SelectProductId === this.ifmwpdata.ProductId &&
                item.selectSubQuantityTypeID === this.ifmwpdata.SubQuantityTypeID
            );

            if (!this.goodsCollectionsRecord?.length) return EMPTY;

            const updates$ = this.goodsCollectionsRecord.map((goods: { quantiyval: number; IventoryFoodMainId: string; }) => {
              const qval = +this.RunningItems_2[indexidqvalue].qvalue * goods.quantiyval;

              return this.InventoryMainFoodService_.getbyid(goods.IventoryFoodMainId).pipe(
                catchError(err => {
                  console.error("Get InventoryFoodMain failed:", err);
                  return of(null);
                }),
                switchMap(imfs => {
                  if (!imfs) return EMPTY;
                  this.imfsdata2 = imfs;
                  this.imfsdata = this.imfsdata2.data;
                  const inventoryfoodmain = {
                    _id: this.imfsdata[0]._id,
                    name: this.imfsdata[0].name,
                    description: this.imfsdata[0].description,
                    quantitytypeID: this.imfsdata[0].quantitytypeID,
                    quantitytypename: this.imfsdata[0].quantitytypename,
                    quantitytypevalue: (+this.imfsdata[0].quantitytypevalue - qval),
                    employee_id: this.employeeId,
                    createdAt: this.imfsdata[0].createdAt
                  };

                  return this.InventoryMainFoodService_.update(inventoryfoodmain).pipe(
                    catchError(err => {
                      console.error("Update failed:", err);
                      return of(null);
                    })
                  );
                })
              );
            });

            return forkJoin(updates$); // run all updates in parallel
          })
        )
        .subscribe({
          next: () => console.log("All updates done for runningItem", runningItem),
          error: err => console.error("Unexpected failure:", err),
          complete: () => console.log("Process completed for runningItem", runningItem)
        });
    }
  }

  getTax(): ITax[] {
    this.itaxarr = [];
    if (!this.taxnamedata) return this.itaxarr;
    for (const runningItem of this.RunningItems_) {
      for (const tax of this.taxnamedata) {
        if (tax.Status) {
          this.itaxarr.push({
            id: tax._id,
            name: tax.name,
            percentt: tax.perscentRate,
            amount: ((+runningItem.ProductPrice * runningItem.quntityvalue) * tax.perscentRate) / 100,
            productid: runningItem._idPP,
            productname: runningItem.ProductName
          });
        }
      }
    }
    return this.itaxarr;
  }

  discountChange(): void {
    const { discount, numberInput } = this.myDiscountForm.value;
    if (this.itemtotalamount <= 500) {
      this.SweetAlert2_.showFancyAlertFail('Grand total should be greate than 500.');
      return;
    }
    if (discount === '%') {
      if (numberInput > 0 && numberInput <= 10) {
        this.percent = +numberInput.toFixed(2);
        this.discountvalue = +((+this.itemtotalamount) - (+this.itemtotalamount * this.percent / 100)).toFixed(2);
        this.actualdiscountprice = (+this.itemtotalamount) - this.discountvalue;
      } else {
        this.SweetAlert2_.showFancyAlertFail("Warning: % can't be negative or greater than 10%");
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
        this.SweetAlert2_.showFancyAlertFail("Warning: Warning: % can't be negative or greater than 10%");
      }
    }
  }

  placeOrder(): void {
    this.paidamount = this.discountvalue;
    this.loadpaybyMode();
    this.showplaceorderPopup = true;
  }

  close2(): void {
    this.showplaceorderPopup = false;
  }

  onSubmit(form: any): void {
    this.loadallppdata();
    const selectedValue = form.value.option;
    this.item_subQuantityType_ID = this.ppalsoavailable.find(
      (item: any) => item.SubQuantityTypeName === selectedValue
    );
    const indexP = this.ppalsoavailable.findIndex(
      (item: any) => item.SubQuantityTypeName === selectedValue
    );
    if (this.RunningItems_.length > 0) {
      const item = this.RunningItems_.find(
        (item: any) =>
          item.SubQuantityTypeName === selectedValue &&
          item._idPP === this.item_subQuantityType_ID.id
      );
      const index = this.RunningItems_.findIndex(
        (item: any) =>
          item.SubQuantityTypeName === selectedValue &&
          item._idPP === this.item_subQuantityType_ID.id
      );
      if (item?._idPP) {
        this.loadqunityvalue(
          item._idPP,
          'inc',
          item.SubQuantityTypeName,
          +this.RunningItems_[index].quntityvalue,
          item.ProductPrice
        );
      } else {
        this.loadqunityvalue(
          this.item_subQuantityType_ID.id,
          'inc',
          this.item_subQuantityType_ID.SubQuantityTypeName,
          0,
          this.item_subQuantityType_ID.price
        );
      }
    } else {
      this.loadqunityvalue(
        this.item_subQuantityType_ID.id,
        'inc',
        this.item_subQuantityType_ID.SubQuantityTypeName,
        0,
        this.item_subQuantityType_ID.price
      );
    }
    this.showtype = false;
  }

  close(): void {
    this.showtype = false;
  }

  increment(_id: any): void {
    this.showtype = false;
    this.ppalsoavailable = this.getallproducttypeprice(_id);
  }

  decrement(_id: any): void {
    this.showtype = false;
    this.ppalsoavailable = this.getallproducttypeprice(_id);
  }

  increment2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
    this.showtype = false;
    this.loadallppdata();
    this.loadqunityvalue(_id, 'inc', SubQuantityTypeName, qvalue, price);
  }

  decrement2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any): void {
    this.showtype = false;
    this.loadallppdata();
    this.loadqunityvalue(_id, 'dcre', SubQuantityTypeName, qvalue, price);
  }

  addQuantity(id: any, acton: any, SubQuantityTypeName: any, quntity: any, price: any): void {
    this.item_subQuantityTypeId = this.RunningItems_.find(
      item => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === id
    );
    const index = this.RunningItems_.findIndex(
      item => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === id
    );
    if (this.item_subQuantityTypeId?._idPP) {
      this.loadqunityvalue(
        this.item_subQuantityTypeId._idPP,
        'inc',
        this.item_subQuantityTypeId.SubQuantityTypeName,
        +this.RunningItems_[index].quntityvalue,
        this.item_subQuantityTypeId.ProductPrice
      );
    } else {
      this.loadqunityvalue(
        this.item_subQuantityType_ID.id,
        'inc',
        this.item_subQuantityType_ID.SubQuantityTypeName,
        0,
        this.item_subQuantityType_ID.price
      );
    }
    this.showtype = false;
  }

  loadTax(): void {
    this.taxService.get().subscribe(data => {
      if (!data) return;
      this.taxnamedata2 = data;
      this.taxnamedata = this.taxnamedata2.data;
      this.initializeTax();
    });
  }

  itemP: any;
  indexP: any;

  loadqunityvalue(
    id: any,
    action: 'inc' | 'dcre',
    SubQuantityTypeName: any,
    quntity: any,
    price: any
  ): void {
    this.gitems2.length = 0;
    let taxpercent = 0;
    this.totalamount = 0;
    if (!this.allppdata.length) {
      this.allppdata = this.RunningItems_;
    }
    this.itemP = this.allppdata.find(
      (item: any) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName
    );
    this.indexP = this.allppdata.findIndex(
      (item: any) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName
    );
    if (this.itemP?.SelectProductId && action === 'inc') {
      let val = quntity + 1;
      if (this.RunningItems_.length > 0) {
        const index = this.RunningItems_.findIndex(
          item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName
        );
        if (index !== -1) {
          // Defensive: if item is frozen, replace with a clone
          if (!Object.isExtensible(this.RunningItems_[index])) {
            this.RunningItems_[index] = { ...this.RunningItems_[index] };
          }
          Object.assign(this.RunningItems_[index], {
            _idPP: id,
            quntityvalue: val,
            qvalue: val,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent
          });
          this.gitems2 = [
            {
              Productid: this.RunningItems_[index].SelectProductId,
              Productname: this.RunningItems_[index].ProductName,
              SubQuantityTypeID: this.RunningItems_[index].selectSubQuantityTypeID,
              SubQuantityTypeName: this.RunningItems_[index].SubQuantityTypeName,
              Invoiceid: this.invoiceid,
              Qauntityid: this.RunningItems_[index].selectQtypeID,
              Qauntityname: this.RunningItems_[index].QtypeName,
              Quantity: val,
              itemamount: price,
              totalquantityamount: +price * val,
              employee_id: this.employeeId
            }
          ];
          this.ItemsService_.update(this.gitems2).subscribe();
        } else {
          // When pushing, use a brand new object (avoid mutating frozen, spread if necessary)
          const itemToPush = {
            _idPP: id,
            ProductPrice: price,
            SelectProductId: this.allppdata[this.indexP].SelectProductId,
            ProductName: this.allppdata[this.indexP].ProductName,
            selectcategoryID: this.allppdata[this.indexP].selectcategoryID,
            categoryName: this.allppdata[this.indexP].categoryName,
            selectQtypeID: this.allppdata[this.indexP].selectQtypeID,
            QtypeName: this.allppdata[this.indexP].QtypeName,
            selectSubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
            SubQuantityTypeName: this.allppdata[this.indexP].SubQuantityTypeName,
            quntityvalue: val,
            qvalue: val,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent,
            AddOnItems: []
          };
          this.RunningItems_ = [...this.RunningItems_, itemToPush];
          this.gitems2 = [
            {
              Productid: this.allppdata[this.indexP].SelectProductId,
              Productname: this.allppdata[this.indexP].ProductName,
              SubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
              SubQuantityTypeName: this.allppdata[this.indexP].SubQuantityTypeName,
              Invoiceid: this.invoiceid,
              Qauntityid: this.allppdata[this.indexP].selectQtypeID,
              Qauntityname: this.allppdata[this.indexP].QtypeName,
              Quantity: val,
              itemamount: price,
              totalquantityamount: +price * val,
              employee_id: this.employeeId
            }
          ];
          this.ItemsService_.add(this.gitems2).subscribe();
        }
      } else {
        // When array is empty: always use new object + spread for immutability safety
        const itemToPush = {
          _idPP: id,
          ProductPrice: price,
          SelectProductId: this.allppdata[this.indexP].SelectProductId,
          ProductName: this.allppdata[this.indexP].ProductName,
          selectcategoryID: this.allppdata[this.indexP].selectcategoryID,
          categoryName: this.allppdata[this.indexP].categoryName,
          selectQtypeID: this.allppdata[this.indexP].selectQtypeID,
          QtypeName: this.allppdata[this.indexP].QtypeName,
          selectSubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
          SubQuantityTypeName: SubQuantityTypeName,
          quntityvalue: val,
          qvalue: val,
          taxnames: '',
          taxvalues: '',
          totaltaxvalue: taxpercent,
          AddOnItems: []
        };
        this.RunningItems_ = [...this.RunningItems_, itemToPush];
        this.gitems2 = [
          {
            Productid: this.allppdata[this.indexP].SelectProductId,
            Productname: this.allppdata[this.indexP].ProductName,
            SubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
            SubQuantityTypeName: SubQuantityTypeName,
            Invoiceid: this.invoiceid,
            Qauntityid: this.allppdata[this.indexP].selectQtypeID,
            Qauntityname: this.allppdata[this.indexP].QtypeName,
            Quantity: val,
            itemamount: price,
            totalquantityamount: +price * val,
            employee_id: this.employeeId
          }
        ];
        this.ItemsService_.add(this.gitems2).subscribe();
      }
    } else if (this.itemP?.SelectProductId && action === 'dcre') {
      const index = this.RunningItems_.findIndex(
        item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName
      );
      if (index !== -1) {
        // Defensive: ensure item is extensible, if not, replace with clone
        if (!Object.isExtensible(this.RunningItems_[index])) {
          this.RunningItems_[index] = { ...this.RunningItems_[index] };
        }
        let val = quntity - 1;
        Object.assign(this.RunningItems_[index], {
          quntityvalue: val,
          qvalue: val,
          ProductPrice: price,
          taxnames: '',
          taxvalues: '',
          totaltaxvalue: taxpercent
        });
        if (val !== 0) {
          this.gitems2 = [
            {
              Productid: this.RunningItems_[index].SelectProductId,
              Productname: this.RunningItems_[index].ProductName,
              SubQuantityTypeID: this.RunningItems_[index].selectSubQuantityTypeID,
              SubQuantityTypeName: this.RunningItems_[index].SubQuantityTypeName,
              Invoiceid: this.invoiceid,
              Qauntityid: this.RunningItems_[index].selectQtypeID,
              Qauntityname: this.RunningItems_[index].QtypeName,
              Quantity: val,
              itemamount: price,
              totalquantityamount: +price * val,
              employee_id: this.employeeId
            }
          ];
          this.ItemsService_.update(this.gitems2).subscribe();
        } else {
          this.ItemsService_
            .delete(
              this.invoiceid,
              this.RunningItems_[index].SelectProductId,
              this.RunningItems_[index].selectSubQuantityTypeID
            )
            .subscribe();
          // Remove item immutably to avoid issues with frozen arrays
          this.RunningItems_ = [
            ...this.RunningItems_.slice(0, index),
            ...this.RunningItems_.slice(index + 1)
          ];
        }
      }
    }
    this.myDiscountForm = this.fb.group({
      discount: '',
      numberInput: [0]
    });
    this.percent = 0;
   
   this.totalamount = this.gettotamount();
    this.getitemTotalTax();
    this.getitemtotalamount();
    
     
  }

  // print-section
  async KOT(): Promise<void> {
    // this.placeOrder();
    // this.close2();
    const invoiceCard = document.getElementById('printable-section-KOT');
    let printContent = '';
    if (invoiceCard) {
      // Clone the node to manipulate without affecting the original
      const clone = invoiceCard.cloneNode(true) as HTMLElement;

      // Remove specific buttons by class or tag
      const buttons = clone.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.remove();
      });
      const forms = clone.querySelectorAll('form');
      buttons.forEach(form => {
        form.remove();
      });
      const diviitemrow = clone.querySelectorAll('.item-header');
      diviitemrow.forEach(item => {
        item.remove();
      });

      // Get modified HTML
      printContent = clone.innerHTML;

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

    // Reserved for future implementation
  }

  getitemTotalTax(): void {
    this.totaltax = 0;
    this.itemTotalTax = [];
    if (!this.taxnamedata) return;
    for (const tax of this.taxnamedata) {
      if (tax.Status) {
        const taxpercent = (this.totalamount * tax.perscentRate) / 100;
        this.itemTotalTax.push({ taxname: tax.name, taxpercent });
        this.totaltax += Math.abs(taxpercent);
      }
    }
    this.totaltax = Math.fround(this.totaltax);
  }

  getitemtotalamount(): void {
    this.itemtotalamount = this.itemTotalTax.reduce((acc, curr) => acc + curr.taxpercent, 0);
    this.itemtotalamount = Math.fround(this.totalamount + this.itemtotalamount);
    this.discountvalue = Math.fround(this.itemtotalamount);
  }


  gettotamount(): number {
    this.tot = 0;
    for (const item of this.RunningItems_) {
      
      this.tot += (+item.totaltaxvalue) + (+item.ProductPrice) * (+item.quntityvalue);
    
  }
    return this.tot;
  
  }
  loadProducts(msg: any): void {
    this.store.dispatch(loadProduct());
  }

  loadcategory(): void {
    this.store.dispatch(loadCategories());
  }

  loadQtype(): void {
    this.store.dispatch(loadQuantityType());
  }

  loadSubQuantityTypeName(): void {
    this.store.dispatch(loadSubQuantityType());
  }

  loadProductPrices(): void {
    this.store.dispatch(loadProductPrice());
  }

  loadallppdata(): void {
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
  }

  loadproductpricename(_id: any): void {
    // alert(HomeEnvironment.VegType$.value);
    this.productsByCategoryId = [];
    if (this.Productnamedata$) {
      const sub = this.Productnamedata$.subscribe(Productnamedata => {
        if (!Productnamedata) return;
        this.initializeVegType(Productnamedata, _id);

      });
      this.subscriptions.push(sub);
    }
    // this.getFilteredProductsByCategoryId();
    this.ppname = this.productpriceallname;
  }
  initializeVegType(Productnamedata: any, _id: string) {

    for (const prod of Productnamedata) {
      if (prod.selectcategoryID === _id) {
        console.log(HomeEnvironment.VegType$.value);
        console.log(prod.veg_nonveg);
        if (HomeEnvironment.VegType$.value === prod.veg_nonveg.toString()) {
          this.initilalizvegTypeFinal(prod);
        }
        else if (HomeEnvironment.VegType$.value == "") {
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
      quntityvalue: 0,
      veg_nonveg: prod.veg_nonveg
    });
  }
  getSubQuantityTypeName(id: string): string {
    let SubQuantityTypeName = '';
    if (this.subQuantityTypeData$) {
      const sub = this.subQuantityTypeData$.subscribe(SubQuantityTypeData => {
        if (!SubQuantityTypeData) return;
        const idx = SubQuantityTypeData.findIndex((item: any) => item._id === id);
        if (idx !== -1) {
          SubQuantityTypeName = SubQuantityTypeData[idx].name;
        }
      });
      this.subscriptions.push(sub);
    }
    return SubQuantityTypeName;
  }
  // getting all product price for particular product start
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
        price: this.getproductprice2(price._id)
      });
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
  // getting all product price for particular product end

  // get product price for product price
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

  // get product name for product price
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

  // get quantity type name for product price
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

  // load category name for product price
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
  // //filter veg nonveg start
  // getFilteredProductsByCategoryId(): void {
  //   if (this.replaceFilteredData && this.productsByCategoryId.length > 0) {
  //     if (this.replaceFilteredData[0]) {
  //       if (
  //         this.productsByCategoryId[0].categoryName !==
  //         this.replaceFilteredData[0].categoryName
  //       ) {
  //         this.replaceFilteredData = [];
  //         this.replaceFilteredData = this.productsByCategoryId;
  //         this.productsByCategoryId = this.processFoodFiltering();
  //       } else {
  //         this.productsByCategoryId = this.replaceFilteredData;
  //         this.productsByCategoryId = this.processFoodFiltering();
  //       }
  //     } else {
  //       this.replaceFilteredData = [];
  //       this.replaceFilteredData = this.productsByCategoryId;
  //       this.productsByCategoryId = this.processFoodFiltering();
  //     }
  //   } else if (this.replaceFilteredData) {
  //     this.productsByCategoryId = this.replaceFilteredData;
  //     this.productsByCategoryId = this.processFoodFiltering();
  //   } else {
  //     this.replaceFilteredData = this.productsByCategoryId;
  //     this.productsByCategoryId = this.processFoodFiltering();
  //   }
  // }

  // processFoodFiltering(): any[] {
  //   if (!this.selectedType) return this.productsByCategoryId;
  //   return this.productsByCategoryId.filter(items =>
  //     Object.values(items).some(val =>
  //       String(val).toLowerCase().includes(this.selectedType.toLowerCase())
  //     )
  //   );
  // }
  // filter veg nonveg end

  // show customer popup
  showAddonPopUp = false;
  showCustomersPopUp(): void {
    this.showCustomerPopUp = true;
  }

  //close customer pop
  closePopUpByChild(close: boolean): void {
    this.showCustomerPopUp = close;
    this.showCommentPopUp = close;

    // this.loadAddOnProductsForRunningItems_();
  }
  closePopUpByChildAddOn(close: boolean): void {

    this.showAddonPopUp = close;
    this.getAddOnProducts();
    this.load_AddOnProductsdata();
    //this.loadfood('DinningTable', this.invoiceid);
    //console.log(this.Itemsdata);
    // this.intializeRunningItem(this.Itemsdata);
    // this.loadAddOnProductsForRunningItems_();
  }
  InitializeselectedAddOnItemsCallbackFun(selectedAddOnItems: any) {
    // Store selectedAddOnItems reference
    this.selectedAddOnItems = selectedAddOnItems;

   

    // Fetch updated AddOnItems from backend and sync again
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
      if (data) {
        this.innvoicedata = data;
        this.selectedAddOnItems = this.innvoicedata.data[0]?.AddOnItems ?? [];
        this.invoiceData = this.innvoicedata.data;
        console.log(this.invoiceData);
if( this.innvoicedata.data[0]?.AddOnItems.length>0)
{
  this.RunningItems_.forEach(runningItem => {
    // Always reinitialize to empty array to ensure data consistency
    runningItem.AddOnItems = [];
  });
  this.innvoicedata.data[0]?.AddOnItems.forEach((addOnItemsArray: any) => {
    this.addAddOnProductService_.getById(addOnItemsArray._id).subscribe(addOndatabyId=>
    {
      console.log(addOndatabyId);
      if (Array.isArray(this.RunningItems_) && Array.isArray(this.selectedAddOnItems)) {
          // Ensure reinitialization of AddOnItems for all RunningItems_
         

          // Update RunningItems_ AddOnItems properly with deep copies to avoid reference issues
          // Since addOndatabyId is not an array, just treat it as a single object
          const addOn: any = addOndatabyId;
          console.log(addOn.data);
          console.log(addOn.data[0]);
          const runningItem = this.RunningItems_.find((item: any) =>
            item.SelectProductId === addOn.data[0].SelectProductId &&
            item.selectSubQuantityTypeID === addOn.data[0].SubQuantityTypeID
          );
          console.log(runningItem);
          if (runningItem) {
              // Reinitialize and push as a new object to prevent mutating source references
              if (!Array.isArray(runningItem.AddOnItems)) {
                runningItem.AddOnItems = [];
              }
              // Push a shallow copy to avoid reference mutation
              console.log(addOnItemsArray);
              runningItem.AddOnItems.push({ ...addOnItemsArray });
            }
         // });
       // }
        }
    }
    );
  });
  //this.addAddOnProductService_.getById
}
        // 
      }
    });

    // Debug log
    console.log("RunningItems_ after AddOnItems sync:", this.RunningItems_);
    console.log(this.RunningItems_);
    
  }
  // show comment popup
  showCommentsPopUp(): void {
    this.showCommentPopUp = true;
  }

  showAddonsPopUp(SelectProductId: string, selectSubQuantityTypeID: string) {
    this.showAddonPopUp = true;
    // Dispatch action to load AddOnProducts by SelectProductId and SubQuantityTypeID
    this.getAddOnItembySubQuantity_Product_ID(SelectProductId, selectSubQuantityTypeID);
  }
  // loadAddOnProductsForRunningItems_() {

  //   this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
  //     if (data) {
  //       this.innvoicedata = data;
  //       this.selectedAddOnItems = this.innvoicedata.data[0].AddOnItems;
  //       console.log(this.selectedAddOnItems);
  //       if (this.selectedAddOnItems.length > 0) {
  //         for (let i = 0; i < this.selectedAddOnItems.length; i++)
  //           this.loadAddOnProductsBy_id(this.selectedAddOnItems[i]._id);
  //         // this.invoiceData = this.innvoicedata.data;
  //         //  return this.selectedAddOnItems;
  //       }
  //     }
  //   }
  //   );
  // }
  // loadAddOnProductsBy_id(_id: string) {
  //   this.store.dispatch(AddOnProductActions.getAddOnProductById({ _id: _id }));
  //   const successSub = this.actions$.pipe(
  //     filter((action: any) => action.type === AddOnProductActions.getAddOnProductByIdSuccess.type)
  //   ).subscribe(action => {
  //     // Handle success, e.g., update local state or log
  //     console.log('AddOnProducts loaded:', action.addOnProduct);
  //     this.addOnProduct = action.addOnProduct.data;
  //     this.checkAddOnProductsInRunningItem(this.addOnProduct);
  //     //this.invoiceData = this.genrateInvoice();
  //    // this.getAddOnProducts();
  //   });

  //   const failureSub = this.actions$.pipe(
  //     filter((action: any) => action.type === AddOnProductActions.getAddOnProductByIdFailure.type)
  //   ).subscribe(action => {
  //     // Handle failure, e.g., show error message
  //     console.error('Failed to load AddOnProducts:', action.error);
  //   });

  //   // Store subscriptions to clean up later if needed
  //   this.subscriptions.push(successSub, failureSub);
  // }

  getAddOnProducts() {
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
      if (data) {
        this.innvoicedata = data;
        this.selectedAddOnItems = this.innvoicedata.data[0].AddOnItems;
        this.invoiceData = this.innvoicedata.data;
        //  return this.selectedAddOnItems;
      }
    }
    );

  }


  getAddOnItembySubQuantity_Product_ID(SelectProductId: string, selectSubQuantityTypeID: string) {
    this.store.dispatch(AddOnProductActions.getByProductIdSubQTypeIDAddOnProducts({
      SelectProductId: SelectProductId,
      SubQuantityTypeID: selectSubQuantityTypeID
    }));
    //   this.actions$.pipe(ofType(AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess)).subscribe(action => {

    //     console.log('AddOnProducts loaded:', action.addOnProducts);

    //    });
    // this.actions$.pipe(ofType(AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure)).subscribe(action => {

    //   console.error('Failed to load AddOnProducts:', action.error);

    //    });


    // Listen for success and failure actions
    const successSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess.type)
    ).subscribe(action => {
      // Handle success, e.g., update local state or log
      console.log('AddOnProducts loaded:', action.addOnProducts);

      this.addOnProduct = action.addOnProducts.data;
      this.getAddOnProducts();
      
    });

    const failureSub = this.actions$.pipe(
      filter((action: any) => action.type === AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure.type)
    ).subscribe(action => {
      // Handle failure, e.g., show error message
      console.error('Failed to load AddOnProducts:', action.error);
    });

    // Store subscriptions to clean up later if needed
    this.subscriptions.push(successSub, failureSub);
   
  }
  // embeding customer
  initializeCustomer(CustomerDetail: any): void {
    this.CustomerId = CustomerDetail._id;
    const invoice = this.genrateInvoice();
    this.updateInvoice(invoice);
    this.getCustomerName(this.CustomerId);
  }

  // getting customer by id
  getCustomerID(invoiceid: string): void {
    this.InvoiceService_.getbyid(invoiceid).subscribe(getCustomerid => {
      if (!getCustomerid) return;
      this.innvoicedata2 = getCustomerid;
      this.innvoicedata = this.innvoicedata2.data;
      this.CustomerId = this.innvoicedata.customer_id;
      // alert(this.CustomerId);
    });
    // return  this.CustomerId;
  }

  //getting customer by name
  getCustomerName(customer_id: string): void {
    this.CustomerService_.getbyid(customer_id).subscribe(CustomerName => {
      this.getCustomerdata = CustomerName;
      this.getCustomer = this.getCustomerdata.data;
      if (this.getCustomer.length > 0) {
        this.CustomerName = this.getCustomer[0].name;
        // console.log(this.getCustomer);
      }
      else {
        this.CustomerName = "Guest";

      }

    });
  }

  // initializing comment
  initializeComment(Cowemment: any): void {
    // Reserved for future implementation
  }

  // cancel running order calling table component function cancel()
  CancelOrder(): void {
    this.cancelOrder.emit(this.invoiceid);
    this.ClearSomeVariable();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
