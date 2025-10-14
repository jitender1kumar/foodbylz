
import { createAction, props } from '@ngrx/store';
import { IDine } from '../../../core/Model/crud.model';

// Load Dine Table Actions
export const loadDineTables = createAction(
  '[DineTable] Load DineTables'
);

export const loadDineTablesSuccess = createAction(
  '[DineTable] Load DineTables Success',
  props<{ IDine_: IDine[] }>()
);

export const loadDineTablesFailure = createAction(
  '[DineTable] Load DineTables Failure',
  props<{ error: any }>()
);

// Add Dine Table Actions
export const addDineTable = createAction(
  '[DineTable] Add DineTable',
  props<{ IDine_: IDine }>()
);

export const addDineTableSuccess = createAction(
  '[DineTable] Add DineTable Success',
  props<{ IDine_: IDine }>()
);

export const addDineTableFailure = createAction(
  '[DineTable] Add DineTable Failure',
  props<{ error: any }>()
);

// Update Dine Table Actions
export const updateDineTable = createAction(
  '[DineTable] Update DineTable',
  props<{ IDine_: IDine }>()
);

export const updateDineTableSuccess = createAction(
  '[DineTable] Update DineTable Success',
  props<{ IDine_: IDine }>()
);

export const updateDineTableFailure = createAction(
  '[DineTable] Update DineTable Failure',
  props<{ error: any }>()
);

// Delete Dine Table Actions
export const deleteDineTable = createAction(
  '[DineTable] Delete DineTable',
  props<{ _id: string  }>()
);

export const deleteDineTableSuccess = createAction(
  '[DineTable] Delete DineTable Success',
  props<{ _id: string  }>()
);

export const deleteDineTableFailure = createAction(
  '[DineTable] Delete DineTable Failure',
  props<{ error: any }>()
);
