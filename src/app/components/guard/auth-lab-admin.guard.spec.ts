import { TestBed } from '@angular/core/testing';

import { AuthLabAdminGuard } from './auth-lab-admin.guard';

describe('AuthLabAdminGuard', () => {
  let guard: AuthLabAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLabAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
