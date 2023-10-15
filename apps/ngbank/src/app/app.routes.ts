import { Route } from '@angular/router';
import { userRoutes } from '@ngbank/user/ui';
import { featureListRoutes } from '@ngbank/feature-list';

export const appRoutes: Route[] = [...userRoutes, ...featureListRoutes];
