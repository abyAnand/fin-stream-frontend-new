import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterRequest, Role } from 'src/app/core/models/auth/RegisterRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  createUserForm: FormGroup;
  roles = Object.values(Role);



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }



  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')!.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')!.setErrors(null);
    }
  }

  createUser() {
    if (this.createUserForm.valid) {
      const registerData: RegisterRequest = {
        firstName: this.createUserForm.get('firstName')!.value,
        lastName: this.createUserForm.get('lastName')!.value,
        email: this.createUserForm.get('email')!.value,
        password: this.createUserForm.get('password')!.value,
        phoneNumber: this.createUserForm.get('phoneNumber')!.value,
        role: this.createUserForm.get('role')!.value as Role
      };

      this.authService.register(registerData).subscribe(
        (response) => {
          this.snackBar.open("User created successfully", "Close", {
            duration: 5000
          });
          this.router.navigate(['/admin/user']);
        },
        (error) => {
          console.error(error);
          this.snackBar.open("Failed to create user", "Close", {
            duration: 5000
          });
        }
      );
    } else {
      Object.values(this.createUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
