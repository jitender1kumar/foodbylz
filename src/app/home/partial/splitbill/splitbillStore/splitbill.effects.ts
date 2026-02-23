import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SplitBillActions from './splitbill.action';
import { SplitBillService } from '../../../../core/Services/splitbill.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class SplitBillEffects {
  constructor(
    private actions$: Actions,
    private splitBillService: SplitBillService
  ) {}

  // Split Bill
  splitBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SplitBillActions.splitBill),
      mergeMap((action) =>
        this.splitBillService.splitBill(action.method, action.data).pipe(
          map((result) =>
            SplitBillActions.splitBillSuccess({ result })
          ),
          catchError((error) =>
            of(SplitBillActions.splitBillFailure({ error }))
          )
        )
      )
    )
  );

  // Load SplitBill by Id
  loadSplitBillById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SplitBillActions.loadSplitBillById),
      mergeMap((action) =>
        this.splitBillService.getSplitBillById(action.id).pipe(
          map((splitBill) =>
            SplitBillActions.loadSplitBillByIdSuccess({ splitBill })
          ),
          catchError((error) =>
            of(SplitBillActions.loadSplitBillByIdFailure({ error }))
          )
        )
      )
    )
  );

  // Load All SplitBills
  loadAllSplitBills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SplitBillActions.loadAllSplitBills),
      mergeMap((action) =>
        this.splitBillService.getAllSplitBills(action.params).pipe(
          map((response) =>
            SplitBillActions.loadAllSplitBillsSuccess({
              splitBills: response.data ?? response // Adjust as per API structure
            })
          ),
          catchError((error) =>
            of(SplitBillActions.loadAllSplitBillsFailure({ error }))
          )
        )
      )
    )
  );

  // Update SplitBill
  updateSplitBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SplitBillActions.updateSplitBill),
      mergeMap((action) =>
        this.splitBillService.updateSplitBill(action.id, action.data).pipe(
          map((splitBill) =>
            SplitBillActions.updateSplitBillSuccess({ splitBill })
          ),
          catchError((error) =>
            of(SplitBillActions.updateSplitBillFailure({ error }))
          )
        )
      )
    )
  );

  // Delete SplitBill
  deleteSplitBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SplitBillActions.deleteSplitBill),
      mergeMap((action) =>
        this.splitBillService.deleteSplitBill(action.id).pipe(
          map(() =>
            SplitBillActions.deleteSplitBillSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(SplitBillActions.deleteSplitBillFailure({ error }))
          )
        )
      )
    )
  );

}
