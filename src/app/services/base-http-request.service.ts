import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {BaseResponse} from '../models/dto/BaseResponse';

@Injectable({
    providedIn: 'root'
})
export class BaseHttpRequestService {

    constructor(public httpClient: HttpClient) {

    }

    API_BASE_URL = environment.API_BASE_URL;

    findById<T>(id: number, url: string): Observable<T> {

        return this.httpClient.get<T>(this.API_BASE_URL + url + `/${id}`);
    }

    findAll<T>(url: string, pageNumber: string): Observable<T[]> {

        return this.httpClient.get<T[]>(this.API_BASE_URL + url);
    }

    deleteById(id: number, url: string): Observable<any> {

        return this.httpClient.delete<boolean>(this.API_BASE_URL + url + `/${id}`);
    }

    insert<T, U>(u: U, url: string): Observable<HttpResponse<T>> {

        return this.httpClient.post<T>(this.API_BASE_URL + url, u, {observe: 'response'} );
    }

    update<T, U>(u: U, url: string, id: number): Observable<T> {

        return this.httpClient.put<T>(this.API_BASE_URL + url + `/${id}`, u);
    }

    // patch<T>
}
