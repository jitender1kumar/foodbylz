import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { IChair, IChairDefault } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class ChairService {


  private chairurl: string = environment.api+"chair";
  private chairsGetByTableByIdUrl: string = environment.api+"chairsGetByTableId";
  constructor(private http: HttpClient) { }

  add(chair: IChair): Observable<IChair> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<IChair>(this.chairurl, chair);

  }
  addDefaultChair(chair:IChairDefault):Observable<IChairDefault>
  {
 return this.http.post<IChairDefault>(this.chairurl, chair);
  }
  getbyid(_id: string) {
    return this.http.get(`${this.chairurl}/${_id}`);
  }
  getbytable_id(table_id: string) {
    return this.http.get(`${this.chairsGetByTableByIdUrl}/${table_id}`);
  }
  updatechairstatus(_id: string, chairorderstatus: string) {
    return this.http.put(this.chairsGetByTableByIdUrl, { _id, chairorderstatus });
  }
  get(): Observable<IChair[]> {
    return this.http.get<IChair[]>(this.chairurl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.chairurl}/${_id}`);
  }
  update(chair: IChair) {
    return this.http.put(this.chairurl, { chair });
  }
  update2(chair: IChair): Observable<IChair> {
    return this.http.put<IChair>(this.chairurl, { chair });
  }
}