import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Invoice } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceUrl: string = environment.api+"invoice";
  private OrderRecordurl: string = environment.api+"getOrderRecordByDate";

  constructor(private http: HttpClient) { }

  add(Invoice_: Invoice): Observable<Invoice> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Invoice>(this.invoiceUrl, Invoice_);

  }
  getbyid(RecieptNumber: string) {
    return this.http.get(`${this.invoiceUrl}/${RecieptNumber}`);
  }
  getbycreateAt2(startDate: string, createdAt: string) {
    return this.http.get(`${this.invoiceUrl}/${createdAt}`);
  }
  getbycreateAt(createdAt: string): Observable<Invoice> {
    // const params = new HttpParams().set('createdAt', createdAt);
    // return this.http.get<any>(`${this.url3}/${params}`);
    return this.http.get<Invoice>(`${this.OrderRecordurl}/${createdAt}`);
  }
  getbystartenddate(startdate: string, enddate: string): Observable<Invoice> {
    // const params = new HttpParams().set('createdAt', createdAt);
    // return this.http.get<any>(`${this.url3}/${params}`);
    return this.http.get<Invoice>(`${this.OrderRecordurl}/${startdate}/${enddate}`);
  }
  getDataByDate(createdAt: string): Observable<Invoice> {
    const params = new HttpParams().set('createdAt', createdAt);
    return this.http.get<Invoice>(`${this.OrderRecordurl}/${params}`);
    // return this.http.get<any>(this.apiUrl, { params });
  }
  get(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoiceUrl);
  }
  //   delete(_id:any){
  //     return this.http.delete(`${this.url2}/${_id}`);
  //   }                                
  update(invoice: Invoice) {
    return this.http.put(this.invoiceUrl, { invoice });
  }
}