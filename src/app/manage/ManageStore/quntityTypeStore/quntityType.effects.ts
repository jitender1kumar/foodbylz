import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuantityTypeAction from './quntityType.actions';
import { QuantitytypeService } from '../../../core/Services/quantitytype.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductQuantityTypeEffects {
  constructor(private actions$: Actions, private QuantityTypeService: QuantitytypeService) {}

  loadQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuantityTypeAction.loadQuantityType),
      mergeMap(() =>
        this.QuantityTypeService.get().pipe(
          map((QuantityType_) => QuantityTypeAction.loadQuantityTypeSuccess({ QuantityType_})),
          catchError((error) => of(QuantityTypeAction.loadQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  addQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuantityTypeAction.addQuantityType),
      mergeMap((action) =>
        this.QuantityTypeService.add(action.QuantityType_).pipe(
          map((QuantityType_) => QuantityTypeAction.addQuantityTypeSuccess({ QuantityType_ })),
          catchError((error) => of(QuantityTypeAction.addQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  updateQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuantityTypeAction.updateQuantityType),
      mergeMap((action) =>
        this.QuantityTypeService.update(action.QuantityType_).pipe(
          map((QuantityType_) => QuantityTypeAction.updateQuantityTypeSuccess({ QuantityType_ })),
          catchError((error) => of(QuantityTypeAction.updateQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  deletQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuantityTypeAction.deleteQuantityType),
      mergeMap((action) =>
        this.QuantityTypeService.delete(action._id).pipe(
          map(() => QuantityTypeAction.deleteQuantityType({ _id: action._id })),
          catchError((error) => of(QuantityTypeAction.deleteQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );
}
