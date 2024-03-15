import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';

import { userGuard } from './core/guards/user-guard/user.guard';
import { noAuthGuard } from 'src/app/core/guards/noAuth-guard/no-auth.guard';


const routes: Routes = [
  {
    path: '',
  component: LoginComponent,
  canActivate: [noAuthGuard]

},
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },
  {
    path:"user",
    loadChildren: () => import("./features/user/user.module").then(m => m.UserModule),
    // canActivateChild: [userGuard]
  },
  {
    path:"bank",
    loadChildren: () => import("./features/bank/bank.module").then(m => m.BankModule)
  },
  {
    path:"admin",
    loadChildren: () => import("./features/admin/admin.module").then(m => m.AdminModule),
    // canActivateChild: [userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
