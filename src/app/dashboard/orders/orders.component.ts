import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetOrderDetailsService } from '../../core/commanFunction/getOrderDetails.service';
@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css',
    standalone: false
})
export class OrdersComponent implements OnInit  {
  ordersdata:any;
  constructor(private GetOrderDetailsService_:GetOrderDetailsService)
    {
    
    }
  //orderstatus 1 for new order 2 pending 3 running 
  ngOnInit(): void {
  // this.loadinvoicedata()
  
                                                      
 
  } 
   @Output() showTables: EventEmitter<string> = new EventEmitter<string>();
    @Output() pickUpOrder: EventEmitter<string> = new EventEmitter<string>();
  showtablePage()
{
  this.showTables.emit("tables");
}
dineIn()
{
this.showtablePage();
}
pickUp()
{
 this.pickUpOrder.emit("pickup");
}
}
