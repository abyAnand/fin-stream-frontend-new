import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSideNavbarComponent } from './bank-side-navbar.component';

describe('BankSideNavbarComponent', () => {
  let component: BankSideNavbarComponent;
  let fixture: ComponentFixture<BankSideNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankSideNavbarComponent]
    });
    fixture = TestBed.createComponent(BankSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
