import {Injectable} from '@angular/core';

import {BaseHttpRequestService} from './base-http-request.service';
import {Observable} from 'rxjs';
import {User} from '../models/dto/user';
import jwt_decode from 'jwt-decode';
import {TokenPayload} from '../models/dto/TokenPayload';
import {BasicUser} from '../models/dto/BasicUser';
import jwtDecode from 'jwt-decode';
import {Token} from '../models/dto/Token';
import {HttpResponse} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseHttpRequestService {

    private URL = 'users';
    private user: BasicUser = {} as BasicUser;


    findCurrentUser(): Observable<User> {

        const tokenContent = JSON.parse(sessionStorage.getItem('token') as string);
        const tokenInfos: TokenPayload = jwt_decode(tokenContent.token);
        const username = tokenInfos.username;
        return this.httpClient
            .get<User>(this.API_BASE_URL + this.URL + '/current' + `/${username}`);
    }

    findAllUsers<T>(pageNumber: string): Observable<T[]> {
        return this.findAll(this.URL, pageNumber);
    }

    findUserById<T>(id: number): Observable<T> {
        return this.findById(id, this.URL);
    }


    deleteUsersId(id: number): Observable<any> {

        return this.deleteById(id, this.URL);
    }

    insertUser(user: any): Observable<HttpResponse<User>> {

        return this.insert(user, this.URL);
    }

    updateUser<T>(user: any, id: number): Observable<T> {

        return this.update(user, this.URL, id);
    }

    setBasicUser(token: Token): void {

        this.basicUser = token.data;
    }

    get basicUser(): BasicUser {
        return this.user;
    }

    set basicUser(value: BasicUser) {
        this.user = value;
    }
}
