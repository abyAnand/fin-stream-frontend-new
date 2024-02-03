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

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
children:[
  {path: 'bank', component: BankListComponent},
  {path: 'user', component: UserDashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'password', component: ChangePasswordComponent},
  { path: 'accounts/:bankId', component: ShowBankAccountsComponent },
  { path: 'create/:accountType', component: CreateBankAccountComponent },
  {path: 'account', component: ShowUserAccountsComponent},
  {path: 'details', component: ShowUserAccountDetailsComponent},
  {path: 'edit', component: EditUserAccountComponent}
]},

  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {path:'register', component: RegisterComponent, canActivate: [noAuthGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
