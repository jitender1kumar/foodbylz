import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbuttonComponent } from './showbutton.component';

describe('ShowbuttonComponent', () => {
  let component: ShowbuttonComponent;
  let fixture: ComponentFixture<ShowbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowbuttonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
