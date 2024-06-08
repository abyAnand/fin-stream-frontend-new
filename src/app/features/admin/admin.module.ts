import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleUserComponent } from './user/single-user/single-user.component';
import { AllBankComponent } from './bank/all-bank/all-bank.component';
import { SingleBankComponent } from './bank/single-bank/single-bank.component';
import { CreateBankComponent } from './bank/create-bank/create-bank.component';
import { AllAccountComponent } from './account/all-account/all-account.component';
import { SingleAccountComponent } from './account/single-account/single-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AccountDetailModalComponent } from './bank/single-bank/account-detail-modal/account-detail-modal.component';
import { MatDialogActions } from '@angular/material/dialog';
import { NotificationComponent } from './notification/notification.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    TopNavbarComponent,
    AllUsersComponent,
    CreateUserComponent,
    SingleUserComponent,
    AllBankComponent,
    SingleBankComponent,
    CreateBankComponent,
    AllAccountComponent,
    SingleAccountComponent,
    DashboardComponent,
    LoginComponent,

    AccountDetailModalComponent,
      NotificationComponent,
      EditUserComponent
  ],
  imports: [
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgApexchartsModule



  ]
})
export class AdminModule { }
