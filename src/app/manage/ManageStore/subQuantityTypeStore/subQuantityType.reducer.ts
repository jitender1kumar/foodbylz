// SubQuantityType.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SubQuantityTypeActions from './subQuantityType.actions';
import { subQuantityType } from '../../../core/Model/crud.model';

export interface SubQuantityTypeState {
    SubQuantityType_: subQuantityType[];
  loading: boolean;
  error: string | null;
}

export const initialState: SubQuantityTypeState = {
    SubQuantityType_: [],
  loading: false,
  error: null
};

export const SubQuantityTypeLoadReducer = createReducer(
  initialState,
  on(SubQuantityTypeActions.loadSubQuantityType, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SubQuantityTypeActions.loadSubQuantityTypeSuccess, (state, { SubQuantityType_ }) => ({
    ...state,
    SubQuantityType_,
    loading: false
  })),
  on(SubQuantityTypeActions.loadSubQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const SubQuantityTypeByIdLoadReducer = createReducer(
  initialState,
  on(SubQuantityTypeActions.loadSubQuantityTypeById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
 
  on(SubQuantityTypeActions.loadSubQuantityTypeByIdSuccess, (state, { SubQuantityType_ }) => ({
    ...state,
    SubQuantityType_: SubQuantityType_,
    loading: false
  })),
  on(SubQuantityTypeActions.loadSubQuantityTypeByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const SubQuantityTypeByNameLoadReducer = createReducer(
  initialState,
 
  on(SubQuantityTypeActions.loadSubQuantityTypeByName, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SubQuantityTypeActions.loadSubQuantityTypeByNameSuccess, (state, { SubQuantityType_ }) => ({
    ...state,
    SubQuantityType_: SubQuantityType_,
    loading: false
  })),
  on(SubQuantityTypeActions.loadSubQuantityTypeByNameFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
export const SubQuantityTypeAddReducer = createReducer(
  initialState,
  on(SubQuantityTypeActions.addSubQuantityType, (state, { SubQuantityType_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(SubQuantityTypeActions.addSubQuantityTypeSuccess, (state, { SubQuantityType_ }) => ({
    ...state,
    SubQuantityType_: [...state.SubQuantityType_, SubQuantityType_],
    loading:false
  })),
  on(SubQuantityTypeActions.addSubQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const SubQuantityTypeUpdateReducer = createReducer(
  initialState,
  on(SubQuantityTypeActions.updateSubQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  on(SubQuantityTypeActions.updateSubQuantityTypeSuccess, (state, { SubQuantityType_ }) => ({
    ...state,
    SubQuantityType: state.SubQuantityType_.map((SubQuantityType_) =>
      SubQuantityType_._id === SubQuantityType_._id ? SubQuantityType_ : SubQuantityType_
    ),
    loading: false,
  })),

  on(SubQuantityTypeActions.updateSubQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const SubQuantityTypeDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(SubQuantityTypeActions.deleteSubQuantityType, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove SubQuantityType
  on(SubQuantityTypeActions.deleteSubQuantityTypeSuccess, (state, { _id }) => ({
    ...state,
    SubQuantityType_: state.SubQuantityType_.filter((SubQuantityType_) => SubQuantityType_._id !== _id),
    loading: false,
  })),

  // On failure
  on(SubQuantityTypeActions.deleteSubQuantityTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);