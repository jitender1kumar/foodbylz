import { createReducer, on } from '@ngrx/store';
import * as DineTableActions from './dinetable.action';
import { IDine } from '../../../core/Model/crud.model';

export interface DineTableState {
    IDine_: IDine[];
  loading: boolean;
  error: string | null;
}

export const initialState: DineTableState = {
    IDine_: [],
  loading: false,
  error: null
};

export const dineTableReducer = createReducer(
  initialState,
  on(DineTableActions.loadDineTables, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DineTableActions.loadDineTablesSuccess, (state, { IDine_ }) => ({
    ...state,
    IDine_,
    loading: false,
    error: null
  })),
  on(DineTableActions.loadDineTablesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DineTableActions.addDineTable, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DineTableActions.addDineTableSuccess, (state, { IDine_ }) => ({
    ...state,
    IDine_: [...state.IDine_, IDine_],
    loading: false,
    error: null
  })),
  on(DineTableActions.addDineTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DineTableActions.updateDineTable, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DineTableActions.updateDineTableSuccess, (state, { IDine_ }) => ({
    ...state,
    IDine_: state.IDine_.map(t => t._id === IDine_._id ? IDine_ : t),
    loading: false,
    error: null
  })),
  on(DineTableActions.updateDineTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DineTableActions.deleteDineTable, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DineTableActions.deleteDineTableSuccess, (state, { _id }) => ({
    ...state,
    IDine_: state.IDine_.filter(t => t._id !== _id),
    loading: false,
    error: null
  })),
  on(DineTableActions.deleteDineTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
