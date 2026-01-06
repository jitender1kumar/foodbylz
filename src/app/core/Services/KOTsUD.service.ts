import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KOTsUD } from '../Model/crud.model';
import { environment } from './indexService';

@Injectable({
  providedIn: 'root'
})
export class KOTsUDService {
    private KOTsUD: string = environment.api+"KOTsUPs";

  constructor(private http: HttpClient) {}

  // Get all KOTsUD records
  getAllKOTsUD(): Observable<KOTsUD[]> {
    return this.http.get<KOTsUD[]>(`${this.KOTsUD}`);
  }

  // Get KOTsUD by Receipt Number
  getKOTsUDByReceiptNumber(recieptNumber: string): Observable<KOTsUD> {
    return this.http.get<KOTsUD>(`${this.KOTsUD}/${recieptNumber}`);
  }

  // Create new KOTsUD entry
  createKOTsUD(kotsud: KOTsUD): Observable<KOTsUD> {
    return this.http.post<KOTsUD>(`${this.KOTsUD}`, kotsud);
  }

  // Update KOTsUD entry
  updateKOTsUD(recieptNumber: string, kotsud: Partial<KOTsUD>): Observable<KOTsUD> {
    return this.http.put<KOTsUD>(`${this.KOTsUD}/${recieptNumber}`, kotsud);
  }

  // Delete KOTsUD entry
  deleteKOTsUD(recieptNumber: string): Observable<any> {
    return this.http.delete(`${this.KOTsUD}/${recieptNumber}`);
  }
}
