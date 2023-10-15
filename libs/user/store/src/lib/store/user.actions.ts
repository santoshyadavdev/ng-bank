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
  },
});
