import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { Invoice } from '../../Model/crud.model';

export interface InvoiceState {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  loading: boolean;
  error: any;
}

export const initialState: InvoiceState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,

  // Add Invoice
  on(InvoiceActions.addInvoice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
    loading: false,
    error: null,
  })),
  on(InvoiceActions.addInvoiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Invoice by ID
  on(InvoiceActions.getInvoiceById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedInvoice: null,
  })),
  on(InvoiceActions.getInvoiceByIdSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getInvoiceByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Invoice by CreatedAt2 (startDate, createdAt)
  on(InvoiceActions.getInvoiceByCreateAt2, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedInvoice: null,
  })),
  on(InvoiceActions.getInvoiceByCreateAt2Success, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getInvoiceByCreateAt2Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Invoice by CreatedAt
  on(InvoiceActions.getInvoiceByCreateAt, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedInvoice: null,
  })),
  on(InvoiceActions.getInvoiceByCreateAtSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getInvoiceByCreateAtFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Invoice by Start and End Date
  on(InvoiceActions.getInvoiceByStartEndDate, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedInvoice: null,
  })),
  on(InvoiceActions.getInvoiceByStartEndDateSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getInvoiceByStartEndDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Invoice Data By Date
  on(InvoiceActions.getInvoiceDataByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedInvoice: null,
  })),
  on(InvoiceActions.getInvoiceDataByDateSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getInvoiceDataByDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get All Invoices
  on(InvoiceActions.getAllInvoices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InvoiceActions.getAllInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.getAllInvoicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Invoice
  on(InvoiceActions.updateInvoice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: state.invoices.map(inv =>
      inv.RecieptNumber === invoice.RecieptNumber ? invoice : inv
    ),
    selectedInvoice: invoice,
    loading: false,
    error: null,
  })),
  on(InvoiceActions.updateInvoiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);