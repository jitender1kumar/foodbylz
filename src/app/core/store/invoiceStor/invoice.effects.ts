import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InvoiceActions from './invoice.actions';
import { InvoiceService } from '../../Services/invoice.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Invoice } from '../../Model/crud.model';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}

  // Add Invoice
  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.addInvoice),
      mergeMap(({ invoice }) =>
        this.invoiceService.add(invoice).pipe(
          map((newInvoice: Invoice) =>
            InvoiceActions.addInvoiceSuccess({ invoice: newInvoice })
          ),
          catchError(error =>
            of(InvoiceActions.addInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  // Get Invoice by ID
  getInvoiceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoiceById),
      mergeMap(({ recieptNumber }) =>
        this.invoiceService.getbyid(recieptNumber).pipe(
          map((invoice: any) =>
            InvoiceActions.getInvoiceByIdSuccess({ invoice: invoice as Invoice })
          ),
          catchError(error =>
            of(InvoiceActions.getInvoiceByIdFailure({ error }))
          )
        )
      )
      )
    
  );

  // Get Invoice by CreatedAt2 (startDate, createdAt)
  getInvoiceByCreateAt2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoiceByCreateAt2),
      mergeMap(({ startDate, createdAt }) =>
        this.invoiceService.getbycreateAt2(startDate, createdAt).pipe(
          map((invoice: any) =>
            InvoiceActions.getInvoiceByCreateAt2Success({ invoice })
          ),
          catchError(error =>
            of(InvoiceActions.getInvoiceByCreateAt2Failure({ error }))
          )
        )
      )
      )
    
  );

  // Get Invoice by CreatedAt
  getInvoiceByCreateAt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoiceByCreateAt),
      mergeMap(({ createdAt }) =>
        this.invoiceService.getbycreateAt(createdAt).pipe(
          map((invoice: Invoice) =>
            InvoiceActions.getInvoiceByCreateAtSuccess({ invoice })
          ),
          catchError(error =>
            of(InvoiceActions.getInvoiceByCreateAtFailure({ error }))
          )
        )
      )
    )
  );

  // Get Invoice by Start and End Date
  getInvoiceByStartEndDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoiceByStartEndDate),
      mergeMap(({ startdate, enddate }) =>
        this.invoiceService.getbystartenddate(startdate, enddate).pipe(
          map((invoice: Invoice) =>
            InvoiceActions.getInvoiceByStartEndDateSuccess({ invoice })
          ),
          catchError(error =>
            of(InvoiceActions.getInvoiceByStartEndDateFailure({ error }))
          )
        )
      )
    )
  );

  // Get Invoice Data By Date
  getInvoiceDataByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getInvoiceDataByDate),
      mergeMap(({ createdAt }) =>
        this.invoiceService.getDataByDate(createdAt).pipe(
          map((invoice: Invoice) =>
            InvoiceActions.getInvoiceDataByDateSuccess({ invoice })
          ),
          catchError(error =>
            of(InvoiceActions.getInvoiceDataByDateFailure({ error }))
          )
        )
      )
    )
  );

  // Get All Invoices
  getAllInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.getAllInvoices),
      mergeMap(() =>
        this.invoiceService.get().pipe(
          map((invoices: Invoice[]) =>
            InvoiceActions.getAllInvoicesSuccess({ invoices })
          ),
          catchError(error =>
            of(InvoiceActions.getAllInvoicesFailure({ error }))
          )
        )
      )
    )
  );

  // Update Invoice
  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoice),
      mergeMap(({ invoice }) =>
        this.invoiceService.update(invoice).pipe(
          map((response: any) => {
            // If the API returns { invoice }, extract it, else assume response is the invoice
            const updatedInvoice: Invoice = response?.invoice ? response.invoice : response;
            return InvoiceActions.updateInvoiceSuccess({ invoice: updatedInvoice });
          }),
          catchError(error =>
            of(InvoiceActions.updateInvoiceFailure({ error }))
          )
        )
      )
    )
  );
}