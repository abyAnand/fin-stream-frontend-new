import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  if (!StorageService.hasToken()) {
    return true; // Allow access for users who are not logged in
  }
  return state.url.includes('login') || state.url.includes('register') ? true : false;
};
