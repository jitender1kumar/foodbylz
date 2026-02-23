import { createAction, props } from '@ngrx/store';
import { GenratedItems } from '../../../core/Model/crud.model';

export const addGenratedItems = createAction(
  '[GenratedItems] Add GenratedItems',
  props<{ items: GenratedItems }>()
);
export const addGenratedItemsSuccess = createAction(
  '[GenratedItems] Add GenratedItems Success',
  props<{ items: GenratedItems }>()
);
export const addGenratedItemsFailure = createAction(
  '[GenratedItems] Add GenratedItems Failure',
  props<{ error: string }>()
);

export const loadGenratedItems = createAction(
  '[GenratedItems] Load GenratedItems',
);
export const loadGenratedItemsSuccess = createAction(
  '[GenratedItems] Load GenratedItems Success',
  props<{ items: GenratedItems }>()
);
export const loadGenratedItemsFailure = createAction(
  '[GenratedItems] Load GenratedItems Failure',
  props<{ error: string }>()
);
export const deleteGenratedItems = createAction(
  '[GenratedItems] Delete GenratedItems',
  props<{ items: GenratedItems }>()
);
export const deleteGenratedItemsSuccess = createAction(
  '[GenratedItems] Delete GenratedItems Success',
  props<{ items: GenratedItems }>()
);
export const deleteGenratedItemsFailure = createAction(
  '[GenratedItems] Delete GenratedItems Failure',
  props<{ error: string }>()
);
export const updateGenratedItems = createAction(
  '[GenratedItems] Update GenratedItems',
  props<{ items: GenratedItems }>()
);
export const updateGenratedItemsSuccess = createAction(
  '[GenratedItems] Update GenratedItems Success',
  props<{ items: GenratedItems }>()
);
export const updateGenratedItemsFailure = createAction(
  '[GenratedItems] Update GenratedItems Failure',
  props<{ error: string }>()
);
