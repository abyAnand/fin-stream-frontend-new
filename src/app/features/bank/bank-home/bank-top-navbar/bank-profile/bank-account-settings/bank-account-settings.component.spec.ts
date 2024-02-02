import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSettingsComponent } from './bank-account-settings.component';

describe('BankAccountSettingsComponent', () => {
  let component: BankAccountSettingsComponent;
  let fixture: ComponentFixture<BankAccountSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAccountSettingsComponent]
    });
    fixture = TestBed.createComponent(BankAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
