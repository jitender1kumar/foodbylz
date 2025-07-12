import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermodebuttonComponent } from './ordermodebutton.component';

describe('OrdermodebuttonComponent', () => {
  let component: OrdermodebuttonComponent;
  let fixture: ComponentFixture<OrdermodebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdermodebuttonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdermodebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
