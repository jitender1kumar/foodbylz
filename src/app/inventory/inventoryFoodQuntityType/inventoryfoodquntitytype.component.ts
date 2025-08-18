import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryFoodQuantityType } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { InventoryMFoodQuantityTypeService } from '../../core/Services/inventoryFoodQuantityType.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as InveroryFoodQuantityTypeActions from '../inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.actions';
import { addInventoryFoodQuantityType, deleteInventoryFoodQuantityType, loadInventoryFoodQuantityType, updateInventoryFoodQuantityType } from '../inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.actions';
import { Actions, ofType } from '@ngrx/effects';


@Injectable({ providedIn: 'root' })

@Component({
    selector: 'app-inventoryfoodquntitytype',
    templateUrl: './inventoryfoodquntitytype.component.html',
    styleUrl: './inventoryfoodquntitytype.component.css',
    standalone: false
})
export class InventoryfoodquntitytypeComponent implements OnInit {
  //lodProductCategory:ProductCategory[]=[];
  args: any = null;
  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  data2: any;
  data: any;
 inventoryQuantityTypeData$:Observable<any[]>|undefined;
 loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  _InventoryFoodQuantityType: InventoryFoodQuantityType = {
    name: "",
    discription: "",
    _id: "undefined"
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "discription", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  discription: any;
  name: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  myAddForm: FormGroup;
  constructor(private service: InventoryMFoodQuantityTypeService, 
     public actions$: Actions,
    private router: Router, private formedit: FormBuilder, private store: Store<{ loadInventoryFoodQuantityType: any }>) {
    this.inventoryQuantityTypeData$ = store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.loading$ = store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = store.select(state => state.loadInventoryFoodQuantityType.error);
   
    this.display="display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      discription: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      discription: ['']
    });
  }
  ngOnInit(): void {
    this.loadinventoeryfoodquantitytype();
  }
  InventoryNameExist=false;
checkNameExist(checkName:string)
{
   
 this.inventoryQuantityTypeData$?.subscribe(getName=>{
const NameExist = getName.find(item =>item.name===checkName);
if(NameExist)
{
//alert("if"+NameExist);
  return this.InventoryNameExist= true;
}
else
{
//  alert("else"+NameExist);
  return this.InventoryNameExist= false;
}
});
return this.InventoryNameExist;
}
  add(InventoryFoodQuantityType_: InventoryFoodQuantityType): void {
   if(this.checkNameExist(this.myAddForm.value.name))
   {
this.args = "Inventory Name Already Exist";
   }
   else
   {
    this.store.dispatch(addInventoryFoodQuantityType({InventoryFoodQuantityType_}));
this.args = "Successfully Added Category..." + InventoryFoodQuantityType_.name;
    this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.addInventoryFoodQuantityTypeSuccess)).subscribe(() => {
            this.args=" added";
            // this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
   this.loadinventoeryfoodquantitytype();
           });
        this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.addInventoryFoodQuantityTypeFailure)).subscribe(() => {
            this.args="Something went wrong.";
           }); 
   }

  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {

      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "cate";


    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        categorydesc: [event.data.categorydesc]

      });
    }
    
  }

  loadinventoeryfoodquantitytype() {

    this.store.dispatch(loadInventoryFoodQuantityType());
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.loadInventoryFoodQuantityTypeSuccess)).subscribe(() => {
           // this.args=" Updated";
            // this.loadcategory();
           });
        this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.loadInventoryFoodQuantityTypeFailure)).subscribe(() => {
            this.args="Something went wrong.";
           }); 
    // this.loading$ = this.store.select(state => state.loadInventoryFoodQuantityType.loading);
    // this.error$ = this.store.select(state => state.loadInventoryFoodQuantityType.error);
   
  }
  Update(InventoryFoodQuantityType_: InventoryFoodQuantityType) {
    if(this.checkNameExist(this.myEditForm.value.name))
   {
this.args = "Inventory Name Already Exist";
   }
   else
   {
this.store.dispatch(updateInventoryFoodQuantityType({InventoryFoodQuantityType_}));
// this.args = "Successfully Updated Category..." + InventoryFoodQuantityType_.name;
//  this.store.dispatch(loadInventoryFoodQuantityType());
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeSuccess)).subscribe(() => {
            this.args=" Updated";
            this.loadinventoeryfoodquantitytype();
            // this.loadcategory();
           });
        this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeFailure)).subscribe(() => {
            this.args="Something went wrong.";
           }); 
          }
  }
  cDelete(_id: any) {

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }

  }
  show: any = false;
  showEdit: any = false;
  shows() {
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  onEditForm() {
    if (this.myEditForm.valid) {
      this.Update(this.myEditForm.value);
    }
  }
  close() {
    //alert(arg0)
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }

  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(_id: any) {

this.store.dispatch(deleteInventoryFoodQuantityType({_id}));
     this.store.dispatch(loadInventoryFoodQuantityType());
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
     this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeSuccess)).subscribe(() => {
           // this.args=" Updated";
            // this.loadcategory();
           });
        this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeFailure)).subscribe(() => {
            this.args="Something went wrong.";
           }); 
         this.display = "display:none;";
    //     this.args = " Record Deleted Successfully ";

  }
}
