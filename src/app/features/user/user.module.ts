import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BankListComponent } from './dashboard/bank-list/bank-list.component';
import { ShowBankAccountsComponent } from './show-bank-accounts/show-bank-accounts.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { ShowUserAccountsComponent } from './show-user-accounts/show-user-accounts.component';
import { ShowUserAccountDetailsComponent } from './show-user-account-details/show-user-account-details.component';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/Store/Users/user.effects';
import { userReducers } from 'src/app/Store/Users/user.reducers';
import { LoanComponent } from './loan/loan/loan.component';
import { LoanSideNavComponent } from './loan/loan-side-nav/loan-side-nav.component';
import { UserLoansRejectedComponent } from './loan/user-loans-rejected/user-loans-rejected.component';
import { UserLoanDetailsComponent } from './loan/user-loan-details/user-loan-details.component';
import { CreateUserLoanComponent } from './loan/create-user-loan/create-user-loan.component';
import { UpdateUserLoanComponent } from './loan/update-user-loan/update-user-loan.component';
import { BankLoansComponent } from './loan/bank-loans/bank-loans.component';
import { UserLoansComponent } from './loan/user-loans/user-loans.component';
import { UserLoanApplyComponent } from './loan/user-loan-apply/user-loan-apply.component';
import { UserLoansPendingComponent } from './loan/user-loans-pending/user-loans-pending.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, DashboardComponent, HeaderComponent, NavbarComponent, SideNavbarComponent, ProfileComponent, UserDashboardComponent, ChangePasswordComponent, BankListComponent, ShowBankAccountsComponent, CreateBankAccountComponent, ShowUserAccountsComponent, ShowUserAccountDetailsComponent, EditUserAccountComponent, LoanComponent, LoanSideNavComponent, UserLoansComponent, UserLoansRejectedComponent, UserLoanDetailsComponent, CreateUserLoanComponent, UpdateUserLoanComponent, BankLoansComponent, UserLoanApplyComponent, UserLoansPendingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatIconModule,
    FormsModule,
    StoreModule.forFeature('users', userReducers),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
