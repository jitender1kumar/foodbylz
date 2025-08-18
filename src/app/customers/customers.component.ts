import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customers, Floor, IChair, IChairMergeDineName} from '../core/Model/crud.model';
import { FormGroup,FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { CustomresService } from '../core/Services/customers.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.css',
    standalone: false
})
@Injectable({providedIn: 'root'})
export class CustomersComponent implements OnInit, ICellRendererAngularComp  {
  args:any=null;
    myEditForm: FormGroup;
    qid:any;
    id:any; basedata:any;
   popdata2:any;
  popdataId: any;
  popdataBasetypedesc: any;
    popdataBasetypeName: any;
    popdataQuntityId: any;
    src: any;
    alt: any;
  content: any;
  classname: any;
  style: any;
  modal: any;
  display: any;
  id01: any;
  valueid: any;
  tablename: any;
  isCheckedStatus: any=true;
  myAddForm: FormGroup;
 
 
    agInit(params: ICellRendererParams): void {
      this.id= params.data._id;
     //this.rowData= params.api.refreshClientSideRowModel;
     // console.log(params);
     
    }
  //static rowData:any;
    // Column Definitions: Defines the columns to be displayed.
    floors:Floor[]=[];
    pagination = true;
    paginationPageSize = 10;
    paginationPageSizeSelector = [50, 500, 1000];
  
  
  colDefs: ColDef[] = [
    { field: "Name" },
    { field: "MobileNo" },
    { field: "DOB" },
    { field: "tag" },
    { field: "DueAmount" },
    { field: "Anniversary" },
    { field: "Delete",cellRenderer:BasetypDeleteButtun},
    { field: "Edit",cellRenderer:BasetypEditButtun}
  
  ];
  customer:Customers={
    Name: "undefined",
    MobileNo: "undefined",
    DOB: "",
    type: "",
    tag: "Friend",
    DueAmount: 0,
    Anniversary: "undefined",
    Paymentstatus: 0,
    RecieptNumber: 0,
    employee_id: "undefined"
  }
  
  Customersnamedata: any;
  Customersnamedata2:any
  Customersdata2: any;
  Customersdata: any;
  static myGlobalVariable: any;
  exampleModal:any;
  qname="";
    constructor(private customerservice:CustomresService, private router: Router,private formedit: FormBuilder)
    {                                                                                                                                
      this.display="display:none;"
      this.args=null;
      this.myEditForm = this.formedit.group({
        _id: [''],
        Name: ['undefined', Validators.required],
        MobileNo: [''],
        DOB: [''],
        tag: ['Friend'],
         DueAmount: [0],
        Anniversary: ["undefined"]              
      });
      this.myAddForm = this.formedit.group({
       
        Name: ['', Validators.required],
        MobileNo: [''],
        DOB: [''],
        tag: ['Friend'],
         DueAmount: [0],
         Anniversary: ["undefined"]                                                                                   
      });
    //  this.loadbasetype();
    this.loadCustomers();
    }
    ngOnInit(): void {
     // this.loaddine2();
      this.classname="";
      this.loadCustomers();
      
    }
    
    refresh(params: ICellRendererParams<any, any, any>): boolean {
      throw new Error('Method not implemented.');
    }
loadCustomers()
{
//alert(selectcategoryID);
this.customerservice.get().subscribe(data => {
if (data) {
 this.Customersdata2=data;
 this.Customersdata=this.Customersdata2.data
 
}
})
}
    onCellClick(event: any) {
      
      if(event.colDef.field=='Delete')
      {
        this.modal="modal";
       this.display="display:block;"
       this.valueid=event.data._id;
       this.tablename="base";
      alert(this.valueid);
       if(PopupmodelComponent.delete==true)
       {
    this.customerservice.delete(event.data._id).subscribe(res => {
      alert("Successfully Delete BaseType...");
        // this.args="Successfully Deleted "+event.data.Basetypename;
       })
       }
      
         
      }
      if(event.colDef.field=='Edit' )
        {
        //  this.loaddine2();
          this.popdata2=event.data;
          this.showEdit=true;
  this.show=false;
  this.args=null;
  this.myEditForm = this.formedit.group({
    _id: [event.data._id],
        Name: [event.data.Name],
        MobileNo: [event.data.MobileNo],
        DOB: [event.data.DOB],
       
        tag: [event.data.tag],
        DueAmount: [event.data.DueAmount],
        Anniversary: [event.data.Anniversary],
       
  
  });
         
        }
        this.loadCustomers();
    }
    
    
    
  add(cutomer:Customers): void {                                              
    this.customerservice.add(cutomer).subscribe(res => {
      if (res) {
       // console.log(data);
        //this.search(id);
        this.args="Record Added succefully..."+cutomer.Name;
       // alert("Basetype inserted succefully.");
       // this.loadbasetype()
       this.loadCustomers();
      }
    })
  
  }
  
   
  
  Update(cutomer:Customers) {
    //alert(basetype._id);
    this.customerservice.update(cutomer).subscribe(res => {
      if (res) {
        //this.search(id);
        
       // this.args=null;
        this.args="Successfully Updated..."+cutomer.Name;
      //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
       // this.loadbasetype();
       this.loadCustomers();
      }
    })
  }
  cDelete(_id:any) {
    //this.loadbasetype();
    this.loadCustomers();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
    this.add(this.myAddForm.value);
    }
    }
    onFormEdit() {
      if (this.myEditForm.valid) {
       // console.log(this.myEditForm.value);
       // alert(this.myEditForm.value);
   this.Update(this.myEditForm.value);
      }
      }
  
  
      //show addbasetype
  show: any=false;
  showEdit:any=false;
      shows() {
       
        this.classname="";
    this.show=true;
    this.showEdit=false;
    this.args=null;
    }
    close() {
      //alert(arg0)
      if(this.showEdit==true)
      {
        this.showEdit=false;
      }
      if(this.show==true)
        {
          this.show=false;
        }
      
      }
      handleChildClick() {
        this.display="display:none;";
      }
      deletedConfirmed(id:any)
      {
      this.customerservice.delete(id).subscribe(res => {
        if(res){
        this.display="display:none;";
        this.loadCustomers();
        this.args = " Record Deleted Successfully ";
        }
    })
      }
  
   
  
  
    }