import { Component, Inject } from "@angular/core";
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from 'ag-grid-community';
import { __param } from "tslib";
@Component({
  standalone: true,
  styleUrl: 'deletbasetypebutton.css',
  templateUrl: 'deletbasetypebutton.html'
})

export class BasetypDeleteButtun {
  constructor(@Inject('CELL_CONTEXT') public ctx: any) {}
  delete() {
    console.log('Delete clicked for row:', this.ctx);
  }

}



