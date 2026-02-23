import { createAction, props } from '@ngrx/store';

// Split (execute actual bill splitting)
export const splitBill = createAction(
  '[SplitBill] Split Bill',
  props<{
    method: 'portion' | 'percent' | 'items',
    data: any
  }>()
);
export const splitBillSuccess = createAction(
  '[SplitBill] Split Bill Success',
  props<{ result: any }>()
);
export const splitBillFailure = createAction(
  '[SplitBill] Split Bill Failure',
  props<{ error: any }>()
);

// Get by ID
export const loadSplitBillById = createAction(
  '[SplitBill] Load Split Bill By Id',
  props<{ id: string }>()
);
export const loadSplitBillByIdSuccess = createAction(
  '[SplitBill] Load Split Bill By Id Success',
  props<{ splitBill: any }>()
);
export const loadSplitBillByIdFailure = createAction(
  '[SplitBill] Load Split Bill By Id Failure',
  props<{ error: any }>()
);

// List all
export const loadAllSplitBills = createAction(
  '[SplitBill] Load All Split Bills',
  props<{ params?: any }>()
);
export const loadAllSplitBillsSuccess = createAction(
  '[SplitBill] Load All Split Bills Success',
  props<{ splitBills: any[] }>()
);
export const loadAllSplitBillsFailure = createAction(
  '[SplitBill] Load All Split Bills Failure',
  props<{ error: any }>()
);

// Update
export const updateSplitBill = createAction(
  '[SplitBill] Update Split Bill',
  props<{ id: string; data: any }>()
);
export const updateSplitBillSuccess = createAction(
  '[SplitBill] Update Split Bill Success',
  props<{ splitBill: any }>()
);
export const updateSplitBillFailure = createAction(
  '[SplitBill] Update Split Bill Failure',
  props<{ error: any }>()
);

// Delete
export const deleteSplitBill = createAction(
  '[SplitBill] Delete Split Bill',
  props<{ id: string }>()
);
export const deleteSplitBillSuccess = createAction(
  '[SplitBill] Delete Split Bill Success',
  props<{ id: string }>()
);
export const deleteSplitBillFailure = createAction(
  '[SplitBill] Delete Split Bill Failure',
  props<{ error: any }>()
);

// Add (raw add, not computed split)
export const addSplitBill = createAction(
  '[SplitBill] Add Split Bill',
  props<{ data: any }>()
);
export const addSplitBillSuccess = createAction(
  '[SplitBill] Add Split Bill Success',
  props<{ splitBill: any }>()
);
export const addSplitBillFailure = createAction(
  '[SplitBill] Add Split Bill Failure',
  props<{ error: any }>()
);
