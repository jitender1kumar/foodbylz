import { createAction, props } from '@ngrx/store';
import { GenratedItemKOT } from '../../../core/Model/crud.model';

// Load Running Items (from GenratedItemKOT)
export const loadKOTRunningItems = createAction('[RunningItemsKOT] Load RunningItemsKOT');

export const loadKOTRunningItemsSuccess = createAction(
  '[RunningItemsKOT] Load RunningItemsKOT Success',
  props<{ KOTrunningorders: GenratedItemKOT[] }>()
);

export const addKOTRunningItem = createAction(
  '[RunningItemsKOT] Add RunningItemKOT',
  props<{ KOTrunningorder: GenratedItemKOT }>()
);
export const addKOTRunningItemSuccess = createAction(
  '[RunningItemsKOT] Add RunningItemKOT Success',
  props<{ KOTrunningorder: GenratedItemKOT }>()
);

export const addKOTRunningItemFailure = createAction(
  '[RunningItemsKOT] Add RunningItemKOT Failure',
  props<{ error: any }>()
);

export const updateKOTRunningItem = createAction(
  '[RunningItemsKOT] Update RunningItemKOT',
  props<{ KOTrunningorder: GenratedItemKOT }>()
);

export const removeKOTRunningItem = createAction(
  '[RunningItemsKOT] Remove RunningItemKOT',
  props<{ RecieptNumber: string }>()
);


export const clearKOTRunningItems = createAction('[RunningItemsKOT] Clear All');