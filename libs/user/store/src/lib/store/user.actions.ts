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
    logout: emptyProps(),
    getCurrentUserSuccess: props<{ user: User }>(),
    SendEmailVerificationEmail: emptyProps(),
    EmailVerificationTokenSuccess: props<{ token: Token }>(),
    VerifyUserEmail: props<{ token: Token }>(),
    VerifyUserEmailSuccess: props<{ forward: string; message?: string }>(),
  },
});
