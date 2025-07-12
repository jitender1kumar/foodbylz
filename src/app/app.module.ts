import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './shared/navbars/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PopupCrudComponent } from "../../projects/popup-crud/src/lib/popup-crud.component";
import { PopupmodelComponent} from './popupmodel/popupmodel.component';
//import { HomeComponent } from './home/home.component';
import { PickupComponent } from './orderMode/pickup/pickup.component';
import { OnlinedeliveryComponent } from './orderMode/onlinedelivery/onlinedelivery.component';
import { ManagefoodnavbarComponent } from './shared/navbars/managefoodnavbar/managefoodnavbar.component';
import { RunningordersComponent } from '../../userend/crud/runningorders/runningorders.component';
import { GoodscollectionComponent } from '../../userend/crud/goodscollection/goodscollection.component';
import { PaybymanageComponent } from '../../userend/crud/paybymanage/paybymanage.component';
import { InventoryModule } from './inventory/inventory.module';
import { DineModule } from './dine/dine.module';
import { CompanyModule } from './company/company.module';
import { ManageModule } from './manage/manage.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManageComponent } from './manage/manage.component';
import { ShowbuttonComponent } from './showbutton/showbutton.component';
import { InventoryFoodQuantityTypeLoadReducer } from './inventory/inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductInventoryFoodQuantityTypeEffects } from './inventory/inventoryStore/inventoryFoodQuantityTypeStore/inventoryFoodQuantityType.effects';
import { categoryAddReducer, categoryDeleteReducer, categoryLoadReducer, categoryUpdateReducer } from './manage/ManageStore/categoryStore/category.reducer';
import { productPriceAddReducer, productPriceDeleteReducer, productPriceLoadReducer, productPriceUpdateReducer } from './manage/ManageStore/productPriceStore/productPrice.reducer';
import { ProductAddReducer, ProductByIdLoadReducer, ProductDeleteReducer, ProductLoadReducer, ProductUpdateReducer } from './manage/ManageStore/productStore/product.reducer';
import { QuantityTypeAddReducer, QuantityTypeDeleteReducer, QuantityTypeLoadReducer, QuantityTypeUpdateReducer } from './manage/ManageStore/quntityTypeStore/quntityType.reducer';
import { SubQuantityTypeAddReducer, SubQuantityTypeByIdLoadReducer, SubQuantityTypeByNameLoadReducer, SubQuantityTypeDeleteReducer, SubQuantityTypeLoadReducer, SubQuantityTypeUpdateReducer } from './manage/ManageStore/subQuantityTypeStore/subQuantityType.reducer';
import { TaxAddReducer, TaxDeleteReducer, TaxLoadReducer, TaxUpdateReducer } from './manage/ManageStore/taxStore/tax.reducer';
import { ProductCategoryEffects } from './manage/ManageStore/categoryStore/category.effects';
import { ProductPriceEffects } from './manage/ManageStore/productPriceStore/productPrice.effects';
import { ProductEffects } from './manage/ManageStore/productStore/product.effects';
import { ProductQuantityTypeEffects } from './manage/ManageStore/quntityTypeStore/quntityType.effects';
import { ProductSubQuantityTypeEffects } from './manage/ManageStore/subQuantityTypeStore/subQuantityType.effects';
import { ProductTaxEffects } from './manage/ManageStore/taxStore/tax.effects';
import { InventoryMainFoodLoadReducer } from './inventory/inventoryStore/inventoryMainFoodStore/inventoryMainFood.reducer';
import { ProductInventoryMainFoodEffects } from './inventory/inventoryStore/inventoryMainFoodStore/inventoryMainFood.effects';
import { InventoryFoodwithProductLoadReducer } from './inventory/inventoryStore/inventoryFoodwithProductStore/inventoryFoodwithProduct.reducer';
import { ProductInventoryFoodwithProductEffects } from './inventory/inventoryStore/inventoryFoodwithProductStore/inventoryFoodwithProduct.effects';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CustomersModule } from './customers/customers.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
 
  {path:'popup',component:PopupmodelComponent},
  {path:'',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  
  {path:'runningorder',component:RunningordersComponent},
  {path:'Payby',component:PaybymanageComponent},
  {path:'manage',component:ManageComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PickupComponent,
    OnlinedeliveryComponent,
    ManagefoodnavbarComponent,
    RunningordersComponent,
    GoodscollectionComponent,
    PaybymanageComponent,
    ShowbuttonComponent,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule, AgGridAngular,
    AppRoutingModule,CompanyModule,ManageModule,DashboardModule,
    DineModule,BrowserAnimationsModule,CustomersModule,HomeModule,
    InventoryModule,PopupmodelComponent,PopupCrudComponent
    ,StoreModule.forRoot({ categoryLoad: categoryLoadReducer,categoryAdd: categoryAddReducer,categoryUpdate: categoryUpdateReducer,categoryDelete: categoryDeleteReducer,
              productPriceLoad: productPriceLoadReducer,productPriceAdd: productPriceAddReducer,productPriceUpdate: productPriceUpdateReducer,productPriceDelete: productPriceDeleteReducer,
              productLoad: ProductLoadReducer,productAdd: ProductAddReducer,productUpdate: ProductUpdateReducer,productDelete: ProductDeleteReducer,productByIdLoad:ProductByIdLoadReducer,
              quantityTypeLoad: QuantityTypeLoadReducer,quantityTypeAdd: QuantityTypeAddReducer,quantityTypeUpdate: QuantityTypeUpdateReducer,quantityTypeDelete: QuantityTypeDeleteReducer,
             subQuantityTypeByNameLoad:SubQuantityTypeByNameLoadReducer, subQuantityTypeLoad: SubQuantityTypeLoadReducer,subQuantityTypeAdd: SubQuantityTypeAddReducer,subQuantityTypeUpdate: SubQuantityTypeUpdateReducer,subQuantityTypeDelete: SubQuantityTypeDeleteReducer,subQuantityTypeByIdLoad:SubQuantityTypeByIdLoadReducer,
              taxLoad: TaxLoadReducer,taxAdd: TaxAddReducer,taxUpdate: TaxUpdateReducer,taxDelete: TaxDeleteReducer
              //end manage module
            ,loadInventoryFoodQuantityType:InventoryFoodQuantityTypeLoadReducer
            ,loadInventoryMainFood:InventoryMainFoodLoadReducer
          ,loadAssocciatedInvtoryFood:InventoryFoodwithProductLoadReducer}),// Register reducer
    EffectsModule.forRoot([ProductCategoryEffects,ProductPriceEffects,ProductEffects,ProductQuantityTypeEffects,ProductSubQuantityTypeEffects,ProductTaxEffects,ProductInventoryFoodQuantityTypeEffects,
      ProductInventoryMainFoodEffects,ProductInventoryFoodwithProductEffects
    ])          
      
    
],
  providers: [
    provideClientHydration(),provideHttpClient(),DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

