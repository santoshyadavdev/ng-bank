import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('@ngbank/user').then((mod) => mod.LoginComponent),
  },
];
