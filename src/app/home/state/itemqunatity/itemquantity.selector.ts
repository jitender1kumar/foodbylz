import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./itemquantity.state";

const getquanityState = createFeatureSelector<PostsState>('productpriceallname');

export const getquanityvalue = createSelector(getquanityState,state=>{
    return state.productpriceallname;
});
