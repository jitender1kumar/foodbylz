import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
    selector: 'app-managefoodnavbar',
    templateUrl: './managefoodnavbar.component.html',
    styleUrl: './managefoodnavbar.component.css',
    animations: [
        trigger('submenuAnimation', [
            transition(':enter', [
                style({ height: '0px', opacity: 0 }),
                animate('300ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
            ])
        ])
    ],
    standalone: false
})
export class ManagefoodnavbarComponent {

  sidebarCollapsed = false;
  activeSubmenu: string = '';

 toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleSubmenu(item: string): void {
    this.activeSubmenu = this.activeSubmenu === item ? '' : item;
  }
}
