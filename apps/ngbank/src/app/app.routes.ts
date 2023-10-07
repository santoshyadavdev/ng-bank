import { Route } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { userFeature } from '@ngbank/user/store';
import { userRoutes } from '@ngbank/user/ui';

export const appRoutes: Route[] = [...userRoutes];
