import { Component, Input } from '@angular/core';
import { PaybyService } from '../../../core/Services/paybymanage.service';

@Component({
  selector: 'app-makeme-default',
  standalone: false,
  templateUrl: './makeme-default.component.html',
  styleUrl: './makeme-default.component.css'
})
export class MakemeDefaultComponent {
@Input() PayByData:any
popup: boolean = false;
selectedPayById: any = null;

constructor(private paybyService: PaybyService)
{

}
ngOnInit() {
  // Optionally, if you want to open the popup by default when there's data
  // this.openPopupIfDataExists();
}

openPopupIfDataExists() {
  if (this.PayByData && this.PayByData.length > 0) {
    this.popup = true;
  }
}

setDefaultPayBy() {
  if (!this.selectedPayById) {
    return;
  }
  // Handle actual set default logic here (could be an API call or emitting an event)
  // For now, just close the popup
  this.popup = false;
  console.log(this.selectedPayById);
  // INSERT_YOUR_CODE
  // Assuming PaybyService is injected, call updateMakeDefaultTask with this.selectedPayById
  if ( this.selectedPayById) {
    this.paybyService.updateMakeDefaultTask(this.selectedPayById).subscribe({
      next: (res) => {
        console.log('Default PayBy set successfully:', res);
        // Optionally, you may trigger feedback/toast here
      },
      error: (err) => {
        console.error('Error setting default PayBy:', err);
      }
    });
  }
  // Optionally: notify parent or store of change
  // e.g., this.onDefaultPayByChanged.emit(this.selectedPayById);
}

closePopup() {
  this.popup = false;
}

// Optionally, a method to manually open the popup from the parent
openPopup() {
  this.popup = true;
}


}
