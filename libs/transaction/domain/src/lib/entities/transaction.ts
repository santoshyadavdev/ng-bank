import { NewTransaction } from './new-transaction';
import { BaseDocument } from '@ngbank/util-entities';

export interface Transaction extends BaseDocument, NewTransaction {}
