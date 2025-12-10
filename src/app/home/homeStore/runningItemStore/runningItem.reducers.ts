import { createReducer, on, Action } from '@ngrx/store';
import * as RunningItemActions from './runningItem.actions';
import { GenratedItemKOT } from '../../../core/Model/crud.model';

export interface RunningItemsState {
  KOTrunningorders: GenratedItemKOT[];
  error: any | null;
}

export const initialState: RunningItemsState = {
  KOTrunningorders: [],
  error: null,
};

const reducer = createReducer(
  initialState,
  on(RunningItemActions.loadRunningItems, (state) => ({
    ...state,
    error: null,
  })),
  on(RunningItemActions.loadRunningItemsSuccess, (state, { KOTrunningorders }) => ({
    ...state,
    KOTrunningorders,
    error: null,
  })),
  on(RunningItemActions.addRunningItem, (state) => ({
    ...state,
    error: null,
  })),
  on(RunningItemActions.addRunningItemSuccess, (state, { KOTrunningorders }) => ({
    ...state,
    KOTrunningorders: [...state.KOTrunningorders, KOTrunningorders],
    error: null,
  })),
  on(RunningItemActions.addRunningItemFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RunningItemActions.updateRunningItem, (state, { KOTrunningorders }) => ({
    ...state,
    KOTrunningorders: state.KOTrunningorders.map(item =>
      item.RecieptNumber === KOTrunningorders.RecieptNumber ? KOTrunningorders : item
    ),
    error: null,
  })),
  on(RunningItemActions.removeRunningItem, (state, { RecieptNumber }) => ({
    ...state,
    KOTrunningorders: state.KOTrunningorders.filter(item => item.RecieptNumber !== RecieptNumber),
    error: null,
  })),
  on(RunningItemActions.clearRunningItems, (state) => ({
    ...state,
    KOTrunningorders: [],
    error: null,
  }))
);

// For AoT compatibility (Angular)
export function runningItemReducer(state: RunningItemsState | undefined, action: Action) {
  return reducer(state, action);
}

