import { createAction, props } from '@ngrx/store';
import { InventoryFoodwithProduct, InventoryFoodwithProductforEdit } from '../../../core/Model/crud.model';

// Load
export const loadInventoryFoodwithProduct = createAction('[InventoryFoodwithProduct] Load InventoryFoodwithProduct');
export const loadInventoryFoodwithProductSuccess = createAction('[InventoryFoodwithProduct] Load InventoryFoodwithProduct Success', props<{ InventoryFoodwithProduct_: any[] }>());
export const loadInventoryFoodwithProductFailure = createAction('[InventoryFoodwithProduct] Load InventoryFoodwithProduct Failure', props<{ error: string }>());

//Load By ID
// export const loaInventoryFoodwithProductById = createAction('[InventoryFoodwithProduct] Load By Id InventoryFoodwithProduct', props<{ selectQtypeID: string }>());
// export const loaInventoryFoodwithProductByIdSuccess = createAction('[InventoryFoodwithProduct] Load By Id InventoryFoodwithProduct Success', props<{ InventoryFoodwithProduct_: any }>());
// export const loaInventoryFoodwithProductByIdFailure = createAction('[InventoryFoodwithProduct] Load By Id InventoryFoodwithProduct Failure', props<{ error: string }>());

// Add
export const addInventoryFoodwithProduct = createAction('[InventoryFoodwithProduct] Add InventoryFoodwithProduct', props<{ InventoryFoodwithProduct_: InventoryFoodwithProduct }>());
export const addInventoryFoodwithProductSuccess = createAction('[InventoryFoodwithProduct] Add InventoryFoodwithProduct Success', props<{ InventoryFoodwithProduct_: InventoryFoodwithProduct }>());
export const addInventoryFoodwithProductFailure = createAction('[InventoryFoodwithProduct] Add InventoryFoodwithProduct Failure', props<{ error: string }>());

// Update
export const updateInventoryFoodwithProduct = createAction('[InventoryFoodwithProduct] Update InventoryFoodwithProduct', props<{ InventoryFoodwithProductForEdit_: InventoryFoodwithProductforEdit }>());
export const updateInventoryFoodwithProductSuccess = createAction('[InventoryFoodwithProduct] Update InventoryFoodwithProduct Success', props<{ InventoryFoodwithProductForEdit_: InventoryFoodwithProductforEdit }>());
export const updateInventoryFoodwithProductFailure = createAction('[InventoryFoodwithProduct] Update InventoryFoodwithProduct Failure', props<{ error: string }>());

// Delete
export const deleteInventoryFoodwithProduct = createAction('[InventoryFoodwithProduct] Delete InventoryFoodwithProduct', props<{ _id: string }>());
export const deleteInventoryFoodwithProductSuccess = createAction('[InventoryFoodwithProduct] Delete InventoryFoodwithProduct Success', props<{ _id: string }>());
export const deleteInventoryFoodwithProductFailure = createAction('[InventoryFoodwithProduct] Delete InventoryFoodwithProduct Failure', props<{ error: string }>());
