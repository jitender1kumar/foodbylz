import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryfoodComponent } from './inventoryFoodwithProduct/inventoryFoodwithProduct.component';
import { InventorymainfoodComponent } from './inventoryMainFood/inventorymainfood.component';
import { InventoryfoodquntitytypeComponent } from './inventoryFoodQuntityType/inventoryfoodquntitytype.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';import { StoreModule } from '@ngrx/store';
import { InventoryFoodQuantityTypeLoadReducer } from './inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductInventoryFoodQuantityTypeEffects } from './inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.effects';
;

const routes: Routes = [
  {path:'imfwp',component:InventoryfoodComponent},
  {path:'imf',component:InventorymainfoodComponent},
  {path:'ifqt',component:InventoryfoodquntitytypeComponent}
];

@NgModule({
  declarations: [InventoryfoodComponent,
    InventorymainfoodComponent,
    InventoryfoodquntitytypeComponent,],
  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,PopupmodelComponent,
    PopupCrudComponent
],
  exports:[InventoryfoodComponent,
    InventorymainfoodComponent,
    InventoryfoodquntitytypeComponent
    ]
})
export class InventoryModule { }
