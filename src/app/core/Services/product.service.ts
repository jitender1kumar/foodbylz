import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Products } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = environment.api+"product";
  
  private productbynameUrl: string = environment.api+"productByName";
  private productByCategoryUrl: string = environment.api+"productByCategory";
 
  constructor(private http: HttpClient) { }

  getbycategoryid(selectcategoryID: string) {
    return this.http.get(`${this.productByCategoryUrl}/${selectcategoryID}`);
  }
  get():Observable<Products[]> {
    return this.http.get<Products[]>(this.productUrl);
  }
  getbyid(_id: string):Observable<Products>  {
    return this.http.get<Products>(`${this.productUrl}/${_id}`);
  }
  getbyname(Productname: string) {
    return this.http.get(`${this.productbynameUrl}/${Productname}`);
  }
  delete(_id: string) {
    return this.http.delete(`${this.productUrl}/${_id}`);
  }
  post(products: Products): Observable<Products> {
    
    return this.http.post<Products>(this.productUrl, products);
  }
  update(product: Products) {
    return this.http.put(this.productUrl, { product });
  }
}