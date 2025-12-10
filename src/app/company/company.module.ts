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
import { GridTableModule } from '../core/shared/dynamicTable/gird-table/gridtable.module';
import { CompanyloginComponent } from './companyAuth/companylogin/companylogin.component';
import { EmployeeloginComponent } from './companyAuth/employeelogin/employeelogin.component';
import { AdminComponent } from './companyAuth/admin/admin.component';

const routes: Routes = [
  {path:'employee',component:EmployeeComponent},
  {path:'companyprofile',component:CompanyprofileComponent},
  { path: 'companylogin', component: CompanyloginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'employeelogin', component: EmployeeComponent },
 
];

@NgModule({
  declarations: [CompanyprofileComponent,
    EmployeeComponent,
    CompanyloginComponent,
    EmployeeloginComponent,
    AdminComponent,],
  imports: [
     CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
        FormsModule,PopupmodelComponent,
        PopupCrudComponent,GridTableModule
  ],
  exports:[CompanyprofileComponent,
    EmployeeComponent,CompanyloginComponent,AdminComponent,EmployeeloginComponent]
})
export class CompanyModule { }
