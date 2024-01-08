import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from 'src/app/core/models/AuthRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-bank-login',
  templateUrl: './bank-login.component.html',
  styleUrls: ['./bank-login.component.css']
})
export class BankLoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notification: ToasterService

    ){}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  login() {
    const auth: AuthRequest = {
      email: this.loginForm.get(['email'])!.value,
      password: this.loginForm.get(['password'])!.value
    };

    this.authService.login(auth).subscribe(
      (response) => {
        this.router.navigate(['/bank/home/dashboard'], { relativeTo: this.ActivatedRoute.parent });

      },
      (error: { status: number; }) => {
        if (error.status == 403) {
          this.notification.warning("Incorrect email or password", "Warning");
        } else {
          this.notification.error("Bad Credentials", "Error");
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

}
