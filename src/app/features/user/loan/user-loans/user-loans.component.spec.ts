import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoansComponent } from './user-loans.component';

describe('UserLoansComponent', () => {
  let component: UserLoansComponent;
  let fixture: ComponentFixture<UserLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoansComponent]
    });
    fixture = TestBed.createComponent(UserLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
