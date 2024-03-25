import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankLoginComponent } from './bank-login/bank-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'bank/login', component: BankLoginComponent},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'bank/register', component: BankRegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
