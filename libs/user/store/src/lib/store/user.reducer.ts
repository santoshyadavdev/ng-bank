import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../user';
import { userActions } from './user.actions';

interface UserState {
  user: User | null;
  error: string;
}

const initialState: UserState = {
  user: null,
  error: '',
};

const userReducer = createReducer(
  initialState,
  on(userActions.createAccountSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(userActions.emailLoginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(userActions.emailLoginSuccess, (state, { user }) => ({ ...state, user })),
  on(userActions.createJWTTokenSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(userActions.logout, (state) => ({ ...state, user: null }))
);

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});
