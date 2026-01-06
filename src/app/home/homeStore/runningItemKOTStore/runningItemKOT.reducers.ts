import { createReducer, on, Action } from '@ngrx/store';
import * as RunningItemKOTActions from './runningItemKOT.actions';
import { GenratedItemKOT } from '../../../core/Model/crud.model';

export interface KOTRunningItemsState {
  KOTrunningorder: GenratedItemKOT[];
  error: any | null;
}

export const initialState: KOTRunningItemsState = {
  KOTrunningorder: [],
  error: null,
};

const KOTreducer = createReducer(
  initialState,
  on(RunningItemKOTActions.loadKOTRunningItems, (state) => ({
    ...state,
    error: null,
  })),
  on(RunningItemKOTActions.loadKOTRunningItemsSuccess, (state, { KOTrunningorders }) => ({
    ...state,
    KOTrunningorders,
    error: null,
  })),
  on(RunningItemKOTActions.addKOTRunningItem, (state) => ({
    ...state,
    error: null,
  })),
  on(RunningItemKOTActions.addKOTRunningItemSuccess, (state, { KOTrunningorder }) => ({
    ...state,
    KOTrunningorder: [...state.KOTrunningorder, KOTrunningorder],
    error: null,
  })),
  on(RunningItemKOTActions.addKOTRunningItemFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RunningItemKOTActions.updateKOTRunningItem, (state, { KOTrunningorder }) => ({
    ...state,
    KOTrunningorder: state.KOTrunningorder.map(item =>
      item.RecieptNumber === KOTrunningorder.RecieptNumber ? KOTrunningorder : item
    ),
    error: null,
  })),
  on(RunningItemKOTActions.removeKOTRunningItem, (state, { RecieptNumber }) => ({
    ...state,
    KOTrunningorder: state.KOTrunningorder.filter(item => item.RecieptNumber !== RecieptNumber),
    error: null,
  })),
 
  on(RunningItemKOTActions.clearKOTRunningItems, (state) => ({
    ...state,
    KOTrunningorder: [],
    error: null,
  })),
);

// For AoT compatibility (Angular)
export function runningItemKOTReducer(state: KOTRunningItemsState | undefined, action: Action) {
  return KOTreducer(state, action);
}

