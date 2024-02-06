import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanApplyComponent } from './user-loan-apply.component';

describe('UserLoanApplyComponent', () => {
  let component: UserLoanApplyComponent;
  let fixture: ComponentFixture<UserLoanApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoanApplyComponent]
    });
    fixture = TestBed.createComponent(UserLoanApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
