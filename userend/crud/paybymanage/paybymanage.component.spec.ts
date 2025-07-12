import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybymanageComponent } from './paybymanage.component';

describe('PaybymanageComponent', () => {
  let component: PaybymanageComponent;
  let fixture: ComponentFixture<PaybymanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaybymanageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaybymanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
