import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authData = localStorage.getItem('authData');
  const router = inject(Router);

  if (authData) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
