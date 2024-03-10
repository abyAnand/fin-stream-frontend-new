import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { noAuthGuard } from 'src/app/core/guards/noAuth-guard/no-auth.guard';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { BankListComponent } from './dashboard/bank-list/bank-list.component';
import { ShowBankAccountsComponent } from './show-bank-accounts/show-bank-accounts.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { ShowUserAccountsComponent } from './show-user-accounts/show-user-accounts.component';
import { ShowUserAccountDetailsComponent } from './show-user-account-details/show-user-account-details.component';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { LoanComponent } from './loan/loan/loan.component';
import { UserLoansComponent } from './loan/user-loans/user-loans.component';
import { UserLoansRejectedComponent } from './loan/user-loans-rejected/user-loans-rejected.component';
import { BankLoansComponent } from './loan/bank-loans/bank-loans.component';
import { UserLoanApplyComponent } from './loan/user-loan-apply/user-loan-apply.component';
import { UserLoansPendingComponent } from './loan/user-loans-pending/user-loans-pending.component';
import { DepositComponent } from './transaction/deposit/deposit.component';
import { TransferComponent } from './transaction/transfer/transfer.component';
import { NotificationComponent } from './notification/notification.component';
import { TransactionComponent } from './transaction/transaction/transaction.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
children:[
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {path: 'user', component: UserDashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'password', component: ChangePasswordComponent},
  { path: 'accounts/:bankId', component: ShowBankAccountsComponent },
  { path: 'create/:accountType', component: CreateBankAccountComponent },
  {path: 'details', component: ShowUserAccountDetailsComponent},
  {path: 'edit', component: EditUserAccountComponent}
]},
{path: 'bank', component: BankListComponent},
{path: 'notification', component: NotificationComponent},
{path: 'account', component: ShowUserAccountsComponent, children:[
  {path: '', redirectTo: 'deposit', pathMatch: 'full'},
  {path: 'deposit', component: DepositComponent},
  {path: 'transfer', component: TransferComponent}
]},


{
  path: 'loan',
  component: LoanComponent,
  children: [
    {path: '', redirectTo: 'bank', pathMatch: 'full'},
    {path: 'pending', component: UserLoansPendingComponent},
    {path: 'rejected', component: UserLoansRejectedComponent},
    {path: 'apply', component: UserLoanApplyComponent},
    {path: 'user', component: UserLoansComponent},
    {path: 'bank', component: BankLoansComponent}


  ]
},
{ path: '**', redirectTo: 'dashboard/user/profile', pathMatch: 'full' },

  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {path:'register', component: RegisterComponent, canActivate: [noAuthGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
