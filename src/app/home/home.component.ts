import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { endWith, Observable } from 'rxjs';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
import { CategoryService } from '../core/Services/category.service';
import { InvoiceService } from '../core/Services/invoice.service';
import { ProductService } from '../core/Services/product.service';
import { ItemsService } from '../core/Services/items.service';
import { ProductPriceService } from '../core/Services/productprice.service';
import { QuantitytypeService } from '../core/Services/quantitytype.service';
import { TaxService } from '../core/Services/tax.service';
import { ProductPrice, ProductPriceDetails, Invoice, GenratedItems, ITax, IChair, InventoryFoodMain2, IDine } from '../core/Model/crud.model';
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
import { TablesComponent } from '../dine/tables/tables.component';
import { InitializeInvoice } from '../core/commanFunction/InitializeInvoice.service';
import { JsonpClientBackend } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe],
  standalone: false,

})
export class HomeComponent implements OnInit {
  @Input() invoiceid: any;
  @Input() TokenNumber:any;
  @Output() valueChanged = new EventEmitter<string>();
  @Output() cancelOrder = new EventEmitter<string>();
  showCustomerPopUp = false;
  showCommentPopUp = false;
  closePopUp = false;
  CustomerName = "Guest";
  CustomerId = "undefined";
  showDiscountForm = false;
  deletedInvoiceId: any = "false";
  replacedInvoiceId: any = "";
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  subQuantityTypeData$: Observable<any[]> | undefined;
  categorynamedata$: Observable<any[]> | undefined;
  subQuantityTypeName$: Observable<any[]> | undefined;
  subQuantityTypeByIdData$: Observable<any[]> | undefined;
  Qtypenamedata$: Observable<any[]> | undefined;
  Productnamedata$: Observable<any[]> | undefined;
  productPriceData$: Observable<any> | undefined;
  getitemsdatalength_forupdate: any;
  taxname: string = "";
  paidamount: any = 0;
  chardata: any = [];
  ordermode = "";
  getpercentOnebyOne: number = 0;
  orders_status: any = [{ "1": "NewOrder", "2": "InProgress", "3": "Cancelled", "4": "Settled" }];
  itemtotalamount: any = 0;
  totalamount = 0;
  totaltax: number = 0;
  itemTotalTax: any[] = [];
  IChairdata: any;
  IChairdata2: any;
  orderMode = ""; date: string = '';
  table_name = "";
  chair: any = ["GuestTable"];
  SelectProductId: any;
  selectcategoryID: any;
  selectQtypeID: any;
  selectSubQuantityTypeID: any;
  ProductPrice: any;
  quntityvalue: any;
  allppdata: any;
  table_id: any;
  dinedata: any;
  dinedata2: any;
  paybydata: any;
  employeeId = "JSK";
  paybydata2: any;
  ppname: any[] = [];
  RunningItems_: RunningItems[] = [];
  productpriceallname: ProductPriceDetails[];
  productsByCategoryId: ProductPriceDetails[];
  showtype = false;
  getforinvoiceiddata: any;
  getforinvoiceiddata2: any;
  Itemsdata: any;
  Itemsdata2: any;
  statusall: any;
  getCustomer: any;
  getCustomerdata: any;
  ppalsoavailable: any;
  args: any = null;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  taxnamedata2: any
  taxnamedata: any;
  productprices: ProductPrice =
    {
      _id: '',
      ProductPrice: 100,
      SelectProductId: '',
      selectcategoryID: '',
      selectQtypeID: '',
      selectSubQuantityTypeID: '',
      employee_id: this.employeeId,
    }
  getpercentvaldata: any;
  getpercentvaldata2: any;

  showdining = false;
  gitems: GenratedItems[] = [{
    Invoiceid: "",
    Productid: "",
    Productname: "",
    SubQuantityTypeID: "",
    SubQuantityTypeName: "",
    Qauntityid: "",
    Qauntityname: "",
    Quantity: 0,
    itemamount: 0,
    totalquantityamount: 0,
    employee_id: this.employeeId,
  }];
  gitems2: GenratedItems[] = [{
    Invoiceid: "",
    Productid: "",
    Productname: "",
    SubQuantityTypeID: "",
    SubQuantityTypeName: "",
    Qauntityid: "",
    Qauntityname: "",
    Quantity: 0,
    itemamount: 0,
    totalquantityamount: 0,
    employee_id: this.employeeId,
  }];
  discountvalue: any = 0;
  actualdiscountprice: any = 0;
  percent: any = 0;
  myDiscountForm: any;
  basname: any;
  basname2: any;
  ichar: IChair[] = [];
  itaxarr: ITax[] = [{ id: "", name: "", percentt: 0, amount: 0, productid: "", productname: "" }];
  // invoice: Invoice = {
  //   Taxes: this.itaxarr,
  //   Chairs: this.ichar,
  //   taxpecentRate: 0,
  //   taxpercentValue: 0,
  //   DiscountId: "",
  //   Discountvalue: 0,
  //   Discountperstage: 0,
  //   AdditionaldiscountAmount: 0,
  //   Totalvaue: 0,
  //   RecieptNumber: 0,
  //   grandtotal: 0,
  //   OrderType: '',
  //   PendingAmount: 0,
  //   PaidAmount: 0,
  //   AmountPaidstatus: false,
  //   Orderstatus: "New Order",
  //   TotalTaxAmount: 0,
  //   TotalItemsAmount: 0,
  //   createdAt: this.gettoday(),
  //   OrderTypeName: "",
  //   paybyId: 'undefined',
  //   table_id: 'undefined',
  //   tablename: 'undefined',
  //   customer_id: 'undefined',
  //   employee_id: this.employeeId,
  //   AssistToId: 'undefined',
  //   CommentId: 'undefined', returnAmount: '',
  // }
  gettableid2: any;
  gettableid: any;
  tabledata: any;
  tabledata2: any;
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: '',
    employee_id: this.employeeId,
  }
  getinvoiceid: any; getinvoiceid2: any;

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
  }
  statusselectall = false;
  paybyId: any = "none";
  toggle_i: any;
  @ViewChildren('dynamicInput') divs!: QueryList<ElementRef>;
  inputValue: any;
  showplaceorderPopup = false;
  productPriceId = "0";
  typeprice: any[] = []; valid: any = 0;
  priceID: any[] = [];
  searchQuery: any;
  selectedType: any;

invoice:any;
  constructor(private service: ProductPriceService, private ProductService_: ProductService, private QuantitytypeService_: QuantitytypeService, private CategoryService_: CategoryService, private subQuantityTypeService_: subQuantityTypeService, private router: Router, private formedit: FormBuilder, private taxService: TaxService, private fb: FormBuilder, private InvoiceService_: InvoiceService, private ItemsService_: ItemsService, private dineservice: DineService, private chairservice: ChairService, private chairsrunningorderservice: ChairServiceService, private InventoryMainFoodwithProductService_: InventoryMainFoodwithProductService, private InventoryMainFoodService_: InventoryMainFoodService, private PaybyService_: PaybyService, private datePipe: DatePipe, private store: Store<{ categoryLoad: any, productPriceLoad: any, productLoad: any, quantityTypeLoad: any, subQuantityTypeLoad: any, subQuantityTypeByIdLoad: any }>, private SweetAlert2_: SweetAlert2, private CustomerService_: CustomresService,private InitializeInvoice_:InitializeInvoice) {
   this.invoice = this.InitializeInvoice_.initializeInvoiceDefault();
    this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.loading$ = this.store.select(state => state.categoryLoad.loading);
    this.error$ = this.store.select(state => state.categoryLoad.error);

    this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);

    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.loading$ = this.store.select(state => state.subQuantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeLoad.error);

    this.subQuantityTypeByIdData$ = this.store.select(state => state.subQuantityTypeByIdLoad.SubQuantityType_.data);
    this.loading$ = this.store.select(state => state.subQuantityTypeByIdLoad.loading);
    this.error$ = this.store.select(state => state.subQuantityTypeByIdLoad.error);

    this.Productnamedata$ = this.store.select(state => state.productLoad.Product_.data);
    this.loading$ = this.store.select(state => state.productLoad.loading);
    this.error$ = this.store.select(state => state.productLoad.error);

    this.productPriceData$ = this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    this.loading$ = this.store.select(state => state.productPriceLoad.loading);
    this.error$ = this.store.select(state => state.productPriceLoad.error);
    this.display = "display:none;"
    this.itemtotalamount = 0;
    this.totaltax = 0;
    this.productpriceallname = [];
    this.productsByCategoryId = [];
    this.showtype = false;
    this.replacedInvoiceId = this.invoiceid;
  }
  ngOnInit(): void {
    this.refresh();
    this.loadinvoice();
    this.loadfood("DinningTable", this.invoiceid);
    this.myDiscountForm = this.fb.group({
      discount: "",
      numberInput: [0], // Initialize the form control
    });
    //  this.loadallppdata();

  }
  refresh() {

    this.loadcategory();
    this.loadQtype();
    this.loadSubQuantityTypeName();
    this.loadProducts("jsk");
    this.loadProductPrices();

  }
  getid(arg0: any) {

    if (arg0.target.checked) {
      // this.statusselectall=false;
      this.IChairdata[arg0.target.value].status = true;
    }
    else {
      this.IChairdata[arg0.target.value].status = false;
    }
  }
  loadinvoice() {
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(invoiceData => {
      this.innvoicedata2 = invoiceData;
      this.innvoicedata = this.innvoicedata2.data;
      this.table_id = this.innvoicedata[0].table_id;
      this.table_name = this.innvoicedata[0].tablename;
      if (this.innvoicedata[0].customer_id != "undefined") {
        this.getCustomerName(this.innvoicedata[0].customer_id);
      }
      else {
        this.CustomerName = "Guest";
      }

      if (this.table_name != "Pick Up") {
        this.ordermode = this.table_name;
      }
      else {
        this.ordermode = "Pick Up";
      }
    }
    );
  }

  loadfood(msg: string, moddata: string) {

    this.chardata = [];
    //this.ordermode = msg;
    let _id = msg;
    this.chardata = moddata;
    this.loadTax();
    if (msg == "jsk") {
      this.refresh();
      // this.loadProducts("jsk");
    }
    else {
      if (this.invoiceid) {
        //  if (this.deletedInvoiceId=="false") {  
        this.ItemsService_.getbyid(this.invoiceid).subscribe(data2 => {
          if (data2) {
            this.Itemsdata2 = "";
            this.Itemsdata = "";
            this.Itemsdata2 = data2;
            this.Itemsdata = this.Itemsdata2.data;
            if (this.Itemsdata.length == 0) {
              this.refresh();
            }
            else if (this.Itemsdata.length != 0) {
              this.refresh();
              this.RunningItems_ = [];
              for (var ii = 0; ii < this.Itemsdata.length; ii++) {
                // alert("working");
                this.RunningItems_.push({
                  _idPP: this.Itemsdata[ii].Productid,
                  ProductPrice: this.Itemsdata[ii].itemamount,
                  SelectProductId: this.Itemsdata[ii].Productid,
                  ProductName: this.Itemsdata[ii].Productname,
                  selectcategoryID: "",//this.Itemsdata[ii].selectcategoryID,
                  categoryName: "", //this.Itemsdata[ii].categoryName,
                  selectQtypeID: this.Itemsdata[ii].Qauntityid,
                  QtypeName: this.Itemsdata[ii].Qauntityname,
                  selectSubQuantityTypeID: this.Itemsdata[ii].SubQuantityTypeID,
                  SubQuantityTypeName: this.Itemsdata[ii].SubQuantityTypeName,
                  quntityvalue: this.Itemsdata[ii].Quantity,
                  qvalue: this.Itemsdata[ii].Quantity,
                  taxnames: "taxpercentName",
                  taxvalues: "taxpercentValues",
                  totaltaxvalue: 0
                });
                this.itemtotalamount += this.Itemsdata[ii].itemamount * this.Itemsdata[ii].Quantity;
                this.totalamount += this.Itemsdata[ii].itemamount * this.Itemsdata[ii].Quantity;
              }

              for (var dd = 0; dd < this.taxnamedata.length; dd++) {
                if (this.taxnamedata[dd].Status == true) {
                  this.taxname += this.taxnamedata[dd].name + ", ";
                }
              }

              this.InvoiceService_.getbyid(this.invoiceid).subscribe(getpercentval => {
                if (getpercentval) {
                  this.getpercentvaldata2 = getpercentval;
                  this.getpercentvaldata = this.getpercentvaldata2.data
                  this.percent = this.getpercentvaldata[0].Discountperstage;
                  this.itemTotalTax = [];
                  this.itemTotalTax = this.getpercentvaldata[0].Taxes;
                  this.actualdiscountprice = (this.itemtotalamount * this.percent) / 100;
                  for (var ii = 0; ii < this.taxnamedata.length; ii++) {
                    if (this.taxnamedata[ii].Status) {
                      this.getpercentOnebyOne = (+this.itemtotalamount * this.taxnamedata[ii].perscentRate) / 100;
                      this.totaltax += this.getpercentOnebyOne;
                    }
                  }
                  this.myDiscountForm = this.fb.group({
                    discount: "",
                    numberInput: [this.getpercentvaldata[0].Discountperstage], // Initialize the form control
                  });
                  this.discountvalue = (this.itemtotalamount - ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
                  this.itemtotalamount = (this.itemtotalamount + ((+this.itemtotalamount * this.percent) / 100)) + this.totaltax;
                }
              }
              );
            }
          }
        })
      }
    }
  }
  loadchair() {
    ////alert(selectcategoryID);
    // this.chairservice.getbyid(this.myAddDineForm.value.table_id).subscribe(data => {
    //   if (data) {
    //    this.IChairdata2=data;
    //    this.IChairdata=this.IChairdata2.data
    //   //this.loadstatusofchair();
    //   }
    // })
  }


  getpaybyid() {
    // const select = document.getElementById(this.paybyselect);
    console.log(this.paybyId);
    //alert(this.paybyId);
  }
  loadpaybyMode() {
    this.PaybyService_.get().subscribe(data => {
      if (data) {
        this.paybydata2 = data;
        this.paybydata = this.paybydata2.data;
        console.log(this.paybydata);
      }
    })
  }

  getproductbycategory(_id: any) {
    if (this.ordermode != "") {
      this.loadproductpricename(_id);
    }
    else {
      this.SweetAlert2_.showFancyAlertFail("Please Select Dinning Table First.");
    }

  }

  updatemainfood(IventoryFoodMainId: any, qvalue: any) {
    this.InventoryMainFoodService_.getbyid(IventoryFoodMainId).subscribe(imfs => {
      if (imfs) {
        this.imfsdata2 = "";
        this.imfsdata = "";
        this.imfsdata2 = imfs;
        this.imfsdata = this.imfsdata2.data;

        // console.log(qvalue);
        console.log(imfs);
        //  alert(imfs);
        this.inventoryfoodmain = {
          _id: IventoryFoodMainId,
          name: this.imfsdata[0].name,
          description: this.imfsdata[0].description,
          quantitytypeID: this.imfsdata[0].quantitytypeID,
          quantitytypename: this.imfsdata[0].quantitytypename,
          quantitytypevalue: +this.imfsdata[0].quantitytypevalue - qvalue,
          employee_id: this.employeeId,
          createdAt: this.imfsdata[0].createdAt
        }
        console.log(this.inventoryfoodmain);

        this.InventoryMainFoodService_.update(this.inventoryfoodmain).subscribe(updatefms => {
          if (updatefms) {
            this.updatefmsdata2 = updatefms;
            this.updatefmsdata = this.updatefmsdata2.data;
            console.log(updatefms);
          }
        }
        )

      }
    }
    )
  }

  removerunningOrder() {
    this.chairsrunningorderservice.getbyid(this.invoiceid).subscribe(data => {
      if (data) {
        this.gettableid2 = data;
        this.gettableid = this.gettableid2.data;
        console.log("data : ");
        console.log(this.gettableid);
        this.dineservice.getbyid(this.gettableid[0].Chairsrunningorder[0].table_id).subscribe(tabldata => {
          if (tabldata) {
            this.tabledata2 = tabldata;
            this.tabledata = this.tabledata2.data;
            console.log(tabldata);

            this.dine = {
              _id: this.tabledata[0]._id,
              name: this.tabledata[0].name,
              description: this.tabledata[0].description,
              status: true,
              floor_id: this.tabledata[0].floor_id,
              employee_id: this.employeeId,
            }
            this.dineservice.update(this.dine).subscribe(updatedine => {
              if (updatedine) {
              }
            })

          }
        })
      }
    })
    this.chairsrunningorderservice.delete(this.invoiceid).subscribe(data2 => {
      if (data2) {
        alert("deleted");
      }

    })
  }
  genrateOrder() {
    if (this.paybyId != "none") {
      if (this.paidamount >= 0 && this.paidamount!="") {
        const d = new Date();
        this.getinvoiceid2 = "";
        this.getinvoiceid = "";

        this.inventoryFoodCalculation();
        this.gitems = [];
        this.gitems2 = [];

        const invoice = this.genrateInvoice();
        this.updateInvoice(invoice);
        this.close2();
        this.removerunningOrder();
        this.ClearSomeVariable();
      }
      else {
        alert("Paid amount should be greater than or equal to 0.");
        this.SweetAlert2_.showFancyAlertFail("Please Enter Valid Value.");
      }
    }
    else {
      this.SweetAlert2_.showFancyAlertFail("Select Pay Mode for further proceed.");
    }
  }
  ClearSomeVariable() {
    this.ordermode = "";
    this.RunningItems_ = [];
    this.productsByCategoryId = [];
    this.valueChanged.emit("");
  }
  updateInvoice(invoice: any) {
    this.InvoiceService_.update(invoice).subscribe(invoiceupdate => {
      if (invoiceupdate) {
        // alert("in invoice update");
        this.getinvoiceid2 = invoiceupdate;
        this.getinvoiceid = this.getinvoiceid2.createdTask;
        //alert("done.");


      }
    })
  }
  
  genrateInvoice(): Invoice {
    this.invoice = {
      Taxes: this.getTax(),
      Chairs: this.ichar,
      taxpecentRate: 0,
      taxpercentValue: 0,
      DiscountId: "jsk",
      Discountvalue: this.actualdiscountprice,
      Discountperstage: this.percent,
      AdditionaldiscountAmount: 0,
      Totalvaue: this.itemtotalamount,
      grandtotal: this.discountvalue,
      RecieptNumber: this.invoiceid, //this.totalamount + this.discountvalue + d.getDate() + d.getTime() + d.getSeconds(),
      OrderType: this.orderMode,
      AmountPaidstatus: (this.discountvalue - this.paidamount) > 0 ? false : true,
      Orderstatus: "Done",
      PaidAmount: this.paidamount,
      PendingAmount: (this.paidamount-this.discountvalue)<0?(this.discountvalue-this.paidamount):0,//Math.fround(this.discountvalue),
      TotalTaxAmount: this.totaltax,
      TotalItemsAmount: this.totalamount,
      OrderTypeName: this.chardata[0],
      paybyId: this.paybyId,
      table_id: this.table_id,
      tablename: (this.table_name) == "" ? "Pick Up" : this.table_name,
      customer_id: (this.CustomerId)=="undefined"?this.getCustomerID(this.invoiceid):this.CustomerId,
      employee_id: this.employeeId,
     // createdAt:this.InitializeInvoice_.gettoday(),
      AssistToId: 'undefined',
     returnAmount: (this.paidamount-this.discountvalue)>0?(this.paidamount-this.discountvalue):0,
      CommentId: 'undefined',
      tokennumber:this.TokenNumber // Add a default value or set as needed
    }
    return this.invoice;
  }
  inventoryFoodCalculation() {
    //get by productid data from inventorywithproduct start
    for (var ii = 0; ii < this.RunningItems_.length; ii++) {
      console.log(this.RunningItems_);

      this.InventoryMainFoodwithProductService_.getbyid(this.RunningItems_[ii].SelectProductId, this.RunningItems_[ii].selectSubQuantityTypeID).subscribe(ifwp => {
        if (ifwp) {
          this.ifmwpdata2 = ifwp;
          this.ifmwpdata = this.ifmwpdata2.data;
          if (this.ifmwpdata != null) {
            // console.log(this.ifmwpdata.goodscollections);
            console.log(this.ifmwpdata);
            let indexidqvalue = this.RunningItems_.findIndex(qvalue => qvalue.SelectProductId === this.ifmwpdata.ProductId && qvalue.selectSubQuantityTypeID === this.ifmwpdata.SubQuantityTypeID)
            if (this.ifmwpdata.goodscollections.length > 0) {
              for (var pp = 0; pp < this.ifmwpdata.goodscollections.length; pp++) {
                let qval = this.RunningItems_[indexidqvalue].qvalue * this.ifmwpdata.goodscollections[pp].quantiyval;
                this.updatemainfood(this.ifmwpdata.goodscollections[pp].IventoryFoodMainId, qval);

              }

            }
          }

        }
      })
    }
    //end
  }
  getTax(): ITax[] {
    this.itaxarr = [];
    for (var ii = 0; ii < this.RunningItems_.length; ii++) {
      for (var dd = 0; dd < this.taxnamedata.length; dd++) {
        if (this.taxnamedata[dd].Status) {
          this.itaxarr.push({
            id: this.taxnamedata[dd]._id,
            name: this.taxnamedata[dd].name,
            percentt: this.taxnamedata[dd].perscentRate,
            amount: (((+this.RunningItems_[ii].ProductPrice * this.RunningItems_[ii].quntityvalue) * this.taxnamedata[dd].perscentRate) / 100),
            productid: this.RunningItems_[ii]._idPP,
            productname: this.RunningItems_[ii].ProductName

          });
        }
      }
    }
    return this.itaxarr;
  }
  

  discountChange() {
    const inpercentorrupees = this.myDiscountForm.value.discount;
    if (this.itemtotalamount > 500) {
      if (inpercentorrupees == '%') {
        if ((this.myDiscountForm.value.numberInput > 0) && (10 >= this.myDiscountForm.value.numberInput)) {
          this.percent = 0;
          this.actualdiscountprice = 0;
          this.discountvalue = 0;
          this.percent = this.myDiscountForm.value.numberInput.toFixed(2);
          this.discountvalue = ((+this.itemtotalamount) - (+this.itemtotalamount * this.percent / 100));
          this.actualdiscountprice = (+this.itemtotalamount) - this.discountvalue;
          this.discountvalue = this.discountvalue.toFixed(2);
        }
        else {
          // alert("");
          this.SweetAlert2_.showFancyAlertFail("Warning: % can't be negative or greater than 10%");
        }
      }
      else if (inpercentorrupees == 'Rupees') {
        this.discountvalue = Math.floor((+this.itemtotalamount) - this.myDiscountForm.value.numberInput);
        this.percent = ((this.myDiscountForm.value.numberInput * 100 / this.itemtotalamount));
        if ((this.myDiscountForm.value.numberInput > 0) && (10 >= this.percent)) {
          this.percent = 0;
          this.actualdiscountprice = 0;
          this.discountvalue = 0;
          this.discountvalue = Math.floor((+this.itemtotalamount) - this.myDiscountForm.value.numberInput);
          this.percent = ((this.myDiscountForm.value.numberInput * 100 / this.itemtotalamount)).toFixed(2);
          this.actualdiscountprice = this.myDiscountForm.value.numberInput;
        }
        else {
          this.discountvalue = 0;
          this.percent = 0;
          this.SweetAlert2_.showFancyAlertFail("Warning: Warning: % can't be negative or greater than 10%");
          // alert("");
        }
      }
    } else {
      //alert("");
      this.SweetAlert2_.showFancyAlertFail("Grand total should be greate than 500.");
    }
  }

  placeOrder() {
    this.paidamount = this.discountvalue;
    this.loadpaybyMode();
    this.showplaceorderPopup = true;
  }
  close2() {
    this.showplaceorderPopup = false;
  }
  quntityoffoodarray: any[] = [];
  item_subQuantityType_ID: any;
  onSubmit(form: any) {
    // this.loadProductPrices();
    this.loadallppdata();
    const selectedValue = form.value.option;
    // console.log(this.id_q_value);
    //console.log(this);
    console.log(this.ppalsoavailable);
    this.item_subQuantityType_ID = this.ppalsoavailable.find((item: { SubQuantityTypeName: any; }) => item.SubQuantityTypeName === selectedValue);
    const indexP = this.ppalsoavailable.findIndex((item: { SubQuantityTypeName: any; }) => item.SubQuantityTypeName === selectedValue);
    if (this.RunningItems_.length > 0) {
      // alert("if");
      const item = this.RunningItems_.find((item: {
        _idPP: any; SubQuantityTypeName: any;
      }) => item.SubQuantityTypeName === selectedValue && item._idPP === this.item_subQuantityType_ID.id);
      const index = this.RunningItems_.findIndex((item: {
        SubQuantityTypeName: any;
        _idPP: any;
      }) => item.SubQuantityTypeName === selectedValue && item._idPP === this.item_subQuantityType_ID.id);

      if (item?._idPP) {
        if (item?._idPP == this.RunningItems_[index]._idPP) {
          // //alert(+this.id_q_value[index].quntityvalue);
          this.RunningItems_[index]._idPP = item?._idPP;
          this.RunningItems_[index].quntityvalue = this.RunningItems_[index].quntityvalue;
          this.loadqunityvalue(this.RunningItems_[index]._idPP,
            "inc", this.RunningItems_[index].SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            this.RunningItems_[index].ProductPrice
          );
        }
        else {
          //  //alert("else"+item?._idPP);
          this.RunningItems_[index].quntityvalue = this.RunningItems_[index].quntityvalue;
          this.loadqunityvalue(item?._idPP,
            "inc", item?.SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            item?.ProductPrice
          );
        }


      }
      else {
        this.loadqunityvalue(this.item_subQuantityType_ID.id, "inc",
          this.item_subQuantityType_ID.SubQuantityTypeName, 0,
          this.item_subQuantityType_ID.price);

      }
    }
    else {

      this.loadqunityvalue(this.item_subQuantityType_ID.id, "inc",
        this.item_subQuantityType_ID.SubQuantityTypeName, 0,
        this.item_subQuantityType_ID.price);

    }
    this.showtype = false;
  }

  close() {
    this.showtype = false;
  }

  increment(_id: any) {
    this.showtype = false;
    this.ppalsoavailable = this.getallproducttypeprice(_id);
  }
  decrement(_id: any) {
    this.showtype = false;
    this.ppalsoavailable = this.getallproducttypeprice(_id);
  }
  increment2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any) {
    this.showtype = false;
    this.loadallppdata();
    this.loadqunityvalue(_id, "inc", SubQuantityTypeName, qvalue, price);
  }
  decrement2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any) {
    this.showtype = false;
    this.loadallppdata();
    this.loadqunityvalue(_id, "dcre",
      SubQuantityTypeName, qvalue,
      price);
  }
  item_subQuantityTypeId: any;
  addQuantity(id: any, acton: any, SubQuantityTypeName: any, quntity: any, price: any) {
    this.item_subQuantityTypeId = this.RunningItems_.find((item: {
      _idPP: any; SubQuantityTypeName: any;
    }) => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === id);
    const indexP = this.RunningItems_.findIndex((item: {
      _idPP: any; SubQuantityTypeName: any;
    }) => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === id);
    // Do something with the selected value
    if (this.item_subQuantityTypeId._idPP) {
      const item = this.RunningItems_.find((item: {
        _idPP: any; SubQuantityTypeName: any;
      }) => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === this.item_subQuantityTypeId._idPP);
      const index = this.RunningItems_.findIndex((item: {
        _idPP: any; SubQuantityTypeName: any;
      }) => item.SubQuantityTypeName === SubQuantityTypeName && item._idPP === this.item_subQuantityTypeId._idPP);
      if (item?._idPP) {

        if (item?._idPP == this.RunningItems_[index]._idPP) {
          //  //alert(item?._idPP);
          this.RunningItems_[index]._idPP = item?._idPP;
          this.RunningItems_[index].quntityvalue = this.RunningItems_[index].quntityvalue;
          this.loadqunityvalue(this.RunningItems_[index]._idPP,
            "inc", this.RunningItems_[index].SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            this.RunningItems_[index].ProductPrice
          );
        }
        else {
          this.loadqunityvalue(item?._idPP,
            "inc", item?.SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            item?.ProductPrice
          );
        }


      }
      else {
        this.loadqunityvalue(this.item_subQuantityType_ID.id, "inc",
          this.item_subQuantityType_ID.SubQuantityTypeName, 0,
          this.item_subQuantityType_ID.price);
        //  
      }
    }
    else {

      this.loadqunityvalue(this.item_subQuantityType_ID.id,
        "inc", this.item_subQuantityType_ID.SubQuantityTypeName, 0,
        this.item_subQuantityType_ID.price);
    }
    this.showtype = false;
  }

  loadTax() {
    this.taxService.get().subscribe(data => {
      if (data) {
        this.taxnamedata2 = data;
        this.taxnamedata = this.taxnamedata2.data
      }
    })
  }
  itemP: any;
  indexP: any;
  loadqunityvalue(id: any, action: any, SubQuantityTypeName: any, quntity: any, price: any) {
    this.gitems2 = [];
    let taxpercent = 0;
    this.totalamount = 0;
    if (this.allppdata.length == 0) {
      this.allppdata = this.RunningItems_;
      this.itemP = this.allppdata.find((item: { SelectProductId: any; SubQuantityTypeName: any }) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName);
      this.indexP = this.allppdata.findIndex((item: { SelectProductId: any; SubQuantityTypeName: any }) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName);
    }
    else {
      this.itemP = this.allppdata.find((item: { SelectProductId: any; SubQuantityTypeName: any }) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName);
      this.indexP = this.allppdata.findIndex((item: { SelectProductId: any; SubQuantityTypeName: any }) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName);
    }
    console.log(this.allppdata);
    console.log(this.RunningItems_);
    console.log(this.indexP);
    console.log(id);
    if (this.itemP?.SelectProductId && action == "inc") {
      let val = quntity + 1;
      if (this.RunningItems_.length > 0) {
        const itemID = this.RunningItems_.find(item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName);
        const index = this.RunningItems_.findIndex(item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName);
        console.log(itemID)
        if (itemID?._idPP == id && SubQuantityTypeName == itemID?.SubQuantityTypeName) {
          taxpercent = 0;
          let taxpercentName = "";
          let taxpercentValues = "";

          //update  this.id_q_value
          const index2 = this.RunningItems_.findIndex(item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName);

          this.RunningItems_[index2]._idPP = id;
          this.RunningItems_[index2].quntityvalue = val;
          this.RunningItems_[index2].qvalue = val;
          this.RunningItems_[index2].taxnames = taxpercentName;
          this.RunningItems_[index2].taxvalues = taxpercentValues;
          this.RunningItems_[index2].totaltaxvalue = taxpercent;

          //update  item table record

          this.gitems2 = [];
          this.gitems2.push({
            Productid: this.RunningItems_[index2].SelectProductId,
            Productname: this.RunningItems_[index2].ProductName,
            SubQuantityTypeID: this.RunningItems_[index2].selectSubQuantityTypeID,
            SubQuantityTypeName: this.RunningItems_[index2].SubQuantityTypeName,
            Invoiceid: this.invoiceid,
            Qauntityid: this.RunningItems_[index2].selectQtypeID,
            Qauntityname: this.RunningItems_[index2].QtypeName,
            Quantity: val,
            itemamount: price,
            totalquantityamount: (+price * val),
            employee_id: this.employeeId,
          });
          this.ItemsService_.update(this.gitems2).subscribe(updateitems => {
            if (updateitems) {
            }
          });
        }
        else {
          taxpercent = 0;
          let taxpercentName = "";
          let taxpercentValues = "";

          //add this.id_q_value
          this.RunningItems_.push({
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
            taxnames: taxpercentName,
            taxvalues: taxpercentValues,
            totaltaxvalue: taxpercent
          });

          //add records in items table
          this.gitems2 = [];
          this.gitems2.push({
            Productid: this.allppdata[this.indexP].SelectProductId,
            Productname: this.allppdata[this.indexP].ProductName,
            SubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
            SubQuantityTypeName: this.allppdata[this.indexP].SubQuantityTypeName,
            Invoiceid: this.invoiceid,
            Qauntityid: this.allppdata[this.indexP].selectQtypeID,
            Qauntityname: this.allppdata[this.indexP].QtypeName,
            Quantity: val,
            itemamount: price,
            totalquantityamount: (+price * val),
            employee_id: this.employeeId,
          });
          this.ItemsService_.add(this.gitems2).subscribe(updateitems => {
            if (updateitems) {
            }
          });
        }


      }
      else {

        taxpercent = 0;
        let taxpercentName = "";
        let taxpercentValues = "";

        //add this.id_q_value

        this.RunningItems_.push({
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
          taxnames: taxpercentName,
          taxvalues: taxpercentValues,
          totaltaxvalue: taxpercent
        });

        //add record in item table
        this.gitems2 = [];
        this.gitems2.push({
          Productid: this.allppdata[this.indexP].SelectProductId,
          Productname: this.allppdata[this.indexP].ProductName,
          SubQuantityTypeID: this.allppdata[this.indexP].selectSubQuantityTypeID,
          SubQuantityTypeName: SubQuantityTypeName,
          Invoiceid: this.invoiceid,
          Qauntityid: this.allppdata[this.indexP].selectQtypeID,
          Qauntityname: this.allppdata[this.indexP].QtypeName,
          Quantity: val,
          itemamount: price,
          totalquantityamount: (+price * val),
          employee_id: this.employeeId,
        });
        this.ItemsService_.add(this.gitems2).subscribe(updateitems => {
          if (updateitems) {
            // alert("added.");
          }
        });
      }
    }
    else if (this.itemP?.SelectProductId && action == "dcre") {
      //decrement update
      const item = this.RunningItems_.find(item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName);
      const index = this.RunningItems_.findIndex(item => item._idPP === id && item.SubQuantityTypeName === SubQuantityTypeName);
      console.log(item);
      if (item?._idPP) {
        let val = quntity - 1;
        this.RunningItems_[index].quntityvalue = val;
        if (item?._idPP) {
          taxpercent = 0;
          taxpercent = 0;
          let taxpercentName = "";
          let taxpercentValues = "";

          this.RunningItems_[index]._idPP = item._idPP;
          this.RunningItems_[index].quntityvalue = val;
          this.RunningItems_[index].qvalue = val;
          this.RunningItems_[index].ProductPrice = price;
          this.RunningItems_[index].taxnames = taxpercentName;
          this.RunningItems_[index].taxvalues = taxpercentValues;
          this.RunningItems_[index].totaltaxvalue = taxpercent;
          if (this.RunningItems_[index].qvalue != 0) {
            this.gitems2 = [];
            this.gitems2.push({
              Productid: item.SelectProductId,
              Productname: item.ProductName,
              SubQuantityTypeID: item.selectSubQuantityTypeID,
              SubQuantityTypeName: item.SubQuantityTypeName,
              Invoiceid: this.invoiceid,
              Qauntityid: item.selectQtypeID,
              Qauntityname: item.QtypeName,
              Quantity: val,
              itemamount: price,
              totalquantityamount: (+price * val),
              employee_id: this.employeeId,
            });
            this.ItemsService_.update(this.gitems2).subscribe(updateitems => {
              if (updateitems) {
              }
            });
          }
          else if (this.RunningItems_[index].qvalue == 0) {
            //delete
            this.ItemsService_.delete(this.invoiceid, item.SelectProductId, item.selectSubQuantityTypeID).subscribe(deleterecord => {
              if (deleterecord) {
              }
            }
            );
            this.RunningItems_.splice(index, 1);


          }

        }
      }

    }
    this.myDiscountForm = this.fb.group({
      discount: "",
      numberInput: [0], // Initialize the form control
    });
    this.percent = 0;

    this.totalamount = this.gettotamount();

    this.getitemTotalTax();
    this.getitemtotalamount();
  }

  KOT() {


  }
  getitemTotalTax() {
    this.totaltax = 0;
    this.itemTotalTax = [];
    for (var ii = 0; ii < this.taxnamedata.length; ii++) {
      if (this.taxnamedata[ii].Status) {
        this.itemTotalTax.push({ taxname: this.taxnamedata[ii].name, taxpercent: (this.totalamount * this.taxnamedata[ii].perscentRate) / 100 });
        this.totaltax += Math.abs((this.totalamount * this.taxnamedata[ii].perscentRate) / 100);
      }
    }
    this.totaltax = Math.fround(this.totaltax);
    //return this.itemTotalTax;
  }
  getitemtotalamount() {
    this.itemtotalamount = 0;
    for (var ii = 0; ii < this.itemTotalTax.length; ii++) {
      this.itemtotalamount = this.itemTotalTax[ii].taxpercent + this.itemtotalamount;

    }

    this.itemtotalamount = Math.fround(this.totalamount + this.itemtotalamount);
    this.discountvalue = Math.fround(this.itemtotalamount);
  }
  tot: any = 0;
  gettotamount() {
    this.tot = 0;
    for (var ii = 0; ii < this.RunningItems_.length; ii++) {
      this.tot += (+this.RunningItems_[ii].totaltaxvalue) + (+this.RunningItems_[ii].ProductPrice) * (+this.RunningItems_[ii].quntityvalue);
    }
    return this.tot;
  }
  loadProducts(msg: any) {
    this.store.dispatch(loadProduct());
    this.store.select(state => state.productLoad.Product_.data);
    this.store.select(state => state.productLoad.loading);
    this.store.select(state => state.productLoad.error);
  }
  loadcategory() {
    this.store.dispatch(loadCategories());
    this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.store.select(state => state.categoryLoad.loading);
    this.store.select(state => state.categoryLoad.error);
  }


  loadQtype() {
    this.store.dispatch(loadQuantityType())
    this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.store.select(state => state.quantityTypeLoad.loading);
    this.store.select(state => state.quantityTypeLoad.error);

  }
  loadSubQuantityTypeName() {
    this.store.dispatch(loadSubQuantityType());
    this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    this.store.select(state => state.subQuantityTypeLoad.loading);
    this.store.select(state => state.subQuantityTypeLoad.error);

  }

  loadProductPrices() {
    this.store.dispatch(loadProductPrice());
    this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    this.store.select(state => state.productPriceLoad.loading);
    this.store.select(state => state.productPriceLoad.error);

  }

  loadallppdata() {

    this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    this.allppdata = [];
    if (this.productPriceData$) {
      this.productPriceData$.subscribe(productPriceData => {
        if (productPriceData) {
          // this.productPriceData = data
          console.log(productPriceData);
          try {
            for (var ii = 0; ii < productPriceData.length; ii++) {
              this.allppdata.push({
                _id: productPriceData[ii]._id,
                ProductPrice: this.getproductprice(productPriceData[ii].SelectProductId),
                ProductName: this.getproductname(productPriceData[ii].SelectProductId),
                categoryName: this.getcategoryname(productPriceData[ii].selectcategoryID),
                QtypeName: this.getqtypnamename(productPriceData[ii].selectQtypeID),
                SubQuantityTypeName: this.getSubQuantityTypeName(productPriceData[ii].selectSubQuantityTypeID),
                SelectProductId: productPriceData[ii].SelectProductId,
                selectcategoryID: productPriceData[ii].selectcategoryID,
                selectQtypeID: productPriceData[ii].selectQtypeID,
                selectSubQuantityTypeID: productPriceData[ii].selectSubQuantityTypeID,
                quntityvalue: 0
              });
            }
          } catch (error) {
            console.error("Error pushing data:", error);
          }

        }
      })
    }
  }
  loadproductpricename(_id: any) {

    // if (_id != "jsk") {
    this.productsByCategoryId = [];
    this.store.select(state => state.productLoad.Product_.data);
    if (this.Productnamedata$) {
      this.Productnamedata$.subscribe(Productnamedata => {
        if (Productnamedata) {
          for (var ii = 0; ii < Productnamedata.length; ii++) {
            if (Productnamedata[ii].selectcategoryID == _id) {
              this.productsByCategoryId.push({
                _id: Productnamedata[ii]._id,
                ProductPrice: this.getproductprice(Productnamedata[ii]._id).toString(),
                ProductName: this.getproductname(Productnamedata[ii]._id),
                categoryName: this.getcategoryname(Productnamedata[ii].selectcategoryID),
                QtypeName: this.getqtypnamename(Productnamedata[ii].selectQtypeID),
                SubQuantityTypeName: this.getSubQuantityTypeName(Productnamedata[ii].selectSubQuantityTypeID),
                SelectProductId: Productnamedata[ii]._id,
                selectcategoryID: Productnamedata[ii].selectcategoryID,
                selectQtypeID: Productnamedata[ii].selectQtypeID,
                selectSubQuantityTypeID: Productnamedata[ii].selectSubQuantityTypeID,
                quntityvalue: 0,
                veg_nonveg: Productnamedata[ii].veg_nonveg
              })
            }
          }
        }
      });
    }

    this.getFilteredProductsByCategoryId();
    this.ppname = this.productpriceallname;

  }
  getSubQuantityTypeName(id: string) {
    // getting SubQuantityType name by id
    let SubQuantityTypeName = "";
    this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
    if (this.subQuantityTypeData$) {
      this.subQuantityTypeData$.subscribe(SubQuantityTypeData => {
        if (SubQuantityTypeData) {
          const itemP = SubQuantityTypeData.find((item: { _id: string; }) => item._id === id);
          const indexP = SubQuantityTypeData.findIndex((item: { _id: string; }) => item._id === id);
          if (itemP && itemP._id) {
            SubQuantityTypeName = SubQuantityTypeData[indexP].name;
          }
        }
      });
    }
    return SubQuantityTypeName;
  }
  getallproducttypeprice(id: any) {
    this.priceID = [];
    this.showtype = true;
    this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    if (this.productPriceData$) {
      this.productPriceData$.subscribe(productPriceData => {
        if (productPriceData) {
          const itemP = productPriceData.find((item: { SelectProductId: string; }) => item.SelectProductId === id);
          for (var ii = 0; ii < productPriceData.length; ii++) {
            if (productPriceData[ii].SelectProductId == id) {
              this.priceID.push({ "_id": productPriceData[ii]._id, "SubQuantityTypeID": productPriceData[ii].selectSubQuantityTypeID });
            }
          }
        }
      });
    }
    this.typeprice = [];
    const itemtypePrice = this.typeprice.find((item: { id: string; }) => item.id === id);
    for (var ii = 0; ii < this.priceID.length; ii++) {
      this.valid = 0;
      this.productPriceId = "0";

      if (itemtypePrice?.id) {
        this.typeprice[ii].id = id;
        this.typeprice[ii].SubQuantityTypeName = this.getSubQuantityTypeName(this.priceID[ii].SubQuantityTypeID);
        this.typeprice[ii].price = this.getproductprice2(this.priceID[ii]._id);
      }
      else {
        this.typeprice.push({ "id": id, "productPriceId": this.priceID[ii]._id, "SubQuantityTypeID": this.priceID[ii].SubQuantityTypeID, "SubQuantityTypeName": this.getSubQuantityTypeName(this.priceID[ii].SubQuantityTypeID), "price": this.getproductprice2(this.priceID[ii]._id) });
      }
    }
    return this.typeprice;
  }


  getproductprice2(_id: string) {

    // getting product price by id
    let productPrice = 0;
    this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    if (this.productPriceData$) {
      this.productPriceData$.subscribe(productPriceData => {
        if (productPriceData) {
          const itemP = productPriceData.find((item: { _id: string; }) => item._id === _id);
          const indexP = productPriceData.findIndex((item: { _id: string; }) => item._id === _id);
          if (itemP._id) {
            productPrice = productPriceData[indexP].ProductPrice;
          }
        }
      });
    }
    return productPrice;
  }
  getproductprice(id: string) {
    // getting product price by id
    let productPrice = 0;
    this.store.select(state => state.productPriceLoad.ProductPrice_.data);
    if (this.productPriceData$) {
      this.productPriceData$.subscribe(productPriceData => {
        if (productPriceData) {
          const itemP = productPriceData.find((item: { SelectProductId: string; }) => item.SelectProductId === id);
          const indexP = productPriceData.findIndex((item: { SelectProductId: string; }) => item.SelectProductId === id);

          if (itemP && itemP.SelectProductId) {
            productPrice = productPriceData[indexP].ProductPrice;
          }
        }
      });
    }
    return productPrice;
  }

  getproductname(_id: string) {
    // getting product name by id
    let productname = "";
    this.store.select(state => state.productLoad.Product_.data);
    if (this.Productnamedata$) {
      this.Productnamedata$.subscribe(Productnamedata => {
        if (Productnamedata) {
          // this.Productnamedata = data;
          const itemP = Productnamedata.find((item: { _id: string; }) => item._id === _id);
          const indexP = Productnamedata.findIndex((item: { _id: string; }) => item._id === _id);

          if (itemP && itemP._id) {
            productname = Productnamedata[indexP].Productname;
          }
        }
      });
    }
    return productname;
  }
  getqtypnamename(id: string) {
    // getting quantityType name by id
    this.store.select(state => state.quantityTypeLoad.QuantityType_.data);
    let qtypename = "";
    if (this.Qtypenamedata$) {
      this.Qtypenamedata$.subscribe(Qtypenamedata => {
        if (Qtypenamedata) {
          //this.Qtypenamedata = data;

          // finding item by id
          const itemP = Qtypenamedata.find((item: { _id: string; }) => item._id === id);
          const indexP = Qtypenamedata.findIndex((item: { _id: string; }) => item._id === id);

          if (itemP._id) {
            qtypename = Qtypenamedata[indexP].name;

          }
        }
      })
    }
    return qtypename;

  }
  getcategoryname(id: string) {
    // getting Category Name by id

    this.store.select(state => state.categoryLoad.ProductCategory_.data);
    let categoryname = "";
    this.categorynamedata$?.subscribe(categorynamedata => {
      if (categorynamedata) {
        const itemP = categorynamedata.find((item: { _id: string; }) => item._id === id);
        const indexP = categorynamedata.findIndex((item: { _id: string; }) => item._id === id);
        if (itemP && itemP._id) {
          categoryname = categorynamedata[indexP].name;
        }
      }
    });
    return categoryname;
  }
  replaceFilteredData: any;
  getFilteredProductsByCategoryId() {
    if (this.replaceFilteredData) {
      if (this.productsByCategoryId.length > 0) {
        if (this.replaceFilteredData[0]) {
          if (this.productsByCategoryId[0].categoryName != this.replaceFilteredData[0].categoryName) {
            this.replaceFilteredData = [];
            this.replaceFilteredData = this.productsByCategoryId;
            this.productsByCategoryId = this.processFoodFiltering();
          }
          else {
            this.productsByCategoryId = this.replaceFilteredData;
            this.productsByCategoryId = this.processFoodFiltering();
          }
        }
        else {
          this.replaceFilteredData = [];
          this.replaceFilteredData = this.productsByCategoryId;
          this.productsByCategoryId = this.processFoodFiltering();
        }
      }
      else {
        this.productsByCategoryId = this.replaceFilteredData;
        this.productsByCategoryId = this.processFoodFiltering();
      }

    } else {
      this.replaceFilteredData = this.productsByCategoryId;
      this.productsByCategoryId = this.processFoodFiltering();
    }


  }

  processFoodFiltering() {
    return this.productsByCategoryId.filter((items) => {
      return Object.values(items).some(val =>
        String(val).toLowerCase().includes(this.selectedType.toLowerCase())
      );
    });
  }

  showCustomersPopUp() {
    this.showCustomerPopUp = true;
  }
  closePopUpByChild(close: any) {
    this.showCustomerPopUp = close;
    this.showCommentPopUp = close;
  }
  showCommentsPopUp() {
    this.showCommentPopUp = true;
  }
  initializeCustomer(CustomerDetail: any) {
    this.CustomerId = CustomerDetail._id
    const invoice = this.genrateInvoice();
    this.updateInvoice(invoice);
    this.getCustomerName(this.CustomerId);
    // console.log(CustomerDetail);
    // this.CustomerName = CustomerDetail.Name;
  }
getCustomerID(invoiceid:string)
{
this.InvoiceService_.getbyid(invoiceid).subscribe(getCustomerid=>{
  if(getCustomerid)
  {
     this.innvoicedata2 = getCustomerid;
     this.innvoicedata = this.innvoicedata2.data;
     this.CustomerId = this.innvoicedata.customer_id;
     alert(this.CustomerId );

  }
});
}
  getCustomerName(customer_id: string) {

    this.CustomerService_.getbyid(customer_id).subscribe(CustomerName => {
      this.getCustomerdata = CustomerName;
      this.getCustomer = this.getCustomerdata.data;
      this.CustomerName = this.getCustomer[0].Name
      console.log(this.getCustomer);
    })
  }
  initializeComment(Cowemment: any) {

  }
  CancelOrder() {
    //   const table = TablesComponent;
    // table.cancel(this.invoiceid);
    //alert();
    this.cancelOrder.emit(this.invoiceid);
    // this.Table.cancel(this.invoiceid);
     this.ClearSomeVariable();
  }
}
