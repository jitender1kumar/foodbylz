import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/Services/category.service';
import { ProductCategory } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
// import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ProductService } from '../../core/Services/product.service';
import { Store } from '@ngrx/store';
import * as CategoryActions from '../ManageStore/categoryStore/category.actions';
import {  updateCategorySuccess } from '../ManageStore/categoryStore/category.actions';
import { Observable } from 'rxjs';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { Actions, ofType } from '@ngrx/effects';
import {  ValidationService } from '../../core/commanFunction/Validation.service';
import { popupenvironment } from '../../environment/popupEnvironment';
import { Validationenvironment } from '../../environment/validtionEnvironment';
import { ManageDataEnvironment } from '../../environment/dataEnvironment';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';
@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class CategoryformComponent implements OnInit {
  ManageDataEnvironments:any;
  popupenvironments:any;
  categories$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  Validationenvironments:any;
  myEditForm: FormGroup;
  
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  // productrecord: any;
  // productrecord2: any;
  // categoryNameResult: any;
  procategorry: ProductCategory = {
    _id: '',
    name: '', categorydesc: '',
    createdAt: ''
  };
  colDefs: ColumnDef[] = [
    { field: "name", header: 'Name' , sortable: true},
    { field: "categorydesc", header: 'Description' , sortable: true},//, flex: 2
    { field: "Delete" , cellRenderer: BasetypDeleteButtun},//, cellRenderer: BasetypDeleteButtun
    { field: "Edit" , cellRenderer: BasetypEditButtun } //, cellRenderer: BasetypEditButtun

  ];

  
  
  myAddForm: FormGroup;

  // pagination = true;
  // paginationPageSize = 20;
  // paginationPageSizeSelector = [20, 200, 500, 1000];
  constructor(private service: CategoryService,
     private router: Router, 
     private formedit: FormBuilder,
         public actions$: Actions,
         private ValidationService_:ValidationService,
      private productservice: ProductService,
       private store: Store<{ categoryLoad: any }>, private SweetAlert2_: SweetAlert2) {
        
    this.categories$ = store.select(state => state.categoryLoad.ProductCategory_.data);
    this.loading$ = store.select(state => state.categoryLoad.loading);
    this.error$ = store.select(state => state.categoryLoad.error);

    this.ManageDataEnvironments=ManageDataEnvironment;
    this.Validationenvironments=Validationenvironment;
    this.popupenvironments=popupenvironment;
    this.popupenvironments.display$.next("display:none;");
    
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      categorydesc: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      categorydesc: ['']
    });
  }
  ngOnInit(): void {
    //this.store.dispatch(loadCategories());
   
    this.loadcategory();
    }
   
    
  add(ProductCategory_: ProductCategory): void {
    this.ManageDataEnvironments.Category$.next(null);
    this.service.getCategoryByName(ProductCategory_.name).subscribe({
      next: (categoryName) => {
        this.ManageDataEnvironments.Category$.next(categoryName);
        //this.categoryNameResult = categoryName;

        if (!this.ManageDataEnvironments.Category$?.value.data?.length) {
          // Add new category
          this.store.dispatch(CategoryActions.addCategory({ ProductCategory_: ProductCategory_ }));
         // this.store.dispatch(CategoryActions.loadCategories());

          this.loadcategory();
          // Success message
         
          this.popupenvironments.args$.next(`✅ Successfully Added Category: ${ProductCategory_.name}`);
        } else {
          // Duplicate warning
         
          this.popupenvironments.args$.next(`⚠️ Category Name "${ProductCategory_.name}" already exists. Please choose another.`);
        }
      },
      error: (err) => {
        console.error('Error checking category name:', err);
       
        this.popupenvironments.args$.next(`❌ Error checking category name: ${err.message || err}`);
        
      }
    });
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.deleteDisplayBlock(r[0].row);
    }
    if (r[0].field == 'Edit') {
      this.editDisplayBlock(r[0].row);
    }
   }
  // onCellClick(event: any) {
  // }
  deleteDisplayBlock(id: any) {
 
    this.popupenvironments.modal$.next("modal");
    this.popupenvironments.display$.next("display:block;");
    this.popupenvironments.valueid$.next(id._id);
    this.popupenvironments.tablename$.next("cate");
   

  }
  editDisplayBlock(editData: any) {
    this.popupenvironments.popdata2$.next(editData);
    this.popupenvironments.showEdit$.next(true);
    this.popupenvironments.show$.next(false);
    this.popupenvironments.args$.next(null);
   
   
    this.myEditForm = this.formedit.group({
      _id: [editData._id],
      name: [editData.name, Validators.required],
      categorydesc: [editData.categorydesc]
    });
  }
  loadcategory() {
    // alert("working");
    
    this.store.dispatch(CategoryActions.loadCategories());

    this.categories$ = this.store.select(
      state => state.categoryLoad.ProductCategory_.data
    );

    this.store.select(state => state.categoryLoad).subscribe(categoryState => {
      
      if (categoryState.error) {
        this.SweetAlert2_.showFancyAlertFail(`Error loading categories: ${categoryState.error}`);
      }
      else if (!categoryState.loading && categoryState.ProductCategory_?.data?.length) {
        // this.tableData=categoryState.ProductCategory_?.data;
        // this.SweetAlert2_.showFancyAlertSuccess("Categories loaded successfully.");
      }
    });
   
  }

  Update(productcategory: ProductCategory) {
    const valid = this.ValidationService_.checkNameExist(this.myEditForm.value.name,this.myEditForm.value._id,this.categories$ );
    console.log(valid.value);
    if(valid.value)
    {
      
     this.popupenvironments.args$.next("Category Exists.");
    }
    else
    {
     
      this.store.dispatch(CategoryActions.updateCategory({ ProductCategory_: productcategory }));
   
      this.actions$.pipe(ofType(updateCategorySuccess)).subscribe(() => {
        
         this.popupenvironments.args$.next("Category Updated");
          this.loadcategory();
        });
     this.actions$.pipe(ofType(CategoryActions.updateCategoryFailure)).subscribe(() => {
       
         this.popupenvironments.args$.next("Something went wrong with Category");
        
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
    this.ManageDataEnvironments.Product2$.next(null);
    this.productservice.getbycategoryid(_id).subscribe({
      next: (records) => {
        this.ManageDataEnvironments.Product2$.next(records);
        this.ManageDataEnvironments.Product$.next(this.ManageDataEnvironments.Product2$?.value.data);
       
        // this.productrecord2 = records;
        //this.productrecord = this.productrecord2?.getproductTask || [];

        if (this.ManageDataEnvironments.Product$?.value.length === 0) {
          this.store.dispatch(CategoryActions.deleteCategory({ _id }));
          this.loadcategory();
        }
        else {
          // ⚠️ Error message
          this.SweetAlert2_.showFancyAlertFail("Can't delete — products exist in another fields.");
        }
      },
      error: (err) => {
        console.error("Error checking category products:", err);
        this.SweetAlert2_.showFancyAlertFail(`Error: ${err.message || err}`);
      }
    });

    // Hide dialog
    
    this.popupenvironments.display$.next("display:none;");
  }

}
