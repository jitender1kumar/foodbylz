import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as GenratedItemsActions from './GenratedItems.action';
import { GenratedItemsService } from '../../../core/Services/GenratedItems.service';
import { forkJoin, of } from 'rxjs';

@Injectable()
export class GenratedItemsEffects {

  constructor(private actions$: Actions, private itemsService: GenratedItemsService) {}

  addGenratedItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenratedItemsActions.addGenratedItems),
      mergeMap(action =>
        // GenratedItemsService.add expects: add(Items: GenratedItems[]) : Observable<GenratedItems>
        this.itemsService.add([action.items]).pipe(
          map((addedItem: any) =>
            GenratedItemsActions.addGenratedItemsSuccess({ items: addedItem })
          ),
          catchError(error =>
            of(GenratedItemsActions.addGenratedItemsFailure({ error }))
          )
        )
      )
    )
  );

  loadGenratedItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenratedItemsActions.loadGenratedItems),
      mergeMap(() =>
        this.itemsService.get().pipe(
          map((items: any) =>
            // For compatibility with reducer expecting array or singleton
            GenratedItemsActions.loadGenratedItemsSuccess({ items: items })
          ),
          catchError(error =>
            of(GenratedItemsActions.loadGenratedItemsFailure({ error }))
          )
        )
      )
    )
  );

  deleteGenratedItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenratedItemsActions.deleteGenratedItems),
      mergeMap(action => {
        const { RecieptNumber,_id, Items } = action.items;

        if (Array.isArray(Items) && Items.length > 0) {
          // Delete each item in Items array using forkJoin for parallel deletion
          const deleteObservables = Items.map(item =>
            this.itemsService.delete(
              RecieptNumber,
              item.Productid,
              item.SubQuantityTypeID,
              _id
            )
          );
          return forkJoin(deleteObservables).pipe(
            map(() =>
              GenratedItemsActions.deleteGenratedItemsSuccess({ items: action.items })
            ),
            catchError(error =>
              of(GenratedItemsActions.deleteGenratedItemsFailure({ error }))
            )
          );
        } else {
          // No Items to delete, still return success
          return of(GenratedItemsActions.deleteGenratedItemsSuccess({ items: action.items }));
        }
      })
    )
  );

  updateGenratedItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenratedItemsActions.updateGenratedItems),
      mergeMap(action => {
        const {  Items } = action.items;
        if (Array.isArray(Items) && Items.length > 0) {
          // Pass the composed GenratedItems object inside an array to match service signature
          const genratedItemsToUpdate = [{ ...action.items, Items }];
          return this.itemsService.update(genratedItemsToUpdate).pipe(
            map(() => GenratedItemsActions.updateGenratedItemsSuccess({ items: action.items })),
            catchError(error =>
              of(GenratedItemsActions.updateGenratedItemsFailure({ error }))
            )
          );
          
        
         
        } else {
          // If no items to update, immediately return success
          return of(GenratedItemsActions.updateGenratedItemsSuccess({ items: action.items }));
        }
      })
    )
  );
}
