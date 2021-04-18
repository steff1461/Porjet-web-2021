import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../../models/dto/category';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '../../models/dto/product';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

    category = {} as Category;
    categoriesBS: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([this.category]);
    form: FormGroup = this.formBuilder.group({
        price: [0],
        description: [''],
        name: [''],
        category: [''],
    });

    constructor(private toastr: ToastrService,
                private formBuilder: FormBuilder,
                private categoryService: CategoryService,
                private productService: ProductService) { }

    ngOnInit(): void {

        this.categoryService.findAllCategories<Category>().subscribe(response => this.categoriesBS.next(response));
    }

    createProduct(): void {
        this.form.controls.category.setValue('/api/categories/' + this.form.controls.category.value);
        this.productService
            .insertProduct<Product>(this.form.value as { price: number, description: string, name: string, category: string })
            .subscribe(item => this.toastr.success('Product inserted', 'Success', {timeOut: 3000}));
    }

}
