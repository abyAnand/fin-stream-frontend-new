import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';
import { NavbarComponent } from '../../../features/user/dashboard/navbar/navbar.component';

export const noAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  const role = StorageService.getUserRole();


  if (!StorageService.hasToken()) {
    return true; // Only allow access for users who are not logged in
  }

  if(StorageService.getUserRole() === 'ROLE_BANK'){
    router.navigateByUrl("bank/home/dashboard")
  }
  if(StorageService.getUserRole() === 'ROLE_USER'){
    router.navigateByUrl("user/dashboard");
  }
  if(StorageService.getUserRole() === 'ROLE_ADMIN'){
    router.navigateByUrl("admin/dashboard");
  }

  return false; // Redirect logged in users away from login/register routes
};
