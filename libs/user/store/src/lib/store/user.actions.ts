import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    createAccount: props<{ user: User }>(),
    createAccountSuccess: props<{ user: User }>(),
    createAccountFailure: props<{ error: HttpErrorResponse }>(),
    emailLogin: props<{ userName: string; password: string }>(),
    emailLoginSuccess: props<{ user: User }>(),
    emailLoginFailure: props<{ error: HttpErrorResponse }>(),
    creatJWTToken: emptyProps(),
    createJWTTokenSuccess: props<{ token: string }>(),
    createJWTTokenFailure: props<{ error: HttpErrorResponse }>(),
    logout: emptyProps(),
  },
});
