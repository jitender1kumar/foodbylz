import { createReducer, on } from '@ngrx/store';
import * as ReserveTableActions from './reserveTable.action';
import { ReserveDine } from '../../../core/Model/crud.model';

// Define the shape of the ReserveTable state
export interface ReserveTableState {
  reserveTables: ReserveDine[];
  loading: boolean;
  error: any;
}

export const initialState: ReserveTableState = {
  reserveTables: [],
  loading: false,
  error: null,
};

export const reserveTableReducer = createReducer(
  initialState,
  
  // Load ReserveTables
  on(ReserveTableActions.loadReserveTables, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReserveTableActions.loadReserveTablesSuccess, (state, { reserveTables }) => ({
    ...state,
    reserveTables,
    loading: false,
    error: null,
  })),
  on(ReserveTableActions.loadReserveTablesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add ReserveTable
  on(ReserveTableActions.addReserveTable, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReserveTableActions.addReserveTableSuccess, (state, { reserveTable }) => ({
    ...state,
    reserveTables: [...state.reserveTables, reserveTable],
    loading: false,
    error: null,
  })),
  on(ReserveTableActions.addReserveTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update ReserveTable
  on(ReserveTableActions.updateReserveTable, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReserveTableActions.updateReserveTableSuccess, (state, { reserveTable }) => ({
    ...state,
    reserveTables: state.reserveTables.map(rt =>
      (rt as any)._id === (reserveTable as any)._id ? reserveTable : rt
    ),
    loading: false,
    error: null,
  })),
  on(ReserveTableActions.updateReserveTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete ReserveTable
  on(ReserveTableActions.deleteReserveTable, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReserveTableActions.deleteReserveTableSuccess, (state, { id }) => ({
    ...state,
    reserveTables: state.reserveTables.filter(rt => (rt as any)._id !== id),
    loading: false,
    error: null,
  })),
  on(ReserveTableActions.deleteReserveTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
