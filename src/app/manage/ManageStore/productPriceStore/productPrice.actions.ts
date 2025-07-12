import { createAction, props } from '@ngrx/store';
import { ProductPrice } from '../../../core/Model/crud.model';

// Load
export const loadProductPrice = createAction('[ProductPrice] Load ProductPrice');
export const loadProductPriceSuccess = createAction('[ProductPrice] Load ProductPrice Success', props<{ ProductPrice_: any[] }>());
export const loadProductPriceFailure = createAction('[ProductPrice] Load ProductPrice Failure', props<{ error: string }>());

// Add
export const addProductPrice = createAction('[ProductPrice] Add ProductPrice', props<{ ProductPrice_: ProductPrice }>());
export const addProductPriceSuccess = createAction('[ProductPrice] Add ProductPrice Success', props<{ ProductPrice_: ProductPrice }>());
export const addProductPriceFailure = createAction('[ProductPrice] Add ProductPrice Failure', props<{ error: string }>());

// Update
export const updateProductPrice = createAction('[ProductPrice] Update ProductPrice', props<{ ProductPrice_: any }>());
export const updateProductPriceSuccess = createAction('[ProductPrice] Update ProductPrice Success', props<{ ProductPrice_: any }>());
export const updateProductPriceFailure = createAction('[ProductPrice] Update ProductPrice Failure', props<{ error: string }>());

// Delete
export const deleteProductPrice = createAction('[ProductPrice] Delete ProductPrice', props<{ _id: string }>());
export const deleteProductPriceSuccess = createAction('[ProductPrice] Delete ProductPrice Success', props<{ _id: string }>());
export const deleteProductPriceFailure = createAction('[ProductPrice] Delete ProductPrice Failure', props<{ error: string }>());
