import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddcustomersComponent } from '../customers/addcustomers/addcustomers.component';
import { CommentInInvoiceComponent } from './comment-in-invoice/comment-in-invoice.component';
import { AddOnItemsComponent } from './add-on-items/add-on-items.component';
import { HomeleftpanelComponent } from './homeleftpanel/homeleftpanel.component';
import { HomeRightPanelComponent } from './home-right-panel/home-right-panel.component';
import { HomeCenterPanelComponent } from './home-center-panel/home-center-panel.component';
import { HomedataComponent } from './HomeData/homedata/homedata.component';
import { HomeComponent } from './home.component';
import { ManageModule } from '../manage/manage.module';
import { ShortcodeComponent } from './partial/shortcode/shortcode.component';
import { SplitbillComponent } from './partial/splitbill/splitbill/splitbill.component';

@NgModule({
  declarations: [ HomeComponent,
    CommentInInvoiceComponent,
    AddcustomersComponent,
    HomeleftpanelComponent,
    HomeRightPanelComponent,
    HomeCenterPanelComponent,
    HomedataComponent,
    ShortcodeComponent,
    AddOnItemsComponent,
    SplitbillComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    ReactiveFormsModule,
   
    FormsModule,
    NgSelectModule
  ],
  exports: [HomeComponent,
    CommentInInvoiceComponent,
    AddcustomersComponent,
    AddOnItemsComponent,
    SplitbillComponent,
  ]
})
export class HomeModule { }
