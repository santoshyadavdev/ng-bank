import { createFeature, createReducer, on } from '@ngrx/store';
import { Transaction } from '../entities/transaction';
import { TransactionApiActions } from './transaction.actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface TransactionState {
  transactions: Transaction[];
  error: HttpErrorResponse | null;
}

export const initialState: TransactionState = {
  transactions: [],
  error: null,
};

export const transactionFeature = createFeature({
  name: 'transaction',
  reducer: createReducer(
    initialState,
    on(
      TransactionApiActions.transactionsLoadedSuccess,
      (state: TransactionState, { transactions }) => ({
        ...state,
        transactions,
      })
    ),
    on(
      TransactionApiActions.transactionCreatedSuccess,
      (state: TransactionState, { transaction }) => ({
        ...state,
        transactions: [...state.transactions, transaction],
      })
    ),
    on(
      TransactionApiActions.transactionsLoadedFailure,
      TransactionApiActions.transactionCreatedFailure,
      (state: TransactionState, { error }) => ({ ...state, error })
    )
  ),
});
