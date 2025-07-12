import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryMainFood } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { InventoryMainFoodService } from '../../core/Services/inventoryMainFood.service';
import { InventoryMFoodQuantityTypeService } from '../../core/Services/inventoryFoodQuantityType.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadInventoryFoodQuantityType } from '../inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.actions';
import { addInventoryMainFood, deleteInventoryMainFood, loadInventoryMainFood, updateInventoryMainFood } from '../inventoryStore/inventoryMainFoodStore/inventoryMainFood.actions';

@Injectable({ providedIn: 'root' })


@Component({
    selector: 'app-inventorymainfood',
    templateUrl: './inventorymainfood.component.html',
    styleUrl: './inventorymainfood.component.css',
    standalone: false
})
export class InventorymainfoodComponent implements OnInit {
  //lodProductCategory:ProductCategory[]=[];
  args: any = null;
  myEditForm: FormGroup;
  employeeId = "JSK";
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  data2: any;
  InventoryMainFooddata$: Observable<any[]> | undefined;
  inventoryQuantityTypeData$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  Inventoryfoodquntitytype2: any;
  //Inventoryfoodquntitytype:any;
  productrecord: any;
  productrecord2: any;
  quantitytypename: string = "";
  _InventoryFoodMain: InventoryMainFood = {
    name: "",
    description: "",
    quantitytypeID: "",
    quantitytypename: "",
    quantitytypevalue: 0,
    employee_id: "undefined",
    _id: undefined
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "quantitytypename" },
    { field: "quantitytypevalue" },
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
  constructor(private service: InventoryMainFoodService, private router: Router, private formedit: FormBuilder, private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService, private store: Store<{ loadInventoryFoodQuantityType: any, loadInventoryMainFood: any }>) {
    this.inventoryQuantityTypeData$ = store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.allTasks);
    this.loading$ = store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = store.select(state => state.loadInventoryFoodQuantityType.error);

    this.InventoryMainFooddata$ = store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
    this.loading$ = store.select(state => state.loadInventoryMainFood.loading);
    this.error$ = store.select(state => state.loadInventoryMainFood.error);

    this.display = "display:none;"
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId

    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      discription: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });
  }
  ngOnInit(): void {

    this.loadInventoryMainFood();
  }
  getqtname() {
  this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.allTasks);
     if (this.inventoryQuantityTypeData$) {
      this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
        const itemP = inventoryQuantityTypeData.find((item: { _id: string; }) => item._id === this.myAddForm.value.quantitytypeID);
        const indexP = inventoryQuantityTypeData.findIndex((item: { _id: any; }) => item._id === this.myAddForm.value.quantitytypeID);

        if (itemP && itemP._id) {
          this.quantitytypename = inventoryQuantityTypeData[indexP].name;

        }
      });
    }
   
  }
  loadinventoeryfoodquantitytype() {
    this.store.dispatch(loadInventoryFoodQuantityType());
     this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.allTasks);
    this.store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.store.select(state => state.loadInventoryFoodQuantityType.error);

  }
  add(InventoryMainFood_: InventoryMainFood): void {
    let Index = 1;
    this.InventoryMainFooddata$?.subscribe(getname => {
      Index = getname.findIndex((item: { name: string; }) => item.name === this.myAddForm.value.name);
     
    })
    if (Index == -1) {
      this.store.dispatch(addInventoryMainFood({ InventoryMainFood_ }));
      this.args = this.myAddForm.value.quantitytypevalue + " " + this.myAddForm.value.quantitytypename + " " + this.myAddForm.value.name + " Added";
    }
    else {
      this.args = "Exist name";
    }
     this.store.dispatch(loadInventoryMainFood());
   this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
   
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {

      this.modal = "modal";
      this.display = "display:block"
      this.valueid = event.data._id;
      this.tablename = "cate";


    }
    if (event.colDef.field == 'Edit') {
     this.loadinventoeryfoodquantitytype()
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.quantitytypename = event.data.quantitytypename;

      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        discription: [event.data.description],
        quantitytypeID: [event.data.quantitytypeID, Validators.required],
        quantitytypename: [event.data.quantitytypename],
        quantitytypevalue: [event.data.quantitytypevalue]

      });
    }
  }

  loadInventoryMainFood() {
    this.store.dispatch(loadInventoryMainFood());
   this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
   this.store.select(state => state.loadInventoryMainFood.loading);
     this.store.select(state => state.loadInventoryMainFood.error);
  }
  Update(InventoryMainFood_: InventoryMainFood) {

    this.store.dispatch(updateInventoryMainFood({ InventoryMainFood_ }));
    this.args="Updated";
      this.store.dispatch(loadInventoryMainFood());
   this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
   

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
    this.loadinventoeryfoodquantitytype();
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

    this.store.dispatch(deleteInventoryMainFood({ _id }));
     this.display = "display:none;";
        this.args = " Record Deleted Successfully ";
     this.store.dispatch(loadInventoryMainFood());
   this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.allTasks);
   
  }
}
