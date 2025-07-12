import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytypeformComponent } from './quantitytype.component';

describe('CategorytypeformComponent', () => {
  let component: CategorytypeformComponent;
  let fixture: ComponentFixture<CategorytypeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorytypeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorytypeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
