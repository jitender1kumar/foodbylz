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

 
  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.KOTrunningeurl}/${_id}`);
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
