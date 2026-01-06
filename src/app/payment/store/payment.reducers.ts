import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.action';
import { Payment } from '../../core/Model/crud.model';

export interface PaymentState {
  payments: Payment[];
  selectedPayment: Payment | null;
  loading: boolean;
  error: any;
}

export const initialState: PaymentState = {
  payments: [],
  selectedPayment: null,
  loading: false,
  error: null
};

export const paymentReducer = createReducer(
  initialState,

  // Load Payments
  on(PaymentActions.loadPayments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PaymentActions.loadPaymentsSuccess, (state, { payments }) => ({
    ...state,
    payments: payments,
    loading: false,
    error: null
  })),
  on(PaymentActions.loadPaymentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Load Single Payment
  on(PaymentActions.loadPayment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PaymentActions.loadPaymentSuccess, (state, { payment }) => ({
    ...state,
    selectedPayment: payment,
    loading: false,
    error: null
  })),
  on(PaymentActions.loadPaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Create Payment
  on(PaymentActions.createPayment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PaymentActions.createPaymentSuccess, (state, { payment }) => ({
    ...state,
    payments: [...state.payments, payment],
    loading: false,
    error: null
  })),
  on(PaymentActions.createPaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Update Payment
  on(PaymentActions.updatePayment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PaymentActions.updatePaymentSuccess, (state, { payment }) => ({
    ...state,
    payments: state.payments.map(p => p._id === payment._id ? payment : p),
    loading: false,
    error: null
  })),
  on(PaymentActions.updatePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Delete Payment
  on(PaymentActions.deletePayment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PaymentActions.deletePaymentSuccess, (state, { id }) => ({
    ...state,
    payments: state.payments.filter(p => p._id !== id),
    loading: false,
    error: null
  })),
  on(PaymentActions.deletePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
);
