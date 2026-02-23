
import { createReducer, on } from '@ngrx/store';
import * as SplitBillActions from './splitbill.action';

export interface SplitBillState {
  splitBills: any[];
  splitBill: any | null;
  loading: boolean;
  error: any;
}

export const initialState: SplitBillState = {
  splitBills: [],
  splitBill: null,
  loading: false,
  error: null
};

export const splitBillReducer = createReducer(
  initialState,

  // Split Bill
  on(SplitBillActions.splitBill, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SplitBillActions.splitBillSuccess, (state, { result }) => ({
    ...state,
    splitBill: result,
    loading: false
  })),
  on(SplitBillActions.splitBillFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load SplitBill by ID
  on(SplitBillActions.loadSplitBillById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SplitBillActions.loadSplitBillByIdSuccess, (state, { splitBill }) => ({
    ...state,
    splitBill,
    loading: false
  })),
  on(SplitBillActions.loadSplitBillByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load All SplitBills
  on(SplitBillActions.loadAllSplitBills, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SplitBillActions.loadAllSplitBillsSuccess, (state, { splitBills }) => ({
    ...state,
    splitBills,
    loading: false
  })),
  on(SplitBillActions.loadAllSplitBillsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update SplitBill
  on(SplitBillActions.updateSplitBill, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SplitBillActions.updateSplitBillSuccess, (state, { splitBill }) => ({
    ...state,
    splitBill,
    loading: false
  })),
  on(SplitBillActions.updateSplitBillFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete SplitBill
  on(SplitBillActions.deleteSplitBill, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SplitBillActions.deleteSplitBillSuccess, (state, { id }) => ({
    ...state,
    splitBills: state.splitBills.filter(bill => bill.id !== id),
    loading: false
  })),
  on(SplitBillActions.deleteSplitBillFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

