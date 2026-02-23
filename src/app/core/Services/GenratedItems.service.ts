import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { GenratedItems} from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class GenratedItemsService {

  private itemUrl: string = environment.api+"item";

  constructor(private http: HttpClient) { }

  
  add(Items: GenratedItems[]): Observable<GenratedItems> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<GenratedItems>(this.itemUrl, Items);

  }
  getbyid(Invoiceid: string) {
    return this.http.get(`${this.itemUrl}/${Invoiceid}`);
  }
  get(): Observable<GenratedItems[]> {
    return this.http.get<GenratedItems[]>(this.itemUrl);
  }
  //   delete(_id:any){
  //     return this.http.delete(`${this.url2}/${_id}`);
  //   }                                
  //   update(RecieptNumber: string, Productid: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any, _id:string) => unknown, SubQuantityTypeID: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any) => unknown, items: GenratedItems[]) {
  //   return this.http.put(this.itemUrl, { items });
  // }
  update( items: GenratedItems[]) {
    return this.http.put(this.itemUrl, { items });
  }
  /**
   * Delete a generated item given invoice ID, product ID, sub quantity type ID, and item _id.
   * Returns an Observable of the API response.
   */
  delete(invoiceId: string, productId: string, subQuantityTypeId: string, itemId: string): Observable<any> {
    const url = `${this.itemUrl}/${invoiceId}/${productId}/${subQuantityTypeId}/${itemId}`;
    return this.http.delete<any>(url);
  }
}