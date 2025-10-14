import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnItemsComponent } from './add-on-items.component';

describe('AddOnItemsComponent', () => {
  let component: AddOnItemsComponent;
  let fixture: ComponentFixture<AddOnItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
