import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { GenratedItems } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private itemUrl: string = environment.api+"item";

  constructor(private http: HttpClient) { }

  
  add(Items: GenratedItems[]): Observable<GenratedItems> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<GenratedItems>(this.itemUrl, Items);

  }
  getbyid(RecieptNumber: string) {
    return this.http.get(`${this.itemUrl}/${RecieptNumber}`);
  }
  get(): Observable<GenratedItems[]> {
    return this.http.get<GenratedItems[]>(this.itemUrl);
  }
  //   delete(_id:any){
  //     return this.http.delete(`${this.url2}/${_id}`);
  //   }                                
    update(RecieptNumber: string, Productid: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any) => unknown, SubQuantityTypeID: (RecieptNumber: string, Productid: any, SubQuantityTypeID: any) => unknown, items: GenratedItems[]) {
    return this.http.put(this.itemUrl, { items });
  }
  delete(Invoiceid: string, Productid: string,SubQuantityTypeID:string) {
    return this.http.delete(`${this.itemUrl}/${Invoiceid}/${Productid}/${SubQuantityTypeID}`);
  }
}