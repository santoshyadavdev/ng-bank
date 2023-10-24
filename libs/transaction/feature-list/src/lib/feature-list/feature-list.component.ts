import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  NewTransaction,
  Transaction,
  transactionFeature,
  TransactionListActions,
} from '@ngbank/transaction-domain';
import { Store } from '@ngrx/store';
import { PageComponent } from '@ngbank/ui';

@Component({
  selector: 'ngbank-feature-list',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
})
export class FeatureListComponent implements OnInit {
  readonly transactions$: Observable<Transaction[]>;

  private readonly store: Store = inject(Store);

  constructor() {
    this.transactions$ = this.store.select(
      transactionFeature.selectTransactions
    );
  }

  ngOnInit() {
    this.store.dispatch(TransactionListActions.opened());
  }

  createTransaction() {
    const transaction: NewTransaction = {
      amount: 12.01,
    };

    this.store.dispatch(
      TransactionListActions.createTransaction({ transaction })
    );
  }
}
