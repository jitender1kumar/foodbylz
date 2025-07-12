import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDiplayInPopUpComponent } from './order-diplay-in-pop-up.component';

describe('OrderDiplayInPopUpComponent', () => {
  let component: OrderDiplayInPopUpComponent;
  let fixture: ComponentFixture<OrderDiplayInPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDiplayInPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDiplayInPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
