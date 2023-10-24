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

  getTransactions(): Observable<Transaction[]> {
    return this.httpClient
      .get<{ total: number; documents: Transaction[] }>(`${this.apiPath}`)
      .pipe(map((res) => res.documents));
  }

  createTransaction(
    transaction: NewTransaction,
    userId: string
  ): Observable<Transaction> {
    if (!userId.length) {
      throw new Error('Not authenticated!');
    }

    return this.httpClient.post<Transaction>(`${this.apiPath}`, {
      documentId: 'unique()',
      data: transaction,
      permissions: [`read("user:${userId}")`],
    });
  }
}
