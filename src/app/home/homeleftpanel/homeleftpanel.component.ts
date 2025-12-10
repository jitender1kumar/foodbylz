import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {  map } from 'rxjs';
@Component({
  selector: 'app-homeleftpanel',
  standalone: false,
  templateUrl: './homeleftpanel.component.html',
  styleUrl: './homeleftpanel.component.css'
})
export class HomeleftpanelComponent implements OnInit {
  @Output() getproductbycategoryclicked = new EventEmitter<any>();
  @Output() topselling = new EventEmitter<any>();
  
  response:any;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  categorynamedata$?: Observable<any[]>;
  //@Input() _id: any;
  constructor( private store: Store<{
    categoryLoad: any
  }>)
  {
    
  }
  ngOnInit(): void {
    this.initObservables();
    this.getproductbycategory("999");
   }
  initObservables()
  {
    // this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.categorynamedata$ = this.store
  .select(state => state.categoryLoad.ProductCategory_.data)
  .pipe(
    map(categories => [
      { name: 'TopsellingItem', _id: "999" },
      ...categories
    ])
    );
    
    //this.topselling.emit();
  }
  getproductbycategory(_id:string) {
    
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
      this.getproductbycategoryclicked.emit(_id);
    }
}
