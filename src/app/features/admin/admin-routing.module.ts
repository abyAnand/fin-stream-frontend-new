import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { SingleUserComponent } from './user/single-user/single-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { AllBankComponent } from './bank/all-bank/all-bank.component';
import { SingleBankComponent } from './bank/single-bank/single-bank.component';
import { CreateBankComponent } from './bank/create-bank/create-bank.component';
import { AllAccountComponent } from './account/all-account/all-account.component';
import { SingleAccountComponent } from './account/single-account/single-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path:'user', component: AllUsersComponent},
  {path: 'user/single', component: SingleUserComponent},
  {path: 'user/create', component: CreateUserComponent},
  {path: 'bank', component: AllBankComponent},
  {path: 'bank/single', component: SingleBankComponent},
  {path: 'bank/create',component: CreateBankComponent},
  {path: 'account', component: AllAccountComponent},
  {path: 'account/single', component: SingleAccountComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
