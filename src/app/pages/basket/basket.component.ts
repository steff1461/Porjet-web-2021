import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/dto/product';
import {BehaviorSubject} from 'rxjs';
import {BasketItem} from '../../models/dto/BasketItem';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {PurchasingService} from '../../services/purchasing.service';
import {Purchasing} from '../../models/dto/purchasing';
import {PurchasingForm} from '../../models/form/PurchasingForm';
import {AuthenticationService} from '../../services/authentication.service';
import {NotifierService} from 'angular-notifier';
import {ToastrService} from 'ngx-toastr';
import {error} from '@angular/compiler/src/util';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    basketItems: BasketItem[] = [];
    basketItems$ = new BehaviorSubject(this.basketItems);
    basketPrice$ = new BehaviorSubject(0);
    totalPrice$ = new BehaviorSubject(0);

    options = [
        {name: 'Standard-Delivery- € 5.00', value: 5},
        {name: 'Express-Delivery- € 7.50', value: 7.5}
    ];
    selectedOption = 0;
    closeResult: string | undefined;
    modalOptions: NgbModalOptions | undefined;

    constructor(
        private modalService: NgbModal,
        private purchasingService: PurchasingService,
        private toastr: ToastrService,
        private authService: AuthenticationService) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        };
    }

    ngOnInit(): void {

        this.initBasket();
    }

    computeBasketPrice(): void {
        let basketPrice = 0;
        this.basketItems$.getValue().forEach(item => {
            basketPrice += item.product.price * item.productCount;
        });
        this.basketPrice$.next(basketPrice);
        this.computePriceWDelivery();
    }

    computePriceWDelivery(): void {

        const totalPrice = +this.basketPrice$.value + +this.selectedOption;
        this.totalPrice$.next(totalPrice);
    }

    // @ts-ignore
    open(content): void {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    postOrder(): void {

        const purchasing: PurchasingForm = {

            productsId: this.parseBasketToProd(),
            userId: this.authService.basicUser$.getValue().userId
        };

        this.purchasingService.insertPurchasing<PurchasingForm>(purchasing).subscribe(response => {

            if (response.ok) {
                localStorage.removeItem('basket');
                this.initBasket();
                this.toastr.success('Your order is on its way', 'Succes', {timeOut: 3000});

            } else {
                this.toastr.error('Please try again later', 'Error', {timeOut: 3000});
            }
        });

    }

    parseBasketToProd(): number [] {

        const products: number[] = [];

        this.basketItems$.getValue().map(item => {

            for (let i = 0; i < item.productCount; i++) {

                products.push(item.product.id);
            }

        });

        return products;
    }

    initBasket(): void {
        const oldBasket = JSON.parse(localStorage.getItem('basket') as string) || [];
        const products: BasketItem[] = [];
        // @ts-ignore
        oldBasket.forEach(product => {
            products.push(product);

        });
        this.basketItems$.next(products);
        this.computeBasketPrice();
    }


}
