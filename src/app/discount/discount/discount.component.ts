import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Discount } from '../../core/Model/crud.model';
// Actions (to be implemented elsewhere in the ngrx setup)
import * as DiscountActions from '../store/discount.action';
import { selectAllDiscounts } from '../store/discount.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-discount',
  standalone: false,
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent {
// CRUD Discount functionality using @ngrx/store
@ViewChild('discountForm')
myAddForm: FormGroup;

  discounts$: Observable<Discount[]>;

  constructor(private store: Store,private fb:FormBuilder,private router: Router,) {
    // Get all discounts from the store (selector must be implemented in feature state)
    this.discounts$ = this.store.select(selectAllDiscounts);
    this.myAddForm = this.fb.group({
      name: [''],
      amount: [''],
      type: [''],
      description: [''],
      active: [false],
      validFrom: [null],
      validTo: [null],
      employee_id: ['']
    });
  }
  // Handles form submission from the template (see discount.component.html)
  // Called on submit; determines add (if no _id) or update (if _id present)
  onFormSubmit(discountForm: any) {
    if (discountForm.valid) {
      const formValue = discountForm.value;

      // Massage boolean for 'active' (ensure it's boolean, as checkbox gives true/false)
      const payload: Discount = {
        ...formValue,
        amount: +formValue.amount, // ensure number
        active: !!formValue.active,
        validFrom: formValue.validFrom ? formValue.validFrom : undefined,
        validTo: formValue.validTo ? formValue.validTo : undefined,
        createdAt: formValue.createdAt ? formValue.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _id: formValue._id ? formValue._id : this.generateId()
      };

      if ('_id' in formValue && formValue._id) {
        this.updateDiscount(payload);
      } else {
        this.addDiscount(payload);
      }
      // Optionally reset the form after save
      discountForm.resetForm();
    }
  }

  addDiscount(discount: Discount) {
    this.store.dispatch(DiscountActions.createDiscount({ discount }));
  }

  updateDiscount(discount: Discount) {
    this.store.dispatch(DiscountActions.updateDiscount({ discount }));
  }

  deleteDiscount(id: string) {
    this.store.dispatch(DiscountActions.deleteDiscount({ id }));
  }

  // Example usage: call this from template with form values
  onSubmit(formValue: any) {
    if (formValue._id) {
      this.updateDiscount(formValue as Discount);
    } else {
      const newDiscount: Discount = {
        ...formValue,
        _id: this.generateId(), // Provide a method or let backend assign
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.addDiscount(newDiscount);
    }
  }

  // Simple ID generator for demonstration, production should use proper ID via backend/server
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}


