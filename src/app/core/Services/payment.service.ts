import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl: string = environment.api + 'payment';

  constructor(private http: HttpClient) {}

  // Get all payments
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.paymentUrl);
  }

  // Get a payment by its id
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.paymentUrl}/${id}`);
  }

  // Create a new payment
  post(payment: any): Observable<any> {
    return this.http.post<any>(this.paymentUrl, payment);
  }

  // Update an existing payment, assumes payment contains an _id property
  update(payment: any): Observable<any> {
    return this.http.put<any>(`${this.paymentUrl}/${payment._id}`, payment);
  }

  // Delete a payment by its id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.paymentUrl}/${id}`);
  }
}
