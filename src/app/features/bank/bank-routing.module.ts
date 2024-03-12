import { BankLoanApplicationsComponent } from './bank-home/bank-top-navbar/loans/bank-loan-applications/bank-loan-applications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankHomeComponent } from './bank-home/bank-home.component';
import { BankDashboardComponent } from './bank-home/bank-top-navbar/bank-profile/bank-dashboard/bank-dashboard.component';
import { BankDashboardHomeComponent } from './bank-home/bank-top-navbar/bank-profile/bank-dashboard-home/bank-dashboard-home.component';
import { BankUpdateComponent } from './bank-home/bank-top-navbar/bank-profile/bank-update/bank-update.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { BankLoginComponent } from './bank-login/bank-login.component';
import { BankAccountSettingsComponent } from './bank-home/bank-top-navbar/bank-profile/bank-account-settings/bank-account-settings.component';
import { ChangeBankPasswordComponent } from './bank-home/bank-top-navbar/bank-profile/change-bank-password/change-bank-password.component';
import { AccountsComponent } from './bank-home/bank-top-navbar/accounts/accounts.component';
import { AccountHomeComponent } from './bank-home/bank-top-navbar/accounts/account-home/account-home.component';
import { AccountListComponent } from './bank-home/bank-top-navbar/accounts/account-list/account-list.component';
import { AccountSettingsComponent } from './bank-home/bank-top-navbar/accounts/account-settings/account-settings.component';
import { CreateAccountSettingComponent } from './bank-home/bank-top-navbar/accounts/create-account-setting/create-account-setting.component';
import { LoansComponent } from './bank-home/bank-top-navbar/loans/loans.component';
import { LoanListComponent } from './bank-home/bank-top-navbar/loans/loan-list/loan-list.component';
import { CreateLoanComponent } from './bank-home/bank-top-navbar/loans/create-loan/create-loan.component';
import { UpdateLoanComponent } from './bank-home/bank-top-navbar/loans/update-loan/update-loan.component';
import { LoanTypeListComponent } from './bank-home/bank-top-navbar/loans/loan-type-list/loan-type-list.component';
import { ViewSingleLoanApplicationComponent } from './bank-home/bank-top-navbar/loans/view-single-loan-application/view-single-loan-application.component';
import { UserAccountsComponent } from './bank-home/bank-top-navbar/user/user-accounts/user-accounts.component';
import { NotificationsComponent } from './bank-home/bank-top-navbar/notifications/notifications.component';

const routes: Routes = [
  { path: 'register', component: BankRegisterComponent },
  { path: 'login', component: BankLoginComponent },
  { path: 'bank-home', component: BankHomeComponent },
  {path: 'user', component: UserAccountsComponent},
  {path: 'notification', component: NotificationsComponent},
  {
    path: 'home',
    component: BankDashboardHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'setting', component: BankAccountSettingsComponent },
      { path: 'dashboard', component: BankDashboardComponent },
      { path: 'update', component: BankUpdateComponent },
      { path: 'password', component: ChangeBankPasswordComponent },
    ],
  },
 {
    path: 'account',
    component: AccountHomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AccountListComponent },
      { path: 'settings/:shortName', component: AccountSettingsComponent },
      { path: 'create', component: CreateAccountSettingComponent },
    ],
  },
  {
    path: 'loan',
    component: LoansComponent,
    children: [
      {path: '', redirectTo: 'type/list', pathMatch: 'full'},
      {path: 'type/list', component: LoanTypeListComponent},
      {path: 'list', component: LoanListComponent},
      {path: 'create', component: CreateLoanComponent},
      {path: 'update', component: UpdateLoanComponent},
      {path: 'view', component: ViewSingleLoanApplicationComponent},
      {path: 'application', component: BankLoanApplicationsComponent}
    ]
  },
  { path: '**', redirectTo: 'home/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
