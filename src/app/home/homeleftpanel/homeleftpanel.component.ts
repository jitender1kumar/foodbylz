import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {  map } from 'rxjs';
import { loadCategories } from '../../manage/ManageStore/categoryStore/category.actions';
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
    this.initObservables();
    this.getproductbycategory("999");
  }
  ngOnInit(): void {
    this.initObservables();
    this.getproductbycategory("999");
   }
  initObservables()
  {
    // this.categorynamedata$ = this.store.select(state => state.categoryLoad.ProductCategory_.data);
    this.store.dispatch(loadCategories());
    this.categorynamedata$ = this.store
      .select(state => state.categoryLoad.ProductCategory_.data)
      .pipe(
        map(categories => {
          // Ensure categories is always an array
          const arr = Array.isArray(categories) ? categories : [];
          return [
            { name: 'TopsellingItem', _id: "999" },
            ...arr
          ];
        })
      );
    
    //this.topselling.emit();
  }
  getproductbycategory(_id:string) {
    
  
      this.getproductbycategoryclicked.emit(_id);
    }
}
