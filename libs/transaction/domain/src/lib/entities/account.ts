import { BaseDocument } from '@ngbank/util-entities';

export interface Account extends BaseDocument {
  iban: string;
}
