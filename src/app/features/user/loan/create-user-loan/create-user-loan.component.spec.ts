import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserLoanComponent } from './create-user-loan.component';

describe('CreateUserLoanComponent', () => {
  let component: CreateUserLoanComponent;
  let fixture: ComponentFixture<CreateUserLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserLoanComponent]
    });
    fixture = TestBed.createComponent(CreateUserLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
