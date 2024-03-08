import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankHomeComponent } from './bank-home/bank-home.component';
import { BankTopNavbarComponent } from './bank-home/bank-top-navbar/bank-top-navbar.component';
import { BankProfileComponent } from './bank-home/bank-top-navbar/bank-profile/bank-profile.component';
import { BankSideNavbarComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-side-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BankDashboardHomeComponent } from './bank-home/bank-top-navbar/bank-profile/bank-dashboard-home/bank-dashboard-home.component';
import { BankDashboardComponent } from './bank-home/bank-top-navbar/bank-profile/bank-dashboard/bank-dashboard.component';
import { BankUpdateComponent } from './bank-home/bank-top-navbar/bank-profile/bank-update/bank-update.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { BankLoginComponent } from './bank-login/bank-login.component';
import { ChangeBankPasswordComponent } from './bank-home/bank-top-navbar/bank-profile/change-bank-password/change-bank-password.component';
import { BankAccountSettingsComponent } from './bank-home/bank-top-navbar/bank-profile/bank-account-settings/bank-account-settings.component';
import { AccountsComponent } from './bank-home/bank-top-navbar/accounts/accounts.component';
import { AccountSideNavbarComponent } from './bank-home/bank-top-navbar/accounts/account-side-navbar/account-side-navbar.component';
import { AccountHomeComponent } from './bank-home/bank-top-navbar/accounts/account-home/account-home.component';
import { AccountListComponent } from './bank-home/bank-top-navbar/accounts/account-list/account-list.component';
import { AccountSettingsComponent } from './bank-home/bank-top-navbar/accounts/account-settings/account-settings.component';
import { CreateAccountSettingComponent } from './bank-home/bank-top-navbar/accounts/create-account-setting/create-account-setting.component';
import { EditAccountSettingComponent } from './bank-home/bank-top-navbar/accounts/edit-account-setting/edit-account-setting.component';
import { StoreModule } from '@ngrx/store';
import { accountSettingReducer } from 'src/app/Store/accountSetting/accountSetting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountSettingEffects } from 'src/app/Store/accountSetting/accountSetting.effects';
import { LoansComponent } from './bank-home/bank-top-navbar/loans/loans.component';
import { CreateLoanComponent } from './bank-home/bank-top-navbar/loans/create-loan/create-loan.component';
import { UpdateLoanComponent } from './bank-home/bank-top-navbar/loans/update-loan/update-loan.component';
import { LoanListComponent } from './bank-home/bank-top-navbar/loans/loan-list/loan-list.component';
import { LoanSideNavbarComponent } from './bank-home/bank-top-navbar/loans/loan-side-navbar/loan-side-navbar.component';
import { CreateLoanTypeComponent } from './bank-home/bank-top-navbar/loans/create-loan-type/create-loan-type.component';
import { LoanTypeListComponent } from './bank-home/bank-top-navbar/loans/loan-type-list/loan-type-list.component';
import { UpdateLoanTypeComponent } from './bank-home/bank-top-navbar/loans/update-loan-type/update-loan-type.component';
import { BankLoanApplicationsComponent } from './bank-home/bank-top-navbar/loans/bank-loan-applications/bank-loan-applications.component';
import { ViewSingleLoanApplicationComponent } from './bank-home/bank-top-navbar/loans/view-single-loan-application/view-single-loan-application.component';

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
           BankLoginComponent,
           ChangeBankPasswordComponent,
           BankAccountSettingsComponent,
           AccountsComponent,
           AccountSideNavbarComponent,
           AccountHomeComponent,
           AccountListComponent,
           AccountSettingsComponent,
           CreateAccountSettingComponent,
           EditAccountSettingComponent,
           LoansComponent,
           CreateLoanComponent,
           UpdateLoanComponent,
           LoanListComponent,
           LoanSideNavbarComponent,
           CreateLoanTypeComponent,
           LoanTypeListComponent,
           UpdateLoanTypeComponent,
           BankLoanApplicationsComponent,
           ViewSingleLoanApplicationComponent,


  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('accountSettings', accountSettingReducer),
    EffectsModule.forFeature([AccountSettingEffects])
  ]
})
export class BankModule { }
