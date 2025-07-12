import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrdersListComponent } from './display-orders-list.component';

describe('DisplayOrdersListComponent', () => {
  let component: DisplayOrdersListComponent;
  let fixture: ComponentFixture<DisplayOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayOrdersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
