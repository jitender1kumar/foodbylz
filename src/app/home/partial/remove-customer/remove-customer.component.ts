import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-customer',
  standalone: false,
  templateUrl: './remove-customer.component.html',
  styleUrl: './remove-customer.component.css',
})
export class RemoveCustomerComponent {
@Input() CustomerName: string | undefined;
  @Input() CustomerId: string | undefined ;
  @Input() invoiceId: string | undefined;
// 
 @Output() removeCustomerbyChild = new EventEmitter<string>();
  removeCustomer(): void {
    // Emit an event to the parent component to handle the removal
    // You can use EventEmitter for this purpose
    // For example:
     this.removeCustomerbyChild.emit('Guest');
  }
}
