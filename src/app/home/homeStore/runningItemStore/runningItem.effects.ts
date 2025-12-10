

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as RunningItemActions from './runningItem.actions';
import { KOTrunningordersService } from '../../../core/Services/KOTrunningorders.service';

@Injectable()
export class RunningItemEffects {

  loadRunningItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.loadRunningItems),
      mergeMap(() =>
        this.KOTrunningordersService.get().pipe(
          map(KOTrunningorders => RunningItemActions.loadRunningItemsSuccess({ KOTrunningorders })),
          catchError(error => of(RunningItemActions.addRunningItemFailure({ error })))
        )
      )
    )
  );

  addRunningItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.addRunningItem),
      mergeMap(action =>
        this.KOTrunningordersService.add(action.KOTrunningorders).pipe(
          map(KOTrunningorders => RunningItemActions.addRunningItemSuccess({ KOTrunningorders })),
          catchError(error => of(RunningItemActions.addRunningItemFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private KOTrunningordersService: KOTrunningordersService
  ) {}
}
