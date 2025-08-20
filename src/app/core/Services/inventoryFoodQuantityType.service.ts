import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { InventoryFoodQuantityType } from '../Model/crud.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryMFoodQuantityTypeService {

  private inventoryFoodQuantitTypeUrl: string = environment.api+"inventoryFoodQuantityType";

  constructor(private http: HttpClient) { }

 
  delete(_id: string):Observable<InventoryFoodQuantityType> {
    return this.http.delete<InventoryFoodQuantityType>(`${this.inventoryFoodQuantitTypeUrl}/${_id}`);
  }

  add(_InventoryFoodQuantityType: InventoryFoodQuantityType): Observable<InventoryFoodQuantityType> {
    return this.http.post<InventoryFoodQuantityType>(this.inventoryFoodQuantitTypeUrl, _InventoryFoodQuantityType);
  }
  update(_InventoryFoodQuantityType: InventoryFoodQuantityType): Observable<InventoryFoodQuantityType> {
    return this.http.put<InventoryFoodQuantityType>(this.inventoryFoodQuantitTypeUrl, { _InventoryFoodQuantityType });
  }
  get():Observable<InventoryFoodQuantityType[]> {
    return this.http.get<InventoryFoodQuantityType[]>(this.inventoryFoodQuantitTypeUrl);
  }


}
