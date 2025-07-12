import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrudComponent } from './popup-crud.component';

describe('PopupCrudComponent', () => {
  let component: PopupCrudComponent;
  let fixture: ComponentFixture<PopupCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
