import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitbillComponent } from './splitbill.component';

describe('SplitbillComponent', () => {
  let component: SplitbillComponent;
  let fixture: ComponentFixture<SplitbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplitbillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
