import {Injectable} from '@angular/core';
import {BaseHttpRequestService} from './base-http-request.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends BaseHttpRequestService {

    URL = 'contact';


    sendMail<T>(contactForm: any): Observable<T> {

        return this.httpClient.post<any>(this.API_BASE_URL + this.URL, contactForm);
    }

}
