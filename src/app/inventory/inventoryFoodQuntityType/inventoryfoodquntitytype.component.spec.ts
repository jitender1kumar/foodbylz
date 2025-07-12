import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryfoodquntitytypeComponent } from './inventoryfoodquntitytype.component';

describe('InventoryfoodquntitytypeComponent', () => {
  let component: InventoryfoodquntitytypeComponent;
  let fixture: ComponentFixture<InventoryfoodquntitytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryfoodquntitytypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryfoodquntitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
