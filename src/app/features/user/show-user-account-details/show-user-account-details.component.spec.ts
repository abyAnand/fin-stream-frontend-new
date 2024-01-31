import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserAccountDetailsComponent } from './show-user-account-details.component';

describe('ShowUserAccountDetailsComponent', () => {
  let component: ShowUserAccountDetailsComponent;
  let fixture: ComponentFixture<ShowUserAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowUserAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(ShowUserAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
