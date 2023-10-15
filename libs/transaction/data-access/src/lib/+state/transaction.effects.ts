import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { TransactionService } from '../infrastructure/transaction.service';
import {
  TransactionApiActions,
  TransactionListActions,
} from './transaction.actions';

@Injectable({ providedIn: 'root' })
export class TransactionEffects {
  private readonly transactionService: TransactionService =
    inject(TransactionService);
  private readonly actions$: Actions = inject(Actions);

  loadTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionListActions.opened),
      exhaustMap(() =>
        this.transactionService.getTransactions().pipe(
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
      concatMap(({ transaction }) =>
        this.transactionService.createTransaction(transaction).pipe(
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
}
