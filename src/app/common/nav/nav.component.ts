import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {BasicUser} from '../../models/dto/BasicUser';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


    constructor(public authService: AuthenticationService) {
    }

    ngOnInit(): void {

    }

}
