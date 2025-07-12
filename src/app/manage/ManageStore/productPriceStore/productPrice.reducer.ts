// ProductPrice.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ProductPriceActions from './productPrice.actions';
import { ProductPrice } from '../../../core/Model/crud.model';

export interface ProductPriceState {
    ProductPrice_: ProductPrice[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductPriceState = {
    ProductPrice_: [],
  loading: false,
  error: null
};

export const productPriceLoadReducer = createReducer(
  initialState,
  on(ProductPriceActions.loadProductPrice, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductPriceActions.loadProductPriceSuccess, (state, { ProductPrice_ }) => ({
    ...state,
    ProductPrice_,
    loading: false
  })),
  on(ProductPriceActions.loadProductPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  

);
export const productPriceAddReducer = createReducer(
  initialState,
  on(ProductPriceActions.addProductPrice, (state, { ProductPrice_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(ProductPriceActions.addProductPriceSuccess, (state, { ProductPrice_ }) => ({
    ...state,
    ProductPrice_: [...state.ProductPrice_, ProductPrice_],
    loading:false
  })),
  on(ProductPriceActions.addProductPriceFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const productPriceUpdateReducer = createReducer(
  initialState,
  on(ProductPriceActions.updateProductPrice, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductPriceActions.updateProductPriceSuccess, (state, { ProductPrice_ }) => ({
    ...state,
    ProductPrice: state.ProductPrice_.map((ProductPrice_) =>
      ProductPrice_._id === ProductPrice_._id ? ProductPrice_ : ProductPrice_
    ),
    loading: false,
  })),

  on(ProductPriceActions.updateProductPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const productPriceDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(ProductPriceActions.deleteProductPrice, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove ProductPrice
  on(ProductPriceActions.deleteProductPriceSuccess, (state, { _id }) => ({
    ...state,
    ProductPrice_: state.ProductPrice_.filter((ProductPrice_) => ProductPrice_._id !== _id),
    loading: false,
  })),

  // On failure
  on(ProductPriceActions.deleteProductPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);