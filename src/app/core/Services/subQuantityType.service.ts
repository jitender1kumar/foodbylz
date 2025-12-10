import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { environment } from '../../environment/environment';
import { subQuantityType } from '../Model/crud.model';
import { Store } from '@ngrx/store';
import { loadSubQuantityType } from '../../manage/ManageStore/subQuantityTypeStore/subQuantityType.actions';
@Injectable({
  providedIn: 'root'
})
export class subQuantityTypeService {
  subQuantityTypeData$?: Observable<any[]>;
  private subQuanityTypeUrl: string = environment.api+"subQuantityType";
private subQuantityTypeGetByNameUrl:string=environment.api+"subQuantityTypeName";
private subscriptions: Subscription[] = [];
  constructor(private http: HttpClient, private store: Store<{
    
    subQuantityTypeLoad: any;
    subQuantityTypeByIdLoad: any;
   
  }>,) { 
    this.subQuantityTypeData$ = this.store.select(state => state.subQuantityTypeLoad.SubQuantityType_.data);
   
  }

  getSubQuantityTypeName(id: string): string {
    let SubQuantityTypeName = '';
    if (this.subQuantityTypeData$) {
      const sub = this.subQuantityTypeData$.subscribe(SubQuantityTypeData => {
      //  console.log(SubQuantityTypeData);
        if (!SubQuantityTypeData) return;
        const idx = SubQuantityTypeData.findIndex((item: any) => item._id === id);
        if (idx !== -1) {
          SubQuantityTypeName = SubQuantityTypeData[idx].name;
        }
      });
      this.subscriptions.push(sub);
    }
    return SubQuantityTypeName;
  }
  
//basetypt == subQuantityType
  add(subQuantityType_: subQuantityType): Observable<subQuantityType> {

    //return this.http.post(this.url+ '/users', {id,name,email,pass});
    return this.http.post<subQuantityType>(this.subQuanityTypeUrl, subQuantityType_);

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
  update(subQuantityType_: subQuantityType) {
    return this.http.put(this.subQuanityTypeUrl, { basetype: subQuantityType_ });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}