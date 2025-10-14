import { createAction, props } from '@ngrx/store';
import { AddOnProduct,AddOnProductEdit } from '../../../core/Model/crud.model';


//load all
export const loadAllAddOnProducts = createAction(
  '[AddOnProduct] LoadAll AddOnProducts'
);

export const loadAllAddOnProductsSuccess = createAction(
  '[AddOnProduct] LoadAll AddOnProducts Success',
  props<{ addOnProductsdata: AddOnProduct[] }>()
);

export const loadAllAddOnProductsFailure = createAction(
  '[AddOnProduct] LoadAll AddOnProducts Failure',
  props<{ error: any }>()
);
// Load AddOnProducts
export const loadAddOnProducts = createAction(
  '[AddOnProduct] Load AddOnProducts'
);

export const loadAddOnProductsSuccess = createAction(
  '[AddOnProduct] Load AddOnProducts Success',
  props<{ addOnProducts: AddOnProduct[] }>()
);

export const loadAddOnProductsFailure = createAction(
  '[AddOnProduct] Load AddOnProducts Failure',
  props<{ error: any }>()
);

// Add AddOnProduct
export const addAddOnProduct = createAction(
  '[AddOnProduct] Add AddOnProduct',
  props<{ addOnProduct: AddOnProduct }>()
);

export const addAddOnProductSuccess = createAction(
  '[AddOnProduct] Add AddOnProduct Success',
  props<{ addOnProduct: AddOnProduct }>()
);

export const addAddOnProductFailure = createAction(
  '[AddOnProduct] Add AddOnProduct Failure',
  props<{ error: any }>()
);

// Update AddOnProduct
export const updateAddOnProduct = createAction(
  '[AddOnProduct] Update AddOnProduct',
  props<{ addOnProductEdit: AddOnProductEdit }>()
);

export const updateAddOnProductSuccess = createAction(
  '[AddOnProduct] Update AddOnProduct Success',
  props<{ addOnProductEdit: AddOnProductEdit }>()
);

export const updateAddOnProductFailure = createAction(
  '[AddOnProduct] Update AddOnProduct Failure',
  props<{ error: any }>()
);

// Delete AddOnProduct
export const deleteAddOnProduct = createAction(
  '[AddOnProduct] Delete AddOnProduct',
  props<{ _id: string }>()
);

export const deleteAddOnProductSuccess = createAction(
  '[AddOnProduct] Delete AddOnProduct Success',
  props<{ _id: string }>()
);

export const deleteAddOnProductFailure = createAction(
  '[AddOnProduct] Delete AddOnProduct Failure',
  props<{ error: any }>()
);

export const getByProductIdSubQTypeIDAddOnProducts = createAction(
  '[AddOnProduct] Load AddOnProducts',
  props<{ SelectProductId: string; SubQuantityTypeID: string }>()
);

export const getByProductIdSubQTypeIDAddOnProductsSuccess = createAction(
  '[AddOnProduct] Load AddOnProducts Success',
  props<{ addOnProducts: AddOnProduct[] }>()
);

export const getByProductIdSubQTypeIDAddOnProductsFailure = createAction(
  '[AddOnProduct] Load AddOnProducts Failure',
  props<{ error: any }>()
);
export const getAddOnProductById = createAction(
  '[AddOnProduct] Get AddOnProduct By Id',
  props<{ _id: string }>()
);

export const getAddOnProductByIdSuccess = createAction(
  '[AddOnProduct] Get AddOnProduct By Id Success',
  props<{ addOnProduct: AddOnProduct }>()
);

export const getAddOnProductByIdFailure = createAction(
  '[AddOnProduct] Get AddOnProduct By Id Failure',
  props<{ error: any }>()
);
