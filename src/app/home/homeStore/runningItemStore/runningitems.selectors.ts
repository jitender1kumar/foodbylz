import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RunningItemsState } from './runningItem.reducers';

export const selectRunningItemsState = createFeatureSelector<RunningItemsState>('runningItem');

export const selectAllRunningItems = createSelector(
  selectRunningItemsState,
  (state: RunningItemsState) => state.runningItem // Assumes 'items' is the property holding the list
);

export const selectRunningItemsLoading = createSelector(
  selectRunningItemsState,
  (state: RunningItemsState) => state.loading // Assumes 'loading' flag exists
);





