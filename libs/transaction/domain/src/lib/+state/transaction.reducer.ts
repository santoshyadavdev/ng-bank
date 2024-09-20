import { createFeature, createReducer, on } from '@ngrx/store';
import { Transaction } from '../entities/transaction';
import {
  AccountApiActions,
  TransactionApiActions,
  TransactionListActions,
} from './transaction.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../entities/account';
import { LoadStatus } from '@ngbank/util-entities';

export interface TransactionState {
  transactions: Transaction[];
  accounts: Account[];
  selectedAccountId: string | null;
  error: HttpErrorResponse | null;
  loadStatus: LoadStatus;
}

export const initialState: TransactionState = {
  transactions: [],
  accounts: [],
  selectedAccountId: null,
  error: null,
  loadStatus: 'NOT_LOADED',
};

export const transactionFeature = createFeature({
  name: 'transaction',
  reducer: createReducer(
    initialState,
    on(
      TransactionApiActions.transactionsLoadedSuccess,
      (state: TransactionState, { transactions }): TransactionState => ({
        ...state,
        transactions,
        error: null,
        loadStatus: 'LOADED',
      })
    ),
    on(
      TransactionApiActions.transactionCreatedSuccess,
      (state: TransactionState, { transaction }): TransactionState => ({
        ...state,
        transactions: [transaction, ...state.transactions],
        error: null,
      })
    ),
    on(
      AccountApiActions.accountsLoadedSuccess,
      (state: TransactionState, { accounts }): TransactionState => ({
        ...state,
        accounts,
        error: null,
      })
    ),
    on(
      TransactionListActions.selectAccount,
      (state: TransactionState, { accountId }): TransactionState => ({
        ...state,
        selectedAccountId: accountId,
        loadStatus: 'LOADING',
      })
    ),
    on(
      TransactionApiActions.transactionsLoadedFailure,
      TransactionApiActions.transactionCreatedFailure,
      AccountApiActions.accountsLoadedFailure,
      (state: TransactionState, { error }): TransactionState => ({
        ...state,
        error,
        loadStatus: 'LOADED',
      })
    )
  ),
});
