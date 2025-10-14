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

  private employee: string = environment.api+"employee";
  private url3: string = environment.api;
  
add(employee: Employee): Observable<Employee> {
    
    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<Employee>(this.employee, employee);

  }
  getbyid(_id:any)
  {
    return this.http.get(`${this.employee}/${_id}`);
  }
  
  getfromcore(): Observable<any[]> {
    return this.http.get<any[]>(this.url3);
  }
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.employee);
  }
  delete(_id:any){
    return this.http.delete(`${this.employee}/${_id}`);
  }                                
  update(employee:Employee)
  {
    return this.http.put(this.employee ,{employee});
  }
}