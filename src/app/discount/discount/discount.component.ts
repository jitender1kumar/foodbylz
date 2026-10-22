import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Discount } from '../../core/Model/crud.model';
// Actions (to be implemented elsewhere in the ngrx setup)
import * as DiscountActions from '../store/discount.action';
import { selectAllDiscounts } from '../store/discount.selectors';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-discount',
  standalone: false,
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent {
  // CRUD Discount functionality using @ngrx/store
  myAddForm: FormGroup;

  discounts$: Observable<Discount[]>;

  constructor(private store: Store, private fb: FormBuilder) {
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
  onFormSubmit(discountForm: any) {
    if (discountForm.valid) {
      const formValue = discountForm.value;
      const discount = this.buildDiscount(formValue);
      formValue._id ? this.updateDiscount(discount) : this.addDiscount(discount);
      discountForm.resetForm();
    }
  }

  private buildDiscount(formValue: any): Discount {
    const now = new Date().toISOString();
    return {
      ...formValue,
      amount: Number(formValue.amount),
      active: Boolean(formValue.active),
      validFrom: formValue.validFrom || undefined,
      validTo: formValue.validTo || undefined,
      createdAt: formValue.createdAt || now,
      updatedAt: now,
      _id: formValue._id || this.generateId()
    };
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

  onSubmit(formValue: any) {
    const discount = this.buildDiscount(formValue);
    formValue._id ? this.updateDiscount(discount) : this.addDiscount(discount);
  }

  generateId(): string {
    return Math.random().toString(36).slice(2, 11);
  }
}


