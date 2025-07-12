import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinedeliveryComponent } from './onlinedelivery.component';

describe('OnlinedeliveryComponent', () => {
  let component: OnlinedeliveryComponent;
  let fixture: ComponentFixture<OnlinedeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnlinedeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlinedeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
