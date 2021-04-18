import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/dto/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MediaObjectService} from '../../services/media-object.service';
import {BasketItem} from '../../models/dto/BasketItem';

@Component({
    selector: 'app-basket-item',
    templateUrl: './basket-item.component.html',
    styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {

    @Input() basketItem: BasketItem = {} as BasketItem;
    mediaUrl$: Observable<string> | undefined;

    constructor(private  mediaService: MediaObjectService) {
    }

    ngOnInit(): void {
        this.findMediaByProduct(this.basketItem.product.image);
    }

    findMediaByProduct(mediaId: string): void {

        this.mediaUrl$ =
            this.mediaService
                .findMediaById(mediaId).pipe(map(item => {

                let url = 'https://mighty-caverns-29601.herokuapp.com/index.php';
                url += item.contentUrl;
                return url;
            }));


    }

    changeCount(operator: string): void {

        const basket = JSON.parse(localStorage.getItem('basket') as string) || [];

        // @ts-ignore
        basket.forEach(item => {
            if (item.productId === this.basketItem.productId) {

                if (operator === '+') {

                    item.productCount += 1;
                } else {
                    item.productCount -= 1;
                    if (item.productCount <= 0) {

                        basket.pop(item);
                    }
                }
            }
        });
        location.reload();
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    removeFromBasket(): void {

        const basket = JSON.parse(localStorage.getItem('basket') as string) || [];
        // @ts-ignore
        basket.forEach(item => {
            if (item.productId === this.basketItem.productId) {

                basket.pop(item);
            }
        });

        localStorage.setItem('basket', JSON.stringify(basket));
        location.reload();
    }
}
