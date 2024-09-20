import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@ngbank/environment';
import { map, Observable } from 'rxjs';
import { Account } from '../entities/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiPath = `${environment.apiEndpoint}/databases/${environment.databases.banking.databaseId}/collections/${environment.databases.banking.collections.accounts.collectionId}/documents`;

  getAccounts(): Observable<Account[]> {
    return this.httpClient
      .get<{ total: number; documents: Account[] }>(`${this.apiPath}`)
      .pipe(map((res) => res.documents));
  }
}
