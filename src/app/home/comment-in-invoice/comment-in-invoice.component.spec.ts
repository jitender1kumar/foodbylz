import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentInInvoiceComponent } from './comment-in-invoice.component';

describe('CommentInInvoiceComponent', () => {
  let component: CommentInInvoiceComponent;
  let fixture: ComponentFixture<CommentInInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentInInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentInInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
