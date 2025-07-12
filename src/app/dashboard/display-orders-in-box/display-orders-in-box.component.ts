import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-display-orders-in-box',
    templateUrl: './display-orders-in-box.component.html',
    styleUrl: './display-orders-in-box.component.css',
    standalone: false
})
export class DisplayOrdersInBoxComponent {
@Input() ordercount:any;
@Input() totaldiscountamount:any;
@Input() totalpendingamount:any;
@Input() totalorderamount:any;
}
