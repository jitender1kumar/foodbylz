import { createAction, props } from '@ngrx/store';

// Load Discounts
export const loadDiscounts = createAction(
  '[Discount] Load Discounts'
);
export const loadDiscountsSuccess = createAction(
  '[Discount] Load Discounts Success',
  props<{ discounts: any[] }>()
);
export const loadDiscountsFailure = createAction(
  '[Discount] Load Discounts Failure',
  props<{ error: any }>()
);

// Load Single Discount
export const loadDiscount = createAction(
  '[Discount] Load Discount',
  props<{ id: string }>()
);
export const loadDiscountSuccess = createAction(
  '[Discount] Load Discount Success',
  props<{ discount: any }>()
);
export const loadDiscountFailure = createAction(
  '[Discount] Load Discount Failure',
  props<{ error: any }>()
);

// Create Discount
export const createDiscount = createAction(
  '[Discount] Create Discount',
  props<{ discount: any }>()
);
export const createDiscountSuccess = createAction(
  '[Discount] Create Discount Success',
  props<{ discount: any }>()
);
export const createDiscountFailure = createAction(
  '[Discount] Create Discount Failure',
  props<{ error: any }>()
);

// Update Discount
export const updateDiscount = createAction(
  '[Discount] Update Discount',
  props<{ discount: any }>()
);
export const updateDiscountSuccess = createAction(
  '[Discount] Update Discount Success',
  props<{ discount: any }>()
);
export const updateDiscountFailure = createAction(
  '[Discount] Update Discount Failure',
  props<{ error: any }>()
);

// Delete Discount
export const deleteDiscount = createAction(
  '[Discount] Delete Discount',
  props<{ id: string }>()
);
export const deleteDiscountSuccess = createAction(
  '[Discount] Delete Discount Success',
  props<{ id: string }>()
);
export const deleteDiscountFailure = createAction(
  '[Discount] Delete Discount Failure',
  props<{ error: any }>()
);
