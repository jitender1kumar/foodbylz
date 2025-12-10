import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddOnProductEdit, IAddOnItems, Invoice } from '../../core/Model/crud.model';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { Actions } from '@ngrx/effects';
import { InitializeInvoice } from '../../core/commanFunction/InitializeInvoice.service';
import { filter } from 'rxjs';
import * as InvoiceActions from '../../core/store/invoiceStor/invoice.actions';
@Component({
  selector: 'app-add-on-items',
  standalone: false,
  templateUrl: './add-on-items.component.html',
  styleUrl: './add-on-items.component.css'
})
export class AddOnItemsComponent implements OnInit {
  @Input() showPopUp!: any;
  @Input() closePopUp!: any;
  @Input()
  addOnProducts: any[] = [];
  @Input()
  selectedAddOnItems!: any[];
  @Input() invoice: any;
  @Output() InitializeselectedAddOnItemsCallback = new EventEmitter<any>();
  @Output() closePopUpByChildAddOn = new EventEmitter<boolean>();
  @Output() ReturnChildAddOn = new EventEmitter<boolean>();
  @Output() showHideToggled = new EventEmitter<string>();
  //addOnProducts$!: Observable<any[]>;
  Invoice$!: Observable<any[]>;
  loading$!: Observable<boolean>;
  returnAddOnItemsArray:any[]=[];
  alreadyExists=false;
  error$!: Observable<string | null>;
  invoiceUpdate: Invoice = {
    Chairs: [],
    Taxes: [],
    AddOnItems: [],
    taxpecentRate: 0,
    taxpercentValue: 0,
    DiscountId: '',
    Discountvalue: 0,
    Discountperstage: 0,
    AdditionaldiscountAmount: 0,
    Totalvaue: 0,
    grandtotal: 0,
    RecieptNumber: 0,
    OrderType: '',
    PendingAmount: 0,
    PaidAmount: 0,
    AmountPaidstatus: false,
    Orderstatus: '',
    TotalTaxAmount: 0,
    TotalItemsAmount: 0,
    OrderTypeName: '',
    paybyId: '',
    table_id: '',
    customer_id: '',
    employee_id: '',
    AssistToId: '',
    CommentId: '',
    returnAmount: '',
    tablename: '',
    tokennumber: 0,
    createdAt: new Date()
  }
  AddOnProductEdit_: AddOnProductEdit = {
    name: '',
    description: '',
    Price: 0,
    SelectProductId: '',
    SubQuantityTypeID: '',
    employee_id: '',
    _id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: undefined
  };
  showAddOnItems: boolean = false;

  AddOnItems: IAddOnItems = {
    _id: '',
    numberofQuantity: 0
  };
  AddOnItemsArray: IAddOnItems[] = [];
  selectedAddOnProduct: any;
  

  constructor(private store: Store<{
    productLoad: any;
    subQuantityTypeLoad: any;
    subQuantityTypeByIdLoad: any;
    addOnProductReducer_: any;

    invoiceReducer_: any;
  }>,
    private router: Router,
    private formBuilder: FormBuilder,
    public actions$: Actions, private InitializeInvoice_: InitializeInvoice,
    private validationService: ValidationService) {
    this.Invoice$ = this.store.select(state => state.invoiceReducer_.data);
    this.loading$ = this.store.select(state => state.invoiceReducer_.loading);
    this.error$ = this.store.select(state => state.invoiceReducer_.error);

  }
  ngOnInit(): void {
    this.alreadyExists=false;
  }
  
  toggleAddOnItems() {
    this.showAddOnItems = !this.showAddOnItems;
    this.showHideToggled.emit(this.showAddOnItems.toString());
  }
  removeAddOnItem(_id: string) {
    const item = this.selectedAddOnItems?.find(items => items._id === _id);
    let index:number|undefined  = this.selectedAddOnItems?.findIndex(items => items._id === _id);
    if (item) {

      this.selectedAddOnItems?.splice(index, 1);
      console.log(this.selectedAddOnItems);
      this.updateInvoice(this.selectedAddOnItems);
      this.InitializeselectedAddOnItemsCallback.emit(this.selectedAddOnItems);
      this.alreadyExists=false;
    }

  }
  onAddOnProductSelect() {
    this.AddOnItemsArray=[];
    console.log(this.selectedAddOnProduct);
    console.log(this.selectedAddOnItems);
    console.log(this.invoice);
    const item = this.addOnProducts.find(items => items._id === this.selectedAddOnProduct);
    const index = this.addOnProducts.findIndex(items => items._id === this.selectedAddOnProduct);
    console.log(item);

    this.alreadyExists=false;
    this.AddOnItemsArray = this.selectedAddOnItems;

    // Check if the item is already present in selectedAddOnItems
     this.alreadyExists = this.AddOnItemsArray.some(
      item => item._id === this.selectedAddOnProduct
    );

    if (!this.alreadyExists) {
      this.AddOnItems = {
        _id: this.selectedAddOnProduct,
        numberofQuantity: 1
      };
      this.AddOnItemsArray.push(this.AddOnItems);
      console.log(this.AddOnItemsArray);
      this.updateInvoice(this.AddOnItemsArray);
      this.InitializeselectedAddOnItemsCallback.emit(this.selectedAddOnItems);
    } else {
      // Optionally, alert the user or just log and do nothing if already present
      this.alreadyExists=true;
      console.log('Add-on item already exists, not adding again.');
    }
    return;
    // Store subscriptions to clean up later if needed

  }
  
  updateInvoice(AddOnItemsArray:any) {
    
    console.log(AddOnItemsArray);
    console.log(this.invoice[0]);
    this.invoiceUpdate = {
      Chairs: this.invoice[0].Chairs,
      Taxes: this.invoice[0].Taxes,
      AddOnItems: AddOnItemsArray,
      taxpecentRate: this.invoice[0].taxpecentRate,
      taxpercentValue: this.invoice[0].taxpercentValue,
      DiscountId: this.invoice[0].DiscountId,
      Discountvalue: this.invoice[0].Discountvalue,
      Discountperstage: this.invoice[0].Discountperstage,
      AdditionaldiscountAmount: this.invoice[0].AdditionaldiscountAmount,
      Totalvaue: this.invoice[0].Totalvaue,
      grandtotal: this.invoice[0].grandtotal,
      RecieptNumber: this.invoice[0].RecieptNumber,
      OrderType: this.invoice[0].OrderType,
      PendingAmount: this.invoice[0].PendingAmount,
      PaidAmount: this.invoice[0].PaidAmount,
      AmountPaidstatus: this.invoice[0].AmountPaidstatus,
      Orderstatus: this.invoice[0].Orderstatus,
      TotalTaxAmount: this.invoice[0].TotalTaxAmount,
      TotalItemsAmount: this.invoice[0].TotalItemsAmount,
      OrderTypeName: this.invoice[0].OrderTypeName,
      paybyId: this.invoice[0].paybyId,
      table_id: this.invoice[0].table_id,
      customer_id: this.invoice[0].customer_id,
      employee_id: this.invoice[0].employee_id,
      AssistToId: this.invoice[0].AssistToId,
      CommentId: this.invoice[0].CommentId,
      returnAmount: this.invoice[0].returnAmount,
      tablename: this.invoice[0].tablename,
      tokennumber: this.invoice[0].tokennumber,
      createdAt: this.invoice[0].createdAt
    }
    // // Dispatch an action to update the invoice using ngrx
    // // Dispatch the update invoice action

     this.store.dispatch(InvoiceActions.updateInvoice({ invoice: this.invoiceUpdate }));

    // // Listen for success and failure actions
    
    const successSub = this.actions$.pipe(
      filter((action: any) => action.type === InvoiceActions.updateInvoiceSuccess.type)
    ).subscribe(action => {
      // Handle success, e.g., show a success message or close the popup
      console.log('Invoice updated successfully:', action.invoice);
      //this.close();
    });

    const failureSub = this.actions$.pipe(
      filter((action: any) => action.type === InvoiceActions.updateInvoiceFailure.type)
    ).subscribe(action => {
      // Handle failure, e.g., show an error message
      console.error('Failed to update invoice:', action.error);
      // Optionally, show an error message to the user
    });
  }
  increamentAddOnItem(_id:string)
  {
    this.selectedAddOnProduct=_id
    console.log(_id);
    console.log(this.selectedAddOnProduct);
    console.log(this.selectedAddOnItems);
    console.log(this.selectedAddOnItems.length);
   console.log(this.AddOnItemsArray);
    // console.log(this.selectedAddOnItems);
    const item = this.selectedAddOnItems.find(items => items._id === _id);
    const index = this.selectedAddOnItems.findIndex(items => items._id === _id);
    console.log(item);
    console.log(index);
    console.log(item.numberofQuantity);
    if(item)
    {
      this.increament_decreament(item._id,+item.numberofQuantity+1,index);

    }
    
  }
  decrementAddOnItem(_id:string)
  {
    this.selectedAddOnProduct=_id
    console.log(this.selectedAddOnProduct);
    console.log(this.selectedAddOnItems);
    console.log(this.selectedAddOnItems.length);
    console.log(this.AddOnItemsArray);
    console.log(_id);
    
    const item = this.selectedAddOnItems.find(items => items._id === _id);
    const index = this.selectedAddOnItems.findIndex(items => items._id === _id);
    // console.log(item.numberofQuantity);
    // console.log(item.numberofQuantity[index]);
    if(item)
    {
      if(item.numberofQuantity>0)
      {
        this.increament_decreament(item._id,+item.numberofQuantity-1,index);
      }
    }
  }
  increament_decreament(_id:string,quantity:number,index:number)
  {
    //const item = this.selectedAddOnItems.find(items => items._id === _id);
     index = this.selectedAddOnItems?.findIndex(items => items._id === _id);
    if(quantity==0)
    {
      this.selectedAddOnItems?.splice(index, 1);
    //  this.updateInvoice(this.selectedAddOnItems);
    this.updateInvoice(this.selectedAddOnItems);
    this.InitializeselectedAddOnItemsCallback.emit(this.selectedAddOnItems);
    this.alreadyExists=false;
      return;
    }
    if(quantity>0)
    {this.AddOnItemsArray=[];
      this.selectedAddOnItems[index]._id=_id;
      this.selectedAddOnItems[index].numberofQuantity=quantity;
      for(let ii =0; ii<this.selectedAddOnItems.length; ii++)
      {
        this.AddOnItems = {
          _id: this.selectedAddOnItems[ii]._id, //this.selectedAddOnItems[i]._id,
          numberofQuantity: this.selectedAddOnItems[ii].numberofQuantity
        };
        this.AddOnItemsArray.push(this.AddOnItems);
      }
     // this.selectedAddOnItems;
     
     
     
     
      this.updateInvoice( this.AddOnItemsArray);
      this.InitializeselectedAddOnItemsCallback.emit( this.AddOnItemsArray);
      return;
    }


    // this.AddOnItems = {
    //   _id: _id,
    //   numberofQuantity: quntity
    // };
  }
  close() {
    this.closePopUpByChildAddOn.emit(false);
  }
}
