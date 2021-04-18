import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Purchasing} from '../../../models/dto/purchasing';
import {PurchasingService} from '../../../services/purchasing.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-purchasing-item',
    templateUrl: './purchasing-item.component.html',
    styleUrls: ['./purchasing-item.component.scss']
})
export class PurchasingItemComponent implements OnInit {

    @Input() purchasing: Purchasing = {} as Purchasing;
    purchasingDate = new Date(this.purchasing.createdAt);


    constructor(private purchasingService: PurchasingService,
                private toastr: ToastrService) {

    }

    ngOnInit(): void {

    }


    deleteOrder(): void {
        this.purchasingService
            .deletePurchasingById(this.purchasing.id)
            .subscribe(item =>
                this.toastr.success('Your order is cancelled!', 'Succes', {timeOut: 3000})
                    .onHidden
                    .subscribe(() => location.reload())
            );
    }
}
