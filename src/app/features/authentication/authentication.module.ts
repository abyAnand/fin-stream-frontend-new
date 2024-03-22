import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { BankLoginComponent } from './bank-login/bank-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BankLoginComponent,
    AdminLoginComponent,
    BankRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
