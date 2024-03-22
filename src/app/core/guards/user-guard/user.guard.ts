import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  const role = StorageService.getUserRole();


  if (StorageService.hasToken()) {
    if(StorageService.getUserRole() === 'ROLE_USER'){
      return true; 
    }
    
  }
  if(StorageService.getUserRole() === 'ROLE_BANK'){
    router.navigateByUrl("bank/home/dashboard")
  }
  if(StorageService.getUserRole() === 'ROLE_ADMIN'){
    router.navigateByUrl("admin/dashboard");
  }
  return false; 
};
