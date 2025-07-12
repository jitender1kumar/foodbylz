import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { subQuantityType } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class subQuantityTypeService {

  private subQuanityTypeUrl: string = environment.api+"subQuantityType";
private subQuantityTypeGetByNameUrl:string=environment.api+"subQuantityTypeName";

  constructor(private http: HttpClient) { }

  
//basetypt == subQuantityType
  add(basetype: subQuantityType): Observable<subQuantityType> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<subQuantityType>(this.subQuanityTypeUrl, basetype);

  }
  getbyid(selectQtypeID: string): Observable<subQuantityType> {
    return this.http.get<subQuantityType>(`${this.subQuanityTypeUrl}/${selectQtypeID}`);
  }
  getbyname(name: string) {
    return this.http.get(`${this.subQuantityTypeGetByNameUrl}/${name}`);
  }
getBySubQuantityType(name: string)
{
  return this.http.get(`${this.subQuanityTypeUrl}/${name}`);
}
  get(): Observable<subQuantityType[]> {
    return this.http.get<subQuantityType[]>(this.subQuanityTypeUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.subQuanityTypeUrl}/${_id}`);
  }
  update(basetype: subQuantityType) {
    return this.http.put(this.subQuanityTypeUrl, { basetype });
  }
}