import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleLoanApplicationComponent } from './view-single-loan-application.component';

describe('ViewSingleLoanApplicationComponent', () => {
  let component: ViewSingleLoanApplicationComponent;
  let fixture: ComponentFixture<ViewSingleLoanApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSingleLoanApplicationComponent]
    });
    fixture = TestBed.createComponent(ViewSingleLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
