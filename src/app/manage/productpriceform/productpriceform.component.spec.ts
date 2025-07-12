import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpriceformComponent } from './productpriceform.component';

describe('ProductpriceformComponent', () => {
  let component: ProductpriceformComponent;
  let fixture: ComponentFixture<ProductpriceformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductpriceformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductpriceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
