import { createAction, props } from '@ngrx/store';
import { RunningItems } from '../../../core/Model/RunningItemsHomeModel/RunningItem.model';
export const loadfood = createAction(
  '[RunningItem] Load Food',
  props<{ invoiceid: string }>()
);

export const loadfoodSuccess = createAction(
  '[RunningItem] Load Food Success',
  props<{ RunningItems_: RunningItems }>()
);

export const loadfoodFailure = createAction(
  '[RunningItem] Load Food Failure',
  props<{ error: any }>()
);
export const addRunningItem = createAction(
  '[RunningItem] Add Running Item',
  props<{ item: any }>()
);

// Action to update quantity value of a running item
export const updateRunningItemQuantity = createAction(
  '[RunningItem] Update Running Item Quantity',
  props<{
    id: string;
    action: 'inc' | 'dcre';
    SubQuantityTypeName: string;
    quntity: any;
    price: any;
    RunningItemData: any;
    invoiceid: string;
    allppdata: any;
  }>()
);

// Success and failure actions (optional, depending on effect/reducer needs)
export const updateRunningItemQuantitySuccess = createAction(
  '[RunningItem] Update Running Item Quantity Success',
  props<{ updatedRunningItem: any }>()
);

export const updateRunningItemQuantityFailure = createAction(
  '[RunningItem] Update Running Item Quantity Failure',
  props<{ error: any }>()
);

export const loadRunningItemsByReceiptNumber = createAction(
  '[RunningItem] Load Running Items By Receipt Number',
  props<{ receiptNumber: string }>()
);

export const loadRunningItemsByReceiptNumberSuccess = createAction(
  '[RunningItem] Load Running Items By Receipt Number Success',
  props<{ RunningItems_: RunningItems[] }>()
);

export const loadRunningItemsByReceiptNumberFailure = createAction(
  '[RunningItem] Load Running Items By Receipt Number Failure',
  props<{ error: any }>()
);
