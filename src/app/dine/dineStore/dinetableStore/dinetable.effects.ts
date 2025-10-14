import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as DineActions from './dinetable.action';
import { DineService } from '../../../core/Services/dine.service'
import { IDine } from '../../../core/Model/crud.model';

@Injectable()
export class DineEffects {
  constructor(
    private actions$: Actions,
    private dineService: DineService,
    private store: Store
  ) {}

  loadDines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DineActions.loadDineTables),
      mergeMap(() =>
        this.dineService.get().pipe(
          map((IDine_: IDine[]) => DineActions.loadDineTablesSuccess({ IDine_ })),
          catchError(error => of(DineActions.loadDineTablesFailure({ error })))
        )
      )
    )
  );

  addDine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DineActions.addDineTable),
      mergeMap(action =>
        this.dineService.add(action.IDine_).pipe(
          map((IDine_: IDine) => DineActions.addDineTableSuccess({ IDine_ })),
          catchError(error => of(DineActions.addDineTableFailure({ error })))
        )
      )
    )
  );

  updateDine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DineActions.updateDineTable),
      mergeMap(action =>
        this.dineService.update(action.IDine_).pipe(
          map((IDine_: any) => DineActions.updateDineTableSuccess({ IDine_ })),
          catchError(error => of(DineActions.updateDineTableFailure({ error })))
        )
      )
    )
  );

  deleteDine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DineActions.deleteDineTable),
      mergeMap(action =>
        this.dineService.delete(action._id).pipe(
          map(() => DineActions.deleteDineTableSuccess({ _id: action._id })),
          catchError(error => of(DineActions.deleteDineTableFailure({ error })))
        )
      )
    )
  );
}
