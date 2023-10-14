import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import { userActions } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserState {
  user: User | null;
  error: HttpErrorResponse | null;
}

const initialState: UserState = {
  user: null,
  error: null,
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
  extraSelectors: ({ selectUser }) => ({
    selectUserIsAuthenticated: createSelector(
      selectUser,
      (selectedUser: User | null) => !!selectedUser
    ),
  }),
});
