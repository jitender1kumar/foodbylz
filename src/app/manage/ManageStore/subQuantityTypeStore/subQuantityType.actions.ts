import { createAction, props } from '@ngrx/store';
import { subQuantityType } from '../../../core/Model/crud.model';

// Load
export const loadSubQuantityType = createAction('[SubQuantityType] Load SubQuantityType');
export const loadSubQuantityTypeSuccess = createAction('[SubQuantityType] Load SubQuantityType Success', props<{ SubQuantityType_: any[] }>());
export const loadSubQuantityTypeFailure = createAction('[SubQuantityType] Load SubQuantityType Failure', props<{ error: string }>());

//Load By ID
export const loadSubQuantityTypeById = createAction('[SubQuantityType] Load By Id SubQuantityType', props<{ selectQtypeID: string }>());
export const loadSubQuantityTypeByIdSuccess = createAction('[SubQuantityType] Load By Id SubQuantityType Success', props<{ SubQuantityType_: any }>());
export const loadSubQuantityTypeByIdFailure = createAction('[SubQuantityType] Load By Id SubQuantityType Failure', props<{ error: string }>());

//Load By name
export const loadSubQuantityTypeByName = createAction('[SubQuantityType] Load By Name SubQuantityType', props<{ name: string }>());
export const loadSubQuantityTypeByNameSuccess = createAction('[SubQuantityType] Load By Name SubQuantityType Success', props<{ SubQuantityType_: any }>());
export const loadSubQuantityTypeByNameFailure = createAction('[SubQuantityType] Load By Name SubQuantityType Failure', props<{ error: string }>());


// Add
export const addSubQuantityType = createAction('[SubQuantityType] Add SubQuantityType', props<{ SubQuantityType_: subQuantityType }>());
export const addSubQuantityTypeSuccess = createAction('[SubQuantityType] Add SubQuantityType Success', props<{ SubQuantityType_: subQuantityType }>());
export const addSubQuantityTypeFailure = createAction('[SubQuantityType] Add SubQuantityType Failure', props<{ error: string }>());

// Update
export const updateSubQuantityType = createAction('[SubQuantityType] Update SubQuantityType', props<{ SubQuantityType_: any }>());
export const updateSubQuantityTypeSuccess = createAction('[SubQuantityType] Update SubQuantityType Success', props<{ SubQuantityType_: any }>());
export const updateSubQuantityTypeFailure = createAction('[SubQuantityType] Update SubQuantityType Failure', props<{ error: string }>());

// Delete
export const deleteSubQuantityType = createAction('[SubQuantityType] Delete SubQuantityType', props<{ _id: string }>());
export const deleteSubQuantityTypeSuccess = createAction('[SubQuantityType] Delete SubQuantityType Success', props<{ _id: string }>());
export const deleteSubQuantityTypeFailure = createAction('[SubQuantityType] Delete SubQuantityType Failure', props<{ error: string }>());
