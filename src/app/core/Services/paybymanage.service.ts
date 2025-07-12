import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Paybymanage } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class PaybyService {

  private payByManageUrl: string = environment.api+"payByManage";

  constructor(private http: HttpClient) { }

 
  delete(_id: string) {
    return this.http.delete(`${this.payByManageUrl}/${_id}`);
  }




  add(paybymanage: Paybymanage): Observable<Paybymanage> {
    return this.http.post<Paybymanage>(this.payByManageUrl, paybymanage);
  }
  update(paybymanage: Paybymanage) {
    return this.http.put(this.payByManageUrl, { paybymanage });
  }
  get() {
    return this.http.get(this.payByManageUrl);
  }


}
