import { createAction, props } from '@ngrx/store';
import { GenratedItemKOT } from '../../../core/Model/crud.model';

// Load Running Items (from GenratedItemKOT)
export const loadRunningItems = createAction('[RunningItems] Load RunningItems');

export const loadRunningItemsSuccess = createAction(
  '[RunningItems] Load RunningItems Success',
  props<{ KOTrunningorders: GenratedItemKOT[] }>()
);

export const addRunningItem = createAction(
  '[RunningItems] Add RunningItem',
  props<{ KOTrunningorders: GenratedItemKOT }>()
);
export const addRunningItemSuccess = createAction(
  '[RunningItems] Add RunningItem Success',
  props<{ KOTrunningorders: GenratedItemKOT }>()
);

export const addRunningItemFailure = createAction(
  '[RunningItems] Add RunningItem Failure',
  props<{ error: any }>()
);

export const updateRunningItem = createAction(
  '[RunningItems] Update RunningItem',
  props<{ KOTrunningorders: GenratedItemKOT }>()
);

export const removeRunningItem = createAction(
  '[RunningItems] Remove RunningItem',
  props<{ RecieptNumber: string }>()
);

export const clearRunningItems = createAction('[RunningItems] Clear All');