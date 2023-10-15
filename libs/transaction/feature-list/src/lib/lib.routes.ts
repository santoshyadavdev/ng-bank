import { Route } from '@angular/router';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { provideDomain } from '@ngbank/data-access';

export const featureListRoutes: Route[] = [
  {
    path: 'transactions',
    component: FeatureListComponent,
    providers: [provideDomain()],
  }, // todo: add guard
];
