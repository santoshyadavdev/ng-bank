import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userFeature } from '@ngbank/user/store';
import { map } from 'rxjs';

export const userGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  return inject(Store)
    .select(userFeature.selectUserIsAuthenticated)
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : router.parseUrl('/login')
      )
    );
};
