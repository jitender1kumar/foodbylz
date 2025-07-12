import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasetypeglobalService {

  private _myGlobalVariable: any ;

  constructor() {}

  get myGlobalVariable(): any {
    return this._myGlobalVariable;
  }

  set myGlobalVariable(value: any) {
    this._myGlobalVariable = value;
  }
}
