import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanDetailsComponent } from './user-loan-details.component';

describe('UserLoanDetailsComponent', () => {
  let component: UserLoanDetailsComponent;
  let fixture: ComponentFixture<UserLoanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoanDetailsComponent]
    });
    fixture = TestBed.createComponent(UserLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
