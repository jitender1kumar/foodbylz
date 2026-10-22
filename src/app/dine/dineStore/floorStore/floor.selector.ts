import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export interface Floor {
  id: number | string;
  name?: string;
  number?: number | string;
  status?: string;
  isActive?: boolean;
  [key: string]: any;
}

export interface FloorState {
  floors: Floor[];
  selectedFloor: Floor | null;
  loading: boolean;
  error: string | null;
}

export const selectFloorState: MemoizedSelector<object, FloorState> =
  createFeatureSelector<FloorState>('floor');

export const selectFloors = createSelector(
  selectFloorState,
  (state: FloorState) => state?.floors ?? []
);

export const selectSelectedFloor = createSelector(
  selectFloorState,
  (state: FloorState) => state?.selectedFloor ?? null
);

export const selectFloorLoading = createSelector(
  selectFloorState,
  (state: FloorState) => state?.loading ?? false
);

export const selectFloorError = createSelector(
  selectFloorState,
  (state: FloorState) => state?.error ?? null
);

export const selectFloorById = (id: number | string) =>
  createSelector(selectFloors, (floors: Floor[]) =>
    floors.find((floor) => floor.id === id) ?? null
  );
