import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBankComponent } from './single-bank.component';

describe('SingleBankComponent', () => {
  let component: SingleBankComponent;
  let fixture: ComponentFixture<SingleBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBankComponent]
    });
    fixture = TestBed.createComponent(SingleBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
