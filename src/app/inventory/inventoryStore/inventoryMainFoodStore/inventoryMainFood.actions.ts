import { createAction, props } from '@ngrx/store';
import { InventoryMainFood } from '../../../core/Model/crud.model';

// Load
export const loadInventoryMainFood = createAction('[InventoryMainFood] Load InventoryMainFood');
export const loadInventoryMainFoodSuccess = createAction('[InventoryMainFood] Load InventoryMainFood Success', props<{ InventoryMainFood_: any[] }>());
export const loadInventoryMainFoodFailure = createAction('[InventoryMainFood] Load InventoryMainFood Failure', props<{ error: string }>());

//Load By ID
export const loaInventoryMainFoodById = createAction('[InventoryMainFood] Load By Id InventoryMainFood', props<{ _id: string }>());
export const loaInventoryMainFoodByIdSuccess = createAction('[InventoryMainFood] Load By Id InventoryMainFood Success', props<{ InventoryMainFood_: any }>());
export const loaInventoryMainFoodByIdFailure = createAction('[InventoryMainFood] Load By Id InventoryMainFood Failure', props<{ error: string }>());

// Add
export const addInventoryMainFood = createAction('[InventoryMainFood] Add InventoryMainFood', props<{ InventoryMainFood_: InventoryMainFood }>());
export const addInventoryMainFoodSuccess = createAction('[InventoryMainFood] Add InventoryMainFood Success', props<{ InventoryMainFood_: InventoryMainFood }>());
export const addInventoryMainFoodFailure = createAction('[InventoryMainFood] Add InventoryMainFood Failure', props<{ error: string }>());

// Update
export const updateInventoryMainFood = createAction('[InventoryMainFood] Update InventoryMainFood', props<{ InventoryMainFood_: any }>());
export const updateInventoryMainFoodSuccess = createAction('[InventoryMainFood] Update InventoryMainFood Success', props<{ InventoryMainFood_: any }>());
export const updateInventoryMainFoodFailure = createAction('[InventoryMainFood] Update InventoryMainFood Failure', props<{ error: string }>());

// Delete
export const deleteInventoryMainFood = createAction('[InventoryMainFood] Delete InventoryMainFood', props<{ _id: string }>());
export const deleteInventoryMainFoodSuccess = createAction('[InventoryMainFood] Delete InventoryMainFood Success', props<{ _id: string }>());
export const deleteInventoryMainFoodFailure = createAction('[InventoryMainFood] Delete InventoryMainFood Failure', props<{ error: string }>());
