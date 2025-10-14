import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './home.component';
import { AddcustomersComponent } from '../customers/addcustomers/addcustomers.component';
import { CommentInInvoiceComponent } from './comment-in-invoice/comment-in-invoice.component';
import { AddOnItemsComponent } from './add-on-items/add-on-items.component';
import { HomeleftpanelComponent } from './homeleftpanel/homeleftpanel.component';
import { HomeRightPanelComponent } from './home-right-panel/home-right-panel.component';
import { HomeCenterPanelComponent } from './home-center-panel/home-center-panel.component';
const routes: Routes = [
  {path:'Home',component:HomeComponent}
];
@NgModule({
  declarations: [
   HomeComponent, CommentInInvoiceComponent,AddcustomersComponent, AddOnItemsComponent, HomeleftpanelComponent, HomeRightPanelComponent, HomeCenterPanelComponent
  ],
// AddcustomersComponent
  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,
    NgSelectModule
    
],
  exports:[HomeComponent,CommentInInvoiceComponent,AddcustomersComponent]
})
export class HomeModule { }
