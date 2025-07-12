import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './home.component';
import { AddcustomersComponent } from '../customers/addcustomers/addcustomers.component';
import { CommentInInvoiceComponent } from './comment-in-invoice/comment-in-invoice.component';
const routes: Routes = [
  {path:'Home',component:HomeComponent}
];
@NgModule({
  declarations: [
   HomeComponent,AddcustomersComponent, CommentInInvoiceComponent
  ],

  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,
    NgSelectModule
    
],
  exports:[HomeComponent,AddcustomersComponent,CommentInInvoiceComponent]
})
export class HomeModule { }
