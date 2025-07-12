import { Component } from "@angular/core";
import { AgGridAngular} from 'ag-grid-angular';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ColDef, ICellRendererParams } from 'ag-grid-community';

@Component({
    standalone:true,
    template: `<button id="editpopup"  >
      
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"   viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
  </svg></button>
`
   })
   export class BasetypEditButtun implements ICellRendererAngularComp {
id:any;

    agInit(params: ICellRendererParams): void {
      this.id= params.data._id;
      console.log(params);
    }
    refresh(params: ICellRendererParams) {
    
      return true;
    }
    buttonClicked() {
      //alert("edit")
      
     // alert("clicked :"+this.id);
    }
   }

   