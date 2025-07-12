import { createAction, props } from '@ngrx/store';
import { Quantitytype } from '../../../core/Model/crud.model';

// Load
export const loadQuantityType = createAction('[QuantityType] Load QuantityType');
export const loadQuantityTypeSuccess = createAction('[QuantityType] Load QuantityType Success', props<{ QuantityType_: any[] }>());
export const loadQuantityTypeFailure = createAction('[QuantityType] Load QuantityType Failure', props<{ error: string }>());

// Add
export const addQuantityType = createAction('[QuantityType] Add QuantityType', props<{ QuantityType_: Quantitytype }>());
export const addQuantityTypeSuccess = createAction('[QuantityType] Add QuantityType Success', props<{ QuantityType_: Quantitytype }>());
export const addQuantityTypeFailure = createAction('[QuantityType] Add QuantityType Failure', props<{ error: string }>());

// Update
export const updateQuantityType = createAction('[QuantityType] Update QuantityType', props<{ QuantityType_: any }>());
export const updateQuantityTypeSuccess = createAction('[QuantityType] Update QuantityType Success', props<{ QuantityType_: any }>());
export const updateQuantityTypeFailure = createAction('[QuantityType] Update QuantityType Failure', props<{ error: string }>());

// Delete
export const deleteQuantityType = createAction('[QuantityType] Delete QuantityType', props<{ _id: string }>());
export const deleteQuantityTypeSuccess = createAction('[QuantityType] Delete QuantityType Success', props<{ _id: string }>());
export const deleteQuantityTypeFailure = createAction('[QuantityType] Delete QuantityType Failure', props<{ error: string }>());
