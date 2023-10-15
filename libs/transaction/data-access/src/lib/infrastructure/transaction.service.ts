import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../entities/transaction';
import { NewTransaction } from '../entities/new-transaction';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiPath = `${environment.apiEndpoint}/databases/${environment.databases.banking.databaseId}/collections/${environment.databases.banking.collections.transactions.collectionId}/documents`;

  getTransactions(): Observable<Transaction[]> {
    return this.httpClient
      .get<{ total: number; documents: Transaction[] }>(`${this.apiPath}`)
      .pipe(map((res) => res.documents));
  }

  createTransaction(transaction: NewTransaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${this.apiPath}`, {
      documentId: uuidv4(),
      data: transaction,
      permissions: ['read("any")'], // todo: only owner should have access to read
    });
  }
}
