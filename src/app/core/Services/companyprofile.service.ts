import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { CompanyProfile } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  private companyProfileUrl: string = environment.api+"companyProfile";

  constructor(private http: HttpClient) { }

  
  add(companyprofile: CompanyProfile): Observable<CompanyProfile> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<CompanyProfile>(this.companyProfileUrl, companyprofile);

  }
  getbyid(_id: string) {
    return this.http.get(`${this.companyProfileUrl}/${_id}`);
  }

  get(): Observable<CompanyProfile[]> {
    return this.http.get<CompanyProfile[]>(this.companyProfileUrl);
  }
  delete(_id: string) {
    return this.http.delete(`${this.companyProfileUrl}/${_id}`);
  }
  update(companyprofile: CompanyProfile) {
    return this.http.put(this.companyProfileUrl, { companyprofile });
  }
}