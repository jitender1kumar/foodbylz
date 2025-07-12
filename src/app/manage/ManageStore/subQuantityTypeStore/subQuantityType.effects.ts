import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SubQuantityTypeAction from './subQuantityType.actions';
import { subQuantityTypeService } from '../../../core/Services/subQuantityType.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductSubQuantityTypeEffects {
  constructor(private actions$: Actions, private SubQuantityTypeService: subQuantityTypeService) {}

  loadSubQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.loadSubQuantityType),
      mergeMap(() =>
        this.SubQuantityTypeService.get().pipe(
          map((SubQuantityType_) => SubQuantityTypeAction.loadSubQuantityTypeSuccess({ SubQuantityType_})),
          catchError((error) => of(SubQuantityTypeAction.loadSubQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );
loadSubQuantityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.loadSubQuantityTypeById),
      mergeMap((action) =>
        this.SubQuantityTypeService.getbyid(action.selectQtypeID).pipe(
          map((SubQuantityType_) => SubQuantityTypeAction.loadSubQuantityTypeByIdSuccess({ SubQuantityType_ })),
          catchError((error) =>
            of(SubQuantityTypeAction.loadSubQuantityTypeByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
  loadSubQuantityByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.loadSubQuantityTypeByName),
      mergeMap((action) =>
        this.SubQuantityTypeService.getbyname(action.name).pipe(
          map((SubQuantityType_) => SubQuantityTypeAction.loadSubQuantityTypeByIdSuccess({ SubQuantityType_ })),
          catchError((error) =>
            of(SubQuantityTypeAction.loadSubQuantityTypeByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );
  addSubQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.addSubQuantityType),
      mergeMap((action) =>
        this.SubQuantityTypeService.add(action.SubQuantityType_).pipe(
          map((SubQuantityType_) => SubQuantityTypeAction.addSubQuantityTypeSuccess({ SubQuantityType_ })),
          catchError((error) => of(SubQuantityTypeAction.addSubQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  updateSubQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.updateSubQuantityType),
      mergeMap((action) =>
        this.SubQuantityTypeService.update(action.SubQuantityType_).pipe(
          map((SubQuantityType_) => SubQuantityTypeAction.updateSubQuantityTypeSuccess({ SubQuantityType_ })),
          catchError((error) => of(SubQuantityTypeAction.updateSubQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );

  deletSubQuantityType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubQuantityTypeAction.deleteSubQuantityType),
      mergeMap((action) =>
        this.SubQuantityTypeService.delete(action._id).pipe(
          map(() => SubQuantityTypeAction.deleteSubQuantityType({ _id: action._id })),
          catchError((error) => of(SubQuantityTypeAction.deleteSubQuantityTypeFailure({ error: error.message })))
        )
      )
    )
  );
}
