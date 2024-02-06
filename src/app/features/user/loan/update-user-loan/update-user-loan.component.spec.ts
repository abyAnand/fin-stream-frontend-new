import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserLoanComponent } from './update-user-loan.component';

describe('UpdateUserLoanComponent', () => {
  let component: UpdateUserLoanComponent;
  let fixture: ComponentFixture<UpdateUserLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserLoanComponent]
    });
    fixture = TestBed.createComponent(UpdateUserLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
