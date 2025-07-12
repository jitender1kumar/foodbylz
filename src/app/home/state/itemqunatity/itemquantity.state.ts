import { ProductPriceDetails } from "../../../core/Model/crud.model";

export  interface PostsState
{
  productpriceallname:ProductPriceDetails[];
}
export  interface PostsStateQty
{
    _id:ProductPriceDetails["_id"];
    quntityvalue:ProductPriceDetails["quntityvalue"];
}
  export const initialState: PostsState = {
    productpriceallname:[
        {
          _id: "",
          ProductPrice: "",
          SelectProductId: "",
          ProductName: "",
          selectcategoryID: "",
          categoryName: "",
          selectQtypeID: "",
          QtypeName: "",
          selectSubQuantityTypeID: "",
          SubQuantityTypeName: "",
          quntityvalue: 1,
          veg_nonveg: false
        }
      ]
  }

  
  
 