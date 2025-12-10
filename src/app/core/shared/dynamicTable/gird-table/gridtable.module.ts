import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GirdTableComponent } from './gird-table.component';
import { PopupmodelComponent } from '../../../../popupmodel/popupmodel.component';

const routes: Routes = [
  { path: 'gridtable', component: GirdTableComponent }
];

@NgModule({
  declarations: [
    GirdTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PopupmodelComponent
  ],
  exports: [
    GirdTableComponent
  ]
})
export class GridTableModule { }
