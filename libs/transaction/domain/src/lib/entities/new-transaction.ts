export interface NewTransaction {
  amount: number;
  bookingDate: Date;
  currencyCode: string;
  originIban: string;
  e2eReference?: string;
  counterPartyIban?: string;
  counterPartyName?: string;
}
