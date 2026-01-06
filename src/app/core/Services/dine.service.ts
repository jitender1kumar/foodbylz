import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { IDine } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class DineService {

  private DineUrl: string = environment.api+"dine";
  public dinedataSubject$ = new BehaviorSubject<any[]>([]);
 

 
  constructor(private http: HttpClient) { }

  
  add(dine: IDine): Observable<IDine> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<IDine>(this.DineUrl, dine);

  }
  getbyid(_id: string) {
    return this.http.get(`${this.DineUrl}/${_id}`);
  }

  get(): Observable<IDine[]> {
    return this.http.get<IDine[]>(this.DineUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.DineUrl}/${_id}`);
  }
  update(dine: IDine) {
    return this.http.put(this.DineUrl, { dine });
  }
 
  loaddine() {
    //getting all tables data
    this.get().subscribe({
      next: (data: any) => {
        const dineData = Array.isArray(data?.data) ? data.data : [];
        this.dinedataSubject$.next(dineData);
      },
      error: error => {
        console.error('Failed to load dine data:', error);
        this.dinedataSubject$.next([]);
      }
    });
  }

  
}