import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../Model/crud.model';

// Add Invoice
export const addInvoice = createAction(
  '[Invoice] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const addInvoiceSuccess = createAction(
  '[Invoice] Add Invoice Success',
  props<{ invoice: Invoice }>()
);

export const addInvoiceFailure = createAction(
  '[Invoice] Add Invoice Failure',
  props<{ error: any }>()
);

// Get Invoice by ID
export const getInvoiceById = createAction(
  '[Invoice] Get Invoice By Id',
  props<{ recieptNumber: string }>()
);

export const getInvoiceByIdSuccess = createAction(
  '[Invoice] Get Invoice By Id Success',
  props<{ invoice: Invoice }>()
);

export const getInvoiceByIdFailure = createAction(
  '[Invoice] Get Invoice By Id Failure',
  props<{ error: any }>()
);

// Get Invoice by CreatedAt2 (startDate, createdAt)
export const getInvoiceByCreateAt2 = createAction(
  '[Invoice] Get Invoice By CreateAt2',
  props<{ startDate: string, createdAt: string }>()
);

export const getInvoiceByCreateAt2Success = createAction(
  '[Invoice] Get Invoice By CreateAt2 Success',
  props<{ invoice: Invoice }>()
);

export const getInvoiceByCreateAt2Failure = createAction(
  '[Invoice] Get Invoice By CreateAt2 Failure',
  props<{ error: any }>()
);

// Get Invoice by CreatedAt
export const getInvoiceByCreateAt = createAction(
  '[Invoice] Get Invoice By CreateAt',
  props<{ createdAt: string }>()
);

export const getInvoiceByCreateAtSuccess = createAction(
  '[Invoice] Get Invoice By CreateAt Success',
  props<{ invoice: Invoice }>()
);

export const getInvoiceByCreateAtFailure = createAction(
  '[Invoice] Get Invoice By CreateAt Failure',
  props<{ error: any }>()
);

// Get Invoice by Start and End Date
export const getInvoiceByStartEndDate = createAction(
  '[Invoice] Get Invoice By Start End Date',
  props<{ startdate: string, enddate: string }>()
);

export const getInvoiceByStartEndDateSuccess = createAction(
  '[Invoice] Get Invoice By Start End Date Success',
  props<{ invoice: Invoice }>()
);

export const getInvoiceByStartEndDateFailure = createAction(
  '[Invoice] Get Invoice By Start End Date Failure',
  props<{ error: any }>()
);

// Get Invoice Data By Date
export const getInvoiceDataByDate = createAction(
  '[Invoice] Get Invoice Data By Date',
  props<{ createdAt: string }>()
);

export const getInvoiceDataByDateSuccess = createAction(
  '[Invoice] Get Invoice Data By Date Success',
  props<{ invoice: Invoice }>()
);

export const getInvoiceDataByDateFailure = createAction(
  '[Invoice] Get Invoice Data By Date Failure',
  props<{ error: any }>()
);

// Get All Invoices
export const getAllInvoices = createAction(
  '[Invoice] Get All Invoices'
);

export const getAllInvoicesSuccess = createAction(
  '[Invoice] Get All Invoices Success',
  props<{ invoices: Invoice[] }>()
);

export const getAllInvoicesFailure = createAction(
  '[Invoice] Get All Invoices Failure',
  props<{ error: any }>()
);

// Update Invoice
export const updateInvoice = createAction(
  '[Invoice] Update Invoice',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceSuccess = createAction(
  '[Invoice] Update Invoice Success',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceFailure = createAction(
  '[Invoice] Update Invoice Failure',
  props<{ error: any }>()
);