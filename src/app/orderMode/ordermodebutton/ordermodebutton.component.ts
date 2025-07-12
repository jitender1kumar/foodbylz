import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DineService } from '../../core/Services/dine.service';
import { ChairService } from '../../core/Services/chair.service';
import { flatMap } from 'rxjs';

@Component({
    selector: 'app-ordermodebutton',
    templateUrl: './ordermodebutton.component.html',
    styleUrl: './ordermodebutton.component.css',
    standalone: false
})
export class OrdermodebuttonComponent implements OnInit {
  message: string = '';
  tablename="";
  tabledata:any=[];               
  IChairdata: any;
  //showdining:any;
  showdining2 =false;
  IChairdata2: any;
  @Output() notifyDine: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyPacking: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyOnlineDelivery: EventEmitter<string> = new EventEmitter<string>();
  constructor(private dineservice:DineService,private chairservice:ChairService)
  {

  }
  
receiveNotification(event: string) {
  this.message = event;
  //this.tablename=event2;
  this.loadchair(this.message);
//alert(this.message);
}
  
  ngOnInit(): void {
  
  }
  close(close:any)
  {
    this.showdining2=false;
  }
  receiveNotification2(event: any) {
// this.tabledata=[];
// const index = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.IChairdata[0].table_id);
// for(var ii = 0; ii<this.IChairdata.length; ii++)
// {
  
//   if(this.IChairdata[ii].status==true)
//   {
   
//     this.tabledata.push([{name:this.IChairdata[ii].name,table_id:this.IChairdata[ii].table_id,tablename:this.dinedata[index].name}]);
//   }

// }
// alert(this.dinedata[index].name);
this.showdining2=event[0].showdinetabel;
    this.notifyDine.emit(event);
    alert(event)
  
  }

 
  dinedata2: any;
  dinedata: any;
delivery() {
  this.notifyOnlineDelivery.emit("");
}
paking() {
  this.notifyPacking.emit("");
}
loadchair(table_id:string)
    {
 // alert("selectcategoryID");
  this.chairservice.getbyid(table_id).subscribe(data => {
    if (data) {
     this.IChairdata2=data;
     this.IChairdata=this.IChairdata2.allTasks
    //this.loadstatusofchair();
    }
  })
}
showdiningfun() {
  //this.showdining2=false;
  
  this.showdining2=true;
  this.loaddine2();
}
  loaddine2() {
    //alert(selectcategoryID);
this.dineservice.get().subscribe(data => {
  if (data) {
   this.dinedata2=data;
   this.dinedata=this.dinedata2.allTasks
 
  }
  })
  }

}
