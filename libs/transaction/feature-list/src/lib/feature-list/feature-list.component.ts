import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import {
  NewTransaction,
  Transaction,
  transactionFeature,
  TransactionListActions,
} from '@ngbank/transaction-domain';
import { Store } from '@ngrx/store';
import { PageComponent } from '@ngbank/ui';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'ngbank-feature-list',
  standalone: true,
  imports: [CommonModule, PageComponent, MatListModule],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  readonly transactionsGroupedByBookingDate$: Observable<Array<{
    bookingDate: string;
    transactions: Transaction[];
  }> | null>;

  private readonly store: Store = inject(Store);

  constructor() {
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
  }

  ngOnInit() {
    this.store.dispatch(TransactionListActions.opened());
  }

  createTransaction() {
    const transaction: NewTransaction = {
      amount: 12.01,
      bookingDate: new Date(),
      currencyCode: 'EUR',
      originIban: 'DE75512108001245126199',
      e2eReference: 'Thank you!',
      counterPartyIban: 'DE75512108001245126198',
      counterPartyName: 'Max Mustermann',
    };

    this.store.dispatch(
      TransactionListActions.createTransaction({ transaction })
    );
  }
}
