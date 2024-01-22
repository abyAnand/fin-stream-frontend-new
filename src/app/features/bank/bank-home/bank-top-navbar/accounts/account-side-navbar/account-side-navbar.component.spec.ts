import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSideNavbarComponent } from './account-side-navbar.component';

describe('AccountSideNavbarComponent', () => {
  let component: AccountSideNavbarComponent;
  let fixture: ComponentFixture<AccountSideNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSideNavbarComponent]
    });
    fixture = TestBed.createComponent(AccountSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
