import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaxAction from './tax.actions';
import { TaxService } from '../../../core/Services/tax.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductTaxEffects {
  constructor(private actions$: Actions, private TaxService: TaxService) {}

  loadTax$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxAction.loadTax),
      mergeMap(() =>
        this.TaxService.get().pipe(
          map((Tax_) => TaxAction.loadTaxSuccess({ Tax_})),
          catchError((error) => of(TaxAction.loadTaxFailure({ error: error.message })))
        )
      )
    )
  );

  addTax$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxAction.addTax),
      mergeMap((action) =>
        this.TaxService.add(action.Tax_).pipe(
          map((Tax_) => TaxAction.addTaxSuccess({ Tax_ })),
          catchError((error) => of(TaxAction.addTaxFailure({ error: error.message })))
        )
      )
    )
  );

  updateTax$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxAction.updateTax),
      mergeMap((action) =>
        this.TaxService.update(action.Tax_).pipe(
          map((Tax_) => TaxAction.updateTaxSuccess({ Tax_ })),
          catchError((error) => of(TaxAction.updateTaxFailure({ error: error.message })))
        )
      )
    )
  );

  deletTax$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxAction.deleteTax),
      mergeMap((action) =>
        this.TaxService.delete(action._id).pipe(
          map(() => TaxAction.deleteTax({ _id: action._id })),
          catchError((error) => of(TaxAction.deleteTaxFailure({ error: error.message })))
        )
      )
    )
  );
}
