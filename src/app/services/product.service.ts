import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseHttpRequestService} from './base-http-request.service';
import {Product} from '../models/dto/product';
import {BaseResponse} from '../models/dto/BaseResponse';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseHttpRequestService {

    private URL = 'products';


    findAllProducts<T>(pageNumber: string): Observable<Product[]> {
        return this.findAll(this.URL + '?page=' + pageNumber, pageNumber);
    }

    findProductById<T>(id: number): Observable<T> {
        return this.findById(id, this.URL);
    }

    findProductCount(): Observable<any> {

        return this.httpClient.get(this.API_BASE_URL + this.URL + '/count');
    }

    findProductsByCategory(categoryId: number, pageNumber: string): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.API_BASE_URL + this.URL + '/category' + `/${categoryId}`);
    }

    deleteProductById(id: number): Observable<any> {

        return this.deleteById(id, this.URL);
    }

    insertProduct<T>(product: any): Observable<HttpResponse<T>> {

        return this.insert(product, this.URL);
    }

    updateProduct<T>(product: any, id: number): Observable<T> {

        return this.update(product, this.URL, id);
    }
}
