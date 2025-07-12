import { createAction, props } from '@ngrx/store';
import { Products } from '../../../core/Model/crud.model';

// Load
export const loadProduct = createAction('[Product] Load ProductCategories');
export const loadProductSuccess = createAction('[Product] Load ProductCategories Success', props<{ Product_: any[] }>());
export const loadProductFailure = createAction('[Product] Load ProductCategories Failure', props<{ error: string }>());

export const loadProductById = createAction('[Product] Load By Id ProductCategories', props<{ _id: string }>());
export const loadProductByIdSuccess = createAction('[Product] Load By Id ProductCategories Success', props<{ Product_: any }>());
export const loadProductByIdFailure = createAction('[Product] Load By Id ProductCategories Failure', props<{ error: string }>());


// Add
export const addProduct = createAction('[Product] Add Product', props<{ Product_: Products }>());
export const addProductSuccess = createAction('[Product] Add Product Success', props<{ Product_: Products }>());
export const addProductFailure = createAction('[Product] Add Product Failure', props<{ error: string }>());

// Update
export const updateProduct = createAction('[Product] Update Product', props<{ Product_: any }>());
export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ Product_: any }>());
export const updateProductFailure = createAction('[Product] Update Product Failure', props<{ error: string }>());

// Delete
export const deleteProduct = createAction('[Product] Delete Product', props<{ _id: string }>());
export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ _id: string }>());
export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{ error: string }>());
