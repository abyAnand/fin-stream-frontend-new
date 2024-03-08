import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoansRejectedComponent } from './user-loans-rejected.component';

describe('UserLoansRejectedComponent', () => {
  let component: UserLoansRejectedComponent;
  let fixture: ComponentFixture<UserLoansRejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoansRejectedComponent]
    });
    fixture = TestBed.createComponent(UserLoansRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
