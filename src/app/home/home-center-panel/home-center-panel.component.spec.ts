import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCenterPanelComponent } from './home-center-panel.component';

describe('HomeCenterPanelComponent', () => {
  let component: HomeCenterPanelComponent;
  let fixture: ComponentFixture<HomeCenterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCenterPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCenterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
