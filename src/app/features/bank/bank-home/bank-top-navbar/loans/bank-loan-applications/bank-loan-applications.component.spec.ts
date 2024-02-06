import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLoanApplicationsComponent } from './bank-loan-applications.component';

describe('BankLoanApplicationsComponent', () => {
  let component: BankLoanApplicationsComponent;
  let fixture: ComponentFixture<BankLoanApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankLoanApplicationsComponent]
    });
    fixture = TestBed.createComponent(BankLoanApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
