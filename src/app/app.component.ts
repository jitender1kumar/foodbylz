import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesComponent } from './dine/tables/tables.component';
import { ManageService } from './core/Services/manage.service';
import { InvoiceService } from './core/Services/invoice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  @ViewChild(TablesComponent) table!: TablesComponent;

  showmanagebar = 'companylogin';
  invoiceid = '';
  TokenNumber = 0;
  pickup = '';
  subQuantityTtype$: any;
  quantityType$: any;
  category$: any;
  product$: any;
  tax: any;
  productPrice$: any;
  payBy: any;
  addOnProduct$: any;
  floor$: any;
  invoicedata$: any;
  CancelOrder = '';
  splitToken: any;
  title = 'foodbilling';
  runningItems$:any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manageService: ManageService,
    private invoiceService: InvoiceService
  ) {
   

  }

  ngOnInit(): void {}

  updateValue(newValue: any): void {
    this.invoiceid = newValue;
  }

  gohomeinvoiceid($event: string): void {
    this.handleTokenSplit($event);
  //  this.getInvoiceDataForHome(this.invoiceid);
    this.initializeManageforHome();
    this.router.navigate(['/Home']);
    this.showmanagebar = 'home';
  }

  private handleTokenSplit(tokenString: string): void {
    // Defensive in case tokenString doesn't have the separator
    this.splitToken = tokenString.split('jsk');
    // If 'jsk' is not found, splitToken[1] could be undefined or empty string
    if (this.splitToken.length > 1 && this.splitToken[1]) {
      this.TokenNumber = +this.splitToken[1] || 0;
    } else {
      this.TokenNumber = 0;
    }
    this.invoiceid = this.splitToken[0] || '';
    console.log(this.invoiceid);
    // if (!this.invoiceid) {
    //   this.invoicedata = null;
    //   return;
    // }

    // this.invoiceService.getbyid(this.invoiceid).subscribe(data => {
    //   if (data ) {
         this.manageService.getInvoiceDataById(this.invoiceid);
         this.invoicedata$ = this.manageService.invoiceData$;
         this.invoicedata$.subscribe((data: any) =>
         {
          console.log(data);
         }
         );
        // console.log(this.invoicedata$);
    //   }
    // });
  }

  getInvoiceDataForHome(invoiceId: string): void {
    // if (!invoiceId) {
    //   this.invoicedata = null;
    //   return;
    // }
    // this.invoiceService.getbyid(invoiceId).subscribe(data => {
    //   if (data && typeof data === 'object' && 'data' in data) {
    //     this.invoicedata = (data as any).data;
    //   } 
    // });
  }

  initializeManageforHome(): void {
    // Initialize as undefined so async pipe does not apply to plain arrays in template
   
    this.manageService.initObservables();
    // this.payBy$ = this.manageService.loadpaybyMode();
    // this.productPrice$ = this.manageService.loadProductPrices();
    // this.addOnProduct$ = this.manageService.load_AddOnProductsdata();
    // this.quantityType$ = this.manageService.loadQtype();
    //  this.payBy = this.manageService.loadpaybyMode();
    //  console.log(this.payBy);
    this.manageService.loadpaybyMode();
    // console.log(this.manageService.payByData$?.value);
    this.manageService.payByData$?.subscribe(payByData=>{
      console.log(payByData);
     // console.log(payByData.data);
      this.payBy = payByData;
    });
    
    this.addOnProduct$ = this.manageService.addOnProductsData$;
    this.productPrice$ = this.manageService.productPriceData$;
    this.product$ = this.manageService.Productnamedata$;
    //console.log();
    // this.productPrice$.subscribe((data: any)=>{
    //   console.log(data);
    // });
   this.category$ = this.manageService.categorynamedata$;
    this.quantityType$ = this.manageService.Qtypenamedata$;
    this.subQuantityTtype$ = this.manageService.subQuantityTypeData$;
    this.tax=this.manageService.loadTax();
  }

  initializeDataForHome($event: string): void {
    this.handleTokenSplit($event);
    this.initializeManageforHome();
   // alert("home");
    this.router.navigate(['/Home']);
    this.showmanagebar = 'home';
  }

  receiveNotification(event: string): void {
    this.showmanagebar = event;
    if(this.showmanagebar==='tables')
    {
      this.manageService.loadRunningKOT();
      this.runningItems$=this.manageService.runningItems$;
      this.runningItems$?.subscribe((data: any)=>
        {
          console.log(data);
        }
        );
    }
  }

  pickUpOrders(event: string): void {
    this.showmanagebar = 'tables';
    this.pickup = event;
  }

  cancelOrder(event: any): void {
    this.CancelOrder = event;
   
    console.log(this.CancelOrder);
    this.router.navigate(['/tables']);
    this.showmanagebar = 'tables';
  }

  clearCancelOrders(event: string): void {
    this.CancelOrder = event;
  }

  clearPickupOrders(event: string): void {
    this.pickup = event;
  }
}
