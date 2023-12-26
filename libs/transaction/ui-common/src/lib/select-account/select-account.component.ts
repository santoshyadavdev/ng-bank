import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Account } from '@ngbank/transaction-domain';

@Component({
  selector: 'ngbank-select-account',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss'],
})
export class SelectAccountComponent implements OnInit, OnDestroy {
  readonly form: FormGroup<{ account: FormControl<string | null> }>;

  @Input() set accounts(accounts: Account[] | null) {
    this._accounts = accounts;

    if (!!accounts?.length && accounts?.length >= 1) {
      this.form.patchValue({ account: accounts[0].$id });
    }
  }

  get accounts() {
    return this._accounts;
  }

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  private _accounts: Account[] | null = null;

  private readonly onDestroy$$: Subject<void> = new Subject<void>();
  private readonly fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      account: this.fb.control<string | null>(null),
    });
  }

  ngOnInit() {
    this.form.controls.account.valueChanges
      .pipe(takeUntil(this.onDestroy$$))
      .subscribe((accountId) => {
        if (accountId) {
          this.selectionChange.next(accountId);
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$$.next();
    this.onDestroy$$.complete();
  }
}
