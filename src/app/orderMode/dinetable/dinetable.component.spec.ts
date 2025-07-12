import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinetableComponent } from './dinetable.component';

describe('DinetableComponent', () => {
  let component: DinetableComponent;
  let fixture: ComponentFixture<DinetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinetableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DinetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
