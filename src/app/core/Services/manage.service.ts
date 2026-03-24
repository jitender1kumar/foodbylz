import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProductPriceService } from './productprice.service';
import { ProductService } from './product.service';
import { QuantitytypeService } from './quantitytype.service';
import { CategoryService } from './category.service';
import { subQuantityTypeService } from './subQuantityType.service';
import { TaxService } from './tax.service';
import { ItemsService } from './items.service';
import { DineService } from './dine.service';
import { ChairService } from './chair.service';
import { ChairServiceService } from './chairsrunningorders.serivce';
import { InventoryMainFoodwithProductService } from './inventoryFoodWithProduct.service';
import { InventoryMainFoodService } from './inventoryMainFood.service';
import { PaybyService } from './paybymanage.service';
import { addAddOnProductService } from './addOnProduct.service';
import { CustomresService } from './customers.service';
import { InitializeInvoice } from '../commanFunction/InitializeInvoice.service';
import { loadCategories } from '../../manage/ManageStore/categoryStore/category.actions';
import { loadProductPrice } from '../../manage/ManageStore/productPriceStore/productPrice.actions';
import { loadProduct } from '../../manage/ManageStore/productStore/product.actions';
import { loadQuantityType } from '../../manage/ManageStore/quntityTypeStore/quntityType.actions';
import { loadAllAddOnProducts } from '../../manage/ManageStore/addOnProductStore/addOnProduct.action';
import { InvoiceService } from './invoice.service';
import { IDine } from '../Model/crud.model';
import { loadSubQuantityType } from '../../manage/ManageStore/subQuantityTypeStore/subQuantityType.actions';
//import * as RunningItemActions from '../../home/homeStore/runningItemKOTStore/runningItemKOT.actions';
import * as RunningItemKOTActions from '../../home/homeStore/runningItemKOTStore/runningItemKOT.actions';
import { GetOrderDetailsService } from '../commanFunction/getOrderDetails.service';
import { RunningItems } from '../Model/RunningItemsHomeModel/RunningItem.model';
@Injectable({
  providedIn: 'root'
})
export class ManageService {
  /**
   * Updates the notes for a KOT running order item within the provided array.
   * @param KOTrunningorders - Array of running KOT items to update.
   * @param SelectProductId_ - Product ID to find the matching item.
   * @param selectSubQuantityTypeID_ - Sub quantity type ID to find the matching item.
   * @param notes - New notes string to assign.
   * @returns Updated array of KOTrunningorders.
   */
  updateNotesInRunningItems(
    KOTrunningorders: RunningItems[],
    SelectProductId_: any,
    selectSubQuantityTypeID_: any,
    notes: string
  ): RunningItems[] {
    if (!Array.isArray(KOTrunningorders)) return KOTrunningorders;
    return KOTrunningorders.map(item => {
      if (
        item.SelectProductId === SelectProductId_ &&
        item.selectSubQuantityTypeID === selectSubQuantityTypeID_
      ) {
        return {
          ...item,
          notes: notes
        };
      }
      return item;
    });
  }
  // Observables for state
  loadAddOnProductsdata$!: Observable<any>;
  addOnProductsData$!: Observable<any>;
  error$!: Observable<any>;
  loading$!: Observable<boolean>;
  runningKOTItems$!: Observable<any>;
  categorynamedata$!: Observable<any>;
  Qtypenamedata$!: Observable<any>;
  subQuantityTypeData$!: Observable<any>;
  subQuantityTypeByIdData$!: Observable<any>;
  Productnamedata$!: Observable<any>;
  productPriceData$!: Observable<any>;

  // State tracking values
  invoiceid: any;
  innvoicedata2: any;
  innvoicedata: any;
  invoiceData$ = new BehaviorSubject<any>(null);
  payByData$ = new BehaviorSubject<any>(null);
  TokenNumber$ = new BehaviorSubject<any>(null);
  table_id: any;
  invoicedata:any;
  table_name: any;
  CustomerId: any;
  CustomerName: any;
  ordermode: any;
    getCustomer$!: Observable<any>;
  // paybydata: never[] | undefined;
  // paybydata2: any;
  gettableid2: Object | undefined;
  gettableid: any;
  tabledata2: Object | undefined;
  tabledata: any;
  dine: IDine = {
    _id: "undefined",
    name: '',
    description: '',
    status: true,
    floor_id: "undefined",
    employee_id: "undefined"
  };
  employeeId: any;
  taxnamedata2: any;
  taxnamedata: any;
 
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
      [x: string]: any;
      categoryLoad: any;
      productPriceLoad: any;
      productLoad: any;
      quantityTypeLoad: any;
      subQuantityTypeLoad: any;
      subQuantityTypeByIdLoad: any;
      addOnProductReducer_: any;
      runningItemKOTReducer_: any;
      loadAddOnProductReducer_: any;
      
    }>,
    private CustomerService_: CustomresService,
    private InitializeInvoice_: InitializeInvoice,
    private getOrderDetailsService: GetOrderDetailsService
  ) {
   
    this.initObservables();
  }

   initObservables(): void {
  //  console.log("Hi!");
    this.getCustomer$ = this.store.select(
      state => state['customerLoad']?.customers?.data
    );
    this.loadAddOnProductsdata$ = this.store.select(
      state => state.loadAddOnProductReducer_?.addOnProductsdata?.data
    );
    this.addOnProductsData$ = this.store.select(
      state => state.addOnProductReducer_?.addOnProducts?.data
    );
    this.runningKOTItems$ = this.store.select(
      state => state.runningItemKOTReducer_?.KOTrunningorders?.data
    );
    this.categorynamedata$ = this.store.select(
      state => state.categoryLoad?.ProductCategory_?.data
    );
    this.Qtypenamedata$ = this.store.select(
      state => state.quantityTypeLoad?.QuantityType_?.data
    );

    this.subQuantityTypeData$ = this.store.select(
      state => state.subQuantityTypeLoad?.SubQuantityType_?.data
    );
    this.subQuantityTypeByIdData$ = this.store.select(
      state => state.subQuantityTypeByIdLoad?.SubQuantityType_?.data
    );
    this.Productnamedata$ = this.store.select(
      state => state.productLoad?.Product_?.data
    );
    this.productPriceData$ = this.store.select(
      state => state.productPriceLoad?.ProductPrice_?.data
    );

    // Combine all loading observables to produce a single loading boolean observable
    this.loading$ = combineLatest([
      this.store.select(state => state.categoryLoad?.loading),
      this.store.select(state => state.quantityTypeLoad?.loading),
      this.store.select(state => state.subQuantityTypeLoad?.loading),
      this.store.select(state => state.subQuantityTypeByIdLoad?.loading),
      this.store.select(state => state.productLoad?.loading),
      this.store.select(state => state.productPriceLoad?.loading)
    ]).pipe(
      map(loadings => loadings.some(loading => loading === true))
    );

    // Combine all error observables to produce a single error observable
    this.error$ = combineLatest([
      this.store.select(state => state.categoryLoad?.error),
      this.store.select(state => state.quantityTypeLoad?.error),
      this.store.select(state => state.subQuantityTypeLoad?.error),
      this.store.select(state => state.subQuantityTypeByIdLoad?.error),
      this.store.select(state => state.productLoad?.error),
      this.store.select(state => state.productPriceLoad?.error)
    ]).pipe(
      map(errors => errors.find(error => error != null) ?? null)
    );
    this.refresh();
  }



  getbyid(RecieptNumber: any): Observable<any> {
    // This needs to be implemented: add backend service call
    // e.g.: return this.service.getbyid(RecieptNumber);
    throw new Error('Method not implemented. Please implement getbyid to return an Observable.');
  }

  getCustomerName(customer_id: any): string | null {
    // Implement this method: fetch customer name by ID via state or service
    // Placeholder: return null or some dummy value
    return null;
  }
  refresh(): void {
    this.load_AddOnProductsdata();
    this.loadcategory();
    this.loadQtype();
    this.loadSubQuantityTypeName();
    this.loadProducts('jsk');
    this.loadProductPrices();

  }
 

  loadToken() {
    // this function is resposible for making token number
    // this.TokenNumber = 0;
    this.getOrderDetailsService.loadToday().subscribe(data => {
      const items = (data && typeof data === 'object' && Array.isArray((data as any).data)) ? (data as any).data : [];
    //  console.log(items);
      this.TokenNumber$.next(items.length + 1);
      if (!Array.isArray(items)) {
        const d = new Date();
        this.TokenNumber$.next(d.getDay() + d.getTime());
      }
    });
  }
initRunningKOT()
{
  this.runningKOTItems$ = this.store.select(
    state => state.runningItemKOTReducer_?.KOTrunningorders?.data
  );
}
  loadRunningKOT()
  {
   
    this.store.dispatch(RunningItemKOTActions.loadKOTRunningItems());
    this.runningKOTItems$ = this.store.select(
      state => state.runningItemKOTReducer_?.KOTrunningorders?.data
    );
  }
  PayByData:any;
  loadpaybyMode() {
    this.PaybyService_.get().subscribe(data => {
     // console.log(data);
      if (data) {
        this.PayByData = (data as any).data;
        this.payByData$.next(this.PayByData);

       
       }
    })
  //  console.log(this.PayByData$);
  //  return this.PayByData;
  }
 
getInvoiceDataById(invoiceid:string)
{
  this.InvoiceService_.getbyid(invoiceid).subscribe(data => {
    if (data ) {
      this.invoicedata = (data as any).data;
      console.log(this.invoicedata);
      this.invoiceData$.next(this.invoicedata);
    
    //  console.log(this.invoicedata);
    }
  });
 
}

  load_AddOnProductsdata() {
    this.store.dispatch(loadAllAddOnProducts());
    this.addOnProductsData$ = this.store.select(state => state.loadAddOnProductReducer_?.addOnProductsdata?.data);
  }

  loadcategory(): void {
    this.store.dispatch(loadCategories());
    this.categorynamedata$ = this.store.select( state => state.categoryLoad?.ProductCategory_?.data);
  }

  loadQtype(): void {
    this.store.dispatch(loadQuantityType());
    this.Qtypenamedata$ = this.store.select(
      state => state.quantityTypeLoad?.QuantityType_?.data
    );
  }

  loadProducts(_msg: any): void {
    this.store.dispatch(loadProduct());
  this.Productnamedata$ = this.store.select(
    state => state.productLoad?.Product_?.data
  );
  
  }

  loadProductPrices(): void {
    this.store.dispatch(loadProductPrice());
    this.productPriceData$ = this.store.select(
      state => state.productPriceLoad?.ProductPrice_?.data
    );
  }

  removerunningOrder(): void {
    this.chairsrunningorderservice.getbyid(this.invoiceid).subscribe(data => {
      if (!data || !Array.isArray((data as any).data)) return;
      this.gettableid2 = data;
      this.gettableid = (this.gettableid2 as any).data;
      if (!this.gettableid[0] || !this.gettableid[0].Chairsrunningorder || !this.gettableid[0].Chairsrunningorder[0]) return;
      this.dineservice.getbyid(this.gettableid[0].Chairsrunningorder[0].table_id).subscribe(tabldata => {
        if (!tabldata || !Array.isArray((tabldata as any).data)) return;
        this.tabledata2 = tabldata;
        this.tabledata = (this.tabledata2 as any).data;
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
  loadSubQuantityTypeName(): void {
   return this.store.dispatch(loadSubQuantityType());
   this.subQuantityTypeData$ = this.store.select(
    state => state.subQuantityTypeLoad?.SubQuantityType_?.data
  );
  }
  loadTax(): void {
    this.taxService.get().subscribe((data: any) => {
      if (!data || !Array.isArray(data.data)) {
        this.taxnamedata = [];
        return;
      }
      this.taxnamedata2 = data;
     return this.taxnamedata = data.data;
      // this.initializeTax();
    });
  }
   
}