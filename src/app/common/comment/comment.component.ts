import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/dto/comment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/dto/user';
import {AuthenticationService} from '../../services/authentication.service';
import {BasicUser} from '../../models/dto/BasicUser';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    comments$: Observable<Comment[]> | undefined;
    @Input() productId: number | undefined;
    form: FormGroup | undefined;
    private basicUser: BasicUser = {} as BasicUser;

    constructor(private commentService: CommentService,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private authService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.comments$ = this.commentService.findCommentsByProduct(this.productId);
        this.basicUser = this.authService.basicUser$?.getValue() as BasicUser;
        this.form = this.formBuilder.group({

            content: [''],
            rate: [0],
            productId: [this.productId],
            userId: [this.basicUser.userId]
        });

    }


    postComment(): void {

        if (this.form?.valid) {
            this.commentService
                .insertComment<Comment>(this.form.value as { content: string, rate: number, productId: number, userId: number })
                .subscribe(result =>
                    this.comments$ = this.commentService.findCommentsByProduct(this.productId));
        }
    }

}
