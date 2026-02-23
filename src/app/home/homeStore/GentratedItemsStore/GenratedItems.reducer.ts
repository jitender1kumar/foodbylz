import { Action, createReducer, on } from '@ngrx/store';
import * as GenratedItemsActions from './GenratedItems.action';
import { GenratedItems } from '../../../core/Model/crud.model';

export interface GenratedItemsState {
    _id: string;
  items: GenratedItems[];
  loading: boolean;
  error: string | null;
}

export const initialState: GenratedItemsState = {
  _id: '',
  items: [],
  loading: false,
  error: null,
};

export const _GenratedItemsReducer = createReducer(initialState,
  on(GenratedItemsActions.addGenratedItems, (state, { items }) => ({
    ...state,
    items: [...state.items, items],
  })),
  on(GenratedItemsActions.addGenratedItemsSuccess, (state, { items }) => ({
    ...state,
    items: [...state.items, items],
  })),
  on(GenratedItemsActions.addGenratedItemsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(GenratedItemsActions.loadGenratedItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(GenratedItemsActions.loadGenratedItemsSuccess, (state, { items }) => ({
    ...state,
    items: Array.isArray(items) ? items : [items],
    loading: false,
  })),
  on(GenratedItemsActions.loadGenratedItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(GenratedItemsActions.deleteGenratedItems, (state, { items }) => ({
    ...state,
    items: state.items.filter(item => item._id !== items._id),
  })),
  on(GenratedItemsActions.deleteGenratedItemsSuccess, (state, { items }) => ({
    ...state,
    items: state.items.filter(item => item._id !== items._id),
  })),
  on(GenratedItemsActions.deleteGenratedItemsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(GenratedItemsActions.updateGenratedItems, (state, { items }) => ({
    ...state,
    items: state.items.map(item => item._id === items._id ? items : item),
  })),
  on(GenratedItemsActions.updateGenratedItemsSuccess, (state, { items }) => ({
    ...state,
    items: state.items.filter(item => item._id !== items._id),
  })),
  on(GenratedItemsActions.updateGenratedItemsFailure, (state, { error }) => ({
    ...state,
    error: error,
    })),      
);  

export function GenratedItemsReducer(state: GenratedItemsState | undefined, action: Action) {
  return _GenratedItemsReducer(state, action);
}