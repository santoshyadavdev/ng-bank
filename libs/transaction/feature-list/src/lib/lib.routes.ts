import { Route } from '@angular/router';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { provideDomain } from '@ngbank/transaction-domain';
import { authGuard } from '@ngbank/util-auth';

export const featureListRoutes: Route[] = [
  {
    path: 'transactions',
    component: FeatureListComponent,
    providers: [provideDomain()],
    canActivate: [authGuard],
  },
];
