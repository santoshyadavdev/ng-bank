import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { transactionFeature } from './lib/+state/transaction.reducer';
import { TransactionEffects } from './lib/+state/transaction.effects';

export function provideDomain(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(transactionFeature),
    provideEffects(TransactionEffects),
  ]);
}
