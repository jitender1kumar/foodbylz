import { createAction, props } from '@ngrx/store';
import {GenratedItems} from '../../../core/Model/crud.model'
// Load Product Items
export const loadProductItems = createAction(
  '[Product Item] Load Product Items',
  props<{ invoiceId: string }>()
);

export const loadProductItemsSuccess = createAction(
  '[Product Item] Load Product Items Success',
  props<{ items: any[] }>()
);

export const loadProductItemsFailure = createAction(
  '[Product Item] Load Product Items Failure',
  props<{ error: any }>()
);

// Add Product Item
export const addProductItem = createAction(
  '[Product Item] Add Product Item',
  props<{ items: any[] }>()
);

export const addProductItemSuccess = createAction(
  '[Product Item] Add Product Item Success',
  props<{ item: any }>()
);

export const addProductItemFailure = createAction(
  '[Product Item] Add Product Item Failure',
  props<{ error: any }>()
);

// Update Product Item
export const updateProductItem = createAction(
  '[Product Item] Update Product Item',
  props<{ RecieptNumber: string, Productid: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any) => unknown, SubQuantityTypeID: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any) => unknown, items: any[] }>()
);

export const updateProductItemSuccess = createAction(
  '[Product Item] Update Product Item Success',
  props<{ item: any }>()
);

export const updateProductItemFailure = createAction(
  '[Product Item] Update Product Item Failure',
  props<{ error: any }>()
);

// Delete Product Item
export const deleteProductItem = createAction(
  '[Product Item] Delete Product Item',
  props<{ invoiceId: string; productId: string; subQuantityTypeId: string }>()
);

export const deleteProductItemSuccess = createAction(
  '[Product Item] Delete Product Item Success',
  props<{ productId: string; subQuantityTypeId: string }>()
);

export const deleteProductItemFailure = createAction(
  '[Product Item] Delete Product Item Failure',
  props<{ error: any }>()
);
