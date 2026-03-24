import { createSelector } from '@ngrx/store';

export const selectGeneratedItemsState = (state: any) => state.GenratedItemsReducer_;
export const selectAddSuccess = createSelector(
  selectGeneratedItemsState,
  state => state
  );