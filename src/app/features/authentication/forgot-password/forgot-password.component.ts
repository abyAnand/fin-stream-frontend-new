import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { Status } from '../../../core/models/bank/Bank.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm: FormGroup;
  verificationSent: boolean = false;
  wrongOTP: boolean = false;
  resetPassword: boolean = false;
  emailNotFoundError: boolean = false;
  userEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required]
    });
  }

  verifyUser() {
    const email = this.forgotPasswordForm.get('email').value;
    this.userEmail = email;
    // Call a service method to send verification email


    this.authService.sendVerificationEmail(email).subscribe(
      () => {
        this.verificationSent = true;
        this.emailNotFoundError = false;
      },
      (error) => {
        console.log(error);
        if(error.Status == 404){
          this.emailNotFoundError = true;
        }
      }
    );
  }

  verifyOTP() {
    const otp = this.otpForm.get('otp').value;
    // Call a service method to verify OTP


    this.authService.verifyOTP(otp, this.userEmail).subscribe(
      () => {
        this.resetPassword = true; // If the request is successful, set resetPassword to true
        this.wrongOTP = false; // Reset wrongOTP to false
      },
      (error) => {
        console.log(error);
        this.resetPassword = false; // Reset resetPassword to false
        this.wrongOTP = true; // If the request fails, set wrongOTP to true
      }
    );
  }

  resetUserPassword() {
    const newPassword = this.newPasswordForm.get('newPassword').value;
    // Call a service method to reset password

    console.log(this.userEmail + ' is in resetUserPassword');
    this.authService.resetPassword(newPassword, this.userEmail).subscribe(
      () => {
        this.notification.success('Password reset successful', 'Success');
        this.router.navigateByUrl("/login")
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
