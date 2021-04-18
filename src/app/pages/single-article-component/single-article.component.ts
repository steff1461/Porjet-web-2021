import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {async, BehaviorSubject, Observable, of} from 'rxjs';
import {delay, first, map, single, switchMap, take} from 'rxjs/operators';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/dto/product';
import {MediaObjectService} from '../../services/media-object.service';
import {MediaObject} from '../../models/dto/media-object';
import {Token} from '../../models/dto/Token';
import {BasketItem} from '../../models/dto/BasketItem';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-single-article-component',
    templateUrl: './single-article.component.html',
    styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {

    mediaUrl$: Observable<string> | undefined;
    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private mediaService: MediaObjectService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params =>
            this.productService
                .findProductById<Product>(Number(params.get('id')))
                .subscribe(item => {
                    this.findMediaByProduct(item.image);
                    this.product = item;
                }));

    }

    addToBasket(article: Product): void {

        const oldbasket = JSON.parse(localStorage.getItem('basket') as string) || [];
        let isPresent = false;


        // @ts-ignore
        oldbasket.forEach(item => {

            if (item.product.id === article.id) {

                isPresent = true;
                item.productCount += 1;
            }
        });

        if (!isPresent) {
            const basketItem: BasketItem = {

                productId: article.id,
                productCount: 1,
                product: article
            };
            oldbasket.push(basketItem);
        }

        localStorage.setItem('basket', JSON.stringify(oldbasket));
        this.toastr.success('Product added to your basket', 'Succes', {timeOut: 3000});

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
}
