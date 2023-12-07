import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore, Store } from '@ngrx/store';
import {
  createAccount$,
  getCurrentUser$,
  login$,
  LoginService,
  logout$,
  redirectAfterLogin$,
  snackBarAfterError$,
  User,
  userActions,
  userFeature,
} from '@ngbank/user/store';
import { provideEffects } from '@ngrx/effects';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { environment } from '@ngbank/environment';
import { catchError, Observable, of, tap } from 'rxjs';

const appWriteInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modifiedReq = req.clone({
    headers: req.headers.set('X-Appwrite-Project', environment.projectId),
    withCredentials: true,
  });

  return next(modifiedReq);
};

export function initializeApp(loginService: LoginService, store: Store) {
  return (): Observable<User | null> =>
    loginService.getCurentAccount().pipe(
      tap((user) =>
        store.dispatch(userActions.getCurrentUserSuccess({ user }))
      ),
      catchError(() => of(null))
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([appWriteInterceptor])),
    provideRouter(appRoutes),
    provideAnimations(),
    provideStore(),
    provideState(userFeature),
    provideEffects({
      login$,
      createAccount$,
      logout$,
      redirectAfterLogin$,
      snackBarAfterError$,
      getCurrentUser$,
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established outside the Angular zone for better performance
    }),
    importProvidersFrom(MatSnackBarModule),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [LoginService, Store],
    },
  ],
};
