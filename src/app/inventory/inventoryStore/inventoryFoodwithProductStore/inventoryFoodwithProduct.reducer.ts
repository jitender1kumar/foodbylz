// InventoryFoodwithProduct.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as InventoryFoodwithProductActions from './inventoryFoodwithProduct.actions';
import { InventoryFoodwithProduct,InventoryFoodwithProductforEdit } from '../../../core/Model/crud.model';

export interface InventoryFoodwithProductState {
    InventoryFoodwithProduct_: InventoryFoodwithProduct[];
  loading: boolean;
  error: string | null;
}
export interface InventoryFoodwithProductforEditState {
  InventoryFoodwithProductForEdit_:InventoryFoodwithProductforEdit[];
loading: boolean;
error: string | null;
}
export const initialState2: InventoryFoodwithProductforEditState = {
  InventoryFoodwithProductForEdit_: [],
loading: false,
error: null
};

export const initialState: InventoryFoodwithProductState = {
    InventoryFoodwithProduct_: [],
  loading: false,
  error: null
};

export const InventoryFoodwithProductLoadReducer = createReducer(
  initialState,
  on(InventoryFoodwithProductActions.loadInventoryFoodwithProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InventoryFoodwithProductActions.loadInventoryFoodwithProductSuccess, (state, { InventoryFoodwithProduct_ }) => ({
    ...state,
    InventoryFoodwithProduct_,
    loading: false
  })),
  on(InventoryFoodwithProductActions.loadInventoryFoodwithProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
// export const InventoryFoodwithProductByIdLoadReducer = createReducer(
//   initialState,
//   on(InventoryFoodwithProductActions.loadInventoryFoodwithProductById, (state) => ({
//     ...state,
//     loading: true,
//     error: null
//   })),
//   on(InventoryFoodwithProductActions.loadInventoryFoodwithProductByIdSuccess, (state, { InventoryFoodwithProduct_ }) => ({
//     ...state,
//     InventoryFoodwithProduct_: InventoryFoodwithProduct_,
//     loading: false
//   })),
//   on(InventoryFoodwithProductActions.loadInventoryFoodwithProductByIdFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error
//   })),
// );
export const InventoryFoodwithProductAddReducer = createReducer(
  initialState,
  on(InventoryFoodwithProductActions.addInventoryFoodwithProduct, (state, { InventoryFoodwithProduct_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(InventoryFoodwithProductActions.addInventoryFoodwithProductSuccess, (state, { InventoryFoodwithProduct_ }) => ({
    ...state,
    InventoryFoodwithProduct_: [...state.InventoryFoodwithProduct_, InventoryFoodwithProduct_],
    loading:false
  })),
  on(InventoryFoodwithProductActions.addInventoryFoodwithProductFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const InventoryFoodwithProductUpdateReducer = createReducer(
  initialState,
  on(InventoryFoodwithProductActions.updateInventoryFoodwithProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(InventoryFoodwithProductActions.updateInventoryFoodwithProductSuccess, (state, { InventoryFoodwithProductForEdit_ }) => ({
    ...state,
    InventoryFoodwithProduct: state.InventoryFoodwithProduct_.map((InventoryFoodwithProduct_) =>
      InventoryFoodwithProductForEdit_._id === InventoryFoodwithProductForEdit_._id ? InventoryFoodwithProduct_ : InventoryFoodwithProduct_
    ),
    loading: false,
  })),

  on(InventoryFoodwithProductActions.updateInventoryFoodwithProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const InventoryFoodwithProductDeleteReducer = createReducer(
  initialState2,

  // On delete trigger
  on(InventoryFoodwithProductActions.deleteInventoryFoodwithProduct, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove InventoryFoodwithProduct
  on(InventoryFoodwithProductActions.deleteInventoryFoodwithProductSuccess, (state, { _id }) => ({
    ...state,
    InventoryFoodwithProductForEdit_: state.InventoryFoodwithProductForEdit_.filter((InventoryFoodwithProduct_) => InventoryFoodwithProduct_._id !== _id),
    loading: false,
  })),

  // On failure
  on(InventoryFoodwithProductActions.deleteInventoryFoodwithProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);