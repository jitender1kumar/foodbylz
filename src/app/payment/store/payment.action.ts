import { createAction, props } from '@ngrx/store';
import type { Payment } from '../../core/Model/crud.model';

// Load Payments
export const loadPayments = createAction('[Payment] Load Payments');
export const loadPaymentsSuccess = createAction(
  '[Payment] Load Payments Success',
  props<{ payments: Payment[] }>()
);
export const loadPaymentsFailure = createAction(
  '[Payment] Load Payments Failure',
  props<{ error: any }>()
);

// Load Payment by Id
export const loadPayment = createAction(
  '[Payment] Load Payment',
  props<{ id: string }>()
);
export const loadPaymentSuccess = createAction(
  '[Payment] Load Payment Success',
  props<{ payment: Payment }>()
);
export const loadPaymentFailure = createAction(
  '[Payment] Load Payment Failure',
  props<{ error: any }>()
);

// Create Payment
export const createPayment = createAction(
  '[Payment] Create Payment',
  props<{ payment: Payment }>()
);
export const createPaymentSuccess = createAction(
  '[Payment] Create Payment Success',
  props<{ payment: Payment }>()
);
export const createPaymentFailure = createAction(
  '[Payment] Create Payment Failure',
  props<{ error: any }>()
);

// Update Payment
export const updatePayment = createAction(
  '[Payment] Update Payment',
  props<{ payment: Payment }>()
);
export const updatePaymentSuccess = createAction(
  '[Payment] Update Payment Success',
  props<{ payment: Payment }>()
);
export const updatePaymentFailure = createAction(
  '[Payment] Update Payment Failure',
  props<{ error: any }>()
);

// Delete Payment
export const deletePayment = createAction(
  '[Payment] Delete Payment',
  props<{ id: string }>()
);
export const deletePaymentSuccess = createAction(
  '[Payment] Delete Payment Success',
  props<{ id: string }>()
);
export const deletePaymentFailure = createAction(
  '[Payment] Delete Payment Failure',
  props<{ error: any }>()
);

