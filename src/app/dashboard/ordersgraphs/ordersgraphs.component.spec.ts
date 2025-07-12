import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersgraphsComponent } from './ordersgraphs.component';

describe('OrdersgraphsComponent', () => {
  let component: OrdersgraphsComponent;
  let fixture: ComponentFixture<OrdersgraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersgraphsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersgraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
