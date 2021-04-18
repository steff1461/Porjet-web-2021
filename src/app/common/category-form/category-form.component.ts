import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/dto/category';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

    form: FormGroup = this.formBuilder.group({
        name: [''],
    });

    constructor(private toastr: ToastrService,
                private formBuilder: FormBuilder,
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
    }

    createCategory(): void {

        this.categoryService
            .insertCategory<Category>(this.form.value as { name: string })
            .subscribe(response => this.toastr.success('New category inserted', 'Success', {timeOut: 3000}));
    }
}
