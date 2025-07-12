import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupCrudService {
returndata:any;

  constructor() { }
  editpopup(data:any)
  {
    this.returndata=data;
    alert("library work"+data);
  }
  getdata()
  {
    return this.returndata;
  }
}
