import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import {
  createAccount$,
  createJWTToken$,
  login$,
  logout$,
  redirectAfterLogin$,
  userFeature,
} from '@ngbank/user/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    provideStore(),
    provideState(userFeature),
    provideEffects({
      login$,
      createAccount$,
      createJWTToken$,
      logout$,
      redirectAfterLogin$,
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true, // If set to true, the connection is established outside the Angular zone for better performance
    }),
  ],
};
