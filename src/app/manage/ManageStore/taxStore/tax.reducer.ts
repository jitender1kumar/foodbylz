// Tax.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TaxActions from './tax.actions';
import { Tax } from '../../../core/Model/crud.model';

export interface TaxState {
    Tax_: Tax[];
  loading: boolean;
  error: string | null;
}

export const initialState: TaxState = {
    Tax_: [],
  loading: false,
  error: null
};

export const TaxLoadReducer = createReducer(
  initialState,
  on(TaxActions.loadTax, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaxActions.loadTaxSuccess, (state, { Tax_ }) => ({
    ...state,
    Tax_,
    loading: false
  })),
  on(TaxActions.loadTaxFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  

);
export const TaxAddReducer = createReducer(
  initialState,
  on(TaxActions.addTax, (state, { Tax_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(TaxActions.addTaxSuccess, (state, { Tax_ }) => ({
    ...state,
    Tax_: [...state.Tax_, Tax_],
    loading:false
  })),
  on(TaxActions.addTaxFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const TaxUpdateReducer = createReducer(
  initialState,
  on(TaxActions.updateTax, (state) => ({
    ...state,
    loading: true,
  })),

  on(TaxActions.updateTaxSuccess, (state, { Tax_ }) => ({
    ...state,
    Tax: state.Tax_.map((Tax_) =>
      Tax_._id === Tax_._id ? Tax_ : Tax_
    ),
    loading: false,
  })),

  on(TaxActions.updateTaxFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const TaxDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(TaxActions.deleteTax, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove Tax
  on(TaxActions.deleteTaxSuccess, (state, { _id }) => ({
    ...state,
    Tax_: state.Tax_.filter((Tax_) => Tax_._id !== _id),
    loading: false,
  })),

  // On failure
  on(TaxActions.deleteTaxFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);