import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { CustomersComponent } from './customers.component';
import { AddcustomersComponent } from './addcustomers/addcustomers.component';
import { NgSelectModule } from '@ng-select/ng-select';
const routes: Routes = [
  {path:'customers',component:CustomersComponent}
];
@NgModule({
  declarations: [
   CustomersComponent,
  ],

  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,PopupmodelComponent,
    PopupCrudComponent,NgSelectModule
    
],
  exports:[CustomersComponent]
})
export class CustomersModule { }
