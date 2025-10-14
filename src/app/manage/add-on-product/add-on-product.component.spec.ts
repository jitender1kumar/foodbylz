import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnProductComponent } from './add-on-product.component';

describe('AddOnProductComponent', () => {
  let component: AddOnProductComponent;
  let fixture: ComponentFixture<AddOnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
