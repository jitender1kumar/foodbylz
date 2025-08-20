import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { InventoryMainFood } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryMainFoodService {

  private inventoryFoodMainUrl: string = environment.api+"inventoryMainFood";

  constructor(private http: HttpClient) { }

 
  delete(_id: string): Observable<InventoryMainFood> {
    return this.http.delete<InventoryMainFood>(`${this.inventoryFoodMainUrl}/${_id}`);
  }




  add(_InventoryFoodMain: InventoryMainFood): Observable<InventoryMainFood> {
    return this.http.post<InventoryMainFood>(this.inventoryFoodMainUrl, _InventoryFoodMain);
  }
  update(_InventoryFoodMain: InventoryMainFood): Observable<InventoryMainFood> {
    return this.http.put<InventoryMainFood>(this.inventoryFoodMainUrl, { _InventoryFoodMain });
  }
  get():Observable<InventoryMainFood[]> {
    return this.http.get<InventoryMainFood[]>(this.inventoryFoodMainUrl);
  }
  getbyid(_id: string): Observable<InventoryMainFood> {
    return this.http.get<InventoryMainFood>(`${this.inventoryFoodMainUrl}/${_id}`);
  }

}
