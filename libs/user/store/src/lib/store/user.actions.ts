import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    createAccount: props<{ user: User }>(),
    createAccountSuccess: props<{ user: User }>(),
    creteAccountFailure: props<{ error: any }>(),
    emailLogin: props<{ userName: string; password: string }>(),
    emailLoginSuccess: props<{ user: User }>(),
    emailLoginFailure: props<{ error: any }>(),
    creatJWTToken: emptyProps(),
    createJWTTokenSuccess: props<{ token: string }>(),
    createJWTTokenFailure: props<{ error: any }>(),
    logout: emptyProps(),
  },
});
