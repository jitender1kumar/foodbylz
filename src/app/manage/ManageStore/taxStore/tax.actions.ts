import { createAction, props } from '@ngrx/store';
import { Tax } from '../../../core/Model/crud.model';

// Load
export const loadTax = createAction('[Tax] Load ProductCategories');
export const loadTaxSuccess = createAction('[Tax] Load ProductCategories Success', props<{ Tax_: any[] }>());
export const loadTaxFailure = createAction('[Tax] Load ProductCategories Failure', props<{ error: string }>());

// Add
export const addTax = createAction('[Tax] Add Tax', props<{ Tax_: Tax }>());
export const addTaxSuccess = createAction('[Tax] Add Tax Success', props<{ Tax_: Tax }>());
export const addTaxFailure = createAction('[Tax] Add Tax Failure', props<{ error: string }>());

// Update
export const updateTax = createAction('[Tax] Update Tax', props<{ Tax_: any }>());
export const updateTaxSuccess = createAction('[Tax] Update Tax Success', props<{ Tax_: any }>());
export const updateTaxFailure = createAction('[Tax] Update Tax Failure', props<{ error: string }>());

// Delete
export const deleteTax = createAction('[Tax] Delete Tax', props<{ _id: string }>());
export const deleteTaxSuccess = createAction('[Tax] Delete Tax Success', props<{ _id: string }>());
export const deleteTaxFailure = createAction('[Tax] Delete Tax Failure', props<{ error: string }>());
