import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasketItem} from '../../models/dto/BasketItem';
import {User} from '../../models/dto/user';
import {UserService} from '../../services/user.service';
import {Purchasing} from '../../models/dto/purchasing';
import {Address} from '../../models/dto/Address';
import {AddressService} from '../../services/address.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    @Input() basketItems$: BehaviorSubject<BasketItem[]> | undefined;
    user = {} as User;
    user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
    address = {} as Address;
    address$: BehaviorSubject<Address> = new BehaviorSubject<Address>(this.address);


    constructor(private userService: UserService,
                private addressService: AddressService) {
    }

    ngOnInit(): void {

        this.userService
            .findCurrentUser()
            .subscribe(item => {
                this.user$.next(item);
                this.addressService.findAddressById<Address>(item.addressId).subscribe(response => this.address$.next(response));
            });
    }

}
