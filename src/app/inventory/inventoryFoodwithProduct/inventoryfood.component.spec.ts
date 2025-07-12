import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryfoodComponent } from './inventoryFoodwithProduct.component';

describe('InventoryfoodComponent', () => {
  let component: InventoryfoodComponent;
  let fixture: ComponentFixture<InventoryfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryfoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
