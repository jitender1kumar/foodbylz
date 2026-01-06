import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
export interface AppState {
    runningItems: any;
  }
  
  // ✅ MetaReducer for localStorage sync
  export function localStorageSyncReducer(reducer: any): any {
    return localStorageSync({
      keys: ['runningItems'],  // which slices of store to persist
      rehydrate: true           // restore from localStorage on load
    })(reducer);
  }
  
  export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
  

//   this.store.dispatch(clearRunningItems());
// localStorage.removeItem('runningItems');