import { Route } from '@angular/router';
import { userRoutes } from '@ngbank/user/ui';
import { featureListRoutes } from '@ngbank/transaction-feature-list';

export const appRoutes: Route[] = [...userRoutes, ...featureListRoutes];
