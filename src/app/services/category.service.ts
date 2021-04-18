import {Injectable} from '@angular/core';
import {BaseHttpRequestService} from './base-http-request.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseHttpRequestService {

    private URL = 'categories';

    findAllCategories<T>(): Observable<T[]> {

        return this.findAll(this.URL, '1');
    }

    insertCategory<T>(category: any): Observable<HttpResponse<T>> {

        return this.insert(category, this.URL);
    }

}
