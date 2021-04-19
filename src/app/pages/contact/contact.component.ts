import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContactService} from '../../services/contact.service';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    form: FormGroup = this.formBuilder.group({
        firstname: [],
        lastname: [''],
        sender: [''],
        message: ['']
    });

    constructor(private contactService: ContactService,
                private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
    }


    sendMail(): void {

        this.contactService
            .sendMail<any>(this.form.value as { firstname: string, lastname: string, sender: string, message: string })
            .subscribe(item => console.log(item));
    }

}
