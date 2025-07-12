import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import {  ProductCategory } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryTypeurl: string = environment.api+'categoryType';//"category";

  constructor(private http: HttpClient) { }

 
  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoryTypeurl}/${_id}`);
  }


getCategoryByName(name:string)
{
  return this.http.get(`${this.categoryTypeurl}/${name}`);
}

  add(category: ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.categoryTypeurl, category);
  }
  

  update(productcategory: ProductCategory): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(this.categoryTypeurl, { productcategory });
  }
  get(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.categoryTypeurl); // Replace with your API
  }
  // get() {
  //   return this.http.get(this.categoryTypeurl);
  // }


}
