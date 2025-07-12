import { itemsReducer } from "../home/state/itemqunatity/itemquantity.reducer";
import { PostsState } from "../home/state/itemqunatity/itemquantity.state";

    export interface AppState{
        posts:PostsState;
    }

    export const appReducer={
        productpriceallname:itemsReducer
    }