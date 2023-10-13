import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../login.service';
import { userActions } from './user.actions';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

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

export const createAccount$ = createEffect(
  (actions$ = inject(Actions), loginServiece = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.createAccount),
      exhaustMap(({ user }) =>
        loginServiece.createAccount(user).pipe(
          map((user) => userActions.createAccountSuccess({ user })),
          catchError((error: string) =>
            of(userActions.createAccountFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createJWTToken$ = createEffect(
  (actions$ = inject(Actions), loginServiece = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.creatJWTToken),
      exhaustMap(() =>
        loginServiece.creatJWTToken().pipe(
          map((token) => userActions.createJWTTokenSuccess({ token })),
          catchError((error: string) =>
            of(userActions.createJWTTokenFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterLogin$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(userActions.emailLoginSuccess, userActions.createAccountSuccess),
      map(() => router.navigate(['/register']))
    );
  },
  { functional: true, dispatch: false }
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    loginServiece = inject(LoginService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(userActions.logout),
      exhaustMap(() =>
        loginServiece.logout().pipe(map(() => router.navigate(['/login'])))
      )
    );
  },
  { functional: true, dispatch: false }
);
