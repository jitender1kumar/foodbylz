import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DineService } from '../../core/Services/dine.service';
import { ChairService } from '../../core/Services/chair.service';

@Component({
    selector: 'app-dinetable',
    templateUrl: './dinetable.component.html',
    styleUrl: './dinetable.component.css',
    standalone: false
})
export class DinetableComponent implements OnInit {
  tabledata:any=[];
IChairdata: any;
  IChairdata2: any;           
  tablename:any;  
  @Output() notifyDine: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifytoorder: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifclose: EventEmitter<string> = new EventEmitter<string>();
  constructor(private formedit: FormBuilder,private dineservice:DineService,private chairservice:ChairService)
{
  
  this.myAddDineForm = this.formedit.group({
    table_id: ['', Validators.required],
    name: ['', [Validators.required]],
  });
}
  ngOnInit(): void {
    this.loaddine2();
  }                                                                                    

myAddDineForm: FormGroup<any>;
@Output() notify: EventEmitter<string> = new EventEmitter<string>();
@Input() showdining: any;
sendNotification() {
  this.notify.emit(this.myAddDineForm.value.table_id);
}
onFormDineSubmit() {
 
  const indexP = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.myAddDineForm.value.table_id);
//alert("Working");
 // this.loadfood("Dinning Table No. : ",this.dinedata[indexP].name);
}
proceed() {
  let index ;
  this.tabledata=[];
  alert(this.IChairdata.length);
  if(this.IChairdata.length>0){
 index = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.IChairdata[0].table_id);
  }
  if(this.IChairdata.length>0){
  for(var ii = 0; ii<this.IChairdata.length; ii++)
  {
    if(this.IChairdata[ii].status==true)
    {
     
      //this.tabledata.push([{name:this.IChairdata[ii].name,table_id:this.IChairdata[ii].table_id,tablename:this.dinedata[index].name,showdinetabel:true}]);
      this.tabledata=[this.dinedata[index].name];
      break;
    }
  }      
  //alert()                                                                                          
   this.notifytoorder.emit(this.tabledata);
}
else                                                                                                                   
{      
  alert(this.tablename);
 this.notifytoorder.emit(this.tablename);
}
 
   
}
  showEdit2=true;
  showdining2=false;
  
close() {
      this.notifclose.emit("false");
    
    
}
 loadchair(table_id:string)
    {
 // alert("selectcategoryID");
  this.chairservice.getbyid(this.myAddDineForm.value.table_id).subscribe(data => {
    if (data) {
     this.IChairdata2=data;
     this.IChairdata=this.IChairdata2.allTasks
    //this.loadstatusofchair();
    }
  })
}                                          
                                         
sendNotification2() {
let index = this.dinedata.findIndex((item: { _id: any; }) => item._id === this.myAddDineForm.value.table_id);                                                               
  this.loadchair(this.myAddDineForm.value.table_id);
  this.tablename = this.dinedata[index].name;
    }                                                      
  message2: string = '';
  dinedata2: any; 
  dinedata: any;
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
