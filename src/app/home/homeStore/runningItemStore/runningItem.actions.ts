import { createAction, props } from '@ngrx/store';
import { RunningItems } from '../../../model/category.model';

// Load Running Items
export const loadRunningItems = createAction(
  '[Running Item] Load Running Items',
  props<{ invoiceId: string }>()
);

export const loadRunningItemsSuccess = createAction(
  '[Running Item] Load Running Items Success',
  props<{ items: RunningItems[] }>()
);

export const loadRunningItemsFailure = createAction(
  '[Running Item] Load Running Items Failure',
  props<{ error: any }>()
);

// Add Running Item
export const addRunningItem = createAction(
  '[Running Item] Add Running Item',
  props<{ item: any }>()
);

export const addRunningItemSuccess = createAction(
  '[Running Item] Add Running Item Success',
  props<{ item: any }>()
);

export const addRunningItemFailure = createAction(
  '[Running Item] Add Running Item Failure',
  props<{ error: any }>()
);

// Update Running Item
export const updateRunningItem = createAction(
  '[Running Item] Update Running Item',
  props<{ item: RunningItems }>()
);

export const updateRunningItemSuccess = createAction(
  '[Running Item] Update Running Item Success',
  props<{ item: RunningItems }>()
);

export const updateRunningItemFailure = createAction(
  '[Running Item] Update Running Item Failure',
  props<{ error: any }>()
);

// Delete Running Item
export const deleteRunningItem = createAction(
  '[Running Item] Delete Running Item',
  props<{ invoiceId: string; productId: string; subQuantityTypeId: string }>()
);

export const deleteRunningItemSuccess = createAction(
  '[Running Item] Delete Running Item Success',
  props<{ productId: string; subQuantityTypeId: string }>()
);

export const deleteRunningItemFailure = createAction(
  '[Running Item] Delete Running Item Failure',
  props<{ error: any }>()
);
