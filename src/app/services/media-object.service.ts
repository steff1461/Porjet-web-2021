import {Injectable} from '@angular/core';
import {BaseHttpRequestService} from './base-http-request.service';
import {Observable} from 'rxjs';
import {BaseResponse} from '../models/dto/BaseResponse';
import {MediaObject} from '../models/dto/media-object';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MediaObjectService extends BaseHttpRequestService {

    private URL = 'media_objects';
    private MEDIA_URL = 'https://mighty-caverns-29601.herokuapp.com';

    findAllMediaObjects<T>(pageNumber: string): Observable<T[]> {
        return this.findAll(this.URL, pageNumber);
    }

    findMediaById(id: string): Observable<MediaObject> {
        return this.httpClient.get<MediaObject>(this.MEDIA_URL + id);
    }

    deleteMediaById(id: number): any {
        return this.deleteById(id, this.URL);
    }

    insertMedia<T>(media: any): any {
        return this.insert(media, this.URL);
    }

}
