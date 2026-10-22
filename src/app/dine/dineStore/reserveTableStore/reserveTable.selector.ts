import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ReserveTableState {
  selectedTableId: string | null;
  date: string | null;
  time: string | null;
  guestCount: number;
  notes: string;
  loading: boolean;
  error: string | null;
}

export const selectReserveTableState = createFeatureSelector<ReserveTableState>('reserveTable');

export const selectReserveTable = createSelector(
  selectReserveTableState,
  (state) => state
);

export const selectSelectedTableId = createSelector(
  selectReserveTableState,
  (state) => state?.selectedTableId ?? null
);

export const selectReserveTableDetails = createSelector(
  selectReserveTableState,
  ({ date, time, guestCount, notes }) => ({
    date,
    time,
    guestCount,
    notes,
  })
);

export const selectReserveTableLoading = createSelector(
  selectReserveTableState,
  (state) => state?.loading ?? false
);

export const selectReserveTableError = createSelector(
  selectReserveTableState,
  (state) => state?.error ?? null
);
