

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as RunningItemActions from './runningItemKOT.actions';
import { KOTrunningordersService } from '../../../core/Services/KOTrunningorders.service';
import { HomeManageService } from '../../Services/homeManage.service';

@Injectable()
export class RunningItemKOTEffects {
 
  constructor(private actions$: Actions,
    private KOTrunningordersService: KOTrunningordersService, private homeManageService: HomeManageService) {}
  loadRunningItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.loadKOTRunningItems),
      mergeMap(() =>
        this.KOTrunningordersService.get().pipe(
          map(KOTrunningorders => RunningItemActions.loadKOTRunningItemsSuccess({ KOTrunningorders })),
          catchError(error => of(RunningItemActions.addKOTRunningItemFailure({ error })))
        )
      )
    )
  );

  addRunningItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.addKOTRunningItem),
      mergeMap(action =>
        this.KOTrunningordersService.add(action.KOTrunningorder).pipe(
          map(KOTrunningorder => RunningItemActions.addKOTRunningItemSuccess({ KOTrunningorder })),
          catchError(error => of(RunningItemActions.addKOTRunningItemFailure({ error })))
        )
      )
    )
  );
 
 
}
