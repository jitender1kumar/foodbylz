import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryformComponent } from './manage/categoryform/categoryform.component';
import { CategorytypeformComponent } from './manage/quantitytype/quantitytype.component';
import { ProductpriceformComponent } from './manage/productpriceform/productpriceform.component';
import { SubQuantityTypeComponenet } from './manage/subquantitytype/subquantitytype.component';
import { ProductformComponent } from './manage/productform/productform.component';
import { PopupmodelComponent } from './popupmodel/popupmodel.component';
import { TaxComponent } from './manage/tax/tax.component';
import { ChairComponent } from './dine/chair/chair.component';
import { DineComponent } from './dine/dine/dine.component';
import { TablesComponent } from './dine/tables/tables.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'category',component:CategoryformComponent},
  {path:'Quantitytype',component:CategorytypeformComponent},
  {path:'productprice',component:ProductpriceformComponent},
  {path:'basetype',component:SubQuantityTypeComponenet},
  {path:'product',component:ProductformComponent},
  {path:'popup',component:PopupmodelComponent},
  {path:'tax',component:TaxComponent},
  {path:'Home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'dine',component:DineComponent},
  {path:'chair',component:ChairComponent},
  {path:'tables',component:TablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
