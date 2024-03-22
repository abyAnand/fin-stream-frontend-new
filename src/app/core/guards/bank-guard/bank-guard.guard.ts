import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const bankGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);


  const role = StorageService.getUserRole();


  if (StorageService.hasToken()) {
    if(StorageService.getUserRole() === 'ROLE_BANK'){
      return true; 
    }
    
  }
  if(StorageService.getUserRole() === 'ROLE_USER'){
    router.navigateByUrl("user/dashboard");
  }
  if(StorageService.getUserRole() === 'ROLE_ADMIN'){
    router.navigateByUrl("admin/dashboard");
  }
  return false; 
};
