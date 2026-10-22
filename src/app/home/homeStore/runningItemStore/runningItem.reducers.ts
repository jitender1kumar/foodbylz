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
  // Reducer to clear RunningItems_
  on(
    RunningItemActions.clearRunningItems,
    (state) => ({
      ...state,
      RunningItems_: [],
      loading: false,
      error: null,
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
          totaltaxvalue: taxpercent,
          paidStatus: false,
          AddOnItems: allPPItem.AddOnItems || [],
          Taxes: allPPItem.Taxes || [],
          notes: ''
        };
// console.log('Adding/Updating Running Item:', newRunningItem, 'Current RunningItems_:', RunningItems_);
// console.log('Running Item Index:', runningItemIdx, 'All PP Item:', allPPItem);
        if (runningItemIdx !== -1) {
          const updatedRunningItem = {
            ...newRunningItem,
            ...RunningItems_[runningItemIdx],
            SelectProductId: id,
            quntityvalue: val,
            qvalue: val,
            ProductPrice: price,
            ProductName: allPPItem.ProductName,
            totaltaxvalue: taxpercent,
            paidStatus: false,
            Taxes: RunningItems_[runningItemIdx]?.Taxes ?? [],
            AddOnItems: RunningItems_[runningItemIdx]?.AddOnItems ?? [],
            notes: '',
           KOT_Changed:false
          };
          RunningItems_ = RunningItems_.map((item, index) =>
            index === runningItemIdx ? updatedRunningItem : item
          );
        } else {
          RunningItems_ = [...RunningItems_, { ...newRunningItem, KOT_Changed: false }];
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
        } else {
          // Remove the item if val becomes 0 or less
          RunningItems_ = [
            ...RunningItems_.slice(0, runningItemIdx),
            ...RunningItems_.slice(runningItemIdx + 1)
          ];
        }
      }
      // if (incrementType === 'AddOnItemsUpdate' && allPPItem && allPPItem.SelectProductId) {
      //   const addonRunningItemIdx = RunningItems_.findIndex(
      //     (item: any) =>
      //       item.SelectProductId === id &&
      //       item.SubQuantityTypeName === SubQuantityTypeName
      //   );

      //   if (addonRunningItemIdx !== -1) {
      //     const updatedRunningItem = {
      //       ...RunningItems_[addonRunningItemIdx],
      //       AddOnItems: Array.isArray(allPPItem.AddOnItems)
      //         ? [...allPPItem.AddOnItems]
      //         : []
      //     };
      //     RunningItems_ = RunningItems_.map((item, index) =>
      //       index === addonRunningItemIdx ? updatedRunningItem : item
      //     );
      //   }
      // }
      return {
        ...state,
        RunningItems_,
        loading: false,
        error: null,
      };
  }),
  
  on(
    RunningItemActions.updateRunningItemAddOnItems,
    (
      state,
      { id, SubQuantityTypeName, AddOnItems, RunningItemData, allppdata }
    ) => {
      const matches = (left: unknown, right: unknown): boolean =>
        left != null && right != null && String(left) === String(right);

      const currentItems: any[] = Array.isArray(state.RunningItems_)
        ? [...state.RunningItems_]
        : [];
      const sourceItems: any[] = Array.isArray(RunningItemData)
        ? RunningItemData
        : Array.isArray(allppdata)
        ? allppdata
        : currentItems;
      const target = sourceItems.find((item: any) =>
        matches(item.SelectProductId, id) &&
        (SubQuantityTypeName == null ||
          matches(item.SubQuantityTypeName, SubQuantityTypeName))
      );

      if (!target) return state;

      const updatedArr = currentItems.map((item: any) =>
        matches(item.SelectProductId, target.SelectProductId) &&
        matches(item.SubQuantityTypeName, target.SubQuantityTypeName)
          ? {
              ...item,
              AddOnItems: Array.isArray(AddOnItems) ? [...AddOnItems] : [],
            }
          : item
      );

      return {
        ...state,
        RunningItems_: updatedArr,
        loading: false,
        error: null,
      };
    }
  ),
  on(
    RunningItemActions.updateRunningItemNotes,
    (state, { id, selectSubQuantityTypeID, notes, RunningItemData, invoiceid }) => {
      // Clone the base array of running items from the passed RunningItemData if present, otherwise from state
     
      const baseArr: any[] = Array.isArray(RunningItemData) && RunningItemData.length > 0
        ? [...RunningItemData]
        : Array.isArray(state.RunningItems_)
        ? [...state.RunningItems_]
        : [];

      // Find the index of the item to update by matching id/SelectProductId and SubQuantityTypeName
      const idx = baseArr.findIndex((item: any) =>
        item.SelectProductId === id && item.selectSubQuantityTypeID === selectSubQuantityTypeID
      
      );
      
      // If found, update notes on this item
      if (idx !== -1) {
        const updatedArr = baseArr.map((item, i) =>
          i === idx
            ? { ...item, notes }
            : item
        );

        return {
          ...state,
          RunningItems_: updatedArr,
          loading: false,
          error: null
        };
      }

      // Not found, return state
      return state;
    }
  ),
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
