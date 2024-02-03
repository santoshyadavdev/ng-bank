import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import { userActions } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSession } from '../session';
import { state } from '@angular/animations';
import { Token } from '../token';

export interface UserState {
  user: User | null;
  error: HttpErrorResponse | null;
  userSession: UserSession | null;
  token: Token | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  userSession: null,
  token: null,
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
  on(userActions.emailLoginSuccess, (state, { userSession }) => ({
    ...state,
    userSession,
  })),
  on(userActions.getCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(userActions.logout, (state) => ({
    ...state,
    user: null,
    userSession: null,
  })),
  on(userActions.emailVerificationTokenSuccess, (state, { token }) => ({
    ...state,
    token: token,
  }))
);

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({ selectUserSession, selectUser }) => ({
    selectUserIsAuthenticated: createSelector(
      selectUserSession,
      selectUser,
      (userSession: UserSession | null, user: User | null) =>
        !!userSession || !!user
    ),
  }),
});
