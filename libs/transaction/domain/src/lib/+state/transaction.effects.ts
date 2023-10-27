import { inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { TransactionService } from '../infrastructure/transaction.service';
import {
  AccountApiActions,
  TransactionApiActions,
  TransactionListActions,
} from './transaction.actions';
import { Store } from '@ngrx/store';
import { userFeature } from '@ngbank/user/store';
import { AccountService } from '../infrastructure/account.service';

@Injectable({ providedIn: 'root' })
export class TransactionEffects {
  private readonly accountService: AccountService = inject(AccountService);
  private readonly transactionService: TransactionService =
    inject(TransactionService);
  private readonly actions$: Actions = inject(Actions);
  private readonly store: Store = inject(Store);

  loadTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionListActions.selectAccount),
      exhaustMap(({ accountId }) =>
        this.transactionService.getTransactionsByAccount(accountId).pipe(
          map((transactions) =>
            TransactionApiActions.transactionsLoadedSuccess({ transactions })
          ),
          catchError((error) =>
            of(TransactionApiActions.transactionsLoadedFailure({ error }))
          )
        )
      )
    );
  });

  createTransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionListActions.createTransaction),
      concatLatestFrom(() => this.store.select(userFeature.selectUser)),
      concatMap(([{ transaction }, user]) =>
        this.transactionService
          .createTransaction(transaction, user?.$id ?? null)
          .pipe(
            map((transaction) =>
              TransactionApiActions.transactionCreatedSuccess({ transaction })
            ),
            catchError((error) =>
              of(TransactionApiActions.transactionCreatedFailure({ error }))
            )
          )
      )
    );
  });

  loadAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionListActions.opened),
      exhaustMap(() =>
        this.accountService.getAccounts().pipe(
          map((accounts) =>
            AccountApiActions.accountsLoadedSuccess({ accounts })
          ),
          catchError((error) =>
            of(AccountApiActions.accountsLoadedFailure({ error }))
          )
        )
      )
    );
  });
}
