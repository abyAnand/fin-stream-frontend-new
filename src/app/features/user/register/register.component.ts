import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest, Role } from 'src/app/core/models/RegisterRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  ngOnInit(): void {

  }



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ){}

    signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    }, { validator: this.passwordMatchValidator });

  signUp() {
    const registerData: RegisterRequest = {
      firstName: this.signupForm.get(['firstName'])!.value,
      lastName: this.signupForm.get(['lastName'])!.value,
      email: this.signupForm.get(['email'])!.value,
      password: this.signupForm.get(['password'])!.value,
      phoneNumber: this.signupForm.get(['phoneNumber'])!.value,
      role: Role.User // Assuming 'USER' role for registration, adjust as needed
    };
    console.log(registerData)
    this.authService.register(registerData).subscribe(
      (response) => {
        // Handle successful registration
        this.router.navigateByUrl("/dashboard");
      },
      (error) => {

        console.log(error);

        // Handle registration error
        // if (error.status == 406) {
        //   this.snackBar.open("User is not Active", "Close", {
        //     duration: 5000
        //   });
        // } else {
        //   this.snackBar.open("Registration failed", "Close", {
        //     duration: 5000
        //   });
        // }
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

}
