import { TestBed } from '@angular/core/testing';

import { LoanSettingService } from './loan-setting.service';

describe('LoanSettingService', () => {
  let service: LoanSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
