import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryformComponent } from './categoryform/categoryform.component';
import { ProductformComponent } from './productform/productform.component';
import { CategorytypeformComponent } from './quantitytype/quantitytype.component';
import { ProductpriceformComponent } from './productpriceform/productpriceform.component';
import {  SubQuantityTypeComponenet } from './subquantitytype/subquantitytype.component';
import { TaxComponent } from './tax/tax.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { PopupCrudComponent } from 'popup-crud';
import { ManageComponent } from './manage.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductCategoryEffects } from './ManageStore/categoryStore/category.effects';
import { CategoryService } from '../core/Services/category.service';
import { StoreModule } from '@ngrx/store';
import { categoryAddReducer, categoryDeleteReducer, categoryLoadReducer, categoryUpdateReducer } from './ManageStore/categoryStore/category.reducer';
import { loadProductPrice } from './ManageStore/productPriceStore/productPrice.actions';
import { productPriceAddReducer, productPriceDeleteReducer, productPriceLoadReducer, productPriceUpdateReducer } from './ManageStore/productPriceStore/productPrice.reducer';
import { ProductAddReducer, ProductByIdLoadReducer, ProductDeleteReducer, ProductLoadReducer, ProductUpdateReducer } from './ManageStore/productStore/product.reducer';
import { QuantityTypeAddReducer, QuantityTypeDeleteReducer, QuantityTypeLoadReducer, QuantityTypeUpdateReducer } from './ManageStore/quntityTypeStore/quntityType.reducer';
import { SubQuantityTypeAddReducer, SubQuantityTypeByIdLoadReducer, SubQuantityTypeDeleteReducer, SubQuantityTypeLoadReducer, SubQuantityTypeUpdateReducer } from './ManageStore/subQuantityTypeStore/subQuantityType.reducer';
import { TaxAddReducer, TaxDeleteReducer, TaxLoadReducer, TaxUpdateReducer } from './ManageStore/taxStore/tax.reducer';
import { ProductPriceEffects } from './ManageStore/productPriceStore/productPrice.effects';
import { ProductEffects } from './ManageStore/productStore/product.effects';
import { ProductQuantityTypeEffects } from './ManageStore/quntityTypeStore/quntityType.effects';
import { ProductSubQuantityTypeEffects } from './ManageStore/subQuantityTypeStore/subQuantityType.effects';
import { ProductTaxEffects } from './ManageStore/taxStore/tax.effects';

const routes: Routes = [
  {path:'category',component:CategoryformComponent},
  {path:'Quantitytype',component:CategorytypeformComponent},
  {path:'productprice',component:ProductpriceformComponent},
  {path:'basetype',component:SubQuantityTypeComponenet},
  {path:'product',component:ProductformComponent},
  {path:'popup',component:PopupmodelComponent},
  {path:'tax',component:TaxComponent},
];

@NgModule({
  declarations: [
      CategoryformComponent,
      ProductformComponent,
      CategorytypeformComponent,
      ProductpriceformComponent,
      SubQuantityTypeComponenet,
      TaxComponent,
      ManageComponent,],
  imports: [
     CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
        FormsModule,PopupmodelComponent,
        // StoreModule.forRoot({ categoryLoad: categoryLoadReducer,categoryAdd: categoryAddReducer,categoryUpdate: categoryUpdateReducer,categoryDelete: categoryDeleteReducer,
        //   productPriceLoad: productPriceLoadReducer,productPriceAdd: productPriceAddReducer,productPriceUpdate: productPriceUpdateReducer,productPriceDelete: productPriceDeleteReducer,
        //   productLoad: ProductLoadReducer,productAdd: ProductAddReducer,productUpdate: ProductUpdateReducer,productDelete: ProductDeleteReducer,productByIdLoad:ProductByIdLoadReducer,
        //   quantityTypeLoad: QuantityTypeLoadReducer,quantityTypeAdd: QuantityTypeAddReducer,quantityTypeUpdate: QuantityTypeUpdateReducer,quantityTypeDelete: QuantityTypeDeleteReducer,
        //   subQuantityTypeLoad: SubQuantityTypeLoadReducer,subQuantityTypeAdd: SubQuantityTypeAddReducer,subQuantityTypeUpdate: SubQuantityTypeUpdateReducer,subQuantityTypeDelete: SubQuantityTypeDeleteReducer,subQuantityTypeByIdLoad:SubQuantityTypeByIdLoadReducer,
        //   taxLoad: TaxLoadReducer,taxAdd: TaxAddReducer,taxUpdate: TaxUpdateReducer,taxDelete: TaxDeleteReducer
        //  }),// Register reducer
    //EffectsModule.forRoot([ProductCategoryEffects,ProductPriceEffects,ProductEffects,ProductQuantityTypeEffects,ProductSubQuantityTypeEffects,ProductTaxEffects])          
        //EffectsModule.forFeature([])
  ],
  providers: [CategoryService],
  exports:[
      CategoryformComponent,
      ProductformComponent,
      CategorytypeformComponent,
      ProductpriceformComponent,
      SubQuantityTypeComponenet,
      TaxComponent,]
})
export class ManageModule { }
