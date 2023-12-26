import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import {
  Account,
  Transaction,
  transactionFeature,
  TransactionListActions,
} from '@ngbank/transaction-domain';
import { Store } from '@ngrx/store';
import { PageComponent } from '@ngbank/ui';
import { MatListModule } from '@angular/material/list';
import {
  NewTransactionComponent,
  NewTransactionDialogData,
  SelectAccountComponent,
} from '@ngbank/transaction-ui-common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngbank-feature-list',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    MatListModule,
    SelectAccountComponent,
    NewTransactionComponent,
    MatButtonModule,
  ],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  readonly accounts$: Observable<Account[]>;
  readonly transactionsGroupedByBookingDate$: Observable<Array<{
    bookingDate: string;
    transactions: Transaction[];
  }> | null>;
  readonly selectedAccountId$: Observable<string | null>;

  private readonly store: Store = inject(Store);
  private readonly dialog: MatDialog = inject(MatDialog);

  constructor() {
    this.accounts$ = this.store.select(transactionFeature.selectAccounts);
    this.transactionsGroupedByBookingDate$ = this.store
      .select(transactionFeature.selectTransactions)
      .pipe(
        map((transactions) => {
          if (!transactions.length) {
            return null;
          }

          const map = new Map<string, Transaction[]>();

          transactions.map((i) =>
            map.set(
              i.bookingDate.toDateString(),
              transactions.filter(
                (t) =>
                  t.bookingDate.toDateString() === i.bookingDate.toDateString()
              )
            )
          );

          return Array.from(map.keys()).map((bookingDate) => ({
            bookingDate,
            transactions: map.get(bookingDate) ?? [],
          }));
        })
      );
    this.selectedAccountId$ = this.store.select(
      transactionFeature.selectSelectedAccountId
    );
  }

  ngOnInit() {
    this.store.dispatch(TransactionListActions.opened());
  }

  createTransaction(selectedAccountId: string | null) {
    if (!selectedAccountId) {
      return;
    }

    const dialogRef = this.dialog.open<
      NewTransactionComponent,
      NewTransactionDialogData,
      Transaction | null
    >(NewTransactionComponent, { data: { selectedAccountId } });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((transaction) => {
        this.store.dispatch(
          TransactionListActions.createTransaction({ transaction })
        );
      });
  }

  selectAccount(accountId: string) {
    this.store.dispatch(TransactionListActions.selectAccount({ accountId }));
  }
}
