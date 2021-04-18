import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/dto/product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../../models/dto/category';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    products: Product[] = {} as Product [];
    productsBS = new BehaviorSubject(this.products);
    @Input() hasPagination: boolean | undefined;
    category = {} as Category;
    categoriesBS: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([this.category]);
    selected = '';
    productCountBS: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private categoryService: CategoryService,
                private productService: ProductService,
                private router: Router) {
    }

    ngOnInit(): void {

        this.findAllProducts();
        this.categoryService
            .findAllCategories<Category>()
            .subscribe(item => this.categoriesBS.next(item));

        this.computePagination();
    }

    findProductsByPage(page: string): void {

        console.log(page);
        this.productService
            .findAllProducts(page)
            .subscribe(items => this.productsBS.next(items));
    }

    productsByCategory(): void {

        if (this.selected === 'ALL') {
            this.findAllProducts();
        } else {
            this.productService.findProductsByCategory(Number(this.selected), '1').subscribe(item => this.productsBS.next(item));
        }
    }

    findAllProducts(): void {
        this.productService
            .findAllProducts('1')
            .subscribe(items => {
                this.productsBS.next(items);
            });
    }

    computePagination(): void {

        this.productService.findProductCount().subscribe(item => {
                const pageCount = Number(item.productCount) / 10;
                console.log(pageCount);
                if (pageCount < 1) {
                    this.productCountBS.next(1);
                } else {
                    this.productCountBS.next(Math.ceil(pageCount));
                }
                console.log(this.productCountBS.value);
            }
        );
    }
}
