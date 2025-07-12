import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { InvoiceService } from '../../core/Services/invoice.service';
import { DatePipe } from "@angular/common";
import {  Observable } from 'rxjs';
import { GenratedItems, IChair, IDine, InventoryFoodMain2, Invoice, ITax, ProductCategory, ProductPrice, ProductPriceDetails, Products, Quantitytype, subQuantityType, } from "../Model/crud.model";
import { environment } from "../Services/indexService";
import { Router } from '@angular/router';
import { DineService } from '../Services/dine.service';
import { ItemsService } from '../Services/items.service';
import { ChairService } from '../Services/chair.service';
import { ChairServiceService } from '../Services/chairsrunningorders.serivce';
import { InventoryMainFoodwithProductService } from '../Services/inventoryFoodWithProduct.service';
import { InventoryMainFoodService } from '../Services/inventoryMainFood.service';
import { PaybyService } from '../Services/paybymanage.service';
import { RunningItems } from '../../model/category.model';
import { TaxService } from '../Services/tax.service';

@Injectable({
  providedIn: 'root',
  
})
export class TakeOdersService {
    //Api Urls
    private categoryTypeurl: string = environment.api+'categoryType';//"category";
    private productPriceUrl: string = environment.api + "productPrice";
      private quantityTypeUrl: string = environment.api+'quantityType';
  private subQuanityTypeUrl: string = environment.api+"subQuantityType";
 private productUrl: string = environment.api+"product";
  
    //end Api Urls
    returnLoadQuantityvalue:any;
  subQuantityTypeData: any;
  categorynamedata: any;
  subQuantityTypeName: any;
  subQuantityTypeByIdData: any;
  Qtypenamedata: any;
  Productnamedata: any;
  productPriceData:any;
  getitemsdatalength_forupdate: any;
  invoiceid="";
  taxname: string = "";
  paidamount: any = 0;
  chardata: any = [];
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
  //quntityvalue: Observable<any>;
  RunningItems_: RunningItems[] = [];
  productpriceallname: ProductPriceDetails[];
  productpriceallname2: ProductPriceDetails[];
  showtype = false;
  //  productpriceallnames: Observable<ProductPriceDetails[]>;
  getforinvoiceiddata: any;
  getforinvoiceiddata2: any;
  Itemsdata: any;
  Itemsdata2: any;
  statusall: any;

  subQuantityTypewithPrice: any;
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
  invoice: Invoice = {
    Taxes: this.itaxarr,
    Chairs: this.ichar,
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: "",
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    RecieptNumber: 0,
    grandtotal: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: "New Order",
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    createdAt: this.gettoday(),
    OrderTypeName: "",
    paybyId: 'undefined',
    table_id: 'undefined',
    tablename: 'undefined',
    customer_id: 'undefined',
    employee_id: this.employeeId,
  }
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
 // @ViewChildren('dynamicInput') divs!: QueryList<ElementRef>;
  inputValue: any;
  showplaceorderPopup = false;
  productPriceId = "0";
  typeprice: any[] = []; valid: any = 0;
  priceID: any[] = [];
    fb: any;
    valueChanged: any;


  constructor( private router: Router, private taxService: TaxService, private InvoiceService_: InvoiceService, private ItemsService_: ItemsService, private dineservice: DineService, private chairservice: ChairService, private chairsrunningorderservice: ChairServiceService, private InventoryMainFoodwithProductService_: InventoryMainFoodwithProductService, private InventoryMainFoodService_: InventoryMainFoodService, private PaybyService_: PaybyService, private datePipe: DatePipe,private http: HttpClient ) {
    // this.refresh();
    // this.loadfood("DinningTable", this.ch_invoice_id);

    this.display = "display:none;"
    this.itemtotalamount = 0;
    this.totaltax = 0;
    this.productpriceallname = [];
    this.productpriceallname2 = [];
    // this.loadfood("jsk","GuestTable");
    this.showtype = false;
    // this.productpriceallnames = this.store.select(getquanityvalue);
this.refresh();
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
    this.InvoiceService_.getbyid(this.invoiceid).subscribe(data => {
      this.innvoicedata2 = data;
      this.innvoicedata = this.innvoicedata2.allTasks;
      this.table_id = this.innvoicedata[0].table_id;
      this.table_name = this.innvoicedata[0].tablename;
      if (this.table_name != "") {
        this.ordermode = this.table_name;
      }
      else {
        this.ordermode = "Pick Up";
      }
    }
    );
  }
  ordermode = "";
  loadfood(msg: string, moddata: string) {
    this.ordermode = "";
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
        this.ItemsService_.getbyid(this.invoiceid).subscribe(data2 => {
          if (data2) {
            this.Itemsdata2 = "";
            this.Itemsdata = "";
            this.Itemsdata2 = data2;
            this.Itemsdata = this.Itemsdata2.allTasks;
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
                  this.getpercentvaldata = this.getpercentvaldata2.allTasks
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
    //    this.IChairdata=this.IChairdata2.allTasks
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
        this.paybydata = this.paybydata2.allTasks;
        console.log(this.paybydata);
      }
    })
  }

  getproductbycategory(_id: any){
    // alert(this.ordermode);
    if (this.ordermode != "") {
      this.loadproductpricename(_id);
    }
    else {
      alert("Please Select Table First.");
    }

  }

  updatemainfood(IventoryFoodMainId: any, qvalue: any) {
    this.InventoryMainFoodService_.getbyid(IventoryFoodMainId).subscribe(imfs => {
      if (imfs) {
        this.imfsdata2 = "";
        this.imfsdata = "";
        this.imfsdata2 = imfs;
        this.imfsdata = this.imfsdata2.allTasks;

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
            this.updatefmsdata = this.updatefmsdata2.allTasks;
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
        this.gettableid = this.gettableid2.allTasks;
        console.log("data : ");
        console.log(this.gettableid);
        alert(this.gettableid[0].Chairsrunningorder[0].table_id);
        this.dineservice.getbyid(this.gettableid[0].Chairsrunningorder[0].table_id).subscribe(tabldata => {
          if (tabldata) {
            this.tabledata2 = tabldata;
            this.tabledata = this.tabledata2.allTasks;
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
                alert("updated");

              }
            })
           
          }
        })
      }
    })
     this.chairsrunningorderservice.delete(this.invoiceid).subscribe(data2 => {
              if (data2) {
                alert("deleted");
                // do empty invoiceid for running order
                this.invoiceid = "";
                this.valueChanged.emit("");
              }

            })
  }
  genrateOrder() {
    if (this.paybyId != "none" && this.paidamount >= 0) {
      const d = new Date();
      this.getinvoiceid2 = "";
      this.getinvoiceid = "";
      this.inventoryFoodCalculation();
      this.gitems = [];
      this.gitems2 = [];

      const invoice = this.genrateInvoice();
      this.InvoiceService_.update(invoice).subscribe(invoiceupdate => {
        if (invoiceupdate) {
          // alert("in invoice update");
          this.getinvoiceid2 = invoiceupdate;
          this.getinvoiceid = this.getinvoiceid2.createdTask;
          alert("done.");
          this.removerunningOrder();
          this.RunningItems_ = [];
          this.close2();

        }
      })
    }
    else {
      alert("Please Select pay Mode and Enter Paid Amount greater than 0.");
    }
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
      RecieptNumber: +this.invoiceid, //this.totalamount + this.discountvalue + d.getDate() + d.getTime() + d.getSeconds(),
      OrderType: this.orderMode,
      AmountPaidstatus: (this.discountvalue - this.paidamount) > 0 ? false : true,
      Orderstatus: "Done",
      PaidAmount: this.paidamount,
      PendingAmount: (this.discountvalue - this.paidamount),//Math.fround(this.discountvalue),
      TotalTaxAmount: this.totaltax,
      TotalItemsAmount: this.totalamount,
      OrderTypeName: this.chardata[0],
      paybyId: this.paybyId,
      table_id: this.table_id,
      tablename: (this.table_name)==""?"Delevery":this.table_name,
      customer_id: 'undefined',
      employee_id: this.employeeId,
      createdAt: this.gettoday()
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
          this.ifmwpdata = this.ifmwpdata2.allTasks;
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
  gettoday(): Date {

   const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()); // Subtract one day
    console.log(yesterday.toISOString().split('T')[0]);
    this.date = yesterday.toISOString().split('T')[0];
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    const formattedyesterday = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    
    const  createdAt = formattedyesterday + "T" + today.getHours().toString() + ":" + today.getMinutes().toString() + ":" + today.getSeconds().toString()+"Z"
   
    return new Date(createdAt);
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
          alert("Warning: % can't be negative or greater than 10%");
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
          alert("Warning: Warning: % can't be negative or greater than 10%");
        }
      }
    } else {
      alert("Grand total should be greate than 500.");
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
  onSubmit(subQuantityTypewithPrice: any,formoptionvalue:any) {
    // this.loadProductPrices();
    this.loadAllProductPriceData();
    const selectedValue = formoptionvalue;
    // console.log(this.id_q_value);
    //console.log(this);
    console.log(subQuantityTypewithPrice);
    this.item_subQuantityType_ID = subQuantityTypewithPrice.find((item: { SubQuantityTypeName: any; }) => item.SubQuantityTypeName === selectedValue);
    const indexP = subQuantityTypewithPrice.findIndex((item: { SubQuantityTypeName: any; }) => item.SubQuantityTypeName === selectedValue);
    if (this.RunningItems_.length > 0) {
      alert("if");
      const item = this.RunningItems_.find((item: {
        _idPP: any; SubQuantityTypeName: any;
      }) => item.SubQuantityTypeName === selectedValue && item._idPP === this.item_subQuantityType_ID.id);
      const index = this.RunningItems_.findIndex((item: {
        SubQuantityTypeName: any;
        _idPP: any;
      }) => item.SubQuantityTypeName === selectedValue && item._idPP === this.item_subQuantityType_ID.id);

      if (item?._idPP) {
        if (item?._idPP == this.RunningItems_[index]._idPP) {
          alert(+this.RunningItems_[index].quntityvalue);
          this.RunningItems_[index]._idPP = item?._idPP;
          this.RunningItems_[index].quntityvalue = this.RunningItems_[index].quntityvalue;
       return this.returnLoadQuantityvalue=this.loadQuantityvalue(this.RunningItems_[index]._idPP,
            "inc", this.RunningItems_[index].SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            this.RunningItems_[index].ProductPrice
          );
        }
        else {
          alert("else"+item?._idPP);
          this.RunningItems_[index].quntityvalue = this.RunningItems_[index].quntityvalue;
         return this.returnLoadQuantityvalue=this.loadQuantityvalue(item?._idPP,
            "inc", item?.SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            item?.ProductPrice
          );
        }


      }
      else {
       return this.returnLoadQuantityvalue=this.loadQuantityvalue(this.item_subQuantityType_ID.id, "inc",
          this.item_subQuantityType_ID.SubQuantityTypeName, 0,
          this.item_subQuantityType_ID.price);

      }
    }
    else {

    return  this.returnLoadQuantityvalue=this.loadQuantityvalue(this.item_subQuantityType_ID.id, "inc",
        this.item_subQuantityType_ID.SubQuantityTypeName, 0,
        this.item_subQuantityType_ID.price);

    }
    //this.showtype = false;
  }

  close() {
    this.showtype = false;
  }

  increment(_id: any) {
    this.refresh();
    this.showtype = false;
   return this.subQuantityTypewithPrice = this.getallproducttypeprice(_id);
  }
  decrement(_id: any) {
    this.showtype = false;
   return this.subQuantityTypewithPrice = this.getallproducttypeprice(_id);
  }
  increment2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any) {
    this.showtype = false;
    this.loadAllProductPriceData();
    //ppalsoavailable = this.getallproducttypeprice(_id);
   return this.returnLoadQuantityvalue=this.loadQuantityvalue(_id, "inc", SubQuantityTypeName, qvalue, price);
  }
  decrement2(_id: any, SubQuantityTypeName: any, qvalue: any, price: any) {
    this.showtype = false;
    this.loadAllProductPriceData();
    // ppalsoavailable = this.getallproducttypeprice(_id);
   return this.returnLoadQuantityvalue=this.loadQuantityvalue(_id, "dcre",
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
        return this.returnLoadQuantityvalue=this.loadQuantityvalue(this.RunningItems_[index]._idPP,
            "inc", this.RunningItems_[index].SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            this.RunningItems_[index].ProductPrice
          );
        }
        else {
         return this.returnLoadQuantityvalue=this.loadQuantityvalue(item?._idPP,
            "inc", item?.SubQuantityTypeName,
            +this.RunningItems_[index].quntityvalue,
            item?.ProductPrice
          );
        }


      }
      else {
       return this.returnLoadQuantityvalue=this.loadQuantityvalue(this.item_subQuantityType_ID.id, "inc",
          this.item_subQuantityType_ID.SubQuantityTypeName, 0,
          this.item_subQuantityType_ID.price);
        //  
      }
    }
    else {

     return this.returnLoadQuantityvalue=this.loadQuantityvalue(this.item_subQuantityType_ID.id,
        "inc", this.item_subQuantityType_ID.SubQuantityTypeName, 0,
        this.item_subQuantityType_ID.price);
    }
    this.showtype = false;
  }

  loadTax() {
    this.taxService.get().subscribe(data => {
      if (data) {
        this.taxnamedata2 = data;
        this.taxnamedata = this.taxnamedata2.allTasks
      }
    })
  }
  itemP: any;
  indexP: any;
  loadQuantityvalue(id: any, action: any, SubQuantityTypeName: any, quntity: any, price: any) {
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
          //  this.itemtotalamount = this.id_q_value[index].totaltaxvalue ;

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
   
   
    return this.RunningItems_;
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
    this.totaltax = Math.floor(this.totaltax);
    //return this.itemTotalTax;
  }
  getitemtotalamount() {
    this.itemtotalamount = 0;
    for (var ii = 0; ii < this.itemTotalTax.length; ii++) {
      this.itemtotalamount = this.itemTotalTax[ii].taxpercent + this.itemtotalamount;

    }

    this.itemtotalamount = Math.floor(this.totalamount + this.itemtotalamount);
    this.discountvalue = Math.floor(this.itemtotalamount);
  }
  tot: any = 0;
  gettotamount() {
    this.tot = 0;
    for (var ii = 0; ii < this.RunningItems_.length; ii++) {
      this.tot += (+this.RunningItems_[ii].totaltaxvalue) + (+this.RunningItems_[ii].ProductPrice) * (+this.RunningItems_[ii].quntityvalue);
    }
    return this.tot;
  }



productdata:any;
  loadProducts(msg: any) {
    this.getProducts().subscribe(data => {
        this.productdata = data;
    this.Productnamedata = this.productdata.allTasks;
    console.log(this.Productnamedata);
    });
    
  }
  getProducts(){
    return this.http.get(this.productUrl);
  }
     categorydata:any; 
  loadcategory() {
    this.getAllCategories().subscribe(data => {
        if (data) {
            this.categorydata = data;
this.categorynamedata = this.categorydata.allTasks;
console.log(this.categorynamedata);
        }
        });

  }
 
 getAllCategories() {
    return this.http.get(this.categoryTypeurl); // Replace with your API
  }
qtypedata:any;
  loadQtype() {
    this.getAllQuantityTypes().subscribe(data => {
         this.qtypedata = data;
    this.Qtypenamedata = this.qtypedata.allTasks;
    });
   
    
  }
    getAllQuantityTypes() {
    return this.http.get(this.quantityTypeUrl);
  }
  subtypedata:any;
  loadSubQuantityTypeName() {
    this.getAllSubQuantityTypes().subscribe(data => {
         this.subtypedata = data;
 this.subQuantityTypeName = this.subtypedata.allTasks;  
    });
    

  }
 getAllSubQuantityTypes() {
    return this.http.get(this.subQuanityTypeUrl);
  }
  productpricedata2:any;
  loadProductPrices() {
    this.getProductPrice().subscribe(data => {
         this.productpricedata2 = data;
   this.productPriceData = this.productpricedata2.allTasks;
    });
   
  }
 getProductPrice() {
    return this.http.get(this.productPriceUrl);
  }
  loadAllProductPriceData() {

    //this.store.select(state => state.productPriceLoad.ProductPrice_.allTasks);
    this.allppdata = [];
    if (this.productPriceData) {
      try {
        if (typeof this.productPriceData.subscribe === 'function') {
          this.productPriceData.subscribe((productPriceArray: any[]) => {
            for (var ii = 0; ii < productPriceArray.length; ii++) {
              this.allppdata.push({
                _id: productPriceArray[ii]._id,
                ProductPrice: this.getproductprice(productPriceArray[ii].SelectProductId),
                ProductName: this.getproductname(productPriceArray[ii].SelectProductId),
                categoryName: this.getcategoryname(productPriceArray[ii].selectcategoryID),
                QtypeName: this.getqtypnamename(productPriceArray[ii].selectQtypeID),
                SubQuantityTypeName: this.getSubQuantityTypeName(productPriceArray[ii].selectSubQuantityTypeID),
                SelectProductId: productPriceArray[ii].SelectProductId,
                selectcategoryID: productPriceArray[ii].selectcategoryID,
                selectQtypeID: productPriceArray[ii].selectQtypeID,
                selectSubQuantityTypeID: productPriceArray[ii].selectSubQuantityTypeID,
                quntityvalue: 0
              });
            }
          });
        }
      } catch (error) {
        console.error("Error pushing data:", error);
      }
    }
}
  loadproductpricename(_id: any) {
   
  // this.ppname=[];
    //ppalsoavailable = [];
   
    if (_id != "jsk") {
      console.log(this.Productnamedata);
      //this.store.select(state => state.productLoad.Product_.allTasks);
      if (this.Productnamedata) {
        
             this.productpriceallname2 = [];
            // this.Productnamedata = data;
            // /alert("Loading product price for " + data.length + " products.");
            for (var ii = 0; ii < this.Productnamedata.length; ii++) {
              if (this.Productnamedata[ii].selectcategoryID == _id) {
                this.productpriceallname2.push({
                  _id: this.Productnamedata[ii]._id,
                  veg_nonveg:this.Productnamedata[ii].veg_nonveg,
                  ProductPrice: this.getproductprice(this.Productnamedata[ii]._id).toString(),
                  ProductName: this.getproductname(this.Productnamedata[ii]._id),
                  categoryName: this.getcategoryname(this.Productnamedata[ii].selectcategoryID),
                  QtypeName: this.getqtypnamename(this.Productnamedata[ii].selectQtypeID),
                  SubQuantityTypeName: this.getSubQuantityTypeName(this.Productnamedata[ii].selectSubQuantityTypeID),
                  SelectProductId: this.Productnamedata[ii]._id,
                  selectcategoryID: this.Productnamedata[ii].selectcategoryID,
                  selectQtypeID: this.Productnamedata[ii].selectQtypeID,
                  selectSubQuantityTypeID: this.Productnamedata[ii].selectSubQuantityTypeID,
                  quntityvalue: 0
                })
              }
            }
            this.ppname = this.productpriceallname2;
            console.log(this.ppname);
           // console.log(this.productpriceallname2);
        
      }
    }
    else if (_id == "jsk") {
      this.productpriceallname = [];
     // this.store.select(state => state.productLoad.Product_.allTasks);
      if (this.Productnamedata) {
       
            // this.Productnamedata = data;
            for (var ii = 0; ii < this.Productnamedata.length; ii++) {
              this.productpriceallname.push({
                _id: this.Productnamedata[ii]._id,
                veg_nonveg:this.Productnamedata[ii].veg_nonveg,
                ProductPrice: this.getproductprice(this.Productnamedata[ii]._id).toString(),
                ProductName: this.getproductname(this.Productnamedata[ii]._id),
                categoryName: this.getcategoryname(this.Productnamedata[ii].selectcategoryID),
                QtypeName: this.getqtypnamename(this.Productnamedata[ii].selectQtypeID),
                SubQuantityTypeName: this.getSubQuantityTypeName(this.Productnamedata[ii].selectSubQuantityTypeID),
                SelectProductId: this.Productnamedata[ii]._id,
                selectcategoryID: this.Productnamedata[ii].selectcategoryID,
                selectQtypeID: this.Productnamedata[ii].selectQtypeID,
                selectSubQuantityTypeID: this.Productnamedata[ii].selectSubQuantityTypeID,
                quntityvalue: 0
              })
            }
            
            this.ppname = this.productpriceallname;
            console.log(this.ppname);
           // console.log(this.productpriceallname);
          
      }


    }
  console.log(this.productpriceallname);
  console.log(this.ppname);
   return this.ppname ;//= this.productpriceallname;

  }
 
  getallproducttypeprice(id: any) {
   // this.refresh();
    this.priceID = [];
    this.showtype = true;
    //this.store.select(state => state.productPriceLoad.ProductPrice_.allTasks);
    console.log(this.productPriceData);
    if (this.productPriceData) {
      
          const itemP = this.productPriceData.find((item: { SelectProductId: string; }) => item.SelectProductId === id);
          // const indexP = this.productPriceData.findIndex((item: { SelectProductId: string; }) => item.SelectProductId === id);
          for (var ii = 0; ii < this.productPriceData.length; ii++) {
            if (this.productPriceData[ii].SelectProductId == id) {
              this.priceID.push({ "_id": this.productPriceData[ii]._id, "SubQuantityTypeID": this.productPriceData[ii].selectSubQuantityTypeID });
            }
          }
       
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
console.log(this.typeprice);
    return this.typeprice;
  }



  getproductprice2(_id: string) {

    // getting product price by id
    let productPrice = 0;
    //this.store.select(state => state.productPriceLoad.ProductPrice_.allTasks);
    if (this.productPriceData) {
      //  this.productPriceData = data;

      const itemP = this.productPriceData.find((item: { _id: string; }) => item._id === _id);
      const indexP = this.productPriceData.findIndex((item: { _id: string; }) => item._id === _id);

      if (itemP && itemP._id) {
        //console
        productPrice = this.productPriceData[indexP].ProductPrice;

      }
    }
    return productPrice;
  }

    
  

  getproductprice(id: string) {
    // getting product price by id
    let productPrice = 0;
   // this.store.select(state => state.productPriceLoad.ProductPrice_.allTasks);
    if (this.productPriceData) {
          const itemP = this.productPriceData.find((item: { SelectProductId: string; }) => item.SelectProductId === id);
          const indexP = this.productPriceData.findIndex((item: { SelectProductId: string; }) => item.SelectProductId === id);

          if (itemP && itemP.SelectProductId) {
            productPrice = this.productPriceData[indexP].ProductPrice;
          }
        }
    return productPrice;
  }

  getproductname(_id: string) {
    // getting product name by id
    let productname = "";
    //this.store.select(state => state.productLoad.Product_.allTasks);
    if (this.Productnamedata) {
      
          // this.Productnamedata = data;
          const itemP = this.Productnamedata.find((item: { _id: string; }) => item._id === _id);
          const indexP = this.Productnamedata.findIndex((item: { _id: string; }) => item._id === _id);

          if (itemP && itemP._id) {
            productname = this.Productnamedata[indexP].Productname;
          }
        }
    
    
    return productname;
  }
  getqtypnamename(id: string) {
    // getting quantityType name by id

   // this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    let qtypename = "";
    if (this.Qtypenamedata) {
      
          // finding item by id
          const itemP = this.Qtypenamedata.find((item: { _id: string; }) => item._id === id);
          const indexP = this.Qtypenamedata.findIndex((item: { _id: string; }) => item._id === id);

          if (itemP._id) {
            qtypename = this.Qtypenamedata[indexP].name;

          }
      
    }
    return qtypename;

  }
   getSubQuantityTypeName(id: string) {
    // getting SubQuantityType name by id
    let SubQuantityTypeName = "";
   // this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.allTasks);
    if (this.subQuantityTypeName) {
          // this.SubQuantityTypeData = data;

          const itemP = this.subQuantityTypeName.find((item: { _id: string; }) => item._id === id);
          const indexP = this.subQuantityTypeName.findIndex((item: { _id: string; }) => item._id === id);

          if (itemP && itemP._id) {
            //console.log(SubQuantityTypeData[indexP].name);

            SubQuantityTypeName = this.subQuantityTypeName[indexP].name;
          }
        }
      
    
    return SubQuantityTypeName;
  }
  getcategoryname(id: string) {
    // getting Category Name by id

    //this.store.select(state => state.categoryLoad.ProductCategory_.allTasks);
    let categoryname = "";
      if (this.categorynamedata) {
        // this.categorynamedata = data;
        const itemP = this.categorynamedata.find((item: { _id: string; }) => item._id === id);
        const indexP = this.categorynamedata.findIndex((item: { _id: string; }) => item._id === id);

        if (itemP && itemP._id) {
          categoryname = this.categorynamedata[indexP].name;

        }
      }
    
    return categoryname;
  }


}

