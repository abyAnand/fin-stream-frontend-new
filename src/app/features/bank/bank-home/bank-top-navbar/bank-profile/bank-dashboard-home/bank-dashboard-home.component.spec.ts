import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDashboardHomeComponent } from './bank-dashboard-home.component';

describe('BankDashboardHomeComponent', () => {
  let component: BankDashboardHomeComponent;
  let fixture: ComponentFixture<BankDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(BankDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
