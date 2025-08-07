import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
  
})
export class SweetAlert2 {
  showFancyAlertError(arg0: string) {
    throw new Error('Method not implemented.');
  }
showFancyAlertSuccess(msg:any) {
  Swal.fire({
    title: 'Done',
    text: msg,
    icon: 'success',
    showConfirmButton: true,
    confirmButtonColor: '#007bff',
    confirmButtonText: 'OK',
    timer: 3000,
    background: '#f8f9fa',
    customClass: {
      title: 'swal-title',
      confirmButton: 'swal-button'
    }
  });
}
showFancyAlertFail(msg:any) {
  Swal.fire({
    title: 'Failed!',
    text: msg,
    icon: 'error',
    showConfirmButton: false,
    confirmButtonColor: '#007bff',
    confirmButtonText: 'OK',
    timer: 3000,
    background: '#f8f9fa',
    customClass: {
      title: 'swal-title',
      confirmButton: 'swal-button'
    }
  });
}

   confirmDelete(itemId: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will permanently delete the item!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
     // this.deletedConfirmed();//this.deleteItem(itemId); // Call your delete function
      Swal.fire('Deleted!', 'The item has been removed.', 'success');
    }
  });
}
}