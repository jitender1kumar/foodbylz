// Product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Products } from '../../../core/Model/crud.model';

export interface ProductState {
    Product_: Products[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
    Product_: [],
  loading: false,
  error: null
};

export const ProductLoadReducer = createReducer(
  initialState,
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductSuccess, (state, { Product_ }) => ({
    ...state,
    Product_,
    loading: false
  })),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const ProductByIdLoadReducer = createReducer(
  initialState,
  on(ProductActions.loadProductById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductByIdSuccess, (state, { Product_ }) => ({
    ...state,
    Product_: Product_,
    loading: false
  })),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const ProductAddReducer = createReducer(
  initialState,
  on(ProductActions.addProduct, (state, { Product_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(ProductActions.addProductSuccess, (state, { Product_ }) => ({
    ...state,
    Product_: [...state.Product_, Product_],
    loading:false
  })),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const ProductUpdateReducer = createReducer(
  initialState,
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.updateProductSuccess, (state, { Product_ }) => ({
    ...state,
    Product: state.Product_.map((Product_) =>
      Product_._id === Product_._id ? Product_ : Product_
    ),
    loading: false,
  })),

  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const ProductDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove Product
  on(ProductActions.deleteProductSuccess, (state, { _id }) => ({
    ...state,
    Product_: state.Product_.filter((Product_) => Product_._id !== _id),
    loading: false,
  })),

  // On failure
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);