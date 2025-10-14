import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductItemActions from './productItem.actions';
import { ItemsService } from '../../../core/Services/items.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductItemEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}

  // Effect: Load Product Items
  loadProductItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductItemActions.loadProductItems),
      mergeMap(action =>
        this.itemsService.getbyid(action.invoiceId).pipe(
          map((response: any) =>
            ProductItemActions.loadProductItemsSuccess({ items: response?.data ?? [] })
          ),
          catchError(error =>
            of(ProductItemActions.loadProductItemsFailure({ error }))
          )
        )
      )
    )
  );

  // Effect: Add Product Item
  addProductItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductItemActions.addProductItem),
      mergeMap(action =>
        this.itemsService.add(action.items).pipe(
          map((item: any) =>
            ProductItemActions.addProductItemSuccess({ item })
          ),
          catchError(error =>
            of(ProductItemActions.addProductItemFailure({ error }))
          )
        )
      )
    )
  );

  // Effect: Update Product Item
  updateProductItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductItemActions.updateProductItem),
      mergeMap(action =>
        this.itemsService.update(action.items).pipe(
          map((item: any) =>
            ProductItemActions.updateProductItemSuccess({ item })
          ),
          catchError(error =>
            of(ProductItemActions.updateProductItemFailure({ error }))
          )
        )
      )
    )
  );

  // Effect: Delete Product Item
  deleteProductItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductItemActions.deleteProductItem),
      mergeMap(action =>
        this.itemsService.delete(action.invoiceId, action.productId, action.subQuantityTypeId).pipe(
          map(() =>
            ProductItemActions.deleteProductItemSuccess({
              productId: action.productId,
              subQuantityTypeId: action.subQuantityTypeId
            })
          ),
          catchError(error =>
            of(ProductItemActions.deleteProductItemFailure({ error }))
          )
        )
      )
    )
  );
}
