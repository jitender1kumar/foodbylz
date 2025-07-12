import { TestBed } from '@angular/core/testing';

import { PopupCrudService } from './popup-crud.service';

describe('PopupCrudService', () => {
  let service: PopupCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
