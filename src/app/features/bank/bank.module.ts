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
