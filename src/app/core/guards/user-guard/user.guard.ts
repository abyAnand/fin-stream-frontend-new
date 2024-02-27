import { CanActivateFn } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

export const userGuard: CanActivateFn = (route, state) => {

  const userLoggedIn = StorageService.isUserLoggedIn();



  if(!userLoggedIn){
    return false;
  }
  return true;
};
