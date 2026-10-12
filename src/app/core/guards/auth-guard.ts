import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  const checkAccess = () =>
    authService.currentUser()
      ? true
      : router.createUrlTree(['/login']);

  if (authService.sessionChecked()) {
    return checkAccess();
  }

  return authService.getCurrentUser().pipe(
    map(() => checkAccess()),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};