import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import { userActions } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSession } from '../session';

export interface UserState {
  user: User | null;
  error: HttpErrorResponse | null;
  userSession: UserSession | null;
  token: string;
}

const initialState: UserState = {
  user: null,
  error: null,
  userSession: null,
  token: '',
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
  on(userActions.logout, (state) => ({ ...state, user: null }))
);

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({ selectUserSession }) => ({
    selectUserIsAuthenticated: createSelector(
      selectUserSession,
      (userSession: UserSession | null) => !!userSession
    ),
  }),
});
