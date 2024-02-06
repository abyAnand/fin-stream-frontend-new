import { TestBed } from '@angular/core/testing';

import { UserloanService } from './userloan.service';

describe('UserloanService', () => {
  let service: UserloanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserloanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
