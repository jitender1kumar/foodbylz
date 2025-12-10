import { RunningItems } from "../../model/category.model"

export interface ProductCategory {
    _id:string,
    name: string,
    categorydesc: string,
    createdAt:string,
  }

  export interface subQuantityType{
    _id:string,
    name:string,
    description:string,
    selectQtypeID:string,
    
  }

  export interface ProductPrice{
    _id:string,
    ProductPrice: number,
    SelectProductId:string,
    selectcategoryID:string,
      selectQtypeID:string,
      selectSubQuantityTypeID:string,
      ShortCodeNumber:number,
      ShortCodeString: string,
      mostSelling:boolean,
      employee_id:string

  }

    export interface  Products{
     
        _id:string,
        name: string,
        Productdesc:string,
        selectcategoryID: string,
          selectQtypeID: string,
          selectSubQuantityTypeID: string,
          availablity: boolean,
           veg_nonveg: boolean,
           Status: boolean,
           employee_id:string
      }
      
      export interface Quantitytype{
        _id:string,
        name: string,
        Desc: string,
       
      }
      export interface ProductPriceDetails{
        _id:string,
        veg_nonveg:boolean,
        ProductPrice: string,
        SelectProductId:string,
        ProductName:any,
        selectcategoryID:string,
        categoryName:any,
          selectQtypeID:string,
          QtypeName:any,
          ShortCodeNumber: number,
          ShortCodeString: string,
          mostSelling: boolean,
          selectSubQuantityTypeID: string,
          SubQuantityTypeName:any,
          quntityvalue:number,
      }
      export interface ProductPriceAllName{
        _id:string,
        ProductPrice: string,
        ProductName:string,
        categoryName:string,
          QtypeName:string,
          SubQuantityTypeName:string,
      }
      export interface Tax{
        _id:string,
        name:string,
Description:string,
perscentRate:number,
Status:boolean,
      }
      
      export interface Invoice
      {
      Chairs:IChair[],
          Taxes:  ITax[],
          AddOnItems:IAddOnItems[],
          taxpecentRate:number,
          taxpercentValue:  number, 
          DiscountId: string,
          Discountvalue: number, 
          Discountperstage: number,
          AdditionaldiscountAmount:number,
          Totalvaue: number,
          grandtotal: number,
          RecieptNumber: number,
          OrderType:string,
          PendingAmount:number,
          PaidAmount:number,
          AmountPaidstatus:boolean,
          Orderstatus:string,
          TotalTaxAmount:number,
          TotalItemsAmount:number,
          OrderTypeName:string,
          paybyId:string,
          table_id:string,
          customer_id:string,
          employee_id:string,
          AssistToId:string,  
          CommentId:string,
          returnAmount:string,
          tablename:string,
          tokennumber:number,
          createdAt:Date                          
      } 
      export interface IAddOnItems
      {
       _id:string,
       numberofQuantity:number
      }
      export interface GenratedItems
      {
        RecieptNumber:string,
       Items:IItems[]
      }
      export interface GenratedItemKOT
      {
        RecieptNumber:string,
        KOTrunningorders:RunningItems[]
      }
      export interface IItems
      {
        Productid:  string,
        Productname: string,
        SubQuantityTypeID:string,
        SubQuantityTypeName: string,
        Qauntityid:string,
        Qauntityname:  string,
        Quantity:number,
        itemamount:number,
        totalquantityamount:number,
        employee_id:string
      }
      export interface ITax{
        id:string,
        name:string,
        percentt:number,
        amount:number,
        productid:string,
        productname:string
      }
      export interface IDine{
        _id:string,
        name:string,
        description:string,
        status:boolean,
        floor_id:string,
        employee_id:string
      } 
      export interface Floor{
        _id:string,
        name:string,
        description:string,
        status:boolean,
        
      }
      export interface IChair{
        _id:string,
        name:string,
        description:string,
        status:boolean,
        table_id:string,
      
        chairorderstatus:string
      }
      export interface IChairDefault{
        name:string,
        description:string,
        status:boolean,
        table_id:string,
        chairorderstatus:string
      }
       export interface IFloorMergeWithDine{
        _id:string,
       floor_id:string,
        name:string,
        FloorName:string,
        description:string,
        status:boolean
      }
      export interface IChairMergeDineName{
        _id:string,
        DineTable:string,
        table_id:string,
        name:string,
        FloorName:string,
        
        description:string,
        status:boolean
      }
      export interface Customers
      {
         
      name:string,
      MobileNo: string,
      DOB: string,
      type: string,
      tag:  string,
      DueAmount: number,
      Anniversary: string,
      Paymentstatus:number,
      RecieptNumber: number,
      employee_id:string
      }
      export interface CustomersEdit
      {
      _id:string,   
      name:string,
      MobileNo: string,
      DOB: string,
      type: string,
      tag:  string,
      DueAmount: number,
      Anniversary: string,
      Paymentstatus:number,
      RecieptNumber: number,
      employee_id:string
      }
      export interface IChairsrunningorder
      {
        Chairsrunningorder:IChair[],
        tablename:string,
        receiptnumber:string,
        tokennumber:number
      }

      export interface Goodscollection
      {
      IventoryFoodMainId:string,
      quantiyval: number
      }
      export interface GoodscollectionMergename
      {
      IventoryFoodMainId:string,
      Name:string,
      quantiyval: number
      }
      export interface InventoryFoodwithProduct2
      {
        ProductId:string,
        ProductPrcieId: string,
        ProductName: string,
        SubQuantityTypeID: string,
        SubQuantityTypeName:string,
      }
      export interface  InventoryFoodwithProductforEdit
  {
    _id:string,
    ProductId:string,
    ProductPrcieId: string,
    ProductName: string,
    SubQuantityTypeID: string,
    SubQuantityTypeName:string,
  goodscollections:GoodscollectionMergename[],
  employee_id:string
  }
      export interface InventoryFoodwithProduct
      {
        ProductId:string,
        ProductPrcieId: string,
        ProductName: string,
        SubQuantityTypeID: string,
        SubQuantityTypeName:string,
      goodscollections:GoodscollectionMergename[]
      }

    
     export interface InventoryMainFood{
        _id: any
        name:             string,
        description:      string,
        quantitytypeID:   string,
        quantitytypename: string,
        quantitytypevalue: number,
        employee_id:string
       
     }
     export interface InventoryFoodMain2{
      _id:string,
      name:             string,
      description:      string,
      quantitytypeID:   string,
      quantitytypename: string,
      quantitytypevalue: number,
      employee_id:string,
      createdAt:string
   }
     export interface InventoryFoodQuantityType{
      _id: any
      name: string,
      description:string
    }
    
    export interface ReserveDine {

      TableId:  string,
      ReservedDate:  string,
      ReservedTimeSlot:  string,
        CustomerId: string,
        Name: string,
        TableName:string,
         MobileNo: string,
        BookingAmount: number,
        Bookingstatus:boolean,
        ConfirmStatus:boolean,
        Paymentstatus: boolean,
          RecieptNumber:string,
          employee_id:string
    }
    export interface KOTrunning{
      KOTsRunning:IKOTsRunning[]
      RecieptNumber:string,
      DateTime:string,
    }
    export interface IKOTsRunning
    {
itemsId:string,
ifCancelledId:string,
isKotPrinted:boolean,
KOTPrintedAt:Date,
    }
    export interface ReserveDineEdit {
         _id:string,
      TableId:  string,
      ReservedDate:  string,
      ReservedTimeSlot:  string,
        CustomerId: string,
        Name: string,
        TableName:string,
         MobileNo: string,
        BookingAmount: number,
        Bookingstatus:boolean,
        ConfirmStatus:boolean,
        Paymentstatus: boolean,
          RecieptNumber:string,
          employee_id:string
    }
export interface Paybymanage{
      name:string,
      desc: string
      }
    
    export interface Employee {
        name: string,
        role: string,
          type: string,
          status:  boolean,
          managepermission: boolean,
          title: string,
        desc:string,
        userId: string,
        password:string,
        employee_id:string
        }
      export interface CompanyProfile{
          name: string,
          tilte: string,
           desc:  string,
           GSTNumber:string,
            turnover: string,
            address:  string,
            mobilenumber:  string,
            mobilenumber2: string,
            customercarenumber: string,
            maplocation1: string,
            maplocation2:  string,
            telephonenumber:  string,
            companyId:  string,
            companyphoto: string,
            websitelink:  string,
            logo: string,
            employee_id:string
        }
        export interface permission
        {
          employee_id:string,
          read:boolean,
          write:boolean,
          create:boolean,
          update:boolean,
        }
        export interface permissionGrant
        {
          employee_id:string,
          permissionGrant:boolean
        }

        export interface AddOnProduct
        {
          name:string,
          description: string,
        Price: number,
        SelectProductId: string,
        SubQuantityTypeID: string,
        employee_id: string
        }
        export interface AddOnProductMerge
        {
          _id:string,
          name:string,
          description: string,
        Price: number,
        SelectProductId: string,
        ProductName:string,
        SubQuantityTypeID: string,
        SubQuantityTypeName:string,
        employee_id: string,
        createdAt:Date,
        updatedAt:Date,
        __v:any
        }
        export interface AddOnProductEdit
        {
          _id:string,
          name:string,
          description: string,
        Price: number,
        SelectProductId: string,
        SubQuantityTypeID: string,
        employee_id: string,
        createdAt:Date,
        updatedAt:Date,
        __v:any
        }
       
