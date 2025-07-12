import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrdersInBoxComponent } from './display-orders-in-box.component';

describe('DisplayOrdersInBoxComponent', () => {
  let component: DisplayOrdersInBoxComponent;
  let fixture: ComponentFixture<DisplayOrdersInBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayOrdersInBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayOrdersInBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
