import { createFeature, createReducer } from '@ngrx/store';
import { Transaction } from '../entities/transaction';

export interface TransactionState {
  transactions: Transaction[];
}

export const initialState: TransactionState = {
  transactions: [],
};

export const transactionFeature = createFeature({
  name: 'transaction',
  reducer: createReducer(initialState),
});
