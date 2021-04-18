import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


    constructor(
        public authService: AuthenticationService,
        public  router: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.checkLogin(state.url);
  }


    checkLogin(url: string): boolean | UrlTree {

        this.authService.redirectUrl = url;
        if (this.authService.isLogged) {
            return true;
        }

        return this.router.parseUrl('/login');
    }

}
