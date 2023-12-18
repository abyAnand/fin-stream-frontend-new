import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  // If there is a token and the user or admin is logged in, deny access
  if (StorageService.hasToken() && (StorageService.isUserLoggedIn() || StorageService.isAdminLoggedIn())) {

    return false;
  }
  return true; // Allow access for users who are not logged in
};
