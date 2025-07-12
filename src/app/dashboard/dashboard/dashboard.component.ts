import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: false
})
export class DashboardComponent {
@Input() ordercount:any;
@Input() totaldiscountamount:any;
@Input() totalpendingamount:any;
@Input() totalorderamount:any;
}
