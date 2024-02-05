import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoanTypeComponent } from './update-loan-type.component';

describe('UpdateLoanTypeComponent', () => {
  let component: UpdateLoanTypeComponent;
  let fixture: ComponentFixture<UpdateLoanTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLoanTypeComponent]
    });
    fixture = TestBed.createComponent(UpdateLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
