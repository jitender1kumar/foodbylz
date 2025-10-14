import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import {  AddOnProduct,AddOnProductEdit } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class addAddOnProductService {

  private addAddOnProductUrl: string = environment.api+"addAddOnProduct";

  constructor(private http: HttpClient) { }

 
  delete(_id: string) {
    return this.http.delete(`${this.addAddOnProductUrl}/${_id}`);
  }




  add(addOnProduct: AddOnProduct): Observable<AddOnProduct> {
    return this.http.post<AddOnProduct>(this.addAddOnProductUrl, addOnProduct);
  }
  update(addOnProduct: AddOnProductEdit) {
    return this.http.put(this.addAddOnProductUrl, { addOnProduct });
  }
  get() {
    return this.http.get(this.addAddOnProductUrl);
  }
  getBySubType_ProductId(SelectProductId:string,SubQuantityTypeID:string) {
    return this.http.get(`${this.addAddOnProductUrl}/${SelectProductId}/${SubQuantityTypeID}`);
  }
  getById(_id: string) {
    return this.http.get(`${this.addAddOnProductUrl}/${_id}`);
  }
}
