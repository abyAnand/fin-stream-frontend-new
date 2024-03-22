import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from 'src/app/core/models/auth/AuthRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        this.router.navigate(['/admin/dashboard'], { relativeTo: this.activatedRoute.parent });

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
