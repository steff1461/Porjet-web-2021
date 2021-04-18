import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Token} from '../models/dto/Token';

@Injectable()
export class HttpBaseConfigInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenContent = JSON.parse(sessionStorage.getItem('token') as string);


        if (tokenContent) {
            const token = tokenContent.token;
            request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        }

        request = request.clone({headers: request.headers.set('Accept', 'application/json')});

        return next.handle(request);

    }
}
