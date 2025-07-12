



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { ReserveDine } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ReserveDineService {

  private reserveDineUrl: string = environment.api+"reserveDine";
private getReserveDineByDateTimeUrl:string = environment.api+"getReserveDineByDateTime";
  constructor(private http: HttpClient) { }

 
  add(ReserveDine_: ReserveDine): Observable<ReserveDine> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<ReserveDine>(this.reserveDineUrl, ReserveDine_);

  }
  getbyid(_id: string) {
    return this.http.get(`${this.reserveDineUrl}/${_id}`);
  }
getReservedEndTime(DateTimeStart:string,DateTimeEnd:string)
{
  return this.http.get(`${this.getReserveDineByDateTimeUrl}/${DateTimeStart}/${DateTimeEnd}`);
}
  get(): Observable<ReserveDine[]> {
    return this.http.get<ReserveDine[]>(this.reserveDineUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.reserveDineUrl}/${_id}`);
  }
  update(ReserveDine_: ReserveDine) {
    return this.http.put(this.reserveDineUrl, { ReserveDine_ });
  }
}                                                                                                                              