import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseHttpRequestService} from './base-http-request.service';
import {BaseResponse} from '../models/dto/BaseResponse';
import {HttpResponse} from '@angular/common/http';
import {Purchasing} from '../models/dto/purchasing';

@Injectable({
    providedIn: 'root'
})
export class PurchasingService extends BaseHttpRequestService {

    private URL = 'purchasings';

    findPurchasingsByUser(userId: number): Observable<Purchasing[]> {

        return this.httpClient.get<Purchasing[]>(this.API_BASE_URL + this.URL + '/user' + `/${userId}`);
    }

    findAllPurchasings<T>(pageNumber: string): Observable<T[]> {

        return this.findAll(this.URL, pageNumber);
    }

    findPurchasingById<T>(id: number): Observable<T> {

        return this.findById(id, this.URL);
    }

    deletePurchasingById(id: number): Observable<any> {

        return this.deleteById(id, this.URL);
    }

    insertPurchasing<T>(purchasing: any): Observable<HttpResponse<Purchasing>> {

        return this.insert(purchasing, this.URL);
    }

    updatePurchasing<T>(purchasing: any, id: number): Observable<T> {

        return this.update(purchasing, this.URL, id);
    }
}
