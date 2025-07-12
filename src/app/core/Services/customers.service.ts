import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Customers } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class CustomresService {

  private customersUrl: string = environment.api+"customers";

  constructor(private http: HttpClient) { }

  
  add(customer: Customers): Observable<Customers> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Customers>(this.customersUrl, customer);

  }
  getbyid(_id: string) {
    return this.http.get(`${this.customersUrl}/${_id}`);
  }

  get(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.customersUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.customersUrl}/${_id}`);
  }
  update(cutomer: Customers) {
    return this.http.put(this.customersUrl, { cutomer });
  }
}                                                                                                                              