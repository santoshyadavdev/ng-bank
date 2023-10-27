import { createFeature, createReducer, on } from '@ngrx/store';
import { Transaction } from '../entities/transaction';
import {
  AccountApiActions,
  TransactionApiActions,
  TransactionListActions,
} from './transaction.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../entities/account';

export interface TransactionState {
  transactions: Transaction[];
  accounts: Account[];
  selectedAccountId: string | null;
  error: HttpErrorResponse | null;
}

export const initialState: TransactionState = {
  transactions: [],
  accounts: [],
  selectedAccountId: null,
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
        error: null,
      })
    ),
    on(
      TransactionApiActions.transactionCreatedSuccess,
      (state: TransactionState, { transaction }) => ({
        ...state,
        transactions: [transaction, ...state.transactions],
        error: null,
      })
    ),
    on(
      AccountApiActions.accountsLoadedSuccess,
      (state: TransactionState, { accounts }) => ({
        ...state,
        accounts,
        error: null,
      })
    ),
    on(
      TransactionListActions.selectAccount,
      (state: TransactionState, { accountId }) => ({
        ...state,
        selectedAccountId: accountId,
      })
    ),
    on(
      TransactionApiActions.transactionsLoadedFailure,
      TransactionApiActions.transactionCreatedFailure,
      AccountApiActions.accountsLoadedFailure,
      (state: TransactionState, { error }) => ({ ...state, error })
    )
  ),
});
