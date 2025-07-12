
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Tax } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class TaxService {

  private taxUrl: string = environment.api+"tax";

  constructor(private http: HttpClient) { }

 
  delete(_id: string) {
    return this.http.delete(`${this.taxUrl}/${_id}`);
  }




  add(Tax: Tax): Observable<Tax> {
    return this.http.post<Tax>(this.taxUrl, Tax);
  }
  update(Tax: Tax) {
    return this.http.put(this.taxUrl, { Tax });
  }
  get():Observable<Tax[]> {
    return this.http.get<Tax[]>(this.taxUrl);
  }


}
