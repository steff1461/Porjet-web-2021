import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseHttpRequestService} from './base-http-request.service';
import {BaseResponse} from '../models/dto/BaseResponse';
import {Comment} from '../models/dto/comment';
import {HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService extends BaseHttpRequestService {

    private URL = 'comments';

    findAllComments<T>(pageNumber: string): Observable<T[]> {

        return this.findAll(this.URL, pageNumber);
    }

    findCommentsByProduct(productid: number | undefined): Observable<Comment[]> {

        return this.httpClient.get<Comment[]>(this.API_BASE_URL + this.URL + '/product' + `/${productid}`);
    }

    findCommentById<T>(id: number): Observable<T> {

        return this.findById(id, this.URL);
    }

    deleteCommentById(id: number): Observable<any> {

        return this.deleteById(id, this.URL);
    }

    insertComment<T>(comment: any): Observable<HttpResponse<T>> {

        return this.insert(comment, this.URL);
    }

    updateComment<T>(comment: any, id: number): Observable<T> {

        return this.update(comment, this.URL, id);
    }
}
