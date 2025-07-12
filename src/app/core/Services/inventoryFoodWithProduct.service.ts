import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { InventoryFoodwithProduct, InventoryFoodwithProductforEdit } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryMainFoodwithProductService {

  private invetoryFoodMainProductUrl: string = environment.api+"invetoryFoodMainProduct";

  constructor(private http: HttpClient) { }

  
  delete(_id: string) {
    return this.http.delete(`${this.invetoryFoodMainProductUrl}/${_id}`);
  }




  add(_InventoryFoodwithProduct: InventoryFoodwithProduct): Observable<InventoryFoodwithProduct> {
    return this.http.post<InventoryFoodwithProduct>(this.invetoryFoodMainProductUrl, _InventoryFoodwithProduct);
  }
  update(_InventoryFoodwithProduct: InventoryFoodwithProductforEdit):Observable<InventoryFoodwithProductforEdit> {
    return this.http.put<InventoryFoodwithProductforEdit>(this.invetoryFoodMainProductUrl, { _InventoryFoodwithProduct });
  }
  get():Observable<InventoryFoodwithProduct[]> {
    return this.http.get<InventoryFoodwithProduct[]>(this.invetoryFoodMainProductUrl);
  }
  getbyid(ProductId: string, SubQuantityTypeID: string) {
    return this.http.get(`${this.invetoryFoodMainProductUrl}/${ProductId}/${SubQuantityTypeID}`);
  }

}
