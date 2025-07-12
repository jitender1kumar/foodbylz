// QuantityType.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as QuantityTypeActions from './quntityType.actions';
import { Quantitytype } from '../../../core/Model/crud.model';

export interface QuantityTypeState {
    QuantityType_: Quantitytype[];
  loading: boolean;
  error: string | null;
}

export const initialState: QuantityTypeState = {
    QuantityType_: [],
  loading: false,
  error: null
};

export const QuantityTypeLoadReducer = createReducer(
  initialState,
  on(QuantityTypeActions.loadQuantityType, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(QuantityTypeActions.loadQuantityTypeSuccess, (state, { QuantityType_ }) => ({
    ...state,
    QuantityType_,
    loading: false
  })),
  on(QuantityTypeActions.loadQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  

);
export const QuantityTypeAddReducer = createReducer(
  initialState,
  on(QuantityTypeActions.addQuantityType, (state, { QuantityType_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(QuantityTypeActions.addQuantityTypeSuccess, (state, { QuantityType_ }) => ({
    ...state,
    QuantityType_: [...state.QuantityType_, QuantityType_],
    loading:false
  })),
  on(QuantityTypeActions.addQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const QuantityTypeUpdateReducer = createReducer(
  initialState,
  on(QuantityTypeActions.updateQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  on(QuantityTypeActions.updateQuantityTypeSuccess, (state, { QuantityType_ }) => ({
    ...state,
    QuantityType: state.QuantityType_.map((QuantityType_) =>
      QuantityType_._id === QuantityType_._id ? QuantityType_ : QuantityType_
    ),
    loading: false,
  })),

  on(QuantityTypeActions.updateQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const QuantityTypeDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(QuantityTypeActions.deleteQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove QuantityType
  on(QuantityTypeActions.deleteQuantityTypeSuccess, (state, { _id }) => ({
    ...state,
    QuantityType_: state.QuantityType_.filter((QuantityType_) => QuantityType_._id !== _id),
    loading: false,
  })),

  // On failure
  on(QuantityTypeActions.deleteQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);