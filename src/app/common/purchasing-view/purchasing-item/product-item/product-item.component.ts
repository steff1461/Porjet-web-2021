import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/dto/product';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

    @Input() productId: number | undefined;
    product: Product = {} as Product;
    purchasingDate: Date | undefined;

    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {
        this.productService.findProductById<Product>(this.productId || 0).subscribe(item => this.product = item);

    }

}
