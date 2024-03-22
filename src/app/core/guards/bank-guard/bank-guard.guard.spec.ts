import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bankGuardGuard } from './bank-guard.guard';

describe('bankGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bankGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
