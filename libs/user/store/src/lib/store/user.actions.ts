import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSession } from '../session';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    createAccount: props<{ user: User }>(),
    createAccountSuccess: props<{
      user: User;
      forward: string;
      message?: string;
    }>(),
    createAccountFailure: props<{ error: HttpErrorResponse }>(),
    emailLogin: props<{ userName: string; password: string }>(),
    emailLoginSuccess: props<{
      userSession: UserSession;
      forward: string;
      message?: string;
    }>(),
    emailLoginFailure: props<{ error: HttpErrorResponse }>(),
    creatJWTToken: emptyProps(),
    createJWTTokenSuccess: props<{ token: string }>(),
    createJWTTokenFailure: props<{ error: HttpErrorResponse }>(),
    logout: emptyProps(),
    getCurrentUserSuccess: props<{ user: User }>(),
    resetPassword: props<{ email: string }>(),
    resetPasswordSuccess: props<{
      forward: string;
      message?: string;
    }>(),
    resetPasswordFailure: props<{ error: HttpErrorResponse }>(),
    updatePassword: props<{ userId : string, secret: string, password : string }>(),
    updatePasswordSuccess: props<{
      forward: string;
      message?: string;
    }>(),
    updatePasswordFailure: props<{
      error: HttpErrorResponse;
    }>()

  },
});
