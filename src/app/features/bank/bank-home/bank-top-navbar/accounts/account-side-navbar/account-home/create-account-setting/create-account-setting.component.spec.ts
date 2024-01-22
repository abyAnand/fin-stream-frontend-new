import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountSettingComponent } from './create-account-setting.component';

describe('CreateAccountSettingComponent', () => {
  let component: CreateAccountSettingComponent;
  let fixture: ComponentFixture<CreateAccountSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccountSettingComponent]
    });
    fixture = TestBed.createComponent(CreateAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
