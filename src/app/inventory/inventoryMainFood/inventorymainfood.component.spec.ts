import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymainfoodComponent } from './inventorymainfood.component';

describe('InventorymainfoodComponent', () => {
  let component: InventorymainfoodComponent;
  let fixture: ComponentFixture<InventorymainfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventorymainfoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventorymainfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
