import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupmodelComponent } from './popupmodel/popupmodel.component';
import { ManagefoodnavbarComponent } from './core/shared/managefoodnavbar/managefoodnavbar.component';
import { PaybymanageComponent } from './manage/paybymanage/paybymanage.component';
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
import {
  categoryAddReducer,
  categoryDeleteReducer,
  categoryLoadReducer,
  categoryUpdateReducer
} from './manage/ManageStore/categoryStore/category.reducer';
import {
  productPriceAddReducer,
  productPriceDeleteReducer,
  productPriceLoadReducer,
  productPriceUpdateReducer,
  productPriceReducerShortcode
} from './manage/ManageStore/productPriceStore/productPrice.reducer';
import {
  ProductAddReducer,
  ProductByIdLoadReducer,
  ProductDeleteReducer,
  ProductLoadReducer,
  ProductUpdateReducer
} from './manage/ManageStore/productStore/product.reducer';
import {
  QuantityTypeAddReducer,
  QuantityTypeDeleteReducer,
  QuantityTypeLoadReducer,
  QuantityTypeUpdateReducer
} from './manage/ManageStore/quntityTypeStore/quntityType.reducer';
import {
  SubQuantityTypeAddReducer,
  SubQuantityTypeByIdLoadReducer,
  SubQuantityTypeByNameLoadReducer,
  SubQuantityTypeDeleteReducer,
  SubQuantityTypeLoadReducer,
  SubQuantityTypeUpdateReducer
} from './manage/ManageStore/subQuantityTypeStore/subQuantityType.reducer';
import {
  TaxAddReducer,
  TaxDeleteReducer,
  TaxLoadReducer,
  TaxUpdateReducer
} from './manage/ManageStore/taxStore/tax.reducer';
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
import { FloorEffects } from './dine/dineStore/floorStore/floor.effects';
import {
  floorAddReducer,
  floorDeleteReducer,
  floorLoadReducer,
  floorUpdateReducer
} from './dine/dineStore/floorStore/floor.reducer';
import { dineTableReducer } from './dine/dineStore/dinetableStore/dinetable.reducer';
import { DineEffects } from './dine/dineStore/dinetableStore/dinetable.effects';
import { invoiceReducer } from './core/store/invoiceStor/invoice.reducers';
import { InvoiceEffects } from './core/store/invoiceStor/invoice.effects';
import { customersReducer } from './customers/customersStore/customers.reducer';
import { CustomersEffects } from './customers/customersStore/customers.effects';
import {
  addOnProductEditReducer,
  addOnProductReducer,
  getAddOnProductByIdReducer,
  getByProductIdSubQTypeIDAddOnProductsReducer,
  loadAddOnProductReducer
} from './manage/ManageStore/addOnProductStore/addOnProduct.reducer';
import { AddOnProductEffects } from './manage/ManageStore/addOnProductStore/addOnProduct.effects';
import { productItemReducer } from './home/homeStore/productItemStore/productItem.reducers';
import { ProductItemEffects } from './home/homeStore/productItemStore/productItem.effects';
import { runningItemKOTReducer } from './home/homeStore/runningItemKOTStore/runningItemKOT.reducers';
import { metaReducers } from './home/homeStore/runningItemKOTStore/localStorage';
import { GirdTableComponent } from './core/shared/dynamicTable/gird-table/gird-table.component';
import { GridTableModule } from './core/shared/dynamicTable/gird-table/gridtable.module';
import { CompanyloginComponent } from './company/companyAuth/companylogin/companylogin.component';
import { reserveTableReducer } from './dine/dineStore/reserveTableStore/reserveTable.reducer';
import { ReserveTableEffects } from './dine/dineStore/reserveTableStore/reserveTable.effect';
import {  RunningItemKOTEffects } from './home/homeStore/runningItemKOTStore/runningItemKOT.effects';
import { PaymentModule } from './payment/payment.module';
import { DiscountModule } from './discount/discount.module';
import { DiscountEffects } from './discount/store/discount.effects';
import { discountReducer } from './discount/store/discount.reducers';
import { runningItemReducer } from './home/homeStore/runningItemStore/runningItem.reducers';
import { RunningItemEffects } from './home/homeStore/runningItemStore/runningItem.effects';
import { splitBillReducer } from './home/partial/splitbill/splitbillStore/splitbill.reducer';
import { SplitBillEffects } from './home/partial/splitbill/splitbillStore/splitbill.effects';
import { GenratedItemsReducer } from './home/homeStore/GentratedItemsStore/GenratedItems.reducer';
import { GenratedItemsEffects } from './home/homeStore/GentratedItemsStore/GenratedItems.effects';

const routes: Routes = [
  { path: 'popup', component: PopupmodelComponent },
  { path: '', component: HomeComponent },
 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'Payby', component: PaybymanageComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'Home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManagefoodnavbarComponent,
    PaybymanageComponent,
    ShowbuttonComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    GridTableModule,
    AppRoutingModule,
    CompanyModule,
    ManageModule,
    DashboardModule,
    HomeModule,
    DineModule,
    BrowserAnimationsModule,
    CustomersModule,
    InventoryModule,
    PaymentModule,
    DiscountModule,
    // Remove PopupmodelComponent from imports, as it should be declared, not imported as a module
    StoreModule.forRoot(
      {
        categoryLoad: categoryLoadReducer,
        categoryAdd: categoryAddReducer,
        categoryUpdate: categoryUpdateReducer,
        categoryDelete: categoryDeleteReducer,
        productPriceLoad: productPriceLoadReducer,
        productPriceAdd: productPriceAddReducer,
        productPriceUpdate: productPriceUpdateReducer,
        productPriceDelete: productPriceDeleteReducer,
        productPriceReducerShortcode_:productPriceReducerShortcode,
        productLoad: ProductLoadReducer,
        productAdd: ProductAddReducer,
        productUpdate: ProductUpdateReducer,
        productDelete: ProductDeleteReducer,
        productByIdLoad: ProductByIdLoadReducer,
        quantityTypeLoad: QuantityTypeLoadReducer,
        quantityTypeAdd: QuantityTypeAddReducer,
        quantityTypeUpdate: QuantityTypeUpdateReducer,
        quantityTypeDelete: QuantityTypeDeleteReducer,
        subQuantityTypeByNameLoad: SubQuantityTypeByNameLoadReducer,
        subQuantityTypeLoad: SubQuantityTypeLoadReducer,
        subQuantityTypeAdd: SubQuantityTypeAddReducer,
        subQuantityTypeUpdate: SubQuantityTypeUpdateReducer,
        subQuantityTypeDelete: SubQuantityTypeDeleteReducer,
        subQuantityTypeByIdLoad: SubQuantityTypeByIdLoadReducer,
        taxLoad: TaxLoadReducer,
        taxAdd: TaxAddReducer,
        taxUpdate: TaxUpdateReducer,
        taxDelete: TaxDeleteReducer,
        // Inventory-related reducers
        loadInventoryFoodQuantityType: InventoryFoodQuantityTypeLoadReducer,
        loadInventoryMainFood: InventoryMainFoodLoadReducer,
        loadAssocciatedInvtoryFood: InventoryFoodwithProductLoadReducer,
        // Floor-related reducers
        LoadFloor: floorLoadReducer,
        AddFloor: floorAddReducer,
        UpdateFloor: floorUpdateReducer,
        DeleteFloor: floorDeleteReducer,
        dineTableReducer_: dineTableReducer,
        invoiceReducer_: invoiceReducer,
        customersReducer_: customersReducer,
        addOnProductReducer_: addOnProductReducer,
        loadAddOnProductReducer_: loadAddOnProductReducer,
        addOnProductEditReducer_: addOnProductEditReducer,
        productItemReducer_: productItemReducer,
        getByProductIdSubQTypeIDAddOnProductsReducer_: getByProductIdSubQTypeIDAddOnProductsReducer,
        getAddOnProductByIdReducer_: getAddOnProductByIdReducer,
        runningItemKOTReducer_: runningItemKOTReducer,
        reserveTableReducer_:reserveTableReducer,
        discountReducer_:discountReducer,
        runningItemReducer_:runningItemReducer,
        splitBillReducer_: splitBillReducer,
        GenratedItemsReducer_: GenratedItemsReducer
      },
      { metaReducers }
    ),
    // Remove duplicate StoreModule.forFeature('runningItem', runningItemsReducer)
    EffectsModule.forRoot([
      ProductCategoryEffects,
      ProductPriceEffects,
      ProductEffects,
      ProductQuantityTypeEffects,
      ProductSubQuantityTypeEffects,
      ProductTaxEffects,
      ProductInventoryFoodQuantityTypeEffects,
      ProductInventoryMainFoodEffects,
      ProductInventoryFoodwithProductEffects,
      FloorEffects,
      DineEffects,
      InvoiceEffects,
      CustomersEffects,
      AddOnProductEffects,
      ProductItemEffects,
      ReserveTableEffects,
      RunningItemKOTEffects,
      DiscountEffects,
      RunningItemEffects,
      SplitBillEffects,
      GenratedItemsEffects
    ]),
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
