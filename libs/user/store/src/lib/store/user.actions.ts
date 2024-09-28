import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSession } from '../session';
import { Token } from '../token';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    createAccount: props<{ user: User }>(),
    createAccountSuccess: props<{
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


    sendEmailVerificationEmail: emptyProps(),
    emailVerificationTokenSuccess: props<{ token: Token }>(),
    verifyUserEmail: props<{ token: Token }>(),
    verifyUserEmailSuccess: props<{ forward: string; message?: string }>(),

  },
});
