import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { Floor } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class FloorService {
  public FloordataSubject$ = new BehaviorSubject<any[]>([]);
  //Floordata$ = this.FloordataSubject.asObservable();


  

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
  loadfloor() {
    // loading floors
    this.get().subscribe({
      next: data => {
        if (Array.isArray((data as any)?.data)) {
          this.FloordataSubject$.next((data as any).data);
        } else if (Array.isArray(data)) {
          this.FloordataSubject$.next(data);
        } else {
          this.FloordataSubject$.next([]);
        }
      },
      error: err => {
        console.error('Error loading floors:', err);
        this.FloordataSubject$.next([]);
      }
    });
  }
}                                                                         