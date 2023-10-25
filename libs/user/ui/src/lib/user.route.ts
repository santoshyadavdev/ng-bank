import { Route } from '@angular/router';
import { authGuard } from '@ngbank/util-auth';

export const userRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
];
