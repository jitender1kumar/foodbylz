import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountUrl: string = environment.api + 'discount';

  constructor(private http: HttpClient) {}

  // Get all discounts
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.discountUrl);
  }

  // Get a discount by its id
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.discountUrl}/${id}`);
  }

  // Create a new discount
  post(discount: any): Observable<any> {
    return this.http.post<any>(this.discountUrl, discount);
  }

  // Update an existing discount, assumes discount contains an _id property
  update(discount: any): Observable<any> {
    return this.http.put<any>(`${this.discountUrl}/${discount._id}`, discount);
  }

  // Delete a discount by its id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.discountUrl}/${id}`);
  }
}
