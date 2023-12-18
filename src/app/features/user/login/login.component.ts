import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/core/models/AuthRequest.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

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
    private authService: AuthService,

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
        this.router.navigateByUrl("/dashboard");
        // ... rest of your code
      },
      (error: { status: number; }) => {
        // if (error.status == 406) {
        //   this.snackBar.open("User is not Active", "Close", {
        //     duration: 5000
        //   });
        // } else {
        //   this.snackBar.open("Bad Credentials", "Close", {
        //     duration: 5000
        //   });
        // }
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }


}
