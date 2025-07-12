import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InventoryFoodQuantityTypeAction from './inventoryFoodQuantityType.actions';
import { InventoryMFoodQuantityTypeService } from '../../../core/Services/inventoryFoodQuantityType.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductInventoryFoodQuantityTypeEffects {
  constructor(private actions$: Actions, private InventoryFoodQuantityTypeService: InventoryMFoodQuantityTypeService) {}

  loadInventoryFoodQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodQuantityTypeAction.loadInventoryFoodQuantityType),
      mergeMap(() =>
        this.InventoryFoodQuantityTypeService.get().pipe(
          map((InventoryFoodQuantityType_) => InventoryFoodQuantityTypeAction.loadInventoryFoodQuantityTypeSuccess({ InventoryFoodQuantityType_})),
          catchError((error) => of(InventoryFoodQuantityTypeAction.loadInventoryFoodQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  addInventoryFoodQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodQuantityTypeAction.addInventoryFoodQuantityType),
      mergeMap((action) =>
        this.InventoryFoodQuantityTypeService.add(action.InventoryFoodQuantityType_).pipe(
          map((InventoryFoodQuantityType_) => InventoryFoodQuantityTypeAction.addInventoryFoodQuantityTypeSuccess({ InventoryFoodQuantityType_ })),
          catchError((error) => of(InventoryFoodQuantityTypeAction.addInventoryFoodQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  updateInventoryFoodQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodQuantityTypeAction.updateInventoryFoodQuantityType),
      mergeMap((action) =>
        this.InventoryFoodQuantityTypeService.update(action.InventoryFoodQuantityType_).pipe(
          map((InventoryFoodQuantityType_) => InventoryFoodQuantityTypeAction.updateInventoryFoodQuantityTypeSuccess({ InventoryFoodQuantityType_ })),
          catchError((error) => of(InventoryFoodQuantityTypeAction.updateInventoryFoodQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  deletInventoryFoodQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodQuantityTypeAction.deleteInventoryFoodQuantityType),
      mergeMap((action) =>
        this.InventoryFoodQuantityTypeService.delete(action._id).pipe(
          map(() => InventoryFoodQuantityTypeAction.deleteInventoryFoodQuantityType({ _id: action._id })),
          catchError((error) => of(InventoryFoodQuantityTypeAction.deleteInventoryFoodQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );
}
