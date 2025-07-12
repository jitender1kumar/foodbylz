import { createAction, props } from '@ngrx/store';
import { InventoryFoodQuantityType } from '../../../core/Model/crud.model';

// Load
export const loadInventoryFoodQuantityType = createAction('[InventoryFoodQuantityType] Load InventoryFoodQuantityType');
export const loadInventoryFoodQuantityTypeSuccess = createAction('[InventoryFoodQuantityType] Load InventoryFoodQuantityType Success', props<{ InventoryFoodQuantityType_: any[] }>());
export const loadInventoryFoodQuantityTypeFailure = createAction('[InventoryFoodQuantityType] Load InventoryFoodQuantityType Failure', props<{ error: string }>());

// Add
export const addInventoryFoodQuantityType = createAction('[InventoryFoodQuantityType] Add InventoryFoodQuantityType', props<{ InventoryFoodQuantityType_: InventoryFoodQuantityType }>());
export const addInventoryFoodQuantityTypeSuccess = createAction('[InventoryFoodQuantityType] Add InventoryFoodQuantityType Success', props<{ InventoryFoodQuantityType_: InventoryFoodQuantityType }>());
export const addInventoryFoodQuantityTypeFailure = createAction('[InventoryFoodQuantityType] Add InventoryFoodQuantityType Failure', props<{ error: string }>());

// Update
export const updateInventoryFoodQuantityType = createAction('[InventoryFoodQuantityType] Update InventoryFoodQuantityType', props<{ InventoryFoodQuantityType_: any }>());
export const updateInventoryFoodQuantityTypeSuccess = createAction('[InventoryFoodQuantityType] Update InventoryFoodQuantityType Success', props<{ InventoryFoodQuantityType_: any }>());
export const updateInventoryFoodQuantityTypeFailure = createAction('[InventoryFoodQuantityType] Update InventoryFoodQuantityType Failure', props<{ error: string }>());

// Delete
export const deleteInventoryFoodQuantityType = createAction('[InventoryFoodQuantityType] Delete InventoryFoodQuantityType', props<{ _id: string }>());
export const deleteInventoryFoodQuantityTypeSuccess = createAction('[InventoryFoodQuantityType] Delete InventoryFoodQuantityType Success', props<{ _id: string }>());
export const deleteInventoryFoodQuantityTypeFailure = createAction('[InventoryFoodQuantityType] Delete InventoryFoodQuantityType Failure', props<{ error: string }>());
