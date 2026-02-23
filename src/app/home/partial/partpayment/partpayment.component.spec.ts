import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartpaymentComponent } from './partpayment.component';

describe('PartpaymentComponent', () => {
  let component: PartpaymentComponent;
  let fixture: ComponentFixture<PartpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartpaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
