import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({
        username: [''],
        password: ['']
    });

    constructor(private authService: AuthenticationService,
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
    }


    login(): void {

        if (this.form.valid) {
            this.authService
                .authenticateUser(this.form.value as { username: string, password: string }).subscribe(response => {


                if (response.ok) {
                    // @ts-ignore
                    sessionStorage.setItem('token', JSON.stringify(response.body));
                    // @ts-ignore
                    this.authService.setBasicUser$(response.body.data);
                    this.authService.isLogged = true;
                    this.router.navigate([this.authService.redirectUrl]).then();
                }
            });
        }

    }

}
