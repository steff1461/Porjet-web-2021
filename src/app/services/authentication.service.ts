import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BasicUser} from '../models/dto/BasicUser';
import {Router} from '@angular/router';
import {User} from '../models/dto/user';
import {Token} from '../models/dto/Token';
import {TokenPayload} from '../models/dto/TokenPayload';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private URL = 'login';
    private API_BASE_URL = environment.API_BASE_URL;
    private user: BasicUser = {} as BasicUser;
    basicUser$: BehaviorSubject<BasicUser> = new BehaviorSubject<BasicUser>(this.user);
    redirectUrl: string | undefined;
    isLogged = false;

    constructor(
        private httpClient: HttpClient,
        public router: Router) {

    }

    authenticateUser(formData: { username: string; password: string }): Observable<HttpResponse<Token>> {

        return this.httpClient.post<any>(this.API_BASE_URL + this.URL, formData, {observe: 'response'});
    }

    setBasicUser$(basicUser: BasicUser): void {

        this.basicUser$.next(basicUser);
    }

    signOut(): void {

        this.isLogged = false;
        this.redirectUrl = '/home';
        sessionStorage.removeItem('token');
        this.router.navigate(['home']).then();
    }

    checkIfAuth(): void {
        const tokenContent = JSON.parse(sessionStorage.getItem('token') as string);
        if (tokenContent != null){
            this.isLogged = true;
            this.basicUser$.next(tokenContent.data);
        }
    }
}
