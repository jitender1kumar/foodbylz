import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Discount } from '../../core/Model/crud.model';

// Define the feature state name used in your StoreModule.forFeature if any.
// This should match the key used in StoreModule.forFeature('discount', ...)
export const selectDiscountState = createFeatureSelector<any>('discount');

// Selector to return all discounts array from store
export const selectAllDiscounts = createSelector(
  selectDiscountState,
  (state) => state && state.discounts ? state.discounts : []
);
