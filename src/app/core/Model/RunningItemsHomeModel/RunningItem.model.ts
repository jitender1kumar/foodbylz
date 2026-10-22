import {  IAddOnItems, Tax } from "../crud.model";

export interface RunningItems
{
    
    AddOnItems:IAddOnItems[];
    ProductPrice: string;
    SelectProductId:string;
    ProductName:string;
    selectcategoryID:string;
    categoryName:string;
      selectQtypeID:string;
      QtypeName:string;
      selectSubQuantityTypeID: string;
      SubQuantityTypeName:string;
      quntityvalue:number;
      KOT_Changed:boolean;
Taxes:any[];
totaltaxvalue:number;
paidStatus:boolean;
notes:string;
}
