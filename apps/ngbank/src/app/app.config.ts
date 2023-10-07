import { ApplicationConfig } from '@angular/core';
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
import { provideHttpClient, withFetch } from '@angular/common/http';

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
  ],
};
