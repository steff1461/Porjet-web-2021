import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/dto/user';
import {UserService} from '../../services/user.service';
import {AddressService} from '../../services/address.service';
import {Address} from '../../models/dto/Address';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm = true;
    orderView = false;
    adminPanel = false;
    user: User = {} as User;
    user$ = new BehaviorSubject<User>(this.user);
    address: Address = {} as Address;
    address$ = new BehaviorSubject<Address>(this.address);

    constructor(private userService: UserService,
                private addressService: AddressService) {
    }

    ngOnInit(): void {
        this.userService.findCurrentUser().subscribe(response => {
            this.findAddressByUser(response.addressId);
            this.user$.next(response);
        });
    }

    findAddressByUser(addressId: number): void {

        this.addressService.findAddressById<Address>(addressId).subscribe(response => this.address$.next(response));
    }

    displayProfile(): void {
        this.profileForm = true;
        this.orderView = false;
        this.adminPanel = false;
    }

    displayOrders(): void {
        this.profileForm = false;
        this.orderView = true;
        this.adminPanel = false;
    }

    displayAdmin(): void {
        this.profileForm = false;
        this.orderView = false;
        this.adminPanel = true;
    }
}
