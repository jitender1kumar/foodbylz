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
import { popupenvironment } from '../../environment/popupEnvironment';
import { Validationenvironment } from '../../environment/validtionEnvironment';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-inventoryfoodquntitytype',
  templateUrl: './inventoryfoodquntitytype.component.html',
  styleUrl: './inventoryfoodquntitytype.component.css',
  standalone: false
})
export class InventoryfoodquntitytypeComponent implements OnInit {
  //lodProductCategory:ProductCategory[]=[];
  Validationenvironments :any;
 
  popupenvironments:any;
  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  inventoryQuantityTypeData$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  _InventoryFoodQuantityType: InventoryFoodQuantityType = {
    name: "",
    description: "",
    _id: "undefined"
  };
  colDefs: ColumnDef[] = [
    { field: "name" , sortable:true },
    { field: "description", sortable:true },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
 
  
  myAddForm: FormGroup;
  constructor(private service: InventoryMFoodQuantityTypeService,
    private ValidationService_:ValidationService,
    public actions$: Actions,
    private router: Router, private formedit: FormBuilder, private store: Store<{ loadInventoryFoodQuantityType: any }>) {
    this.inventoryQuantityTypeData$ = store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.loading$ = store.select(state => state.loadInventoryFoodQuantityType.loading);
    this.error$ = store.select(state => state.loadInventoryFoodQuantityType.error);
    
    this.popupenvironments=popupenvironment;
    this.popupenvironments.display$.next("display:none;");
   
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      description: ['']
    });
  }
  ngOnInit(): void {
    this.Validationenvironments=  Validationenvironment;
    this.loadinventoeryfoodquantitytype();
  }
 


  add(InventoryFoodQuantityType_: InventoryFoodQuantityType): void {
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    const valid  = this.ValidationService_.checkNameExistforAddForm(this.myAddForm.value.name,this.inventoryQuantityTypeData$);
    console.log(valid.value);
    if (valid.value) {
     
      this.popupenvironments.args$.next("Inventory Name Already Exists");
    }
    else {
      this.store.dispatch(addInventoryFoodQuantityType({ InventoryFoodQuantityType_ }));
      this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.addInventoryFoodQuantityTypeSuccess)).subscribe(() => {
     
        this.popupenvironments.args$.next("Successfully Added Category..." + InventoryFoodQuantityType_.name);
        
        // this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
        this.loadinventoeryfoodquantitytype();
      });
      this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.addInventoryFoodQuantityTypeFailure)).subscribe(() => {
       
        this.popupenvironments.args$.next("Something went wrong.");
        
      });
    }

  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block");
      this.popupenvironments.valueid$.next(r[0].row._id);
      this.popupenvironments.tablename$.next("cate");
    }
    if (r[0].field == 'Edit') {
      this.popupenvironments.popdata2$.next(r[0].row);
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
      this.popupenvironments.args$.next(null);
      
      
      this.myEditForm = this.formedit.group({
        _id: [r[0].row._id],
        name: [r[0].row.name, Validators.required],
        description: [r[0].row.categorydesc]
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
      
      this.popupenvironments.args$.next("Something went wrong.");
      
      
    });
    // this.loading$ = this.store.select(state => state.loadInventoryFoodQuantityType.loading);
    // this.error$ = this.store.select(state => state.loadInventoryFoodQuantityType.error);

  }
  Update(InventoryFoodQuantityType_: InventoryFoodQuantityType) {
    const valid  = this.ValidationService_.checkNameExist(this.myEditForm.value.name,InventoryFoodQuantityType_._id,this.inventoryQuantityTypeData$)
    console.log(valid.value);
    if (valid.value) {
      
      this.popupenvironments.args$.next("Inventory Name Already Exist");
     
     
    }
    else {
      this.store.dispatch(updateInventoryFoodQuantityType({ InventoryFoodQuantityType_ }));
      // this.args = "Successfully Updated Category..." + InventoryFoodQuantityType_.name;
      //  this.store.dispatch(loadInventoryFoodQuantityType());
      this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
      this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeSuccess)).subscribe(() => {
        this.popupenvironments.args$.next(" Updated");
        this.loadinventoeryfoodquantitytype();
        // this.loadcategory();
      });
      this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeFailure)).subscribe(() => {
      
        this.popupenvironments.args$.next("Failed to Update.");
        
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
  
  
  shows() {
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
    //alert(arg0)
   
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);
   
  }
  handleChildClick() {
    this.popupenvironments.display$.next("display:none;");
   
  }
  deletedConfirmed(_id: any) {

    this.store.dispatch(deleteInventoryFoodQuantityType({ _id }));
    this.store.dispatch(loadInventoryFoodQuantityType());
    this.inventoryQuantityTypeData$ = this.store.select(state => state.loadInventoryFoodQuantityType.InventoryFoodQuantityType_.data);
    this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeSuccess)).subscribe(() => {
      // this.args=" Updated";
      // this.loadcategory();
    });
    this.actions$.pipe(ofType(InveroryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeFailure)).subscribe(() => {
      
      this.popupenvironments.args$.next("Failed to delete");
    });
    
    this.popupenvironments.ardisplaygs$.next("display:none;");
    //     this.args = " Record Deleted Successfully ";

  }
}
