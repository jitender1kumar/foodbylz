import { createReducer, on } from '@ngrx/store';
import * as CustomersActions from './customers.actions';
import { Customers,CustomersEdit } from '../../core/Model/crud.model';

export interface CustomersState {
  customers: Customers[];
  selectedCustomer: Customers | null;
  loading: boolean;
  error: any;
}

export const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null
};

export interface CustomersEditState {
  customerEdit: Customers[];
  selectedCustomer: Customers | null;
  loading: boolean;
  error: any;
}

export const initialState2: CustomersEditState = {
  customerEdit: [],
  selectedCustomer: null,
  loading: false,
  error: null
};

export const customersReducer = createReducer(
  initialState,

  // Load Customers
  on(CustomersActions.loadCustomers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false
  })),
  on(CustomersActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Customer
  on(CustomersActions.addCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
    loading: false
  })),
  on(CustomersActions.addCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Get Customer By ID
  on(CustomersActions.getCustomerById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.getCustomerByIdSuccess, (state, { customer }) => ({
    ...state,
    selectedCustomer: customer,
    loading: false
  })),
  on(CustomersActions.getCustomerByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Get Customer By Mobile Number
  on(CustomersActions.getCustomerByMobileNumber, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.getCustomerByMobileNumberSuccess, (state, { customer }) => ({
    ...state,
    selectedCustomer: customer,
    loading: false
  })),
  on(CustomersActions.getCustomerByMobileNumberFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
  // Update Customer
  export const customersEditReducer = createReducer(
    initialState2,
  on(CustomersActions.updateCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.updateCustomerSuccess, (state, { customerEdit }) => ({
    ...state,
    customerEdit: state.customerEdit.map((c: any) => (c._id === customerEdit._id ? { ...c, ...customerEdit } : c)),
    loading: false
  })),
  on(CustomersActions.updateCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Customer
  on(CustomersActions.deleteCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomersActions.deleteCustomerSuccess, (state, { _id }) => ({
    ...state,
    customerEdit: state.customerEdit.filter((c: any) => c._id !== _id),
    loading: false
  })),
  on(CustomersActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);