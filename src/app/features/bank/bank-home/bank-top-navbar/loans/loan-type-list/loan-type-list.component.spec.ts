import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTypeListComponent } from './loan-type-list.component';

describe('LoanTypeListComponent', () => {
  let component: LoanTypeListComponent;
  let fixture: ComponentFixture<LoanTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanTypeListComponent]
    });
    fixture = TestBed.createComponent(LoanTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
