import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenAuthorizationService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/api/')) {
            const modifiedReq = req.clone({
                headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            });
            return next.handle(modifiedReq);
        } else {
            return next.handle(req);
        }
    }

}