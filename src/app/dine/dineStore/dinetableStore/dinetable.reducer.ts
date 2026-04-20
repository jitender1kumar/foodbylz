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
  // on(DineTableActions.updateDineTableSuccess, (state, { IDine_ }) => ({
  //   ...state,
  //   IDine_: state.IDine_.map(t => t._id === IDine_._id ? IDine_ : t),
  //   loading: false,
  //   error: null
  // })),
  //on(DineTableActions.updateDineTableSuccess, (state, { IDine_ }) => {
  //   const updatedList = state.IDine_?.map(item =>
  //     item._id === IDine_._id ? { ...item, ...IDine_ } : item
  //   ) ?? [];
  
  //   return {
  //     ...state,
  //     IDine_: updatedList,
  //     loading: false,
  //     error: null
  //   };
  // }),
  on(DineTableActions.updateDineTableSuccess, (state, { IDine_ }) => {
    // Improved: Defensive, clear, and consistent state update on table update success
    // 1. Ensure IDine_ is a valid update payload (must be object with a string/object _id)
    if (!IDine_ || typeof IDine_ !== 'object' || !IDine_._id) {
      return {
        ...state,
        loading: false,
        error: 'Invalid update: missing or malformed IDine_ payload.',
      };
    }

    // 2. Always treat state.IDine_ as array
    const prevList = Array.isArray(state.IDine_) ? state.IDine_ : [];

    // 3. Try to find index of the item to update
    const idx = prevList.findIndex(item => item && item._id === IDine_._id);

    let nextList: any[];
    if (idx > -1) {
      // Update in place and preserve previous items' referential integrity
      nextList = [
        ...prevList.slice(0, idx),
        { ...prevList[idx], ...IDine_ }, // merge to keep any existing fields not present in payload
        ...prevList.slice(idx + 1)
      ];
    } else {
      // Not found: append as new
      nextList = [...prevList, IDine_];
    }

    return {
      ...state,
      IDine_: nextList,
      loading: false,
      error: null
    };
  }),
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
