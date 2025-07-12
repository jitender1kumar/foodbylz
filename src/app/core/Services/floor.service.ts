import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Floor } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floorUrl: string ;
  constructor(private http: HttpClient) { 
    this.floorUrl = environment.api+"floor";
  }

  add(floor: Floor): Observable<Floor> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Floor>(this.floorUrl, floor);

  }
  getbyid(_id: string) {
    return this.http.get(`${this.floorUrl}/${_id}`);
  }

  get(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.floorUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.floorUrl}/${_id}`);
  }
  update(floor: Floor) {
    return this.http.put(this.floorUrl, { floor });
  }
}                                                                         