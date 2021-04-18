import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {BasicUser} from '../../models/dto/BasicUser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor() {
    }

    ngOnInit(): void {

    }

}
