import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from './auth.action';
import { User } from '../../models/user.model';
import { from } from 'rxjs';
import { ResponseHandlerService } from '../../services/response-handler.service';

export class AuthResponse {
  data: {
    token: string;
    refresh_token: string;
    user: User;
  };
}

@Injectable()
export class AuthEffects {

  authRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authenticationSuccess),
    tap((action) => {
      if (action.isRedirect) {
        this.router.navigate(['/tabs/profile'], { replaceUrl: true });
      }
    })
  ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    map(() => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const user: User = JSON.parse(localStorage.getItem('userData'));
      if (token && refreshToken && user) {
        return AuthActions.authenticationSuccess({ user: user, isRedirect: true });
      } else {
        return { type: '[Auth] NULL' }
      }
    })
  ));

  authRegister$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerStart),
    switchMap((user) => {
      return this.http.post(
        `${environment.apiBaseUrl}/public/register-user`,
        user
      ).pipe(
        map((resData: any) => {
          console.log('[Register Res]', resData);
          return AuthActions.registerSuccess({ registeredUserId: resData.data.id });
        }),
        catchError((error) => this.resHandler.handleError(error, AuthActions.registerFail)),
      )
    })
  ));

  constructor(
    private resHandler: ResponseHandlerService,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) { }
}
