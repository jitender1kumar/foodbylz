import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SplitBillService {

    private apiUrl: string = environment.api+"splitbill";
  

  constructor(private http: HttpClient) { }

  /**
   * Split the bill according to the selected method and data.
   * @param method 'portion' | 'percent' | 'items'
   * @param data Payload relevant to method
   */
  splitBill(method: 'portion' | 'percent' | 'items', data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/split`, { method, data });
  }

  /**
   * Get a split bill by its ID
   * @param id The ID of the split bill
   */
  getSplitBillById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * List all split bills with optional query parameters
   * @param params Query params as an object (optional)
   */
  getAllSplitBills(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<any>(`${this.apiUrl}/list`, { params: httpParams });
  }

  /**
   * Update a split bill by ID
   * @param id The ID of the split bill
   * @param data The updated split bill data
   */
  updateSplitBill(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a split bill by its ID
   * @param id The ID of the split bill
   */
  deleteSplitBill(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Add a new split bill (raw add, not split operation)
   * @param data The split bill data to add
   */
  addSplitBill(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data);
  }
}
