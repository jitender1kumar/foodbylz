import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { RouterModule, Routes } from '@angular/router';
import { PopupmodelComponent } from '../popupmodel/popupmodel.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridTableModule } from '../core/shared/dynamicTable/gird-table/gridtable.module';



@NgModule({
  declarations: [
    DiscountComponent
  ],
  imports: [
    PopupmodelComponent,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
   
    GridTableModule
  ],
  exports:[DiscountComponent]
})
export class DiscountModule { }
