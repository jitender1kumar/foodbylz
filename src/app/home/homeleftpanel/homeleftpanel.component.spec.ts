import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeleftpanelComponent } from './homeleftpanel.component';

describe('HomeleftpanelComponent', () => {
  let component: HomeleftpanelComponent;
  let fixture: ComponentFixture<HomeleftpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeleftpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeleftpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
