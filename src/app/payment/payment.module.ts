import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { paymentReducer } from './store/payment.reducers';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('payments', paymentReducer)
  ]
})
export class PaymentModule { }
