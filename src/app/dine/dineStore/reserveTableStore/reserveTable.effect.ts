import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReserveTableActions from './reserveTable.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ReserveDineService } from '../../../core/Services/reserveDine.service'; // You may need to adjust the path


@Injectable()
export class ReserveTableEffects {
  constructor(
    private actions$: Actions,
    private reserveTableService: ReserveDineService
  ) {}

  // Effect to load reserve tables
  loadReserveTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReserveTableActions.loadReserveTables),
      mergeMap(() =>
        this.reserveTableService.get().pipe(
          map((response: any) => ReserveTableActions.loadReserveTablesSuccess({ reserveTables: response.data })),
          catchError(error => of(ReserveTableActions.loadReserveTablesFailure({ error })))
        )
      )
    )
  );

  // Effect to add a new reserve table
  addReserveTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReserveTableActions.addReserveTable),
      mergeMap(action =>
        this.reserveTableService.add(action.reserveTable).pipe(
          map((response: any) => ReserveTableActions.addReserveTableSuccess({ reserveTable: response.data })),
          catchError(error => of(ReserveTableActions.addReserveTableFailure({ error })))
        )
      )
    )
  );

  // Effect to update a reserve table
  updateReserveTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReserveTableActions.updateReserveTable),
      mergeMap(action =>
        this.reserveTableService.update(action.reserveTable).pipe(
          map((response: any) => ReserveTableActions.updateReserveTableSuccess({ reserveTable: response.data })),
          catchError(error => of(ReserveTableActions.updateReserveTableFailure({ error })))
        )
      )
    )
  );

  // Effect to delete a reserve table
  deleteReserveTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReserveTableActions.deleteReserveTable),
      mergeMap(action =>
        this.reserveTableService.delete(action.id).pipe(
          map(() => ReserveTableActions.deleteReserveTableSuccess({ id: action.id })),
          catchError(error => of(ReserveTableActions.deleteReserveTableFailure({ error })))
        )
      )
    )
  );
}
