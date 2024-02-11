import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../login.service';
import { userActions } from './user.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export const login$ = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.emailLogin),
      exhaustMap(({ userName, password }) =>
        loginService.emailLogin(userName, password).pipe(
          map((userSession) =>
            userActions.emailLoginSuccess({
              userSession,
              forward: '/dashboard',
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(userActions.emailLoginFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getCurrentUser$ = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.emailLoginSuccess),
      exhaustMap(() =>
        loginService.getCurentAccount().pipe(
          map((user) =>
            userActions.getCurrentUserSuccess({
              user,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(userActions.emailLoginFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createAccount$ = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.createAccount),
      exhaustMap(({ user }) =>
        loginService.createAccount(user).pipe(
          map(() =>
            userActions.createAccountSuccess({
              forward: '/login',
              message: 'Account created successfully. Please log in.',
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(userActions.createAccountFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterLogin$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    snackBar: MatSnackBar = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(
        userActions.emailLoginSuccess,
        userActions.createAccountSuccess,
        userActions.verifyUserEmailSuccess
      ),
      tap((action) => {
        if (action?.message) {
          snackBar.open(action?.message);
        }
        router.navigateByUrl(action.forward);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logout$ = createEffect(
  (
    actions$ = inject(Actions),
    loginService = inject(LoginService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(userActions.logout),
      exhaustMap(() =>
        loginService.logout().pipe(tap(() => router.navigateByUrl('/login')))
      )
    );
  },
  { functional: true, dispatch: false }
);

export const snackBarAfterError$ = createEffect(
  (actions$ = inject(Actions), snackBar: MatSnackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(userActions.emailLoginFailure, userActions.createAccountFailure),
      tap(({ error }) =>
        snackBar.open(error?.error?.message ?? 'An error has occurred!')
      )
    );
  },
  { functional: true, dispatch: false }
);

export const sendVerifyEmail$ = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.sendEmailVerificationEmail),
      exhaustMap(() =>
        loginService.createEmailVerification().pipe(
          map((token) => userActions.emailVerificationTokenSuccess({ token })),
          catchError((error: HttpErrorResponse) =>
            of(userActions.createAccountFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const verifyEmail$ = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(userActions.verifyUserEmail),
      exhaustMap(({ token }) =>
        loginService.verifyEmail(token.userId, token.secret).pipe(
          map(() =>
            userActions.verifyUserEmailSuccess({
              forward: '/login',
              message: 'Account created successfully. Please log in.',
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(userActions.createAccountFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
