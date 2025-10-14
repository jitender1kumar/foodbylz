import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DineComponent } from './dine/dine.component';
import { ChairComponent } from './chair/chair.component';
import { FloorComponent } from './floor/floor.component';
import { TablesComponent } from './tables/tables.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { AddcustomersComponent } from '../customers/addcustomers/addcustomers.component';
import { RunningordersComponent } from './runningorders/runningorders.component';
import { HomeModule } from '../home/home.module';
const routes: Routes = [
  {path:'dine',component:DineComponent},
  {path:'chair',component:ChairComponent},
  {path:'floor',component:FloorComponent},
  {path:'tables',component:TablesComponent}
];
@NgModule({
  declarations: [
    DineComponent,
    ChairComponent,
    FloorComponent,
    TablesComponent,
    RunningordersComponent,
    
    
  ],

  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,PopupmodelComponent,
    PopupCrudComponent,QRCodeComponent,HomeModule
    
],
  exports:[DineComponent,
    ChairComponent,
    FloorComponent,
    TablesComponent,
    RunningordersComponent,
  QRCodeComponent,
  ]
})
export class DineModule { }
