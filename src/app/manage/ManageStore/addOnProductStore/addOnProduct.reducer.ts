import { createReducer, on } from '@ngrx/store';
import * as AddOnProductActions from './addOnProduct.action';
import { AddOnProduct, AddOnProductEdit } from '../../../core/Model/crud.model';

export interface AddOnProductState {
  addOnProducts: AddOnProduct[];
  loading: boolean;
  error: any;
}

export const initialState: AddOnProductState = {
  addOnProducts: [],
  loading: false,
  error: null,
};
export interface LoadAddOnProductState {
  addOnProductsdata: AddOnProduct[];
  loading: boolean;
  error: any;
}

export const initialState3: LoadAddOnProductState = {
  addOnProductsdata: [],
  loading: false,
  error: null,
};
export interface AddOnProductEditState {
  addOnProductEdit: AddOnProductEdit[];
  loading: boolean;
  error: any;
}

export const initialState2: AddOnProductEditState = {
  addOnProductEdit: [],
  loading: false,
  error: null,
};



export const loadAddOnProductReducer = createReducer(
  initialState3,

  // Load AddOnProducts
  on(AddOnProductActions.loadAllAddOnProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddOnProductActions.loadAllAddOnProductsSuccess, (state, { addOnProductsdata }) => ({
    ...state,
    addOnProductsdata,
    loading: false,
    error: null,
  })),
  on(AddOnProductActions.loadAllAddOnProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

);
  
export const addOnProductReducer = createReducer(
  initialState,

  // Load AddOnProducts
  on(AddOnProductActions.loadAddOnProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddOnProductActions.loadAddOnProductsSuccess, (state, { addOnProducts }) => ({
    ...state,
    addOnProducts,
    loading: false,
    error: null,
  })),
  on(AddOnProductActions.loadAddOnProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add AddOnProduct
  on(AddOnProductActions.addAddOnProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(AddOnProductActions.addAddOnProductSuccess, (state, { addOnProduct }) => {
    // Check if addOnProducts is iterable (i.e., an array)
    if (!Array.isArray(state.addOnProducts)) {
      return {
        ...state,
        loading: false,
        error: 'Failed to add: addOnProducts is not iterable.',
      };
    }
    return {
      ...state,
      addOnProducts: [...state.addOnProducts, addOnProduct],
      loading: false,
      error: null,
    };
  }),
  on(AddOnProductActions.addAddOnProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
  // Update AddOnProduct
  export const addOnProductEditReducer = createReducer(
    initialState2,
  on(AddOnProductActions.updateAddOnProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  // on(AddOnProductActions.updateAddOnProductSuccess, (state, { addOnProduct }) => ({
  //   ...state,
  //   addOnProducts: Array.isArray(state.addOnProducts)
  //     ? state.addOnProducts.map((prod: any) =>
  //         prod._id === addOnProduct._id ? addOnProduct : prod
  //       )
  //     : [],
  //   loading: false,
  //   error: null,
  // })),
  on(AddOnProductActions.updateAddOnProductSuccess, (state, { addOnProductEdit }) => ({
    ...state,
    addOnProductEdit: state.addOnProductEdit.map((c: AddOnProductEdit) => (c._id === addOnProductEdit._id ? { ...c, ...addOnProductEdit } : c)),
    loading: false
  })),
  on(AddOnProductActions.updateAddOnProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete AddOnProduct
  on(AddOnProductActions.deleteAddOnProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddOnProductActions.deleteAddOnProductSuccess, (state, { _id }) => ({
    ...state,
    addOnProaddOnProductEditducts: Array.isArray(state.addOnProductEdit)
      ? state.addOnProductEdit.filter((product: AddOnProductEdit) => product._id !== _id)
      : [],
    loading: false,
    error: null,
  })),
  on(AddOnProductActions.deleteAddOnProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
// Get AddOnProducts by ProductId and SubQuantityTypeID
export const getByProductIdSubQTypeIDAddOnProductsReducer = createReducer(
  initialState2,
  on(AddOnProductActions.getByProductIdSubQTypeIDAddOnProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsSuccess, (state, { addOnProducts }) => ({
    ...state,
    addOnProducts: addOnProducts,
    loading: false,
    error: null,
  })),
  on(AddOnProductActions.getByProductIdSubQTypeIDAddOnProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
export const getAddOnProductByIdReducer = createReducer(
  initialState2,
  on(AddOnProductActions.getAddOnProductById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddOnProductActions.getAddOnProductByIdSuccess, (state, { addOnProduct }) => ({
    ...state,
    addOnProduct: addOnProduct,
    loading: false,
    error: null,
  })),
  on(AddOnProductActions.getAddOnProductByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
