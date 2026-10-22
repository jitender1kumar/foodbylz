import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { CustomerPaymentHistory } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerPaymentHistoryService {

  private customersUrl: string = environment.api + "CustomerPaymentHistory";
  private customerByMobileNumberUrl: string = environment.api + "customersByMobileNumber";
  constructor(private http: HttpClient) { }


  add(CustomerPaymentHistory_: CustomerPaymentHistory): Observable<CustomerPaymentHistory> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<CustomerPaymentHistory>(this.customersUrl, CustomerPaymentHistory_);
alert("service");
  }
  getbyid(CustomerId: string) {
    return this.http.get(`${this.customersUrl}/${CustomerId}`);
  }
  getbyMobileNumber(MobileNo: string) {
    return this.http.get(`${this.customerByMobileNumberUrl}/${MobileNo}`);
  }
//   get(): Observable<CustomerPaymentHistory[]> {
//     return this.http.get<CustomerPaymentHistory[]>(this.customersUrl);
//   }
  delete(_id: string) {
    return this.http.delete(`${this.customersUrl}/${_id}`);
  }
  update(CustomerPaymentHistory_: CustomerPaymentHistory) {
    return this.http.put(this.customersUrl, { CustomerPaymentHistory_ });
  }
}  