import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface Invoice {
  id?: string | number;
  [key: string]: any;
}

export interface InvoiceState {
  invoice: Invoice | null;
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoice');

export const selectInvoice = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state?.invoice ?? null
);

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state?.invoices ?? []
);

export const selectInvoiceLoading = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state?.loading ?? false
);

export const selectInvoiceError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state?.error ?? null
);

export const selectInvoiceById = (id: string | number) =>
  createSelector(selectInvoiceState, (state: InvoiceState) => {
    const invoice = state?.invoices?.find((item) => item?.id === id);
    return invoice ?? state?.invoice ?? null;
  });
