// category.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { ProductCategory } from '../../../core/Model/crud.model';

export interface CategoryState {
    ProductCategory_: ProductCategory[];
  loading: boolean;
  error: string | null;
}

export const initialState: CategoryState = {
    ProductCategory_: [],
  loading: false,
  error: null
};

export const categoryLoadReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { ProductCategory_ }) => ({
    ...state,
    ProductCategory_,
    loading: false
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  

);
export const categoryAddReducer = createReducer(
  initialState,
  on(CategoryActions.addCategory, (state, { ProductCategory_ }) => ({
    ...state,
    loading:true,
    error:null
  })),
  on(CategoryActions.addCategorySuccess, (state, { ProductCategory_ }) => ({
    ...state,
    ProductCategory_: [...state.ProductCategory_, ProductCategory_],
    loading:false
  })),
  on(CategoryActions.addCategoryFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error
  }))
);
export const categoryUpdateReducer = createReducer(
  initialState,
  on(CategoryActions.updateCategory, (state) => ({
    ...state,
    loading: true,
  })),

  on(CategoryActions.updateCategorySuccess, (state, { ProductCategory_ }) => ({
    ...state,
    categories: state.ProductCategory_.map((cat) =>
      ProductCategory_._id === ProductCategory_._id ? ProductCategory_ : cat
    ),
    loading: false,
  })),

  on(CategoryActions.updateCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const categoryDeleteReducer = createReducer(
  initialState,

  // On delete trigger
  on(CategoryActions.deleteCategory, (state) => ({
    ...state,
    loading: true,
  })),

  // On delete success: remove category
  on(CategoryActions.deleteCategorySuccess, (state, { _id }) => ({
    ...state,
    ProductCategory_: state.ProductCategory_.filter((cat) => cat._id !== _id),
    loading: false,
  })),

  // On failure
  on(CategoryActions.deleteCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);