import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankHomeComponent } from './bank-home/bank-home.component';
import { BankDashboardComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-dashboard/bank-dashboard.component';
import { BankDashboardHomeComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-dashboard-home.component';
import { BankUpdateComponent } from './bank-home/bank-top-navbar/bank-profile/bank-side-navbar/bank-dashboard-home/bank-update/bank-update.component';
import { BankRegisterComponent } from './bank-register/bank-register.component';
import { BankLoginComponent } from './bank-login/bank-login.component';


const routes: Routes = [
  {path: 'register', component: BankRegisterComponent},
  {path: 'login', component: BankLoginComponent},
  { path: 'bank-home', component: BankHomeComponent},
  {path: 'home', component: BankDashboardHomeComponent,
  children:[
    {path: 'dashboard', component:BankDashboardComponent },
    {path: 'update', component: BankUpdateComponent}

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
