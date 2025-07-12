import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CategoryService } from '../core/Services/category.service';
import { ProductService } from '../core/Services/product.service';
import { ProductPriceService } from '../core/Services/productprice.service';
import { QuantitytypeService } from '../core/Services/quantitytype.service';
import { subQuantityTypeService } from '../core/Services/subQuantityType.service';
@Component({
  selector: 'app-popupmodel',
  standalone:true,
  //template:,
  templateUrl: './popupmodel.component.html',
  styleUrl: './popupmodel.component.css',
  imports: [],
 // imports: []
  
})
export class PopupmodelComponent implements OnInit{

  static delete:any=false;
id01: any;
args: any;
display:any;
  ngOnInit(): void {
  //  alert("working");
  // this.loadpopup();
  }
  id:any;
modals:any;

   @Input() modal: any;
   @Input() data: any;
   @Input() tabname: any;
   @Input() style: any;
    constructor(private subQuantityTypeService_: subQuantityTypeService,private CategoryService_: CategoryService
      ,private ProductService_: ProductService
      ,private ProductPriceService_: ProductPriceService
      ,private QuantitytypeService_: QuantitytypeService
    )
    {
       this.display="display:none;"
    //alert(this.tabname);
     
    }
   
   
    BaseTypeDelete2() {
    }
    BaseTypeDelete() {
}
onDeleteRecord() {
  }
  @Output() clicked = new EventEmitter<void>();

  notifyParent() {
    this.clicked.emit();
  }
  @Output() deletedconfirmedclicked = new EventEmitter<any>();
response:any;
  deletedConfirmed() {
   // this.style="display:none;";
    //    if(PopupmodelComponent.delete==true)
  //    {
  // switch(this.tabname)
  //     {
  // case 'base': {this.BaseTypeService_.delete(this.data).subscribe(res => {this.response=res; this.funalert("BaseType") }); break; }
  // case 'cate': {this.CategoryService_.delete(this.data).subscribe(res => {this.response=res;  this.funalert("CategoryType") }); break; }
  // case 'prod': {this.ProductService_.delete(this.data).subscribe(res => {this.response=res; this.funalert("Product") }); break; }
  // case 'prodpric': {this.ProductPriceService_.delete(this.data).subscribe(res => {this.response=res; this.funalert("Product Price");alert("switch : "+this.response);}); break; }
  // case 'qtyp': {this.QuantitytypeService_.delete(this.data).subscribe(res => {this.response=res; this.funalert("Quantity Type") }); break; }
  //  default:
  //        {
  //      break;
  //        }
  //     }
  //   alert("popup : "+this.response);
    this.deletedconfirmedclicked.emit(this.data);
  }
  
  close()
  {
    //alert(this.tabname);
    //this.tabname="";
  // this.style="display:none;";
  }
  Delete() {
 
   // alert("Delete button : ");
  //    }
    
    //PopupmodelComponent.delete=true;
    }
    funalert(data:any)
    {
this.args = data+"  Deleted Successfully";
    }
}