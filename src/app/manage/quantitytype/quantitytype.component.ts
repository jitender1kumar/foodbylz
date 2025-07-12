import { Component, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import{Quantitytype} from '../../core/Model/crud.model';
import { FormGroup,FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addQuantityType, deleteQuantityType, loadQuantityType, updateQuantityType } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
@Component({
    selector: 'app-categorytypeform',
    templateUrl: './quantitytype.component.html',
    styleUrl: './quantitytype.component.css',
    standalone: false
})
export class CategorytypeformComponent implements OnInit {
  Qtypenamedata$: Observable<any[]> | undefined;
    loading$: Observable<boolean> | undefined;
    error$: Observable<string | null> | undefined;
  args:any=null;
  myEditForm: FormGroup;
  popdata2: any;
display: any;
tablename: any;
valueid: any;
modal: any;
employeeId="JSK";
productrecord:any;
productrecord2:any
quantityTypeNameResult:any;
onFormSubmit() {
  if (this.myAddForm.valid) {
    this.add(this.myAddForm.value);
       }
}
@ViewChild('f')
quantitytypeViewchild!: NgForm;
categorynamedata: any;
  categorynamedata2: any;

  quantitytypes:Quantitytype={
    _id: '',
    name: '',
    Desc: ''
  }
name: any;
Desc: any;
onFormUpdateSubmit()
{
  this.Update(this.myEditForm.value);
}
Update(QuantityType_:Quantitytype) {

  this.store.dispatch(updateQuantityType({QuantityType_}));
  this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
   this.SweetAlert2_.showFancyAlertSuccess("Record Updated"); 
}
cDelete(_id: any) {

  
}
myAddForm: FormGroup;
  constructor(private service: QuantitytypeService,private router: Router,private formedit: FormBuilder, private productPriceservice:ProductPriceService, private store: Store<{ quantityTypeLoad: any }>,private SweetAlert2_:SweetAlert2) { 
    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);
 this.display="display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      Desc: ['']     
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      Desc: ['']     
    });
  }
  ngOnInit(): void {
   this.loadQtype();
  }
add(QuantityType_:Quantitytype) :void{
  this.service.getQuantityTypeNameByName(QuantityType_.name).subscribe(quantityTypeName=>{
   console.log(quantityTypeName);
   this.quantityTypeNameResult=quantityTypeName;
   if(this.quantityTypeNameResult.allTasks.length==0)
   {
this.store.dispatch(addQuantityType({ QuantityType_}));
 this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
   this.SweetAlert2_.showFancyAlertSuccess("Added."); 
   }
   else
   {
    //this.args=" Quantity Type Name: "+QuantityType_.name+" Exists Create Another Name  "
    this.SweetAlert2_.showFancyAlertFail("Quantity Type Name: "+QuantityType_.name+" Exists Create Another Name."); 
   }
  })
 
}

colDefs: ColDef[] = [
  { field: "name" },
  { field: "Desc",flex: 2 },
   { field: "Delete",cellRenderer:BasetypDeleteButtun},
   { field: "Edit",cellRenderer:BasetypEditButtun}

];
pagination = true;
paginationPageSize = 10;
paginationPageSizeSelector = [200, 500, 1000];
onCellClick(event: any) {
    
  if(event.colDef.field=='Delete')
  {
    this.modal="modal";
    this.display="display:block"
    this.valueid=event.data._id;
    this.tablename="qtyp";
    
  }
  if(event.colDef.field=='Edit')
    {
      this.popdata2=event.data;
      this.showEdit=true;
this.show=false;
this.args=null;
this.myEditForm = this.formedit.group({
  _id: [event.data._id],
  name: [event.data.name, Validators.required],
  Desc: [event.data.Desc]     
});

    }
 
}

loadQtype()
{
  this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);
}
show: any=false;
  showEdit:any=false;
      shows() {
    this.show=true;
    this.showEdit=false;
    this.args=null;
    }
    close() {
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
      deletedConfirmed(_id:any)
      {
       
        this.productPriceservice.getbyidQtypid(_id).subscribe(records => {
          this.productrecord2 = records;
          this.productrecord = this.productrecord2.allTasks;
          console.log(this.productrecord.length);
          console.log(records);
          if (this.productrecord.length == 0) {
this.store.dispatch(deleteQuantityType({_id}));
            this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(state => state.quantityTypeLoad.QuantityType_.allTasks);
   this.SweetAlert2_.showFancyAlertSuccess("Record Deleted"); 
          }
          else if (this.productrecord.length > 0) {
           // alert("");
            this.SweetAlert2_.showFancyAlertFail("Can't delete because there is product available."); 
          }
        })

    
      }
}
