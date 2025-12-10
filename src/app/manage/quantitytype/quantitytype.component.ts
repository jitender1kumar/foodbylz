import { Component, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { Quantitytype } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ProductPriceService } from '../../core/Services/productprice.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addQuantityType, deleteQuantityType, loadQuantityType, updateQuantityType, updateQuantityTypeFailure, updateQuantityTypeSuccess } from '../ManageStore/quntityTypeStore/quntityType.actions';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ofType, Actions } from '@ngrx/effects';
import {  ValidationService } from '../../core/commanFunction/Validation.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';
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
  args: any = null;
  myEditForm: FormGroup;
  popdata2: any;
  display: any;
  tablename: any;
  valueid: any;
  modal: any;
  employeeId = "JSK";
  productrecord: any;
  productrecord2: any
  quantityTypeNameResult: any;
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  @ViewChild('f')
  quantitytypeViewchild!: NgForm;
  categorynamedata: any;
  categorynamedata2: any;

  quantitytypes: Quantitytype = {
    _id: '',
    name: '',
    Desc: ''
  }
  name: any;
  Desc: any;




  cDelete(_id: any) {


  }
  myAddForm: FormGroup;
  constructor(
    private service: QuantitytypeService,
    private router: Router,
    private ValidationService_:ValidationService,
    private formedit: FormBuilder,
    private productPriceservice: ProductPriceService,
    private store: Store<{ quantityTypeLoad: any }>,
    private SweetAlert2_: SweetAlert2,
    public actions$: Actions
  ) {
    this.Qtypenamedata$ = store.select(state => state.quantityTypeLoad.QuantityType_.data);
    this.loading$ = store.select(state => state.quantityTypeLoad.loading);
    this.error$ = store.select(state => state.quantityTypeLoad.error);
    this.display = "display:none;"
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
 add(quantityType: Quantitytype): void {
  this.service.getQuantityTypeNameByName(quantityType.name).subscribe({
    next: (result: any) => {
      const existingCount = (result?.data?.length) || 0;
      this.quantityTypeNameResult = result;

      if (existingCount === 0) {
        this.addNewQuantityType(quantityType);
      } else {
        this.showDuplicateNameMessage(quantityType.name);
      }
    },
    error: (err) => {
      console.error("Error checking quantity type name:", err);
      this.args = "Error occurred while checking the quantity type name.";
    }
  });
}

private addNewQuantityType(quantityType: Quantitytype): void {
  this.store.dispatch(addQuantityType({ QuantityType_: quantityType }));
  this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(
    state => state.quantityTypeLoad.QuantityType_.data
  );
  this.args = `Quantity Type Name: ${quantityType.name} Added`;
}

private showDuplicateNameMessage(name: string): void {
  this.args = `Quantity Type Name: ${name} Exists. Please create another name.`;
}


  colDefs: ColumnDef[] = [
    { field: "name",sortable:true },
    { field: "Desc",sortable:true },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block"
      this.valueid = r[0].row._id;
      this.tablename = "qtyp";
    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [r[0].row._id],
        name: [r[0].row.name, Validators.required],
        Desc: [r[0].row.Desc]
      });

    }
   }
  

  loadQtype() {
    this.store.dispatch(loadQuantityType());

    this.Qtypenamedata$ = this.store.select(
      state => state.quantityTypeLoad.QuantityType_.data
    );
    this.loading$ = this.store.select(state => state.quantityTypeLoad.loading);
    this.error$ = this.store.select(state => state.quantityTypeLoad.error);

    // Handle success message
    this.Qtypenamedata$.subscribe(data => {
      if (data && data.length > 0) {
        // console.log('✅ Quantity types loaded successfully!');
        // You can use Angular Material Snackbar or Toast here
      }
    });

    // Handle error message
    this.error$.subscribe(error => {
      if (error) {
        console.error('❌ Failed to load quantity types:', error);
        // Show toast/snackbar error message
      }
    });
  }

  show: any = false;
  showEdit: any = false;
  shows() {
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
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
  deletedConfirmed(_id: any): void {
  this.productPriceservice.getbyidQtypid(_id).subscribe({
    next: (records: any) => {
      // Use type assertion to access data
      const productList = (records as { data?: any[] })?.data || [];
      this.productrecord2 = records;
      this.productrecord = productList;

      console.log(productList.length, records);

      if (productList.length === 0) {
        this.deleteQuantityTypeAndReload(_id);
      } else {
        this.showDeleteBlockedMessage();
      }
    },
    error: (err) => {
      console.error("Error fetching product records:", err);
      this.SweetAlert2_.showFancyAlertFail("Failed to check linked products. Please try again.");
    }
  });
   this.display = "display:none;";
}

private deleteQuantityTypeAndReload(_id: any): void {
  this.store.dispatch(deleteQuantityType({ _id }));
  this.store.dispatch(loadQuantityType());
  this.Qtypenamedata$ = this.store.select(
    state => state.quantityTypeLoad.QuantityType_.data
  );
 // this.SweetAlert2_.showFancyAlertSuccess("Record Deleted");
}

private showDeleteBlockedMessage(): void {
  this.SweetAlert2_.showFancyAlertFail(
    "Can't delete because there are products linked to this quantity type."
  );
}
  onFormUpdateSubmit() {
    this.update(this.myEditForm.value);
  }
  update(quantityType: Quantitytype): void {
     if(this.ValidationService_.checkNameExist(this.myEditForm.value.name,this.myEditForm.value._id,this.Qtypenamedata$ ))
    {
     this.args = `Quantity Type Name: ${this.myEditForm.value.name} Exists. Please create another name.`;
    }
    else
    {
  this.store.dispatch(updateQuantityType({ QuantityType_: quantityType }));
  this.actions$.pipe(ofType(updateQuantityTypeSuccess)).subscribe(() => {
     this.args="Record Updated";
      this.loadQtype();
    });
 this.actions$.pipe(ofType(updateQuantityTypeFailure)).subscribe(() => {
     this.args="Something went wrong";
      
    });
  }
}
}
