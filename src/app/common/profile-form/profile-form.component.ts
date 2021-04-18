import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/dto/user';
import {Address} from '../../models/dto/Address';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AddressService} from '../../services/address.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, AfterViewInit {

    @Input() user$: BehaviorSubject<User> | undefined;
    @Input() address$: BehaviorSubject<Address> | undefined;

    form: FormGroup = this.formBuilder.group({
        postalCode: [],
        city: [''],
        country: [''],
        street: [''],
        password: [''],
        firstname: [''],
        lastname: [''],
        email: [''],
        addressId: [0]
    });

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        private addressService: AddressService) {
    }

    ngAfterViewInit(): void {

    }

    ngOnInit(): void {
    }

    updateUserInfos(): void {

        // @ts-ignore
        const user = this.user$.getValue();
        this.addressService
            .insertAddress<Address>(this.form.value as { street: string, postalCode: number, country: string, city: string })
            .subscribe(response => {
                this.form.controls.addressId.setValue(response.body?.id);
                this.userService
                    .updateUser<User>(this.form.value as { firstname: string, lastname: string, password: string, email: string, addressId: number }, user?.id)
                    .subscribe(responsed => {
                        this.user$?.next(responsed);
                        // @ts-ignore
                        this.address$?.next(response.body);
                        this.toastr.success('All your informations have been updated', 'Succes', {timeOut: 3000});
                    });
            });
    }

}
