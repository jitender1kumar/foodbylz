import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirdTableComponent } from './gird-table.component';

describe('GirdTableComponent', () => {
  let component: GirdTableComponent;
  let fixture: ComponentFixture<GirdTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GirdTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GirdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
