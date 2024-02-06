import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoansPendingComponent } from './user-loans-pending.component';

describe('UserLoansPendingComponent', () => {
  let component: UserLoansPendingComponent;
  let fixture: ComponentFixture<UserLoansPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoansPendingComponent]
    });
    fixture = TestBed.createComponent(UserLoansPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
