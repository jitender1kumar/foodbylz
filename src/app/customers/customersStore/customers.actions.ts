import { createAction, props } from '@ngrx/store';
import { Customers,CustomersEdit } from '../../core/Model/crud.model';

// Load Customers
export const loadCustomers = createAction(
  '[Customers] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customers] Load Customers Success',
  props<{ customers: Customers[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers] Load Customers Failure',
  props<{ error: any }>()
);

// Add Customer
export const addCustomer = createAction(
  '[Customers] Add Customer',
  props<{ customer: Customers }>()
);

export const addCustomerSuccess = createAction(
  '[Customers] Add Customer Success',
  props<{ customer: Customers }>()
);

export const addCustomerFailure = createAction(
  '[Customers] Add Customer Failure',
  props<{ error: any }>()
);

// Get Customer By ID
export const getCustomerById = createAction(
  '[Customers] Get Customer By Id',
  props<{ _id: string }>()
);

export const getCustomerByIdSuccess = createAction(
  '[Customers] Get Customer By Id Success',
  props<{ customer: Customers }>()
);

export const getCustomerByIdFailure = createAction(
  '[Customers] Get Customer By Id Failure',
  props<{ error: any }>()
);

// Get Customer By Mobile Number
export const getCustomerByMobileNumber = createAction(
  '[Customers] Get Customer By Mobile Number',
  props<{ MobileNo: string }>()
);

export const getCustomerByMobileNumberSuccess = createAction(
  '[Customers] Get Customer By Mobile Number Success',
  props<{ customer: Customers }>()
);

export const getCustomerByMobileNumberFailure = createAction(
  '[Customers] Get Customer By Mobile Number Failure',
  props<{ error: any }>()
);

// Update Customer
export const updateCustomer = createAction(
  '[Customers] Update Customer',
  props<{ customerEdit: CustomersEdit }>()
);

export const updateCustomerSuccess = createAction(
  '[Customers] Update Customer Success',
  props<{ customerEdit: CustomersEdit }>()
);

export const updateCustomerFailure = createAction(
  '[Customers] Update Customer Failure',
  props<{ error: any }>()
);

// Delete Customer
export const deleteCustomer = createAction(
  '[Customers] Delete Customer',
  props<{ _id: string }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customers] Delete Customer Success',
  props<{ _id: string }>()
);

export const deleteCustomerFailure = createAction(
  '[Customers] Delete Customer Failure',
  props<{ error: any }>()
);