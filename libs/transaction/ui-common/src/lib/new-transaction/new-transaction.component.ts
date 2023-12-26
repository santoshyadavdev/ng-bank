import { Component, Inject, inject, ViewChild } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NewTransaction,
  NewTransactionDialogData,
  NewTransactionForm,
} from '@ngbank/transaction-domain';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'ngbank-new-transaction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent {
  @ViewChild('f') ngForm!: NgForm;

  readonly form: FormGroup<NewTransactionForm>;

  get counterPartyName() {
    return this.form.get('counterPartyName');
  }

  get counterPartyIban() {
    return this.form.get('counterPartyIban');
  }

  get amount() {
    return this.form.get('amount');
  }

  get e2eReference() {
    return this.form.get('e2eReference');
  }

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<NewTransactionComponent> = inject(
    MatDialogRef<NewTransactionComponent>
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: NewTransactionDialogData
  ) {
    this.form = this.fb.group<NewTransactionForm>({
      counterPartyName: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      counterPartyIban: this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      amount: this.fb.control<number | null>(null, {
        validators: [Validators.min(0.01), Validators.required],
      }),
      e2eReference: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.maxLength(140)],
      }),
    });
  }

  submit() {
    if (this.data.selectedAccountId && this.form.value.amount) {
      const transaction: NewTransaction = {
        amount: -this.form.value.amount,
        bookingDate: new Date(),
        currencyCode: 'EUR',
        originIban: 'DE75512108001245126199',
        ...(this.form.value.e2eReference && {
          e2eReference: this.form.value.e2eReference,
        }),
        counterPartyIban: this.form.value.counterPartyIban,
        counterPartyName: this.form.value.counterPartyName,
        account: this.data.selectedAccountId,
      };

      this.dialogRef.close(transaction);

      this.ngForm.resetForm();
    }
  }
}
