import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromApp } from '../store';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CoreGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            map(user => {
                const isAuth = !!user;
                if (isAuth) return true;
                return this.router.createUrlTree(['/auth']);
            }));

    }

} 