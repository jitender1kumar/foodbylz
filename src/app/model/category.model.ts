import { AddOnProductEdit, IAddOnItems } from "../core/Model/crud.model";

export interface RunningItems
{
    _idPP:string;
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
qvalue:number
taxnames:string;
taxvalues:string;
totaltaxvalue:number;

}
