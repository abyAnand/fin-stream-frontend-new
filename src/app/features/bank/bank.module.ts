import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankHomeComponent } from './bank-home/bank-home.component';
import { BankTopNavbarComponent } from './bank-home/bank-top-navbar/bank-top-navbar.component';
import { BankProfileComponent } from './bank-home/bank-top-navbar/bank-profile/bank-profile.component';
import { BankSideNavbarComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-side-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BankDashboardHomeComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-dashboard-home.component';
import { BankDashboardComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-dashboard/bank-dashboard.component';
import { BankUpdateComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-update/bank-update.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { BankLoginComponent } from './bank-login/bank-login.component';


@NgModule({
  declarations: [



    BankHomeComponent,
           BankTopNavbarComponent,
           BankProfileComponent,
           BankSideNavbarComponent,

           BankDashboardHomeComponent,
           BankDashboardComponent,
           BankUpdateComponent,
           BankRegisterComponent,
           BankLoginComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BankModule { }
