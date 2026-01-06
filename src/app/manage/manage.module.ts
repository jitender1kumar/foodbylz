import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CategoryformComponent } from './categoryform/categoryform.component';
import { ProductformComponent } from './productform/productform.component';
import { CategorytypeformComponent } from './quantitytype/quantitytype.component';
import { ProductpriceformComponent } from './productpriceform/productpriceform.component';
import { SubQuantityTypeComponenet } from './subquantitytype/subquantitytype.component';
import { TaxComponent } from './tax/tax.component';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { ManageComponent } from './manage.component';
import { AddOnProductComponent } from './add-on-product/add-on-product.component';

import { CategoryService } from '../core/Services/category.service';
import { GridTableModule } from '../core/shared/dynamicTable/gird-table/gridtable.module';
import { HomeModule } from '../home/home.module';
import { MakemeDefaultComponent } from './makeMeDefaultPayBy/makeme-default/makeme-default.component';

const routes: Routes = [
  { path: 'category', component: CategoryformComponent },
  { path: 'Quantitytype', component: CategorytypeformComponent },
  { path: 'productprice', component: ProductpriceformComponent },
  { path: 'basetype', component: SubQuantityTypeComponenet },
  { path: 'product', component: ProductformComponent },
  { path: 'popup', component: PopupmodelComponent },
  { path: 'tax', component: TaxComponent },
  { path: 'discount', loadChildren: () => import('../discount/discount.module').then(m => m.DiscountModule) },
  // { path: 'discount', loadChildren: () => import('./discount/discount.module').then(m => m.DiscountModule) },
];

const COMPONENTS = [
  CategoryformComponent,
  ProductformComponent,
  CategorytypeformComponent,
  ProductpriceformComponent,
  SubQuantityTypeComponenet,
  TaxComponent,
  ManageComponent,
  MakemeDefaultComponent,
  AddOnProductComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    PopupmodelComponent,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
   
    GridTableModule
  ],
  providers: [CategoryService],
  exports: [
    CategoryformComponent,
    ProductformComponent,
    CategorytypeformComponent,
    ProductpriceformComponent,
    SubQuantityTypeComponenet,
    TaxComponent,
    PopupmodelComponent,
    MakemeDefaultComponent
  ]
})
export class ManageModule { }
