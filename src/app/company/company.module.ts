import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { EmployeeComponent } from './employee/employee.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { PopupCrudComponent } from 'popup-crud';

const routes: Routes = [
  {path:'employee',component:EmployeeComponent},
  {path:'companyprofile',component:CompanyprofileComponent},
];

@NgModule({
  declarations: [CompanyprofileComponent,
    EmployeeComponent,],
  imports: [
     CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
        FormsModule,PopupmodelComponent,
        PopupCrudComponent
  ],
  exports:[CompanyprofileComponent,
    EmployeeComponent,]
})
export class CompanyModule { }
