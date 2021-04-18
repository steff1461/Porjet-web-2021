import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {BasicUser} from './models/dto/BasicUser';
import {BehaviorSubject} from 'rxjs';
import {ProductService} from './services/product.service';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Token} from './models/dto/Token';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
    title = 'williamFront';

    private basicUser: BasicUser = {} as BasicUser;
    basicUser$ = new BehaviorSubject<BasicUser>(this.basicUser);

    constructor(private productService: ProductService,
                private authService: AuthenticationService,
                private router: Router) {
    }


    ngOnInit(): void {

        this.authService.checkIfAuth();
    }

}


