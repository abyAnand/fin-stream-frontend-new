import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from 'src/app/core/models/AuthRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar

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
        this.router.navigate(['../dashboard'], { relativeTo: this.ActivatedRoute.parent });

      },
      (error: { status: number; }) => {
        if (error.status == 403) {
          this.snackBar.open("Something Happened", "Close", {
            duration: 5000
          });
        } else {
          this.snackBar.open("Bad Credentials", "Close", {
            duration: 5000
          });
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }


}
