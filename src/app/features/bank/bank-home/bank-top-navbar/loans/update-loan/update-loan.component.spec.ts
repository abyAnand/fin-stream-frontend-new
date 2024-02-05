import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoanComponent } from './update-loan.component';

describe('UpdateLoanComponent', () => {
  let component: UpdateLoanComponent;
  let fixture: ComponentFixture<UpdateLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLoanComponent]
    });
    fixture = TestBed.createComponent(UpdateLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
