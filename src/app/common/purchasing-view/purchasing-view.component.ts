import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Purchasing} from '../../models/dto/purchasing';
import {PurchasingService} from '../../services/purchasing.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-purchasing-view',
    templateUrl: './purchasing-view.component.html',
    styleUrls: ['./purchasing-view.component.scss']
})
export class PurchasingViewComponent implements OnInit {

    purchasings$: Observable<Purchasing[]> | undefined;
    purchasing = {} as Purchasing;
    purchasingBS: BehaviorSubject<Purchasing[]> = new BehaviorSubject<Purchasing[]>([this.purchasing]);
    isLoaded = false;


    constructor(private purchasingService: PurchasingService,
                private authService: AuthenticationService) {

        const user = this.authService.basicUser$.getValue();
        this.purchasings$ = this.purchasingService.findPurchasingsByUser(user.userId);
        this.purchasings$.subscribe(item =>
        {
            this.purchasingBS.next(item);
            this.isLoaded = true;
        } );
    }

    ngOnInit(): void {
    }
}
