import { FormControl } from '@angular/forms';

export interface NewTransactionForm {
  counterPartyName: FormControl<string>;
  counterPartyIban: FormControl<string>;
  amount: FormControl<number | null>;
  e2eReference: FormControl<string | null>;
}
