import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InventoryFoodwithProductAction from './inventoryFoodwithProduct.actions';
import { InventoryMainFoodwithProductService } from '../../../core/Services/inventoryFoodWithProduct.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductInventoryFoodwithProductEffects {
  constructor(private actions$: Actions, private InventoryFoodwithProductService: InventoryMainFoodwithProductService) {}

  loadInventoryFoodwithProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodwithProductAction.loadInventoryFoodwithProduct),
      mergeMap(() =>
        this.InventoryFoodwithProductService.get().pipe(
          map((InventoryFoodwithProduct_) => InventoryFoodwithProductAction.loadInventoryFoodwithProductSuccess({ InventoryFoodwithProduct_})),
          catchError((error) => of(InventoryFoodwithProductAction.loadInventoryFoodwithProductFailure({ error: error.message })))
        )
      )
    )
  );
// loadSubQuantityById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(InventoryFoodwithProductAction.loaInventoryFoodwithProductById),
//       mergeMap((action) =>
//         this.InventoryFoodwithProductService.getbyid(action.selectQtypeID).pipe(
//           map((InventoryFoodwithProduct_) => InventoryFoodwithProductAction.loaInventoryFoodwithProductByIdSuccess({ InventoryFoodwithProduct_ })),
//           catchError((error) =>
//             of(InventoryFoodwithProductAction.loaInventoryFoodwithProductByIdFailure({ error: error.message }))
//           )
//         )
//       )
//     )
//   );
  addInventoryFoodwithProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodwithProductAction.addInventoryFoodwithProduct),
      mergeMap((action) =>
        this.InventoryFoodwithProductService.add(action.InventoryFoodwithProduct_).pipe(
          map((InventoryFoodwithProduct_) => InventoryFoodwithProductAction.addInventoryFoodwithProductSuccess({ InventoryFoodwithProduct_ })),
          catchError((error) => of(InventoryFoodwithProductAction.addInventoryFoodwithProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateInventoryFoodwithProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodwithProductAction.updateInventoryFoodwithProduct),
      mergeMap((action) =>
        this.InventoryFoodwithProductService.update(action.InventoryFoodwithProductForEdit_).pipe(
          map((InventoryFoodwithProductForEdit_) => InventoryFoodwithProductAction.updateInventoryFoodwithProductSuccess({ InventoryFoodwithProductForEdit_ })),
          catchError((error) => of(InventoryFoodwithProductAction.updateInventoryFoodwithProductFailure({ error: error.message })))
        )
      )
    )
  );

  deletInventoryFoodwithProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryFoodwithProductAction.deleteInventoryFoodwithProduct),
      mergeMap((action) =>
        this.InventoryFoodwithProductService.delete(action._id).pipe(
          map(() => InventoryFoodwithProductAction.deleteInventoryFoodwithProduct({ _id: action._id })),
          catchError((error) => of(InventoryFoodwithProductAction.deleteInventoryFoodwithProductFailure({ error: error.message })))
        )
      )
    )
  );
}
