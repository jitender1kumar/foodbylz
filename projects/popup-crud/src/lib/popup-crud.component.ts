import { Component, Input, OnInit } from '@angular/core';
import { PopupCrudService } from './popup-crud.service';
import { BrowserModule } from '@angular/platform-browser';
//import { QuantitytypeService } from '../../../../Services/quantitytype.service';
//import { environment } from '../../../../../foodbilling/src/environment/environment';
@Component({
    selector: 'lib-popup-cruds',
    imports: [BrowserModule],
    template: `
		<div class="content">
      <!-- <h6>{{args}}</h6>  -->
		</div>

  `,
    styles: `body {
    font-family: Arial, sans-serif;
    background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;
    background-size: cover;
    height: 100vh;
  }
  
  
  

  `
})
export class PopupCrudComponent implements OnInit {
   //data:any;
  
  constructor(private popupedit:PopupCrudService){
   //  alert("working library");
    // this.data = this.popupedit.getdata();
  }

 // @Input()args:any=null;
  ngOnInit(): void {
    
  }
  alertfun(args:any)
  {
//this.args=args;
  }
}
