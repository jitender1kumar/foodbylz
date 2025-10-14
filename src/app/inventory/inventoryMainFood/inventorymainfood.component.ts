import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryMainFood } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { InventoryMainFoodService } from '../../core/Services/inventoryMainFood.service';
import { InventoryMFoodQuantityTypeService } from '../../core/Services/inventoryFoodQuantityType.service';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadInventoryFoodQuantityType } from '../inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.actions';
import { addInventoryMainFood, deleteInventoryMainFood, loadInventoryMainFood, updateInventoryMainFood } from '../inventoryStore/inventoryMainFoodStore/inventoryMainFood.actions';
import { popupenvironment } from '../../environment/popupEnvironment';
import * as InventoryMainFoodActions from '../inventoryStore/inventoryMainFoodStore/inventoryMainFood.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-inventorymainfood',
  templateUrl: './inventorymainfood.component.html',
  styleUrl: './inventorymainfood.component.css',
  standalone: false
})
export class InventorymainfoodComponent implements OnInit {
  @ViewChild('f') categoryViewchild!: NgForm;
  @ViewChild('formupdate') formupdate!: NgForm;
  popupenvironments:any;
  myAddForm!: FormGroup;
  myEditForm!: FormGroup;
  employeeId: string = "JSK";

  InventoryMainFooddata$!: Observable<any[]>;
  inventoryQuantityTypeData$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "quantitytypename" },
    { field: "quantitytypevalue" },
    { field: "description", flex: 2 },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];
  // Common pagination properties
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,200, 500, 1000];

  // Common UI state properties
 

  // Data helpers
  quantitytypename: string = "";
  
  constructor(
    private service: InventoryMainFoodService,
    private router: Router,public actions$: Actions,
    private fb: FormBuilder,
    private _InventoryMFoodQuantityTypeService: InventoryMFoodQuantityTypeService,
    private store: Store<{ loadInventoryFoodQuantityType: any, loadInventoryMainFood: any }>
  ) {
    this.initForms();
    this.initSelectors();
  }

  ngOnInit(): void {
    this.popupenvironments=popupenvironment;
    this.loadInventoryMainFoods();
    this.loadInventoryFoodQuantityTypes();
  }

  private initForms() {
    this.myAddForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });

    this.myEditForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      quantitytypeID: ['', Validators.required],
      quantitytypename: [''],
      quantitytypevalue: [''],
      employee_id: this.employeeId
    });
  }

  private initSelectors() {
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.loading$ = this.store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = this.store.select(state => state.loadInventoryFoodQuantityType.error);

    this.InventoryMainFooddata$ = this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.data);
    // loading$ and error$ for main food can be overwritten if needed
  }

  loadInventoryFoodQuantityTypes() {
    this.store.dispatch(loadInventoryFoodQuantityType());
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
  }

  loadInventoryMainFoods() {
    this.store.dispatch(loadInventoryMainFood());
    this.InventoryMainFooddata$ = this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.data);
    this.actions$.pipe(ofType(InventoryMainFoodActions.loaInventoryMainFoodByIdSuccess)).subscribe(() => {
      this.popupenvironments.args$.next("Successfully to loaded.");
      // this.loadcategory();
    });
    this.actions$.pipe(ofType(InventoryMainFoodActions.loadInventoryMainFoodFailure)).subscribe(() => {
    
      this.popupenvironments.args$.next(" Failed to load.");
      
    });
  }

  getInventoryFoodQuantityTypeName() {
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
      const found = inventoryQuantityTypeData.find((item: any) => item._id === this.myAddForm.value.quantitytypeID);
      console.log(found);
      this.quantitytypename = found ? found.name : '';
      this.myAddForm.patchValue({
        quantitytypename: this.quantitytypename,
    
      });
    });
  }

  getInventoryFoodQuantityTypeNameforEdit() {
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
      const found = inventoryQuantityTypeData.find((item: any) => item._id === this.myEditForm.value.quantitytypeID);
      this.quantitytypename = found ? found.name : '';
      this.myEditForm.patchValue({
        quantitytypename: this.quantitytypename
      });
    });
  }

  getqtname() {
    this.inventoryQuantityTypeData$.subscribe(inventoryQuantityTypeData => {
      const found = inventoryQuantityTypeData.find((item: any) => item._id === this.myAddForm.value.quantitytypeID);
      this.quantitytypename = found ? found.name : '';
    });
  }

  add(InventoryMainFood_: InventoryMainFood): void {
    let nameExists = false;
    this.InventoryMainFooddata$ = this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.data);
    this.InventoryMainFooddata$?.subscribe(data => {
      nameExists = data.some((item: any) => item.name === this.myAddForm.value.name);
    }).unsubscribe?.();

    if (!nameExists) {
      this.store.dispatch(addInventoryMainFood({ InventoryMainFood_ }));
      this.actions$.pipe(ofType(InventoryMainFoodActions.addInventoryMainFoodSuccess)).subscribe(() => {
        this.popupenvironments.args$.next(InventoryMainFood_.name+" Addedd.");
        this.loadInventoryMainFoods();
        // this.loadcategory();
      });
      this.actions$.pipe(ofType(InventoryMainFoodActions.addInventoryMainFoodFailure)).subscribe(() => {
      
        this.popupenvironments.args$.next(InventoryMainFood_.name+" Failed to Add.");
        
      });
     // this.popupenvironments.args$.next(`${this.myAddForm.value.quantitytypevalue} ${this.myAddForm.value.quantitytypename} ${this.myAddForm.value.name} Added`);
     
    } else {
      this.popupenvironments.args$.next("Exist name");
    }
    //this.InventoryMainFooddata$ = this.store.select(state => state.loadInventoryMainFood.InventoryMainFood_.data);
   // this.loadInventoryMainFoods();
  }
  loadinventoeryfoodquantitytype() {
    throw new Error('Method not implemented.');
  }

  onCellClick(event: any) {
    if (event.colDef.field === 'Delete') {
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block");
      this.popupenvironments.valueid$.next(event.data._id);
      this.popupenvironments.tablename$.next("cate");
    }

    if (event.colDef.field === 'Edit') {
      
      this.initForms();
      this.loadInventoryFoodQuantityTypes();
      console.log(event.data);
      this.popupenvironments.popdata2$.next(event.data);
      console.log(this.popupenvironments.popdata2$.value);
      
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
      this.popupenvironments.args$.next(null);
      this.quantitytypename = event.data.quantitytypename;

      this.myEditForm.patchValue({
        _id: event.data._id,
        name: event.data.name,
        description: event.data.description,
        quantitytypeID: event.data.quantitytypeID,
        quantitytypename: event.data.quantitytypename,
        quantitytypevalue: event.data.quantitytypevalue,
        employee_id: this.employeeId
      });
      
    }
  }

  changeQuantityTypeName() {
    // Placeholder for future logic if needed
  }

  Update(InventoryMainFood_: InventoryMainFood) {
    try {
      this.store.dispatch(updateInventoryMainFood({ InventoryMainFood_ }));
      this.popupenvironments.args$.next("Record updated successfully.");
      this.loadInventoryMainFoods();
    } catch (error) {
      console.error('Error updating InventoryMainFood:', error);
      this.popupenvironments.args$.next("Error updating record. Please try again.");
      return;
    }
   
  }

  cDelete(_id: any) {
    // Placeholder for future logic if needed
  }

  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }

  shows() {
    this.quantitytypename='';
    this.initForms();
    this.loadInventoryFoodQuantityTypes();
    this.popupenvironments.show$.next(true);
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.args$.next(null);
  }

  onEditForm() {
    if (this.myEditForm.valid) {
      this.Update(this.myEditForm.value);
    }
  }

  close() {
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);
  }

  handleChildClick() {
    this.popupenvironments.display$.next("display:none;");
  }

  deletedConfirmed(_id: any) {
    this.store.dispatch(deleteInventoryMainFood({ _id }));
    this.popupenvironments.display$.next("display:none;");
    this.popupenvironments.args$.next(" Record Deleted Successfully ");
    this.loadInventoryMainFoods();
  }
}
