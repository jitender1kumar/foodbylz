
import { createAction, props } from '@ngrx/store';
import { ReserveDine } from '../../../core/Model/crud.model';

// Load ReserveTable Actions
export const loadReserveTables = createAction(
  '[ReserveTable] Load ReserveTables'
);

export const loadReserveTablesSuccess = createAction(
  '[ReserveTable] Load ReserveTables Success',
  props<{ reserveTables: ReserveDine[] }>()
);

export const loadReserveTablesFailure = createAction(
  '[ReserveTable] Load ReserveTables Failure',
  props<{ error: any }>()
);

// Add ReserveTable Actions
export const addReserveTable = createAction(
  '[ReserveTable] Add ReserveTable',
  props<{ reserveTable: ReserveDine }>()
);

export const addReserveTableSuccess = createAction(
  '[ReserveTable] Add ReserveTable Success',
  props<{ reserveTable: ReserveDine }>()
);

export const addReserveTableFailure = createAction(
  '[ReserveTable] Add ReserveTable Failure',
  props<{ error: any }>()
);

// Update ReserveTable Actions
export const updateReserveTable = createAction(
  '[ReserveTable] Update ReserveTable',
  props<{ reserveTable: ReserveDine }>()
);

export const updateReserveTableSuccess = createAction(
  '[ReserveTable] Update ReserveTable Success',
  props<{ reserveTable: ReserveDine }>()
);

export const updateReserveTableFailure = createAction(
  '[ReserveTable] Update ReserveTable Failure',
  props<{ error: any }>()
);

// Delete ReserveTable Actions
export const deleteReserveTable = createAction(
  '[ReserveTable] Delete ReserveTable',
  props<{ id: string }>()
);

export const deleteReserveTableSuccess = createAction(
  '[ReserveTable] Delete ReserveTable Success',
  props<{ id: string }>()
);

export const deleteReserveTableFailure = createAction(
  '[ReserveTable] Delete ReserveTable Failure',
  props<{ error: any }>()
);

