import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';

const routes: Routes = [
  {
    path: '',
  component: LoginComponent,

},
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:"user",
    loadChildren: () => import("./features/user/user.module").then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
