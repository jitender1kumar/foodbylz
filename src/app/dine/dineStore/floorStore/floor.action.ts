import { createAction, props } from '@ngrx/store';
import { Floor } from '../../../core/Model/crud.model';

// Load (Retrieve)
export const loadFloors = createAction('[Floor] Load Floors');
export const loadFloorsSuccess = createAction('[Floor] Load Floors Success', props<{ Floor_: Floor[] }>());
export const loadFloorsFailure = createAction('[Floor] Load Floors Failure', props<{ error: string }>());

// Add (Insert)
export const addFloor = createAction('[Floor] Add Floor', props<{ Floor_: Floor }>());
export const addFloorSuccess = createAction('[Floor] Add Floor Success', props<{ Floor_: Floor }>());
export const addFloorFailure = createAction('[Floor] Add Floor Failure', props<{ error: string }>());

// Update
export const updateFloor = createAction('[Floor] Update Floor', props<{ Floor_: Floor }>());
export const updateFloorSuccess = createAction('[Floor] Update Floor Success', props<{ Floor_: Floor }>());
export const updateFloorFailure = createAction('[Floor] Update Floor Failure', props<{ error: string }>());

// Delete
export const deleteFloor = createAction('[Floor] Delete Floor', props<{ _id: string }>());
export const deleteFloorSuccess = createAction('[Floor] Delete Floor Success', props<{ _id: string }>());
export const deleteFloorFailure = createAction('[Floor] Delete Floor Failure', props<{ error: string }>());
