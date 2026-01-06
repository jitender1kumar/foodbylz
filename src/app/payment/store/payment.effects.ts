import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as PaymentActions from './payment.action';
import { PaymentService } from '../../core/Services/payment.service';

@Injectable()
export class PaymentEffects {

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}

  loadPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPayments),
      mergeMap(() =>
        this.paymentService.get().pipe(
          map(payments => PaymentActions.loadPaymentsSuccess({ payments })),
          catchError(error => of(PaymentActions.loadPaymentsFailure({ error })))
        )
      )
    )
  );

  loadPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadPayment),
      mergeMap(action =>
        this.paymentService.getById(action.id).pipe(
          map(payment => PaymentActions.loadPaymentSuccess({ payment })),
          catchError(error => of(PaymentActions.loadPaymentFailure({ error })))
        )
      )
    )
  );

  createPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.createPayment),
      mergeMap(action =>
        this.paymentService.post(action.payment).pipe(
          map(payment => PaymentActions.createPaymentSuccess({ payment })),
          catchError(error => of(PaymentActions.createPaymentFailure({ error })))
        )
      )
    )
  );

  updatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.updatePayment),
      mergeMap(action =>
        this.paymentService.update(action.payment).pipe(
          map(payment => PaymentActions.updatePaymentSuccess({ payment })),
          catchError(error => of(PaymentActions.updatePaymentFailure({ error })))
        )
      )
    )
  );

  deletePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.deletePayment),
      mergeMap(action =>
        this.paymentService.delete(action.id).pipe(
          map(() => PaymentActions.deletePaymentSuccess({ id: action.id })),
          catchError(error => of(PaymentActions.deletePaymentFailure({ error })))
        )
      )
    )
  );

}
