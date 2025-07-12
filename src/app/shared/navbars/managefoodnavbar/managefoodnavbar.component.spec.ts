import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefoodnavbarComponent } from './managefoodnavbar.component';

describe('ManagefoodnavbarComponent', () => {
  let component: ManagefoodnavbarComponent;
  let fixture: ComponentFixture<ManagefoodnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagefoodnavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagefoodnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
