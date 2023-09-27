import { CanActivateFn } from '@angular/router';
import { Claims } from '../interfaces/claims';

export const adminGuard: CanActivateFn = (route, state) => {
  let claims: Claims = JSON.parse(atob(sessionStorage.getItem("token")!.split('.')[1]));
  console.log(claims);
  return true;
};
