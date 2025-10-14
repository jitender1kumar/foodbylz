import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AddOnProductActions from './addOnProduct.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AddOnProduct, AddOnProductEdit } from '../../../core/Model/crud.model';
import { addAddOnProductService } from '../../../core/Services/addOnProduct.service';

@Injectable()
export class AddOnProductEffects {
  constructor(
    private actions$: Actions,
    private addOnProductService: addAddOnProductService
  ) {}

  loadAllAddOnProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddOnProductActions.loadAllAddOnProducts),
      mergeMap(() =>
        this.addOnProductService.get().pipe(
          map((addOnProductsdata: any) =>
            AddOnProductActions.loadAllAddOnProductsSuccess({ addOnProductsdata: addOnProductsdata as AddOnProduct[] })
          ),
          catchError((error) =>
            of(AddOnProductActions.loadAllAddOnProductsFailure({ error }))
          )
        )
      )
      )
    
  );
  loadAddOnProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddOnProductActions.loadAddOnProducts),
      mergeMap(() =>
        this.addOnProductService.get().pipe(
          map((addOnProducts: any) =>
            AddOnProductActions.loadAddOnProductsSuccess({ addOnProducts: addOnProducts as AddOnProduct[] })
          ),
          catchError((error) =>
            of(AddOnProductActions.loadAddOnProductsFailure({ error }))
          )
        )
      )
      )
    
  );

  addAddOnProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddOnProductActions.addAddOnProduct),
      mergeMap((action) =>
        this.addOnProductService.add(action.addOnProduct).pipe(
          map((addOnProduct: AddOnProduct) =>
            AddOnProductActions.addAddOnProductSuccess({ addOnProduct })
          ),
          catchError((error) =>
            of(AddOnProductActions.addAddOnProductFailure({ error }))
          )
        )
      )
    )
  );

  // updateAddOnProduct$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AddOnProductActions.updateAddOnProduct),
  //     mergeMap((action: { addOnProduct: AddOnProductEdit }) =>
  //       this.addOnProductService.update(action.addOnProduct).pipe(
  //         map((updatedAddOnProduct: any) =>
  //           AddOnProductActions.updateAddOnProductSuccess({ addOnProduct: updatedAddOnProduct })
  //         ),
  //         catchError((error) =>
  //           of(AddOnProductActions.updateAddOnProductFailure({ error }))
  //         )
  //       )
  //     )
  //     )
  // );
  updateAddOnProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddOnProductActions.updateAddOnProduct),
      mergeMap(action =>
        this.addOnProductService.update(action.addOnProductEdit).pipe(
          map((addOnProductEdit: any) =>
            AddOnProductActions.updateAddOnProductSuccess({ addOnProductEdit })
          ),
          catchError(error =>
            of(AddOnProductActions.updateAddOnProductFailure({ error }))
          )
        )
      )
    )
  );
  deleteAddOnProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddOnProductActions.deleteAddOnProduct),
      mergeMap((action) =>
        this.addOnProductService.delete(action._id).pipe(
          map(() =>
            AddOnProductActions.deleteAddOnProductSuccess({ _id: action._id })
          ),
          catchError((error) =>
            of(AddOnProductActions.deleteAddOnProductFailure({ error }))
          )
        )
      )
    )
  );

getByProductIdSubQTypeIDAddOnProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AddOnProductActions.getByProductIdSubQTypeIDAddOnProducts),
    mergeMap(action =>
      this.addOnProductService.getBySubType_ProductId(action.SelectProductId, action.SubQuantityTypeID).pipe(
        map((addOnProducts: any) =>
          AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess({ addOnProducts })
        ),
        catchError(error =>
          of(AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure({ error }))
        )
      )
    )
  )
);
getAddOnProductById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AddOnProductActions.getAddOnProductById),
    mergeMap(action =>
      this.addOnProductService.getById(action._id).pipe(
        map((addOnProduct: any) =>
          AddOnProductActions.getAddOnProductByIdSuccess({ addOnProduct })
        ),
        catchError(error =>
          of(AddOnProductActions.getAddOnProductByIdFailure({ error }))
        )
      )
    )
  )
);

}