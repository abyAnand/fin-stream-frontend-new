import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSideNavComponent } from './loan-side-nav.component';

describe('LoanSideNavComponent', () => {
  let component: LoanSideNavComponent;
  let fixture: ComponentFixture<LoanSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanSideNavComponent]
    });
    fixture = TestBed.createComponent(LoanSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
