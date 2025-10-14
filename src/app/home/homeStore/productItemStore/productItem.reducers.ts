import { createReducer, on } from '@ngrx/store';
import * as ProductItemActions from './productItem.actions';

export interface ProductItemState {
  items: any[];
  loading: boolean;
  error: any | null;
}

export const initialState: ProductItemState = {
  items: [],
  loading: false,
  error: null
};

export const productItemReducer = createReducer(
  initialState,

  // Load Product Items
  on(ProductItemActions.loadProductItems, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductItemActions.loadProductItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null
  })),
  on(ProductItemActions.loadProductItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Product Item
  on(ProductItemActions.addProductItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductItemActions.addProductItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false,
    error: null
  })),
  on(ProductItemActions.addProductItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Product Item
  on(ProductItemActions.updateProductItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductItemActions.updateProductItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i =>
      i.Productid === item.Productid && i.SubQuantityTypeID === item.SubQuantityTypeID ? item : i
    ),
    loading: false,
    error: null
  })),
  on(ProductItemActions.updateProductItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Product Item
  on(ProductItemActions.deleteProductItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductItemActions.deleteProductItemSuccess, (state, { productId, subQuantityTypeId }) => ({
    ...state,
    items: state.items.filter(
      i => !(i.Productid === productId && i.SubQuantityTypeID === subQuantityTypeId)
    ),
    loading: false,
    error: null
  })),
  on(ProductItemActions.deleteProductItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
