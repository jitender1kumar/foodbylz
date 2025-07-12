import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InventoryMainFoodAction from './inventoryMainFood.actions';
import { InventoryMainFoodService } from '../../../core/Services/inventoryMainFood.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductInventoryMainFoodEffects {
  constructor(private actions$: Actions, private InventoryMainFoodService: InventoryMainFoodService) {}

  loadInventoryMainFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryMainFoodAction.loadInventoryMainFood),
      mergeMap(() =>
        this.InventoryMainFoodService.get().pipe(
          map((InventoryMainFood_) => InventoryMainFoodAction.loadInventoryMainFoodSuccess({ InventoryMainFood_})),
          catchError((error) => of(InventoryMainFoodAction.loadInventoryMainFoodFailure({ error: error.message })))
        )
      )
    )
  );
loadSubQuantityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryMainFoodAction.loaInventoryMainFoodById),
      mergeMap((action) =>
        this.InventoryMainFoodService.getbyid(action._id).pipe(
          map((InventoryMainFood_) => InventoryMainFoodAction.loaInventoryMainFoodByIdSuccess({ InventoryMainFood_ })),
          catchError((error) =>
            of(InventoryMainFoodAction.loaInventoryMainFoodByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
  addInventoryMainFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryMainFoodAction.addInventoryMainFood),
      mergeMap((action) =>
        this.InventoryMainFoodService.add(action.InventoryMainFood_).pipe(
          map((InventoryMainFood_) => InventoryMainFoodAction.addInventoryMainFoodSuccess({ InventoryMainFood_ })),
          catchError((error) => of(InventoryMainFoodAction.addInventoryMainFoodFailure({ error: error.message })))
        )
      )
    )
  );

  updateInventoryMainFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryMainFoodAction.updateInventoryMainFood),
      mergeMap((action) =>
        this.InventoryMainFoodService.update(action.InventoryMainFood_).pipe(
          map((InventoryMainFood_) => InventoryMainFoodAction.updateInventoryMainFoodSuccess({ InventoryMainFood_ })),
          catchError((error) => of(InventoryMainFoodAction.updateInventoryMainFoodFailure({ error: error.message })))
        )
      )
    )
  );

  deletInventoryMainFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryMainFoodAction.deleteInventoryMainFood),
      mergeMap((action) =>
        this.InventoryMainFoodService.delete(action._id).pipe(
          map(() => InventoryMainFoodAction.deleteInventoryMainFood({ _id: action._id })),
          catchError((error) => of(InventoryMainFoodAction.deleteInventoryMainFoodFailure({ error: error.message })))
        )
      )
    )
  );
}
