import { NewTransaction } from './new-transaction';
import { BaseDocument } from '@ngbank/util-entities';
import { Account } from './account';

export interface Transaction extends BaseDocument, NewTransaction {}
