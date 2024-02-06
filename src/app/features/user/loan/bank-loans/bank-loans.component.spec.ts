import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLoansComponent } from './bank-loans.component';

describe('BankLoansComponent', () => {
  let component: BankLoansComponent;
  let fixture: ComponentFixture<BankLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankLoansComponent]
    });
    fixture = TestBed.createComponent(BankLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
