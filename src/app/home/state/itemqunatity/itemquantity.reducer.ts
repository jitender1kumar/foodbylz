import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "./itemquantity.state";
import { itemQminus, itmeQplus } from "./itemquantity.action";
const _itemsReducer = createReducer(
    initialState,
    on(itmeQplus,(state, action)=>
        {
            const updatedPosts = state.productpriceallname.map(productpriceallname=>{
                return action.productpriceallname._id === action.productpriceallname._id?action.productpriceallname:productpriceallname;
            })
            return {
                ...state,
                productpriceallname:updatedPosts,
            };
        }),
        on(itemQminus,(state, action)=>
            {
                const updatedPosts = state.productpriceallname.map(productpriceallname=>{
                    return action.productpriceallname._id === action.productpriceallname._id?action.productpriceallname:productpriceallname;
                })
                return {
                    ...state,
                    productpriceallname:updatedPosts,
                };
            })
)
  export function itemsReducer(state: any, action: any) {
    return _itemsReducer(state, action);
  }