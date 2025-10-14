import { createReducer, on } from '@ngrx/store';
import * as RunningItemActions from './runningItem.actions';
import { RunningItems } from '../../../model/category.model';

export interface RunningItemState {
  items: RunningItems[];
  loading: boolean;
  error: any;
}

export const initialState: RunningItemState = {
  items: [],
  loading: false,
  error: null
};

export const runningItemReducer = createReducer(
  initialState,

  // Load Running Items
  // Load data logic for RunningItems per the category.model (RunningItems interface)
  on(RunningItemActions.loadRunningItems, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RunningItemActions.loadRunningItemsSuccess, (state, { items }) => ({
    ...state,
    // ensure each item matches RunningItems interface; fallback to empty array if not
    items: Array.isArray(items) ? items.map(item => ({
      _idPP: item._idPP,
      AddOnItems: item.AddOnItems ?? [],
      ProductPrice: item.ProductPrice,
      SelectProductId: item.SelectProductId,
      ProductName: item.ProductName,
      selectcategoryID: item.selectcategoryID,
      categoryName: item.categoryName,
      selectQtypeID: item.selectQtypeID,
      QtypeName: item.QtypeName,
      selectSubQuantityTypeID: item.selectSubQuantityTypeID,
      SubQuantityTypeName: item.SubQuantityTypeName,
      quntityvalue: item.quntityvalue,
      qvalue: item.qvalue,
      taxnames: item.taxnames,
      taxvalues: item.taxvalues,
      totaltaxvalue: item.totaltaxvalue
    })) : [],
    loading: false,
    error: null
  })),
  on(RunningItemActions.loadRunningItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Running Item
  // Add Running Item
  on(RunningItemActions.addRunningItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RunningItemActions.addRunningItemSuccess, (state, { item }) => {
    // Support both single RunningItems object or array of RunningItems
    let newItems: any[] = [];
    if (Array.isArray(item)) {
      newItems = item.map((it: any) => ({
        _idPP: it._idPP,
        AddOnItems: it.AddOnItems ?? [],
        ProductPrice: it.ProductPrice,
        SelectProductId: it.SelectProductId,
        ProductName: it.ProductName,
        selectcategoryID: it.selectcategoryID,
        categoryName: it.categoryName,
        selectQtypeID: it.selectQtypeID,
        QtypeName: it.QtypeName,
        selectSubQuantityTypeID: it.selectSubQuantityTypeID,
        SubQuantityTypeName: it.SubQuantityTypeName,
        quntityvalue: it.quntityvalue,
        qvalue: it.qvalue,
        taxnames: it.taxnames,
        taxvalues: it.taxvalues,
        totaltaxvalue: it.totaltaxvalue
      }));
    } else if (item) {
      newItems = [{
        _idPP: item._idPP,
        AddOnItems: item.AddOnItems ?? [],
        ProductPrice: item.ProductPrice,
        SelectProductId: item.SelectProductId,
        ProductName: item.ProductName,
        selectcategoryID: item.selectcategoryID,
        categoryName: item.categoryName,
        selectQtypeID: item.selectQtypeID,
        QtypeName: item.QtypeName,
        selectSubQuantityTypeID: item.selectSubQuantityTypeID,
        SubQuantityTypeName: item.SubQuantityTypeName,
        quntityvalue: item.quntityvalue,
        qvalue: item.qvalue,
        taxnames: item.taxnames,
        taxvalues: item.taxvalues,
        totaltaxvalue: item.totaltaxvalue
      }];
    }
    return {
      ...state,
      items: [...state.items, ...newItems],
      loading: false,
      error: null
    };
  }),
  on(RunningItemActions.addRunningItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Running Item
  on(RunningItemActions.updateRunningItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RunningItemActions.updateRunningItemSuccess, (state, { item }) => {
    // Ensure proper updating of RunningItems_ based on unique keys (_idPP and SubQuantityTypeName)
    const updatedItems = state.items.map(existingItem => {
      if (
        existingItem._idPP === item._idPP &&
        existingItem.SubQuantityTypeName === item.SubQuantityTypeName
      ) {
        // Return a new RunningItems object reflecting the latest item, as per model @file_context_0
        return {
          ...existingItem,
          ...item,
          AddOnItems: item.AddOnItems ?? existingItem.AddOnItems,
          ProductPrice: item.ProductPrice ?? existingItem.ProductPrice,
          SelectProductId: item.SelectProductId ?? existingItem.SelectProductId,
          ProductName: item.ProductName ?? existingItem.ProductName,
          selectcategoryID: item.selectcategoryID ?? existingItem.selectcategoryID,
          categoryName: item.categoryName ?? existingItem.categoryName,
          selectQtypeID: item.selectQtypeID ?? existingItem.selectQtypeID,
          QtypeName: item.QtypeName ?? existingItem.QtypeName,
          selectSubQuantityTypeID: item.selectSubQuantityTypeID ?? existingItem.selectSubQuantityTypeID,
          SubQuantityTypeName: item.SubQuantityTypeName ?? existingItem.SubQuantityTypeName,
          quntityvalue: item.quntityvalue ?? existingItem.quntityvalue,
          qvalue: item.qvalue ?? existingItem.qvalue,
          taxnames: item.taxnames ?? existingItem.taxnames,
          taxvalues: item.taxvalues ?? existingItem.taxvalues,
          totaltaxvalue: item.totaltaxvalue ?? existingItem.totaltaxvalue
        };
      }
      return existingItem;
    });
    return {
      ...state,
      items: updatedItems,
      loading: false,
      error: null
    };
  }),
  on(RunningItemActions.updateRunningItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Running Item
  on(RunningItemActions.deleteRunningItem, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RunningItemActions.deleteRunningItemSuccess, (state, { productId, subQuantityTypeId }) => {
    // Remove items from the RunningItems_ array where SelectProductId and selectSubQuantityTypeID match
    const updatedItems = state.items.filter(
      i => !(i.SelectProductId === productId && i.selectSubQuantityTypeID === subQuantityTypeId)
    );
    return {
      ...state,
      items: updatedItems,
      loading: false,
      error: null
    };
  }),
  on(RunningItemActions.deleteRunningItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

