import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../entities/transaction';
import { NewTransaction } from '../entities/new-transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiPath = `${environment.apiEndpoint}/databases/${environment.databases.banking.databaseId}/collections/${environment.databases.banking.collections.transactions.collectionId}/documents`;

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return this.httpClient
      .get<{ total: number; documents: Transaction[] }>(
        `${this.apiPath}?queries[]=orderDesc("bookingDate")&queries[]=equal("account", ${accountId})`
      )
      .pipe(
        map((res) =>
          res.documents.map((document) => ({
            ...document,
            bookingDate: new Date(document.bookingDate),
          }))
        )
      );
  }

  createTransaction(transaction: NewTransaction): Observable<Transaction> {
    return this.httpClient
      .post<Transaction>(`${this.apiPath}`, {
        documentId: 'unique()',
        data: transaction,
      })
      .pipe(
        map((transaction) => ({
          ...transaction,
          bookingDate: new Date(transaction.bookingDate),
        }))
      );
  }
}
