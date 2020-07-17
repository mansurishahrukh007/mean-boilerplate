import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { fromApp } from '../store';
import { Store } from '@ngrx/store';
import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, AuthActions } from '../store/auth';

@Injectable({
    providedIn: 'root'
})
export class TokenRefreshService implements HttpInterceptor {

    constructor(
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.http.post<AuthResponse>(
                        `${environment.apiBaseUrl}/public/user/refresh-token`,
                        {
                            token: localStorage.getItem('token'),
                            refresh_token: localStorage.getItem('refreshToken')
                        }
                    ).pipe(mergeMap(resData => {
                        localStorage.setItem('token', resData.data.token);
                        localStorage.setItem('refreshToken', resData.data.token);
                        localStorage.setItem('userData', JSON.stringify(resData.data.user));

                        this.store.dispatch(AuthActions.authenticationSuccess({ user: resData.data.user, isRedirect: false }));

                        const cloneRequest = req.clone({ setHeaders: { 'Authorization': `Bearer ${resData.data.token}` } });
                        return next.handle(cloneRequest);
                    }));
                }

                if (error.status === 417) {
                    this.store.dispatch(AuthActions.logout());
                }

                return throwError(error);
            })
        );
    }

}