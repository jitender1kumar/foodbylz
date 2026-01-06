import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenratedItemKOT } from '../../../core/Model/crud.model';

export const selectRunningItemsState = createFeatureSelector<{ KOTrunningorders: GenratedItemKOT[] }>('runningItems');

export const selectAllRunningItems = createSelector(
  selectRunningItemsState,
  (state) => state?.KOTrunningorders || []
);
