import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IDine } from '../../../core/Model/crud.model';

export interface DineTableState {
    IDine_s: IDine[];
    IDine_: IDine[];
  loading: boolean;
  error: string | null;
}

export const initialState: DineTableState = {
    IDine_s: [],
     IDine_: [],  
  loading: false,
  error: null
};

// export interface DineTable {
//   id: string | number;
//   name?: string;
//   status?: string;
//   capacity?: number;
//   isOccupied?: boolean;
//   [key: string]: any;
// }

// export interface DineTableState {
//   entities: Record<string, DineTable>;
//   ids: Array<string | number>;
//   selectedTableId: string | number | null;
//   loading: boolean;
//   error: string | null;
// }

export const selectDineTableState = createFeatureSelector<DineTableState>('IDine_s');



export const selectAllDineTables = createSelector(
  selectDineTableState,
  (state) => state.IDine_s
);

export const selectDineLoading = createSelector(
  selectDineTableState,
  (state) => state.loading
);
export const selectDineTableById = (tableId: string | number) =>
  createSelector(selectDineTableState, (state: DineTableState | undefined) => {
    if (!state) {
      return null;
    }

    return state.IDine_ ?? null;
  });

export const selectSelectedDineTable = createSelector(
  selectDineTableState,
  (state: DineTableState | undefined) => {
    if (!state || !state.IDine_) {
      return null;
    }

    return state.IDine_ ?? null;
  }
);

export const selectDineTableLoading = createSelector(
  selectDineTableState,
  (state: DineTableState | undefined) => state?.loading ?? false
);

export const selectDineTableError = createSelector(
  selectDineTableState,
  (state: DineTableState | undefined) => state?.error ?? null
);
