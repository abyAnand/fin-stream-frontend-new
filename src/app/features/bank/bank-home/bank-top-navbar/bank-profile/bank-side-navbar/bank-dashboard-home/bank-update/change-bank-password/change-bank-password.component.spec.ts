import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBankPasswordComponent } from './change-bank-password.component';

describe('ChangeBankPasswordComponent', () => {
  let component: ChangeBankPasswordComponent;
  let fixture: ComponentFixture<ChangeBankPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeBankPasswordComponent]
    });
    fixture = TestBed.createComponent(ChangeBankPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
