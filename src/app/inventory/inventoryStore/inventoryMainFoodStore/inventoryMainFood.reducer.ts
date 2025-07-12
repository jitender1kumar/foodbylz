// InventoryMainFood.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as InventoryMainFoodActions from './inventoryMainFood.actions';
import { InventoryMainFood } from '../../../core/Model/crud.model';

export interface InventoryMainFoodState {
    InventoryMainFood_: InventoryMainFood[];
  loading: boolean;
  error: string | null;
}

export const initialState: InventoryMainFoodState = {
    InventoryMainFood_: [],
  loading: false,
  error: null
};

export const InventoryMainFoodLoadReducer = createReducer(
  initialState,
  on(InventoryMainFoodActions.loadInventoryMainFood, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InventoryMainFoodActions.loadInventoryMainFoodSuccess, (state, { InventoryMainFood_ }) => ({
    ...state,
    InventoryMainFood_,
    loading: false
  })),
  on(InventoryMainFoodActions.loadInventoryMainFoodFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const InventoryMainFoodByIdLoadReducer = createReducer(
  initialState,
  on(InventoryMainFoodActions.loaInventoryMainFoodById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InventoryMainFoodActions.loaInventoryMainFoodByIdSuccess, (state, { InventoryMainFood_ }) => ({
    ...state,
    InventoryMainFood_: InventoryMainFood_,
    loading: false
  })),
  on(InventoryMainFoodActions.loaInventoryMainFoodByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const InventoryMainFoodAddReducer = createReducer(
  initialState,
  on(InventoryMainFoodActions.addInventoryMainFood, (state, { InventoryMainFood_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(InventoryMainFoodActions.addInventoryMainFoodSuccess, (state, { InventoryMainFood_ }) => ({
    ...state,
    InventoryMainFood_: [...state.InventoryMainFood_, InventoryMainFood_],
    loading:false
  })),
  on(InventoryMainFoodActions.addInventoryMainFoodFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const InventoryMainFoodUpdateReducer = createReducer(
  initialState,
  on(InventoryMainFoodActions.updateInventoryMainFood, (state) => ({
    ...state,
    loading: true,
  })),

  on(InventoryMainFoodActions.updateInventoryMainFoodSuccess, (state, { InventoryMainFood_ }) => ({
    ...state,
    InventoryMainFood: state.InventoryMainFood_.map((InventoryMainFood_) =>
      InventoryMainFood_._id === InventoryMainFood_._id ? InventoryMainFood_ : InventoryMainFood_
    ),
    loading: false,
  })),

  on(InventoryMainFoodActions.updateInventoryMainFoodFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const InventoryMainFoodDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(InventoryMainFoodActions.deleteInventoryMainFood, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove InventoryMainFood
  on(InventoryMainFoodActions.deleteInventoryMainFoodSuccess, (state, { _id }) => ({
    ...state,
    InventoryMainFood_: state.InventoryMainFood_.filter((InventoryMainFood_) => InventoryMainFood_._id !== _id),
    loading: false,
  })),

  // On failure
  on(InventoryMainFoodActions.deleteInventoryMainFoodFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);