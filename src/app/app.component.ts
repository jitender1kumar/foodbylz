import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesComponent } from './dine/tables/tables.component';
import { ManageService } from './core/Services/manage.service';
import { InvoiceService } from './core/Services/invoice.service';
import { FloorService } from './core/Services/floor.service';
import { DineService } from './core/Services/dine.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  @ViewChild(TablesComponent) table!: TablesComponent;

  //MenuName = 'home';
  MenuName = 'companylogin';
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
  dine$: any;
  invoicedata$: any;
  CancelOrder = '';
  splitToken: any;
  title = 'foodbilling';
  runningItems$:any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manageService: ManageService,
    private invoiceService: InvoiceService,
    private FloorService_:FloorService,
    private DineService_:DineService,
  ) {
   

  }

  ngOnInit(): void {
    //localStorage.clear();

    // Clear localStorage on app initialization
   
      // Remove all items from localStorage
      
    }

  updateinvoiceidValue(newValue: any): Promise<void> {
    return new Promise((resolve) => {
      this.invoiceid = '';
      resolve();
    });
  }

  gohomeinvoiceid($event: string): void {
   this.handleTokenSplit($event);
  //this.initializeManageforHome();
    this.router.navigate(['/Home']);
    this.MenuName = 'home';
  }

  private handleTokenSplit(tokenString: string): void {
   this.splitToken = tokenString.split('jsk');
    console.log(tokenString);
    console.log(this.splitToken);
    // If 'jsk' is not found, splitToken[1] could be undefined or empty string
    if (this.splitToken.length > 1 && this.splitToken[1]) {
      this.TokenNumber = +this.splitToken[1] || 0;
    } else {
      this.TokenNumber = 0;
    }
    this.invoiceid = this.splitToken[0] || '';
    console.log(this.invoiceid);
    console.log(this.TokenNumber);
   
  }



  initializeManageforHome(): void {
    // Initialize as undefined so async pipe does not apply to plain arrays in template
   
    (async () => {
      // Step 1: Initialize observables
      this.manageService.initObservables();

      // Step 2: Load tax info
      await this.manageService.loadTax();

      // Step 3: Load payby modes
      await this.manageService.loadpaybyMode();

      // Step 4: Load invoice data by id
      if(this.invoiceid)
      await this.manageService.getInvoiceDataById(this.invoiceid);
      await this.DineService_.loaddine();
      this.dine$ = this.DineService_.dinedataSubject$;
      // Step 5: Assign synchronous values from service to component properties
      this.payBy = this.manageService.payByData$?.value;
      this.addOnProduct$ = this.manageService.addOnProductsData$;
      this.productPrice$ = this.manageService.productPriceData$;
      this.product$ = this.manageService.Productnamedata$;
     
      this.invoicedata$ = this.manageService.invoiceData$;
      this.category$ = this.manageService.categorynamedata$;
      this.quantityType$ = this.manageService.Qtypenamedata$;
      this.subQuantityTtype$ = this.manageService.subQuantityTypeData$;

      this.tax = this.manageService.taxnamedata;
      this.manageService.loadRunningKOT();
      this.runningItems$ = this.manageService.runningKOTItems$;
      // Step 6: Logging as needed
      console.log(this.payBy);
      console.log(this.tax);
      console.log(this.invoiceid);

    })();
    
    // console.log(this.invoicedata$ );
    // console.log(this.manageService.invoiceData$.value);
    // console.log(this.manageService.invoiceData$);
    // console.log(this.manageService.invoiceData$.value);
    // console.log(this.manageService.invoiceData$.getValue());
    // this.invoicedata$.subscribe((data: any)=>
    // {
    //   console.log(data);
    // }
    // );
  }

  initializeDataForHome($event: string): void {
    this.handleTokenSplit($event);
    this.initializeManageforHome();
   // alert("home");
    this.router.navigate(['/Home']);
    this.MenuName = 'home';
  }

  receiveNotification(event: string): void {
    this.MenuName = event;
    if(this.MenuName==='tables')
    {
      // Step 1: Load running KOT data
     // this.manageService.initObservables();
      console.log("Running KOT loaded successfully.");
     // this.initializeManageforHome();
      // Step 2: Load token information
      // Step 2: Load token information (Async/Await)
      (async () => {
        try {
          await this.manageService.loadToken();
          console.log("Token information loaded successfully.");

          // Step 3: Get and set TokenNumber after loading token
          this.TokenNumber = this.manageService.TokenNumber$.getValue();
          console.log("TokenNumber set to:", this.TokenNumber);
        //  await this.manageService.loadRunningKOT();
          // Step 4: Load floor data
          await this.FloorService_.loadfloor();
          this.floor$ = this.FloorService_.FloordataSubject$;
          console.log("Floor data loaded successfully.");

          // Step 5: Load dine data
          await this.DineService_.loaddine();
          this.dine$ = this.DineService_.dinedataSubject$;
          console.log("Dine data loaded successfully.");

          this.manageService.loadRunningKOT();
          this.runningItems$ = this.manageService.runningKOTItems$;
        } catch (error) {
          console.error("Error in loading table/tokens/floor/dine data", error);
        }
      })();

      // Step 6: Set floor$ and dine$ Observables
     
    
      

      // Step 7: Set runningItems$ Observable
     // this.runningItems$ = this.manageService.runningKOTItems$;
      console.log("runningItems$ Observable set.");
     
    }
  }

  pickUpOrders(event: string): void {
    this.MenuName = 'tables';
    this.pickup = event;
  }

  cancelOrder(event: any): void {
    this.CancelOrder = event;
   
    console.log(this.CancelOrder);
    this.router.navigate(['/tables']);
    this.MenuName = 'tables';
  }
  showTablePage(event: string)
  {
   // this.receiveNotification(event);
   //this.manageService.initKOt();
     this.manageService.loadRunningKOT();
    this.runningItems$ = this.manageService.runningKOTItems$;
    // this.store.dispatch(
    //   runningItemKOTActions.loadrunnigKOTITems()
    // );
   
    this.router.navigate(['/tables']);
    this.MenuName = 'tables';
  }
  clearCancelOrders(event: string): void {
    this.CancelOrder = event;
  }

  clearPickupOrders(event: string): void {
    this.pickup = event;
  }
}
