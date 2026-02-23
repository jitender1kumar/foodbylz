import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenratedItemKOT } from '../Model/crud.model';
import { environment, HttpClient } from './indexService';



@Injectable({
  providedIn: 'root'
})
export class KOTrunningordersService {
 
  
  private KOTrunningeurl: string = environment.api+'KOTrunning';//"KOTrunningorders";

  constructor(private http: HttpClient) { }

 
  delete(RecieptNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.KOTrunningeurl}/${RecieptNumber}`);
  }

deleteMultiple(RecieptNumber: string, KOTStatus?: string): Observable<void> {
  // Assume backend API supports bulk delete as query params, e.g. /KOTrunning/delete-multiple?RecieptNumbers=1,2,3&KOTStatus=false
  // let url = `${this.KOTrunningeurl}/delete-multiple?RecieptNumbers=${RecieptNumbers}`;
  // if (KOTStatus == 'false') {
  //   url += `&KOTStatus=${KOTStatus}`;
  // }
  return this.http.delete<void>(`${this.KOTrunningeurl}/${KOTStatus}/${RecieptNumber}`);
 // return this.http.delete<void>(url);
}

getCategoryByName(name:string)
{
  return this.http.get(`${this.KOTrunningeurl}/${name}`);
}

  add(KOTrunningorders: GenratedItemKOT): Observable<GenratedItemKOT> {
    return this.http.post<GenratedItemKOT>(this.KOTrunningeurl, KOTrunningorders);
  }
  

  update(GenratedItemKOT: GenratedItemKOT): Observable<GenratedItemKOT> {
    return this.http.put<GenratedItemKOT>(this.KOTrunningeurl, { GenratedItemKOT });
  }
  get(): Observable<GenratedItemKOT[]> {
    return this.http.get<GenratedItemKOT[]>(this.KOTrunningeurl); // Replace with your API
  }
  // get() {
  //   return this.http.get(this.KOTrunningeurl);
  // }


}
