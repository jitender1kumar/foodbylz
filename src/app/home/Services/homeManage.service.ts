

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { ProductPrice, ProductPriceDetails, Invoice, GenratedItems, ITax, IChair, InventoryFoodMain2, IDine, IAddOnItems, AddOnProductEdit, GenratedItemKOT } from '../../core/Model/crud.model';
import { RunningItems } from '../../core/Model/RunningItemsHomeModel/RunningItem.model';
import { addAddOnProductService } from '../../core/Services/addOnProduct.service';
import { subQuantityTypeService } from '../../core/Services/subQuantityType.service';
import { InvoiceService } from '../../core/Services/invoice.service';
import { CustomresService } from '../../core/Services/customers.service';
import { ManageService } from '../../core/Services/manage.service';
import { Actions } from '@ngrx/effects';
import * as AddOnProductActions from '../../manage/ManageStore/addOnProductStore/addOnProduct.action';
import * as runningItemActions from '../homeStore/runningItemKOTStore/runningItemKOT.actions';
import { InvoiceTableData } from '../home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeManageService {
  public RunningItems_: RunningItems[] = [];
  public productsByCategoryId: ProductPriceDetails[] = [];
  public productitembackup: ProductPriceDetails[] = [];
  public RecieptNumber: any;
  public invoiceid!: string;
  public CustomerName = 'Guest';
  public CustomerId = 'undefined';
  
   InvoiceTableData_:InvoiceTableData ={
      tableId: '',
      tableName: '',
      customerId: '',
      customerName: '',
      orderMode: ''
  };
  public runningItemsKOT: GenratedItemKOT = {
    TableId: '',
    RecieptNumber: '',
    KOTStatus: '',
    KOTrunningorders: [],
    createdAt: new Date(),
    EmployeeId: '',
    quntityvalue: undefined,
    qvalue: undefined
  };
  public KOTItemsdata: any;
  public innvoicedata: any;
  public selectedAddOnItems: any;
  public addOnProduct: any;
  public showAddonPopUp = false;
  public subscriptions: Subscription[] = [];
    addondataarr: any[]=[];
    itemtotalamount: number=0;
    totalamount: number=0;
    discountvalue: number=0;
    itemTotalTax: any;
    gitems2: any;
    allppdata: any;
    employeeId: any;
    myDiscountForm: any;
    fb: any;
    percent: number=0;
    totaltax: number=0;
    Tax: any;

  constructor(
    private store: Store<{ runningItemReducer_: any }>,
    private InvoiceService_: InvoiceService,
    private CustomerService_: CustomresService,
    private addAddOnProductService_: addAddOnProductService,
    private subQuantityTypeService_: subQuantityTypeService,
    private actions$: Actions,
    private ManageService_: ManageService
  ) {}

  initializeKOTItems(runningItemsKOT$: Observable<any[]> | null, invoiceid: string): void {
    console.log(runningItemsKOT$);
    if (!runningItemsKOT$) return;
    runningItemsKOT$.subscribe(KOTItems => {
      if (KOTItems) {
        if (Array.isArray(KOTItems)) {
          this.KOTItemsdata = KOTItems.filter(
            (item: any) => item && item.RecieptNumber === invoiceid
          );
          console.log(this.KOTItemsdata );
          return this.KOTItemsdata
          if(!this.KOTItemsdata) this.KOTItemsdata = "";
        } else {
          this.KOTItemsdata = "";
        return  this.KOTItemsdata
        }
      }
    });
    return  this.KOTItemsdata
  }

  ReturnRunningItems_!:RunningItems;
  loadfood(invoiceid: string): any {
  //  if (!invoiceid) return;
    let RunningItems = [];
    const runningItemsTable = localStorage.getItem(invoiceid);
    let runningItemsData: any = [];
    if (runningItemsTable) {
      try {
        
          runningItemsData = JSON.parse(runningItemsTable);
          console.log(runningItemsData);
          this.ReturnRunningItems_ = this.intializeRunningItem(runningItemsData) as RunningItems;
          return this.ReturnRunningItems_ ;
        } catch (e) {
          console.error('Error parsing RunningItemsTable from localStorage', e);
          runningItemsData = [];
          RunningItems = [];
        }
    }
    // Ensure that ReturnRunningItems_ is always defined before returning
    return this.ReturnRunningItems_ ;
}
  

  intializeRunningItem(Itemsdata: any): RunningItems {
    // Reset product arrays
    this.addondataarr = [];
    this.itemtotalamount = 0;
    this.totalamount = 0;

    // Since HomeManageService may not have observables like this.InvoiceData$ or this.addOnProductsData$,
    // assume Itemsdata already contains all necessary add-ons (imitate same push structure):

    this.RunningItems_ = [];
    (Itemsdata || []).forEach((item: any) => {
      this.RunningItems_.push({
        SelectProductId: item.SelectProductId,
        ProductPrice: item.ProductPrice?.toString() ?? '0',
        ProductName: item.ProductName,
        selectcategoryID: item.selectcategoryID,
        categoryName: item.categoryName,
        selectQtypeID: item.selectQtypeID,
        QtypeName: item.QtypeName,
        selectSubQuantityTypeID: item.selectSubQuantityTypeID,
        SubQuantityTypeName: item.SubQuantityTypeName,
        quntityvalue: item.quntityvalue,
        qvalue: item.qvalue,
        taxnames: "",
        taxvalues: 'taxpercentValues', // Placeholder; adjust if you have tax values
        totaltaxvalue: 0,
        AddOnItems: item.AddOnItems || [], // Assign AddOnItems if present
        paidStatus: false
      });
      this.itemtotalamount += (item.ProductPrice || 0) * (item.quntityvalue || 0);
      this.totalamount += (parseFloat(item.ProductPrice) || 0) * (item.quntityvalue || 0);
    });
    return this.RunningItems_ as unknown as RunningItems;
    // this.productitembackup = [...this.RunningItems_];
  }

  deleteRunningItem(d: any): void {
    if (!d.quntityvalue || d.quntityvalue > 1) {
      d.quntityvalue = 1;
    }
    // You would have to define the desired behavior, API, or subject here
    // E.g. this.loadqunityvalue(d.SelectProductId,'dcre', d.SubQuantityTypeName, d.quntityvalue, d.ProductPrice);
  }

  onQuantityChange(d: any): void {
    if (!d.quntityvalue || d.quntityvalue < 1) {
      d.quntityvalue = 1;
    }
    // this.loadqunityvalue(d.SelectProductId,'inc', d.SubQuantityTypeName, +d.quntityvalue-1, d.ProductPrice);
  }

  getCustomerName(customer_id: string): string {
    // This should return observable. Here simplified for demo.
    let customerName = 'Guest';
    this.CustomerService_.getbyid(customer_id).subscribe({
      next: (response: any) => {
        const getCustomerdata = response;
        const getCustomer = (getCustomerdata && getCustomerdata.data) ? getCustomerdata.data : [];
        customerName = (getCustomer.length && getCustomer[0].name) ? getCustomer[0].name : "Guest";
      },
      error: () => {
        customerName = "Guest";
      }
    });
    return customerName;
  }

  showAddonsPopUp(SelectProductId: string, selectSubQuantityTypeID: string): void {
    this.showAddonPopUp = true;
    this.getAddOnItembySubQuantity_Product_ID(SelectProductId, selectSubQuantityTypeID);
  }

  getAddOnItembySubQuantity_Product_ID(SelectProductId: string, selectSubQuantityTypeID: string): void {
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

  getAddOnProducts(): void {
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
      if (data) {
        this.innvoicedata = data;
        this.selectedAddOnItems = this.innvoicedata.data[0].AddOnItems;
      }
    });
  }

  loadqunityvalue(
    id: string,
    action: 'inc' | 'dcre',
    SubQuantityTypeName: string,
    quntity: any,
    price: any
  ,RunningItemData:any,invoiceid:string,allppdata:any
): any  {
    if (Array.isArray(this.gitems2)) {
      this.gitems2.length = 0;
    }
    const taxpercent = 0;

this.RunningItems_ = RunningItemData;
console.log(RunningItemData)
this.allppdata=allppdata;
    // if (!this.allppdata || !Array.isArray(this.allppdata) || this.allppdata.length === 0) {
    //   this.allppdata = Array.isArray(this.RunningItems_) ? [...this.RunningItems_] : [];
    //   console.log(this.allppdata);
    // //  alert("allpp");
    // }
    // else{
    //   this.allppdata=[];
    //   this.allppdata=allppdata;
    //    // this.allppdata.push(allppdata);
    //     console.log(this.allppdata);
    // }
   
    // Find the item in all price data
    const itemIdxInAllPP = this.allppdata.findIndex(
      (item: any) =>
        (item.SelectProductId ? item.SelectProductId === id : item.id === id) &&
        item.SubQuantityTypeName === SubQuantityTypeName
    );
    const allPPItem = this.allppdata[itemIdxInAllPP];

    // Find the running item
    const runningItemIdx = this.RunningItems_.findIndex(
      (item: any) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName
    );

    let val: number;

    const getGItem = (obj: any, quantity: number) => ({
      RecieptNumber: invoiceid,
      Items: [{
        Productid: obj.SelectProductId,
        Productname: obj.ProductName,
        SubQuantityTypeID: obj.selectSubQuantityTypeID,
        SubQuantityTypeName: obj.SubQuantityTypeName,
        Qauntityid: obj.selectQtypeID,
        Qauntityname: obj.QtypeName,
        Quantity: quantity,
        itemamount: price,
        totalquantityamount: +price * quantity,
        employee_id: this.employeeId
      }]
    });

    if (allPPItem && allPPItem.SelectProductId && action === 'inc') {
      val = Number(quntity) + 1;

      if (this.RunningItems_.length > 0) {
        if (runningItemIdx !== -1) {
          // Update the quantity in the existing running item
          if (!Object.isExtensible(this.RunningItems_[runningItemIdx])) {
            return this.RunningItems_[runningItemIdx] = { ...this.RunningItems_[runningItemIdx] };
          }
          Object.assign(this.RunningItems_[runningItemIdx], {
            SelectProductId: id,
            quntityvalue: val,
            qvalue: val,
            ProductPrice: price,
            ProductName: allPPItem.ProductName,
            selectcategoryID: allPPItem.selectcategoryID,
            categoryName: allPPItem.categoryName,
            selectQtypeID: allPPItem.selectQtypeID,
            QtypeName: allPPItem.QtypeName,
            selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
            SubQuantityTypeName: allPPItem.SubQuantityTypeName,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent,
            paidStatus: false,
            AddOnItems: (this.RunningItems_[runningItemIdx]?.AddOnItems ?? [])
          });
          this.gitems2 = [getGItem(this.RunningItems_[runningItemIdx], val)];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(this.RunningItems_));
          } catch (e) {
            console.error('Error saving RunningItemsTable to localStorage', e);
          }
        } else {
          // Add new running item if not already present
          const newRunningItem = {
            SelectProductId: id,
            ProductPrice: price,
            ProductName: allPPItem.ProductName,
            selectcategoryID: allPPItem.selectcategoryID,
            categoryName: allPPItem.categoryName,
            selectQtypeID: allPPItem.selectQtypeID,
            QtypeName: allPPItem.QtypeName,
            selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
            SubQuantityTypeName: allPPItem.SubQuantityTypeName,
            quntityvalue: val,
            qvalue: val,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent,
            paidStatus: false,
            AddOnItems: []
          };
          this.gitems2 = [getGItem(allPPItem, val)];
          this.RunningItems_ = [...this.RunningItems_, newRunningItem];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(this.RunningItems_));
          } catch (e) {
            console.error('Error saving RunningItemsTable to localStorage', e);
          }
          return this.RunningItems_;
        }
      } else {
        // If RunningItems_ is empty, start with a single new item
        const newRunningItem = {
          SelectProductId: id,
          ProductPrice: price,
          ProductName: allPPItem.ProductName,
          selectcategoryID: allPPItem.selectcategoryID,
          categoryName: allPPItem.categoryName,
          selectQtypeID: allPPItem.selectQtypeID,
          QtypeName: allPPItem.QtypeName,
          selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
          SubQuantityTypeName: SubQuantityTypeName,
          quntityvalue: val,
          qvalue: val,
          taxnames: '',
          taxvalues: '',
          totaltaxvalue: taxpercent,
          paidStatus: false,
          AddOnItems: []
        };
        this.gitems2 = [getGItem(allPPItem, val)];
        this.RunningItems_ = [newRunningItem];
        try {
          localStorage.setItem(invoiceid, JSON.stringify(this.RunningItems_));
        } catch (e) {
          console.error('Error saving RunningItemsTable to localStorage', e);
        }
        return this.RunningItems_;
      }
    }
    else if (action === 'dcre') {
      if (runningItemIdx !== -1) {
        val = quntity - 1;

        if (val > 0) {
          Object.assign(this.RunningItems_[runningItemIdx], {
            quntityvalue: val,
            qvalue: val,
            ProductPrice: price,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent
          });

          this.gitems2 = [getGItem(this.RunningItems_[runningItemIdx], val)];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(this.RunningItems_));
          } catch (e) {
            console.error('Error updating RunningItemsTable in localStorage', e);
          }
        } else {
          // Remove the item if val becomes 0 or less
          this.RunningItems_ = [
            ...this.RunningItems_.slice(0, runningItemIdx),
            ...this.RunningItems_.slice(runningItemIdx + 1)
          ];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(this.RunningItems_));
          } catch (e) {
            console.error('Error updating RunningItemsTable in localStorage', e);
          }
          return this.RunningItems_;
        }
      }
    }

    // this.myDiscountForm = this.fb.group({
    //   discount: '',
    //   numberInput: [0]
    // });
    this.percent = 0;
    // this.totalamount = this.gettotamount();
    // this.getitemTotalTax();
    // this.getitemtotalamount();
   return this.RunningItems_ as unknown as RunningItems;
  }

  gettotamount(): number {
    return this.RunningItems_.reduce((acc, item) => acc + (+item.totaltaxvalue) + (+item.ProductPrice) * (+item.quntityvalue), 0);
  }

  getitemTotalTax(): void {
    this.totaltax = 0;
    this.itemTotalTax = [];
    if (!this.Tax) return;
    for (const tax of this.Tax) {
      if (tax.Status) {
        const taxpercent = (this.totalamount * tax.perscentRate) / 100;
        this.itemTotalTax.push({ taxname: tax.name, taxpercent });
        this.totaltax += Math.abs(taxpercent);
      }
    }
    this.totaltax = Math.fround(this.totaltax);
  }

  getitemtotalamount(): void {
    this.itemtotalamount = this.itemTotalTax.reduce((acc: any, curr: { taxpercent: any; }) => acc + curr.taxpercent, 0);
    this.itemtotalamount = Math.fround(this.totalamount + this.itemtotalamount);
    this.discountvalue = Math.fround(this.itemtotalamount);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
