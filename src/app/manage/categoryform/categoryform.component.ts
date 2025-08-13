import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/Services/category.service';
import { ProductCategory, Quantitytype } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ProductService } from '../../core/Services/product.service';
import { Store } from '@ngrx/store';
import * as CategoryActions from '../ManageStore/categoryStore/category.actions';
import { loadCategories, updateCategorySuccess } from '../ManageStore/categoryStore/category.actions';
import { Observable } from 'rxjs';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { Actions, ofType } from '@ngrx/effects';
import { NameExistOrNotService } from '../../core/commanFunction/NameExistOrNot.service';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class CategoryformComponent implements OnInit {

  categories$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  args: any = "";
  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];

  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;
  categorynamedata2: any;
  categorynamedata: any;
  productrecord: any;
  productrecord2: any;
  categoryNameResult: any;
  procategorry: ProductCategory = {
    _id: '',
    name: '', categorydesc: '',
    createdAt: ''
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "categorydesc", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];

  categorydesc: any;
  name: any;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  myAddForm: FormGroup;
  constructor(private service: CategoryService,
     private router: Router, 
     private formedit: FormBuilder,
         public actions$: Actions,
         private NameExistOrNotService_:NameExistOrNotService,
      private productservice: ProductService,
       private store: Store<{ categoryLoad: any }>, private SweetAlert2_: SweetAlert2) {
    this.categories$ = store.select(state => state.categoryLoad.ProductCategory_.allTasks);
    this.loading$ = store.select(state => state.categoryLoad.loading);
    this.error$ = store.select(state => state.categoryLoad.error);
    this.display = "display:none;"
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
    this.store.dispatch(loadCategories());
  }

  add(ProductCategory_: ProductCategory): void {
    this.service.getCategoryByName(ProductCategory_.name).subscribe({
      next: (categoryName) => {
        this.categoryNameResult = categoryName;

        if (!this.categoryNameResult?.allTasks?.length) {
          // Add new category
          this.store.dispatch(CategoryActions.addCategory({ ProductCategory_: ProductCategory_ }));
          this.store.dispatch(CategoryActions.loadCategories());

          this.loadcategory();
          // Success message
          this.args = `✅ Successfully Added Category: ${ProductCategory_.name}`;
        } else {
          // Duplicate warning
          this.args = `⚠️ Category Name "${ProductCategory_.name}" already exists. Please choose another.`;
        }
      },
      error: (err) => {
        console.error('Error checking category name:', err);
        this.args = `❌ Error checking category name: ${err.message || err}`;
      }
    });
  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.deleteDisplayBlock(event.data);
    }
    if (event.colDef.field == 'Edit') {
      this.editDisplayBlock(event.data);
    }

  }
  deleteDisplayBlock(id: any) {

    this.valueid = "";
    this.modal = "modal";
    this.display = "display:block"
    this.valueid = id._id;
    this.tablename = "cate";
  }
  editDisplayBlock(editData: any) {
    this.popdata2 = editData;
    this.showEdit = true;
    this.show = false;
    this.args = "";
    this.myEditForm = this.formedit.group({
      _id: [editData._id],
      name: [editData.name, Validators.required],
      categorydesc: [editData.categorydesc]
    });
  }
  loadcategory() {
    this.store.dispatch(CategoryActions.loadCategories());

    this.categories$ = this.store.select(
      state => state.categoryLoad?.ProductCategory_?.allTasks
    );

    this.store.select(state => state.categoryLoad).subscribe(categoryState => {
      if (categoryState.error) {
        this.SweetAlert2_.showFancyAlertFail(`Error loading categories: ${categoryState.error}`);
      }
      else if (!categoryState.loading && categoryState.ProductCategory_?.allTasks?.length) {
        // this.SweetAlert2_.showFancyAlertSuccess("Categories loaded successfully.");
      }
    });
  }

  Update(productcategory: ProductCategory) {
    if(this.NameExistOrNotService_.checkNameExist(this.myEditForm.value.name,this.myEditForm.value._id,this.categories$ ))
    {
     this.args="Category Exists.";
    }
    else
    {
     
      this.store.dispatch(CategoryActions.updateCategory({ ProductCategory_: productcategory }));
   
      this.actions$.pipe(ofType(updateCategorySuccess)).subscribe(() => {
         this.args="Category Updated";
          this.loadcategory();
        });
     this.actions$.pipe(ofType(CategoryActions.updateCategoryFailure)).subscribe(() => {
         this.args="Something went wrong with Category";
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
    this.productservice.getbycategoryid(_id).subscribe({
      next: (records) => {
        this.productrecord2 = records;
        this.productrecord = this.productrecord2?.allTasks || [];

        if (this.productrecord.length === 0) {
          this.store.dispatch(CategoryActions.deleteCategory({ _id }));


          // Safe selector to avoid undefined errors
          this.categories$ = this.store.select(
            state => state.categoryLoad?.ProductCategory_?.allTasks
          );

          // ✅ Success message
          // this.SweetAlert2_.showFancyAlertSuccess("Category deleted successfully.");
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
    this.display = "display:none;";
  }

}
