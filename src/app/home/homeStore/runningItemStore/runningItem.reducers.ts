import { createReducer, on, Action } from '@ngrx/store';
import { RunningItems } from '../../../core/Model/RunningItemsHomeModel/RunningItem.model';
import * as RunningItemActions from'./runningItem.action';

export interface RunningItemsDoc {
  _id: string; // invoice_123
  type: 'running_items';
  invoiceId: string;
  items: RunningItems[];
  updatedAt: number;
}
export interface RunningItemState {
  RunningItems_: RunningItems[];
  loading: boolean;
  error: any;
}

export const initialState: RunningItemState = {
  RunningItems_: [],
  loading: false,
  error: null,
};

const _runningItemReducer = createReducer(
  initialState,
  // Add loadfood, loadfoodSuccess, loadfoodFailure reducer handlers
  // Handle loading state for loadRunningItemsByReceiptNumber action
  on(
    RunningItemActions.loadRunningItemsByReceiptNumber,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  // Handle success for loadRunningItemsByReceiptNumber
  on(
    RunningItemActions.loadRunningItemsByReceiptNumberSuccess,
    (state, { RunningItems_ }) => ({
      ...state,
      RunningItems_: Array.isArray(RunningItems_) ? RunningItems_ : [RunningItems_],
      loading: false,
      error: null,
    })
  ),
  // Handle failure for loadRunningItemsByReceiptNumber
  on(
    RunningItemActions.loadRunningItemsByReceiptNumberFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(
    // Set loading true on loadfood
    RunningItemActions.loadfood, 
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    // Success sets RunningItems_ and disables loading
    RunningItemActions.loadfoodSuccess, 
    (state, { RunningItems_ }) => ({
      ...state,
      RunningItems_: Array.isArray(RunningItems_) ? RunningItems_ : [RunningItems_],
      loading: false,
      error: null,
    })
  ),
  on(
    // Failure disables loading, sets error
    RunningItemActions.loadfoodFailure, 
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  // Existing update quantity handlers
  // This reducer logic is inspired by loadqunityvalue() from homeManage.service.ts (lines 227-423).
  // It handles increment/decrement of item quantity in RunningItems_.
  // Fix: remove 'employeeId' from destructured action props, to match action interface
  on(
    RunningItemActions.updateRunningItemQuantity,
    (
      state,
      {
        id,
        action: incrementType,
        SubQuantityTypeName,
        quntity,
        price,RunningItemData,
        invoiceid,
        allppdata,
      }
    ) => {
      let RunningItems_ = Array.isArray(state.RunningItems_) ? [...state.RunningItems_] : [];
      const taxpercent = 0;

      // Find the index in allppdata for the matching item
      const itemIdxInAllPP = allppdata.findIndex(
        (item: any) =>
          (item.SelectProductId ? item.SelectProductId === id : item.id === id) &&
          item.SubQuantityTypeName === SubQuantityTypeName
      );
      const allPPItem = allppdata[itemIdxInAllPP];

      // Find the index in RunningItems_ for the running item
      const runningItemIdx = RunningItems_.findIndex(
        (item: any) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName
      );

      let val: number = Number(quntity);

      if (incrementType === 'inc' && allPPItem && allPPItem.SelectProductId) {
        val = Number(quntity) + 1;

        if (RunningItems_.length > 0) {
          if (runningItemIdx !== -1) {
            // Update the quantity in the existing running item
            const updatedRunningItem = {
              ...RunningItems_[runningItemIdx],
              SelectProductId: id,
              quntityvalue: val,
              qvalue: val,
              ProductPrice: price,
              ProductName: allPPItem.ProductName,
              selectcategoryID: allPPItem.selectcategoryID,
              categoryName: allPPItem.categoryName,
              selectQtypeID: allPPItem.selectQtypeID,
              QtypeName: allPPItem.QtypeName,
              selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
              SubQuantityTypeName: allPPItem.SubQuantityTypeName,
              taxnames: '',
              taxvalues: '',
              totaltaxvalue: taxpercent,
              paidStatus: false,
              AddOnItems: RunningItems_[runningItemIdx]?.AddOnItems ?? []
            };
            RunningItems_ = [
              ...RunningItems_.slice(0, runningItemIdx),
              updatedRunningItem,
              ...RunningItems_.slice(runningItemIdx + 1)
            ];
            try {
              localStorage.setItem(invoiceid, JSON.stringify(RunningItems_));
            } catch (e) {
              console.error('Error saving RunningItemsTable to localStorage', e);
            }
          } else {
            // Add new running item if not already present
            const newRunningItem = {
              SelectProductId: id,
              ProductPrice: price,
              ProductName: allPPItem.ProductName,
              selectcategoryID: allPPItem.selectcategoryID,
              categoryName: allPPItem.categoryName,
              selectQtypeID: allPPItem.selectQtypeID,
              QtypeName: allPPItem.QtypeName,
              selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
              SubQuantityTypeName: allPPItem.SubQuantityTypeName,
              quntityvalue: val,
              qvalue: val,
              taxnames: '',
              taxvalues: '',
              totaltaxvalue: taxpercent,
              paidStatus: false,
              AddOnItems: []
            };
            RunningItems_ = [...RunningItems_, newRunningItem];
            try {
              localStorage.setItem(invoiceid, JSON.stringify(RunningItems_));
            } catch (e) {
              console.error('Error saving RunningItemsTable to localStorage', e);
            }
          }
        } else {
          // If RunningItems_ is empty, start with a single new item
          const newRunningItem = {
            SelectProductId: id,
            ProductPrice: price,
            ProductName: allPPItem.ProductName,
            selectcategoryID: allPPItem.selectcategoryID,
            categoryName: allPPItem.categoryName,
            selectQtypeID: allPPItem.selectQtypeID,
            QtypeName: allPPItem.QtypeName,
            selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
            SubQuantityTypeName: allPPItem.SubQuantityTypeName,
            quntityvalue: val,
            qvalue: val,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent,
            paidStatus: false,
            AddOnItems: []
          };
          RunningItems_ = [newRunningItem];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(RunningItems_));
          } catch (e) {
            console.error('Error saving RunningItemsTable to localStorage', e);
          }
        }
      }
      else if (incrementType === 'dcre' && runningItemIdx !== -1) {
        val = Number(quntity) - 1;

        if (val > 0) {
          const updatedRunningItem = {
            ...RunningItems_[runningItemIdx],
            quntityvalue: val,
            qvalue: val,
            ProductPrice: price,
            taxnames: '',
            taxvalues: '',
            totaltaxvalue: taxpercent
          };
          RunningItems_ = [
            ...RunningItems_.slice(0, runningItemIdx),
            updatedRunningItem,
            ...RunningItems_.slice(runningItemIdx + 1)
          ];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(RunningItems_));
          } catch (e) {
            console.error('Error updating RunningItemsTable in localStorage', e);
          }
        } else {
          // Remove the item if val becomes 0 or less
          RunningItems_ = [
            ...RunningItems_.slice(0, runningItemIdx),
            ...RunningItems_.slice(runningItemIdx + 1)
          ];
          try {
            localStorage.setItem(invoiceid, JSON.stringify(RunningItems_));
          } catch (e) {
            console.error('Error updating RunningItemsTable in localStorage', e);
          }
        }
      }

      return {
        ...state,
        RunningItems_,
        loading: false,
        error: null,
      };
  }),
  // Provide a failure handler for updateRunningItemQuantity
  on(RunningItemActions.updateRunningItemQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

export function runningItemReducer(state: RunningItemState | undefined, action: Action) {
  return _runningItemReducer(state, action);
}
