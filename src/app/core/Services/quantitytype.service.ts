

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Quantitytype } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class QuantitytypeService {

  private quantityTypeUrl: string = environment.api+'quantityType'; //"quntitytype";


  constructor(private http: HttpClient) { }

 
  delete(_id: string) {
    return this.http.delete(`${this.quantityTypeUrl}/${_id}`);

  }
  update(quantitytype: Quantitytype) {
    return this.http.put(this.quantityTypeUrl, { quantitytype });
  }
  getQuantityTypeNameByName(name:string)
  {
    return this.http.get(`${this.quantityTypeUrl}/${name}`);
  }
  add(quantitytypes: Quantitytype): Observable<Quantitytype> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Quantitytype>(this.quantityTypeUrl, quantitytypes);

  }
  get():Observable<Quantitytype[]> {
    return this.http.get<Quantitytype[]>(this.quantityTypeUrl);
  }
  getbyid(_id: string) {
    return this.http.get(`${this.quantityTypeUrl}/${_id}`);
  }
}