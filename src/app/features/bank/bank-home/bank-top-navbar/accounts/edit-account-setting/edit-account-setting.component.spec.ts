import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountSettingComponent } from './edit-account-setting.component';

describe('EditAccountSettingComponent', () => {
  let component: EditAccountSettingComponent;
  let fixture: ComponentFixture<EditAccountSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccountSettingComponent]
    });
    fixture = TestBed.createComponent(EditAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
