import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DineComponent } from './dine/dine.component';
import { ChairComponent } from './chair/chair.component';
import { DinetableComponent } from '../orderMode/dinetable/dinetable.component';
import { OrdermodebuttonComponent } from '../orderMode/ordermodebutton/ordermodebutton.component';
import { FloorComponent } from './floor/floor.component';
import { TablesComponent } from './tables/tables.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupCrudComponent } from 'popup-crud';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { QRCodeComponent } from 'angularx-qrcode';
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
    DinetableComponent,
    OrdermodebuttonComponent,
    FloorComponent,
    TablesComponent
    
  ],

  imports: [
    CommonModule, AgGridAngular, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes),
    FormsModule,PopupmodelComponent,
    PopupCrudComponent,QRCodeComponent
    
],
  exports:[DineComponent,
    ChairComponent,
    DinetableComponent,
    OrdermodebuttonComponent,
    FloorComponent,
    TablesComponent,
  QRCodeComponent]
})
export class DineModule { }
