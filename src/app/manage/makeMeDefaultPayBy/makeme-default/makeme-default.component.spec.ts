import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakemeDefaultComponent } from './makeme-default.component';

describe('MakemeDefaultComponent', () => {
  let component: MakemeDefaultComponent;
  let fixture: ComponentFixture<MakemeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakemeDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakemeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
