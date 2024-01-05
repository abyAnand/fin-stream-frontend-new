import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(
    private formBuilder: FormBuilder,
  ){}

  isEditMode: boolean = false;
  showPassword: boolean = false;

  changePassword = this.formBuilder.group({

    password: ['', [Validators.required,Validators.minLength(5)]],
    confirmPassword: ['', Validators.required],
  }, { validator: this.passwordMatchValidator });



  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      console.log("saved");

    }
  }

}
