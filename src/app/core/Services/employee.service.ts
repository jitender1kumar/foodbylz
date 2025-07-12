import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Employee} from '../Model/crud.model';
import { environment } from './../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 

  constructor(private http: HttpClient) { }

  private url2: string = environment.api;
  private url3: string = environment.api;
  
add(employee: Employee): Observable<Employee> {
    
    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Employee>(this.url2, employee);

  }
  getbyid(_id:any)
  {
    return this.http.get(`${this.url2}/${_id}`);
  }
  
  getfromcore(): Observable<any[]> {
    return this.http.get<any[]>(this.url3);
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url2);
  }
  delete(_id:any){
    return this.http.delete(`${this.url2}/${_id}`);
  }                                
  update(employee:Employee)
  {
    return this.http.put(this.url2 ,{employee});
  }
}