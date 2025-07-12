// InventoryFoodQuantityType.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as InventoryFoodQuantityTypeActions from './inventoryFoodQuantityType.actions';
import { InventoryFoodQuantityType } from '../../../core/Model/crud.model';

export interface InventoryFoodQuantityTypeState {
    InventoryFoodQuantityType_: InventoryFoodQuantityType[];
  loading: boolean;
  error: string | null;
}

export const initialState: InventoryFoodQuantityTypeState = {
    InventoryFoodQuantityType_: [],
  loading: false,
  error: null
};

export const InventoryFoodQuantityTypeLoadReducer = createReducer(
  initialState,
  on(InventoryFoodQuantityTypeActions.loadInventoryFoodQuantityType, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InventoryFoodQuantityTypeActions.loadInventoryFoodQuantityTypeSuccess, (state, { InventoryFoodQuantityType_ }) => ({
    ...state,
    InventoryFoodQuantityType_,
    loading: false
  })),
  on(InventoryFoodQuantityTypeActions.loadInventoryFoodQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

export const InventoryFoodQuantityTypeAddReducer = createReducer(
  initialState,
  on(InventoryFoodQuantityTypeActions.addInventoryFoodQuantityType, (state, { InventoryFoodQuantityType_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(InventoryFoodQuantityTypeActions.addInventoryFoodQuantityTypeSuccess, (state, { InventoryFoodQuantityType_ }) => ({
    ...state,
    InventoryFoodQuantityType_: [...state.InventoryFoodQuantityType_, InventoryFoodQuantityType_],
    loading:false
  })),
  on(InventoryFoodQuantityTypeActions.addInventoryFoodQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const InventoryFoodQuantityTypeUpdateReducer = createReducer(
  initialState,
  on(InventoryFoodQuantityTypeActions.updateInventoryFoodQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  on(InventoryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeSuccess, (state, { InventoryFoodQuantityType_ }) => ({
    ...state,
    InventoryFoodQuantityType: state.InventoryFoodQuantityType_.map((InventoryFoodQuantityType_) =>
      InventoryFoodQuantityType_._id === InventoryFoodQuantityType_._id ? InventoryFoodQuantityType_ : InventoryFoodQuantityType_
    ),
    loading: false,
  })),

  on(InventoryFoodQuantityTypeActions.updateInventoryFoodQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const InventoryFoodQuantityTypeDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(InventoryFoodQuantityTypeActions.deleteInventoryFoodQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove InventoryFoodQuantityType
  on(InventoryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeSuccess, (state, { _id }) => ({
    ...state,
    InventoryFoodQuantityType_: state.InventoryFoodQuantityType_.filter((InventoryFoodQuantityType_) => InventoryFoodQuantityType_._id !== _id),
    loading: false,
  })),

  // On failure
  on(InventoryFoodQuantityTypeActions.deleteInventoryFoodQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);