import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  if (!StorageService.hasToken()) {
      return true; // Only allow access for users who are not logged in
  }
  return false; // Redirect logged in users away from login/register routes
};
