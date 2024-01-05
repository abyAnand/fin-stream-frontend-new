import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { SideNavbarComponent } from './dashboard/side-navbar/side-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, DashboardComponent, HeaderComponent, NavbarComponent, SideNavbarComponent, ProfileComponent, UserDashboardComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatIconModule
  ]
})
export class UserModule { }
