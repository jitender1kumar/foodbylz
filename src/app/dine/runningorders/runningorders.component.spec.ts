import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningordersComponent } from './runningorders.component';

describe('RunningordersComponent', () => {
  let component: RunningordersComponent;
  let fixture: ComponentFixture<RunningordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RunningordersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunningordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
