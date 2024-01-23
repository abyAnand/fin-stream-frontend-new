import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBankAccountsComponent } from './show-bank-accounts.component';

describe('ShowBankAccountsComponent', () => {
  let component: ShowBankAccountsComponent;
  let fixture: ComponentFixture<ShowBankAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowBankAccountsComponent]
    });
    fixture = TestBed.createComponent(ShowBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
