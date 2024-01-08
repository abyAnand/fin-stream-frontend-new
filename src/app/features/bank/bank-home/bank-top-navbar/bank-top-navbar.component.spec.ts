import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTopNavbarComponent } from './bank-top-navbar.component';

describe('BankTopNavbarComponent', () => {
  let component: BankTopNavbarComponent;
  let fixture: ComponentFixture<BankTopNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankTopNavbarComponent]
    });
    fixture = TestBed.createComponent(BankTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
