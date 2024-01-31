import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserAccountsComponent } from './show-user-accounts.component';

describe('ShowUserAccountsComponent', () => {
  let component: ShowUserAccountsComponent;
  let fixture: ComponentFixture<ShowUserAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowUserAccountsComponent]
    });
    fixture = TestBed.createComponent(ShowUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
