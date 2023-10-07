import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../login.service';
import { userActions } from './user.actions';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { inject } from '@angular/core';

export const login$ = createEffect(
  (actions$ = inject(Actions), loginServiece = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.emailLogin),
      exhaustMap(({ userName, password }) =>
        loginServiece.emailLogin(userName, password).pipe(
          map((user) => userActions.emailLoginSuccess({ user })),
          catchError((error: string) =>
            of(userActions.emailLoginFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
