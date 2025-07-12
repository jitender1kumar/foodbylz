import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductAction from './product.actions';
import { ProductService } from '../../../core/Services/product.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private ProductService: ProductService) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadProduct),
      mergeMap(() =>
        this.ProductService.get().pipe(
          map((Product_) => ProductAction.loadProductSuccess({ Product_})),
          catchError((error) => of(ProductAction.loadProductFailure({ error: error.message })))
        )
      )
    )
  );
  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.loadProductById),
      mergeMap((action) =>
        this.ProductService.getbyid(action._id).pipe(
          map((Product_) => ProductAction.loadProductByIdSuccess({ Product_ })),
          catchError((error) =>
            of(ProductAction.loadProductByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.addProduct),
      mergeMap((action) =>
        this.ProductService.post(action.Product_).pipe(
          map((Product_) => ProductAction.addProductSuccess({ Product_ })),
          catchError((error) => of(ProductAction.addProductFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.updateProduct),
      mergeMap((action) =>
        this.ProductService.update(action.Product_).pipe(
          map((Product_) => ProductAction.updateProductSuccess({ Product_ })),
          catchError((error) => of(ProductAction.updateProductFailure({ error: error.message })))
        )
      )
    )
  );

  deletProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductAction.deleteProduct),
      mergeMap((action) =>
        this.ProductService.delete(action._id).pipe(
          map(() => ProductAction.deleteProduct({ _id: action._id })),
          catchError((error) => of(ProductAction.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}
