import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { noAuthGuard } from 'src/app/core/guards/noAuth-guard/no-auth.guard';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
children:[
  {path: 'user', component: UserDashboardComponent},
  {path: 'profile', component: ProfileComponent}
]},
  
  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  {path:'register', component: RegisterComponent, canActivate: [noAuthGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
