import { createReducer, on } from '@ngrx/store';
import * as DiscountActions from './discount.action';

export interface DiscountState {
  discounts: any[];
  selectedDiscount: any | null;
  loading: boolean;
  error: any;
}

export const initialState: DiscountState = {
  discounts: [],
  selectedDiscount: null,
  loading: false,
  error: null
};

export const discountReducer = createReducer(
  initialState,

  // Load Discounts
  on(DiscountActions.loadDiscounts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DiscountActions.loadDiscountsSuccess, (state, { discounts }) => ({
    ...state,
    discounts: discounts,
    loading: false,
    error: null
  })),
  on(DiscountActions.loadDiscountsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Load Single Discount
  on(DiscountActions.loadDiscount, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DiscountActions.loadDiscountSuccess, (state, { discount }) => ({
    ...state,
    selectedDiscount: discount,
    loading: false,
    error: null
  })),
  on(DiscountActions.loadDiscountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Create Discount
  on(DiscountActions.createDiscount, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DiscountActions.createDiscountSuccess, (state, { discount }) => ({
    ...state,
    discounts: [...state.discounts, discount],
    loading: false,
    error: null
  })),
  on(DiscountActions.createDiscountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Update Discount
  on(DiscountActions.updateDiscount, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DiscountActions.updateDiscountSuccess, (state, { discount }) => ({
    ...state,
    discounts: state.discounts.map(d => d._id === discount._id ? discount : d),
    loading: false,
    error: null
  })),
  on(DiscountActions.updateDiscountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Delete Discount
  on(DiscountActions.deleteDiscount, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DiscountActions.deleteDiscountSuccess, (state, { id }) => ({
    ...state,
    discounts: state.discounts.filter(d => d._id !== id),
    loading: false,
    error: null
  })),
  on(DiscountActions.deleteDiscountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
);
