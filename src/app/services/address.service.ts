import {Injectable} from '@angular/core';
import {BaseHttpRequestService} from './base-http-request.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AddressService extends BaseHttpRequestService {


    URL = 'addresses';

    findAddressById<T>(id: number): Observable<T> {

        return this.findById(id, this.URL);
    }

    updateAddress<T>(address: any, id: number): Observable<T> {

        return this.update(address, this.URL, id);
    }

    insertAddress<T>(address: any): Observable<HttpResponse<T>> {

        return this.insert(address, this.URL);
    }

}
