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
      employee_id:string
  }

    export interface  Products{
        _id:string,
        Productname: string,
        Productdesc:string,
        selectcategoryID: string,
          selectQtypeID: string,
          selectSubQuantityTypeID: string,
          availablity: Boolean,
           veg_nonveg: Boolean,
           Status: Boolean,
           employee_id:String
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
perscentRate:Number,
Status:Boolean,
      }
      
      export interface Invoice
      {
      Chairs:IChair[],
          Taxes:  ITax[],
          taxpecentRate:Number,
          taxpercentValue:  Number, 
          DiscountId: String,
          Discountvalue: Number, 
          Discountperstage: Number,
          AdditionaldiscountAmount:Number,
          Totalvaue: Number,
          grandtotal: Number,
          RecieptNumber: Number,
          OrderType:string,
          PendingAmount:Number,
          PaidAmount:Number,
          AmountPaidstatus:Boolean,
          Orderstatus:String,
          TotalTaxAmount:Number,
          TotalItemsAmount:Number,
          OrderTypeName:String,
          paybyId:String,
          table_id:String,
          customer_id:String,
          employee_id:String,
          AssistToId:String,  
          CommentId:String,
          returnAmount:String,
          tablename:String,
          tokennumber:number,
          createdAt:Date                          
      } 
      export interface GenratedItems
      {
        Invoiceid:String,
        Productid:  String,
        Productname: String,
        SubQuantityTypeID:String,
        SubQuantityTypeName: String,
        Qauntityid:String,
        Qauntityname:  String,
        Quantity:number,
        itemamount:number,
        totalquantityamount:number,
        employee_id:String
      }
      export interface ITax{
        id:String,
        name:String,
        percentt:Number,
        amount:Number,
        productid:String,
        productname:String
      }
      export interface IDine{
        _id:String,
        name:String,
        description:string,
        status:Boolean,
        floor_id:String,
        employee_id:String
      } 
      export interface Floor{
        id:String,
        name:String,
        description:string,
        status:Boolean,
        
      }
      export interface IChair{
        _id:String,
        name:String,
        description:string,
        status:Boolean,
        table_id:string,
      
        chairorderstatus:string
      }
      export interface IChairDefault{
        name:String,
        description:string,
        status:Boolean,
        table_id:string,
        chairorderstatus:string
      }
      export interface IChairMergeDineName{
        _id:string,
        DineTable:String,
        table_id:String,
        name:String,
        description:string,
        status:boolean
      }
      export interface Customers
      {
         
      Name:String,
      MobileNo: String,
      DOB: String,
      type: String,
      tag:  String,
      DueAmount: Number,
      Anniversary: String,
      Paymentstatus:Number,
      RecieptNumber: Number,
      employee_id:String
      }
      export interface IChairsrunningorder
      {
        Chairsrunningorder:IChair[],
        tablename:string,
        tokennumber:number
      }

      export interface Goodscollection
      {
      IventoryFoodMainId:String,
      quantiyval: Number
      }
      export interface GoodscollectionMergename
      {
      IventoryFoodMainId:String,
      Name:string,
      quantiyval: Number
      }
      export interface InventoryFoodwithProduct2
      {
        ProductId:String,
        ProductPrcieId: String,
        ProductName: String,
        SubQuantityTypeID: String,
        SubQuantityTypeName:String,
      }
      export interface  InventoryFoodwithProductforEdit
  {
    _id:String,
    ProductId:String,
    ProductPrcieId: String,
    ProductName: String,
    SubQuantityTypeID: String,
    SubQuantityTypeName:String,
  goodscollections:GoodscollectionMergename[],
  employee_id:String
  }
      export interface InventoryFoodwithProduct
      {
        
        ProductId:String,
        ProductPrcieId: String,
        ProductName: String,
        SubQuantityTypeID: String,
        SubQuantityTypeName:String,
      goodscollections:GoodscollectionMergename[]
      }

    
     export interface InventoryMainFood{
        _id: any
        name:             String,
        description:      String,
        quantitytypeID:   String,
        quantitytypename: String,
        quantitytypevalue: Number,
        employee_id:String
       
     }
     export interface InventoryFoodMain2{
      _id:String,
      name:             String,
      description:      String,
      quantitytypeID:   String,
      quantitytypename: String,
      quantitytypevalue: Number,
      employee_id:String,
      createdAt:String
   }
     export interface InventoryFoodQuantityType{
      _id: any
      name: String,
      discription:String
    }
    
    export interface ReserveDine {

      TableId:  String,
        DateTimeStart:  String,
        DateTimeEnd:  String,
        CustomerId: String,
        Name: String,
        TableName:String,
         MobileNo: String,
        BookingAmount: Number,
        Bookingstatus:boolean,
        Paymentstatus: boolean,
          RecieptNumber:String,
          employee_id:String
    }

export interface Paybymanage{
      Paybyname:String,
      desc: String
      }
    
    export interface Employee {
        name: String,
        role: String,
          type: String,
          status:  Boolean,
          managepermission: Boolean,
          title: String,
        desc:String,
        userId: String,
        password:String,
        employee_id:String
        }
      export interface CompanyProfile{
          name: String,
          tilte: String,
           desc:  String,
           GSTNumber:String,
            turnover: String,
            address:  String,
            mobilenumber:  String,
            mobilenumber2: String,
            customercarenumber: String,
            maplocation1: String,
            maplocation2:  String,
            telephonenumber:  String,
            companyId:  String,
            companyphoto: String,
            websitelink:  String,
            logo: String,
            employee_id:String
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
