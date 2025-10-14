import { createReducer, on } from '@ngrx/store';
import * as FloorActions from './floor.action';
import { Floor } from '../../../core/Model/crud.model';

export interface FloorState {
  Floor_: Floor[];
  loading: boolean;
  error: string | null;
}

export const initialState: FloorState = {
  Floor_: [] as Floor[],
  loading: false,
  error: null
};

export const floorLoadReducer = createReducer(
  initialState,

  // Load Floors
  on(FloorActions.loadFloors, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FloorActions.loadFloorsSuccess, (state, { Floor_ }) => ({
    ...state,
    Floor_,
    loading: false
  })),
  on(FloorActions.loadFloorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);
  // Add Floor
  export const floorAddReducer = createReducer(
    initialState,
  on(FloorActions.addFloor, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FloorActions.addFloorSuccess, (state, { Floor_ }) => ({
    ...state,
    Floor_: [...state.Floor_, Floor_|| []],
    loading: false
  })),
  on(FloorActions.addFloorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

  // Update Floor
  export const floorUpdateReducer = createReducer(
    initialState,
  on(FloorActions.updateFloor, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FloorActions.updateFloorSuccess, (state, { Floor_ }) => ({
    ...state,
    Floor_: state.Floor_.map(Floor_ =>
      Floor_._id === Floor_._id ? Floor_ : Floor_
    ),
    loading: false
  })),
  on(FloorActions.updateFloorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  );
  // Delete Floor
  export const floorDeleteReducer = createReducer(
    initialState,
  on(FloorActions.deleteFloor, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FloorActions.deleteFloorSuccess, (state, { _id }) => ({
    ...state,
    Floor_: state.Floor_.filter(Floor_ => Floor_._id !== _id),
    loading: false
  })),
  on(FloorActions.deleteFloorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
