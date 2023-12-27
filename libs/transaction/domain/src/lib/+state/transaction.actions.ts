import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Transaction } from '../entities/transaction';
import { NewTransaction } from '../entities/new-transaction';
import { Account } from '../entities/account';

export const TransactionListActions = createActionGroup({
  source: 'Transaction List',
  events: {
    Opened: emptyProps(),
    'Create Transaction': props<{
      transaction: NewTransaction;
    }>(),
    'Select Account': props<{ accountId: string }>(),
  },
});

export const TransactionApiActions = createActionGroup({
  source: 'Transaction API',
  events: {
    'Transactions Loaded Success': props<{
      transactions: Transaction[];
    }>(),
    'Transactions Loaded Failure': props<{ error: HttpErrorResponse }>(),
    'Transaction Created Success': props<{
      transaction: Transaction;
    }>(),
    'Transaction Created Failure': props<{ error: HttpErrorResponse }>(),
  },
});

export const AccountApiActions = createActionGroup({
  source: 'Account API',
  events: {
    'Accounts Loaded Success': props<{
      accounts: Account[];
    }>(),
    'Accounts Loaded Failure': props<{ error: HttpErrorResponse }>(),
  },
});
