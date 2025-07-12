import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-showbutton',
    templateUrl: './showbutton.component.html',
    styleUrl: './showbutton.component.css',
    standalone: false
})
export class ShowbuttonComponent implements ICellRendererAngularComp {

  id: any;
  modal: any;
  style: any;

  agInit(params: ICellRendererParams): void {
  }
  constructor() {

  }

  refresh(params: ICellRendererParams) {

    return true;
  }

  ShowQr() {
  }

}



