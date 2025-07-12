import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{TablesComponent} from './dine/tables/tables.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent implements OnInit{

@ViewChild(TablesComponent) table!: TablesComponent;
  showmanagebar="";
  path2:any;
  invoiceid:string="";
  TokenNumber:number=0;
  pickup="";
  constructor(private router: Router, private activatedRoute: ActivatedRoute)
  {
   
  }
  ngOnInit(): void {
   
  }
  
   updateValue(newValue: string) {
    this.invoiceid = newValue;
    //showing tables page
   // this.showmanagebar = "tables";
  }
  gohomeinvoiceid($event:string)
  {
    //Showing home page
   // alert("runnin gorder page");
    this.splitToken=$event.split("jsk");
    this.invoiceid="";
    this.TokenNumber=0;
   //alert("wor");
   this.TokenNumber=this.splitToken[1];
    this.invoiceid=this.splitToken[0];    
    this.router.navigate(['/Home']);
    this.showmanagebar= "home";    
  }
splitToken:any[]=[];
  receiveNotification2($event: string) {
    //Showing home page
   // alert("table page");
   this.splitToken=$event.split("jsk");
    this.invoiceid="";
    this.TokenNumber=0;
   //alert("wor");
   this.TokenNumber=this.splitToken[1];
    this.invoiceid=this.splitToken[0];    
    this.router.navigate(['/Home']);
    this.showmanagebar= "home";    
  // this.router.['/home'];
  } 
  
receiveNotification(event: string) {
   // Showing event = pageName                                        
    this.showmanagebar= event;                                                                     ;
 
}
pickUpOrders(event: string)
{
  this.showmanagebar= "tables";
this.pickup=event;
}
clearPickupOrders(event: string)
{
this.pickup=event;
}
  title = 'foodbilling';
}
