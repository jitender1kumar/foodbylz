import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DiscountActions from './discount.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DiscountService } from '../../core/Services/discount.service';

@Injectable()
export class DiscountEffects {
  constructor(
    private actions$: Actions,
    private discountService: DiscountService
  ) {}

  loadDiscounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscountActions.loadDiscounts),
      mergeMap(() =>
        this.discountService.get().pipe(
          map(discounts => DiscountActions.loadDiscountsSuccess({ discounts })),
          catchError(error => of(DiscountActions.loadDiscountsFailure({ error })))
        )
      )
    )
  );

  loadDiscount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscountActions.loadDiscount),
      mergeMap(action =>
        this.discountService.getById(action.id).pipe(
          map(discount => DiscountActions.loadDiscountSuccess({ discount })),
          catchError(error => of(DiscountActions.loadDiscountFailure({ error })))
        )
      )
    )
  );

  createDiscount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscountActions.createDiscount),
      mergeMap(action =>
        this.discountService.post(action.discount).pipe(
          map(discount => DiscountActions.createDiscountSuccess({ discount })),
          catchError(error => of(DiscountActions.createDiscountFailure({ error })))
        )
      )
    )
  );

  updateDiscount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscountActions.updateDiscount),
      mergeMap(action =>
        this.discountService.update(action.discount).pipe(
          map(discount => DiscountActions.updateDiscountSuccess({ discount })),
          catchError(error => of(DiscountActions.updateDiscountFailure({ error })))
        )
      )
    )
  );

  deleteDiscount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscountActions.deleteDiscount),
      mergeMap(action =>
        this.discountService.delete(action.id).pipe(
          map(() => DiscountActions.deleteDiscountSuccess({ id: action.id })),
          catchError(error => of(DiscountActions.deleteDiscountFailure({ error })))
        )
      )
    )
  );
}
