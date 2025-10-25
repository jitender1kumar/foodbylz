import { createReducer, on } from '@ngrx/store';
import * as RunningItemsActions from './runningItem.actions';
import { RunningItems } from '../../../model/category.model';

export interface RunningItemsState {
  runningItem: RunningItems[];
  loading: boolean;
}

export const initialState: RunningItemsState = {
  runningItem: [],
  loading: false,
};

export const runningItemsReducer = createReducer(
  initialState,

  on(RunningItemsActions.loadRunningItems, state => ({
    ...state,
    loading: true,
  })),

  on(RunningItemsActions.loadRunningItemsSuccess, (state, { runningItems }) => ({
    ...state,
    runningItem: runningItems,
    loading: false,
  })),

  // on(RunningItemsActions.addRunningItem, state => ({
  //   ...state,
  //   loading: true,
  // })),
  on(RunningItemsActions.addRunningItem, (state, { runningItem }) => ({
    ...state,
    runningItem: [...state.runningItem, runningItem],
    loading: false,
  })),
  on(RunningItemsActions.addRunningItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    // Optionally you can add error state if you declare it in the state
    // error: error
  })),

  on(RunningItemsActions.updateRunningItem, (state, { runningItem }) => ({
    ...state,
    runningItem: state.runningItem.map((item: RunningItems) =>
      item._idPP === runningItem._idPP ? runningItem : item
    ),
  })),

  on(RunningItemsActions.removeRunningItem, (state, { _idPP }) => ({
    ...state,
    runningItem: state.runningItem.filter(item => item._idPP !== _idPP),
  })),

  on(RunningItemsActions.clearRunningItems, state => ({
    ...state,
    runningItem: [],
  }))
);
