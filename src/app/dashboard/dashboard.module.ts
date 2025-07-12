import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { OrdersgraphsComponent } from './ordersgraphs/ordersgraphs.component';
import { DisplayOrdersInBoxComponent } from './display-orders-in-box/display-orders-in-box.component';
import { DisplayOrdersListComponent } from './display-orders-list/display-orders-list.component';
import { OrderDiplayInPopUpComponent } from './order-diplay-in-pop-up/order-diplay-in-pop-up.component';

const routes: Routes = [
 
  {path:'popup',component:PopupmodelComponent},
  {path:'orders',component:OrdersComponent},
];

@NgModule({
  declarations: [
      OrdersComponent,
      DashboardComponent,
      OrdersgraphsComponent,
      DisplayOrdersInBoxComponent,
      DisplayOrdersListComponent,
      OrderDiplayInPopUpComponent,],
  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
        FormsModule,PopupmodelComponent,
        PopupCrudComponent
  ],
  exports:[
      OrdersComponent,
      DashboardComponent,]
})
export class DashboardModule { }
