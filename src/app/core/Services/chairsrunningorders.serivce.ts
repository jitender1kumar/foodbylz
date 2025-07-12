import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { IChair } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ChairServiceService {

  private chairsRunningOrderUrl: string = environment.api+"chairsRunningOrder";

  constructor(private http: HttpClient) { }

 
  add(chairsrunningorder: any): Observable<any> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<any>(this.chairsRunningOrderUrl, chairsrunningorder);

  }
  getbyid(createdAt: string) {
    return this.http.get(`${this.chairsRunningOrderUrl}/${createdAt}`);
  }
  getbycreateAt2(startDate: string, createdAt: string) {
    return this.http.get(`${this.chairsRunningOrderUrl}/${createdAt}`);
  }
  getbycreateAt(endDateTime: string): Observable<string> {
    return this.http.get<string>(`${this.chairsRunningOrderUrl}/${endDateTime}`);
  }
  get(): Observable<IChair[]> {
    return this.http.get<IChair[]>(this.chairsRunningOrderUrl);
  }
  delete(createdAt: string) {
    return this.http.delete(`${this.chairsRunningOrderUrl}/${createdAt}`);
  }
  //   update(basetype:Basetype)
  //   {
  //     return this.http.put(this.url2 ,{basetype});
  //   }
}