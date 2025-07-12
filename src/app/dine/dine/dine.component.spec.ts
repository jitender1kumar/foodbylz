import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DineComponent } from './dine.component';

describe('DineComponent', () => {
  let component: DineComponent;
  let fixture: ComponentFixture<DineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
