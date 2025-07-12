
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { ProductPrice } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  private productPriceUrl: string = environment.api + "productPrice";
  private productPriceByBaseTypeUrl: string = environment.api + "productPriceByBaseType";
  private productPriceByQuantityTypeUrl: string = environment.api + "productPriceByQuantityType";
  private productPriceByProductIdUrl: string = environment.api + "productPriceByProductId";

  constructor(private http: HttpClient) { }

  delete(_id: string) {
    return this.http.delete(`${this.productPriceUrl}/${_id}`);

  }

  update(productprice: ProductPrice) {
    return this.http.put(this.productPriceUrl, { productprice });
  }
  //,selectcategoryID:string,selectQtypeID:string
  getbyid(SelectProductId: string, selectSubQuantityTypeID: string, selectQtypeID: string, selectcategoryID: string) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.productPriceUrl}/${SelectProductId}/${selectSubQuantityTypeID}/${selectQtypeID}/${selectcategoryID}`);
  }
  getbybasetypeid(selectSubQuantityTypeID: string) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.productPriceByBaseTypeUrl}/${selectSubQuantityTypeID}`);
  }
  getbyidQtypid(selectQtypeID: string) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.productPriceByQuantityTypeUrl}/${selectQtypeID}`);
  }
  getbyproductid(SelectProductId: string) {
    //${selectQtypeID}/${selectcategoryID}
    return this.http.get(`${this.productPriceByProductIdUrl}/${SelectProductId}`);
  }
  get(): Observable<ProductPrice[]> {
    return this.http.get<ProductPrice[]>(this.productPriceUrl);
  }
  post(productprices: ProductPrice): Observable<ProductPrice> {
    return this.http.post<ProductPrice>(this.productPriceUrl, productprices);
  }
}