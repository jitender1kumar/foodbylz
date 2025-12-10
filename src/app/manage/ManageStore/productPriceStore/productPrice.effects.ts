import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductPriceAction from './productPrice.actions';
import { ProductPriceService } from './../../../core/Services/productprice.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductPriceEffects {
  constructor(private actions$: Actions, private ProductPriceService: ProductPriceService) {}

  loadProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPriceAction.loadProductPrice),
      mergeMap(() =>
        this.ProductPriceService.get().pipe(
          map((ProductPrice_) => ProductPriceAction.loadProductPriceSuccess({ ProductPrice_})),
          catchError((error) => of(ProductPriceAction.loadProductPriceFailure({ error: error.message })))
        )
      )
    )
  );
  loadProductPriceByShortcode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPriceAction.loadProductPriceByShortcode),
      mergeMap((action) =>
        this.ProductPriceService.getPriceByShortcode(action.shortcode).pipe(
          map((ProductPrice_) =>ProductPriceAction.loadProductPriceByShortcodeSuccess({ ProductPrice_ })),
          catchError((error) =>of(ProductPriceAction.loadProductPriceByShortcodeFailure({ error:error.message })))
        )
      )
    )
  );
  // loadSubQuantityById$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SubQuantityTypeAction.loadSubQuantityTypeById),
  //     mergeMap((action) =>
  //       this.SubQuantityTypeService.getbyid(action.selectQtypeID).pipe(
  //         map((SubQuantityType_) => SubQuantityTypeAction.loadSubQuantityTypeByIdSuccess({ SubQuantityType_ })),
  //         catchError((error) =>
  //           of(SubQuantityTypeAction.loadSubQuantityTypeByIdFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );
  addProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPriceAction.addProductPrice),
      mergeMap((action) =>
        this.ProductPriceService.post(action.ProductPrice_).pipe(
          map((ProductPrice_) => ProductPriceAction.addProductPriceSuccess({ ProductPrice_ })),
          catchError((error) => of(ProductPriceAction.addProductPriceFailure({ error: error.message })))
        )
      )
    )
  );

  updateProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPriceAction.updateProductPrice),
      mergeMap((action) =>
        this.ProductPriceService.update(action.ProductPrice_).pipe(
          map((ProductPrice_) => ProductPriceAction.updateProductPriceSuccess({ ProductPrice_ })),
          catchError((error) => of(ProductPriceAction.updateProductPriceFailure({ error: error.message })))
        )
      )
    )
  );

  deletProductPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPriceAction.deleteProductPrice),
      mergeMap((action) =>
        this.ProductPriceService.delete(action._id).pipe(
          map(() => ProductPriceAction.deleteProductPrice({ _id: action._id })),
          catchError((error) => of(ProductPriceAction.deleteProductPriceFailure({ error: error.message })))
        )
      )
    )
  );
}
