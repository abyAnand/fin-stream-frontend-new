import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSideNavbarComponent } from './loan-side-navbar.component';

describe('LoanSideNavbarComponent', () => {
  let component: LoanSideNavbarComponent;
  let fixture: ComponentFixture<LoanSideNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanSideNavbarComponent]
    });
    fixture = TestBed.createComponent(LoanSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
