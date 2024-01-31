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
import { BankListComponent } from './dashboard/navbar/bank-list/bank-list.component';
import { ShowBankAccountsComponent } from './show-bank-accounts/show-bank-accounts.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { ShowUserAccountsComponent } from './show-user-accounts/show-user-accounts.component';
import { ShowUserAccountDetailsComponent } from './show-user-account-details/show-user-account-details.component';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, DashboardComponent, HeaderComponent, NavbarComponent, SideNavbarComponent, ProfileComponent, UserDashboardComponent, ChangePasswordComponent, BankListComponent, ShowBankAccountsComponent, CreateBankAccountComponent, ShowUserAccountsComponent, ShowUserAccountDetailsComponent, EditUserAccountComponent],
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
