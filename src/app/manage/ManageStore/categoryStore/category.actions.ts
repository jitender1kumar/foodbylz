import { createAction, props } from '@ngrx/store';
import { ProductCategory } from '../../../core/Model/crud.model';

// Load
export const loadCategories = createAction('[ProductCategory] Load ProductCategories');
export const loadCategoriesSuccess = createAction('[ProductCategory] Load ProductCategories Success', props<{ ProductCategory_: any[] }>());
export const loadCategoriesFailure = createAction('[ProductCategory] Load ProductCategories Failure', props<{ error: string }>());

// Add
export const addCategory = createAction('[ProductCategory] Add ProductCategory', props<{ ProductCategory_: ProductCategory }>());
export const addCategorySuccess = createAction('[ProductCategory] Add ProductCategory Success', props<{ ProductCategory_: ProductCategory }>());
export const addCategoryFailure = createAction('[ProductCategory] Add ProductCategory Failure', props<{ error: string }>());

// Update
export const updateCategory = createAction('[ProductCategory] Update ProductCategory', props<{ ProductCategory_: any }>());
export const updateCategorySuccess = createAction('[ProductCategory] Update ProductCategory Success', props<{ ProductCategory_: any }>());
export const updateCategoryFailure = createAction('[ProductCategory] Update ProductCategory Failure', props<{ error: string }>());

// Delete
export const deleteCategory = createAction('[ProductCategory] Delete ProductCategory', props<{ _id: string }>());
export const deleteCategorySuccess = createAction('[ProductCategory] Delete ProductCategory Success', props<{ _id: string }>());
export const deleteCategoryFailure = createAction('[ProductCategory] Delete ProductCategory Failure', props<{ error: string }>());
