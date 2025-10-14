import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRightPanelComponent } from './home-right-panel.component';

describe('HomeRightPanelComponent', () => {
  let component: HomeRightPanelComponent;
  let fixture: ComponentFixture<HomeRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRightPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
