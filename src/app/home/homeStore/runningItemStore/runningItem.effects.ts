
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import * as RunningItemActions from './runningItem.action';
 import { HomeManageService } from '../../Services/homeManage.service';
 import { RunningItemsPouchdbService } from '../../../core/db/services/runningItemsPouchdb.service';
import { Store } from '@ngrx/store';

// No API call; all logic is handled in reducer as per reducer code/context.   ,private PouchdbService_:PouchdbService

@Injectable()
export class RunningItemEffects {
  constructor(
    private actions$: Actions,
    private HomeManageService_:HomeManageService,
    private RunningItemsPouchdbService_:RunningItemsPouchdbService,
    private store: Store<{ runningItemReducer_: { RunningItems_: any[] } }>
  ) {}
//private HomeManageService_:HomeManageService,
  // updateRunningItemQuantity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RunningItemActions.updateRunningItemQuantity),
  //     switchMap(action => {
  //       const {
  //         id,
  //         action: changeType,
  //         SubQuantityTypeName,
  //         quntity,
  //         price,
  //         RunningItemData,
  //         invoiceid,
  //         allppdata
  //       } = action;

  //       // First, update the running item in pouchdb (returns a promise)
  //       return from(
  //         this.RunningItemsPouchdbService_.updateByReceiptNumber(invoiceid, allppdata)
  //       ).pipe(
  //         // After updating, fetch the latest running items for this invoiceid
  //         switchMap(() =>
  //           from(this.RunningItemsPouchdbService_.get(invoiceid)).pipe(
  //             map((updatedRunningItems) =>
  //               RunningItemActions.updateRunningItemQuantitySuccess({
  //                 updatedRunningItem: updatedRunningItems
  //               })
  //             ),
  //             catchError(error =>
  //               of(RunningItemActions.updateRunningItemQuantityFailure({ error }))
  //             )
  //           )
  //         ),
  //         catchError(error =>
  //           of(RunningItemActions.updateRunningItemQuantityFailure({ error }))
  //         )
  //       );
  //     })
  //   )
  // );

  // loadRunningItemsByReceiptNumber$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RunningItemActions.loadRunningItemsByReceiptNumber),
  //     // The action should have: { receiptNumber }
  //     // .getRunningItemsByReceiptNumber returns a Promise, so use switchMap+from
  //     switchMap(action =>
  //       from(this.RunningItemsPouchdbService_.get(action.receiptNumber)).pipe(
  //         map((RunningItems_) => RunningItemActions.loadRunningItemsByReceiptNumberSuccess({ RunningItems_ })),
  //         catchError(error =>
  //           of(RunningItemActions.loadRunningItemsByReceiptNumberFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );
  // addRunningItem$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RunningItemActions.addRunningItem), // Make sure to create this action in your actions file
  //     switchMap(action =>
  //       from(this.RunningItemsPouchdbService_.add(action.item)).pipe(
  //         switchMap(() =>
  //           from(this.RunningItemsPouchdbService_.get(action.item.invoiceid || action.item.receiptNumber)).pipe(
  //             map((RunningItems_) => RunningItemActions.loadRunningItemsByReceiptNumberSuccess({ RunningItems_ }))
  //           )
  //         ),
  //         catchError(error =>
  //           of(RunningItemActions.updateRunningItemQuantityFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  
  loadfood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.loadfood),
      map(action => {
        const { invoiceid } = action;
        try {
          const RunningItemsRaw = localStorage.getItem(invoiceid);
          const RunningItems_ = RunningItemsRaw ? JSON.parse(RunningItemsRaw) : [];
         // const RunningItems_ = this.HomeManageService_.loadfood(invoiceid);
          return RunningItemActions.loadfoodSuccess({ RunningItems_ });
        } catch (error) {
          return RunningItemActions.loadfoodFailure({ error });
        }
      }),
      catchError(error =>
        of(RunningItemActions.loadfoodFailure({ error }))
      )
    )
  );

  updateRunningItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.updateRunningItemQuantity),
      switchMap(({ invoiceid }) =>
        this.store.select(state => state.runningItemReducer_.RunningItems_).pipe(
          take(1),
          map((updatedRunningItems) => {
            localStorage.setItem(invoiceid, JSON.stringify(updatedRunningItems));
            return RunningItemActions.updateRunningItemQuantitySuccess({
              updatedRunningItem: updatedRunningItems
            });
          }),
          catchError(error =>
            of(RunningItemActions.updateRunningItemQuantityFailure({ error }))
          )
        )
      )
    )
  );

  updateRunningItemNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RunningItemActions.updateRunningItemNotes),
      switchMap(({ invoiceid }) =>
        this.store.select(state => state.runningItemReducer_.RunningItems_).pipe(
          take(1),
          map((updatedRunningItems) => {
            localStorage.setItem(invoiceid, JSON.stringify(updatedRunningItems));
            return RunningItemActions.updateRunningItemNotesSuccess({
              RunningItems_: updatedRunningItems
            });
          }),
          catchError(error =>
            of(RunningItemActions.updateRunningItemNotesFailure({ error }))
          )
        )
      )
    )
  );
}

