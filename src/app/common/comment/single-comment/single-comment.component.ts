import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../models/dto/comment';
import {Observable} from 'rxjs';
import {User} from '../../../models/dto/user';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-single-comment',
    templateUrl: './single-comment.component.html',
    styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

    @Input() comment: Comment = {} as Comment;
    user$: Observable<User> | undefined;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {

        this.user$ = this.userService.findUserById(this.comment.userId);
    }


    convertDate(createdAt: Date): string {

        return new Date(createdAt).toDateString();
    }
}
