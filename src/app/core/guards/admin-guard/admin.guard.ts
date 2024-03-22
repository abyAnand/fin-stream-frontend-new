import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);


  const role = StorageService.getUserRole();


  if (StorageService.hasToken()) {
    if(StorageService.getUserRole() === 'ROLE_ADMIN'){
      return true; 
    }
  }
  if(StorageService.getUserRole() === 'ROLE_USER'){
    router.navigateByUrl("user/dashboard");
  }
  if(StorageService.getUserRole() === 'ROLE_BANK'){
    router.navigateByUrl("bank/home/dashboard")
  }
  return false; 
};
