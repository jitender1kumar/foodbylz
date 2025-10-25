import { createAction, props } from '@ngrx/store';
import { RunningItems } from '../../../model/category.model';

// Load Running Items
export const loadRunningItems = createAction('[RunningItems] Load RunningItems');

export const loadRunningItemsSuccess = createAction(
  '[RunningItems] Load RunningItems Success',
  props<{ runningItems: RunningItems[] }>()
);

export const addRunningItem = createAction(
  '[RunningItems] Add RunningItem',
  props<{ runningItem: RunningItems }>()
);
export const addRunningItemSuccess = createAction(
  '[RunningItems] Add RunningItem Success',
  props<{ runningItem: RunningItems }>()
);

export const addRunningItemFailure = createAction(
  '[RunningItems] Add RunningItem Failure',
  props<{ error: any }>()
);

export const updateRunningItem = createAction(
  '[RunningItems] Update RunningItem',
  props<{ runningItem: RunningItems }>()
);

export const removeRunningItem = createAction(
  '[RunningItems] Remove RunningItem',
  props<{ _idPP: string }>()
);

export const clearRunningItems = createAction('[RunningItems] Clear All');