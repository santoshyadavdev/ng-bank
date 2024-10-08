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
    path: 'resetpassword',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },

  {
    path: 'updatepassword',
    loadComponent: () =>
      import('./update-password/update-password.component').then(
        (m) => m.UpdatePasswordComponent
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
  {
    path: 'verify',
    loadComponent: () =>
      import('./verify/verify.component').then((m) => m.VerifyComponent),
  },
];
