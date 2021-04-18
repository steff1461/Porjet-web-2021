import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/dto/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MediaObjectService} from '../../../services/media-object.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: '[app-product]',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    @Input() product: Product = {} as Product;
    mediaUrl$: Observable<string> | undefined;

    constructor(private mediaService: MediaObjectService) {
    }

    ngOnInit(): void {

        this.findMediaByProduct(this.product.image);
    }


    findMediaByProduct(mediaId: string): void {
        this.mediaUrl$ =
            this.mediaService
                .findMediaById(mediaId).pipe(map(item => {
                let url = environment.API_BASE_URL;
                url += item.contentUrl;
                return url;
            }));


    }
}

