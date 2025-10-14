import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FloorActions from './floor.action';
import { FloorService } from '../../../core/Services/floor.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FloorEffects {
  constructor(
    private actions$: Actions,
    private floorService: FloorService
  ) {}

  loadFloors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.loadFloors),
      mergeMap(() =>
        this.floorService.get().pipe(
          map((Floor_) => FloorActions.loadFloorsSuccess({ Floor_ })),
          catchError((error) =>
            of(FloorActions.loadFloorsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addFloor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.addFloor),
      mergeMap((action) =>
        this.floorService.add(action.Floor_).pipe(
          map((Floor_) => FloorActions.addFloorSuccess({ Floor_ })),
          catchError((error) =>
            of(FloorActions.addFloorFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateFloor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.updateFloor),
      mergeMap((action) =>
        this.floorService.update(action.Floor_).pipe(
          map((Floor_: any) => FloorActions.updateFloorSuccess({ Floor_ })),
          catchError((error) =>
            of(FloorActions.updateFloorFailure({ error: error.message }))
          )
        )
      )
      )
    );
  

  deleteFloor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FloorActions.deleteFloor),
      mergeMap((action) =>
        this.floorService.delete(action._id).pipe(
          map(() => FloorActions.deleteFloorSuccess({ _id: action._id })),
          catchError((error) =>
            of(FloorActions.deleteFloorFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
