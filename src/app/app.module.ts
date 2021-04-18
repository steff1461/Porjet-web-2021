import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './common/nav/nav.component';
import {ConditionsComponent} from './pages/conditions/conditions.component';
import {SingleArticleComponent} from './pages/single-article-component/single-article.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoginComponent} from './pages/login/login.component';
import {BasketComponent} from './pages/basket/basket.component';
import {CommentComponent} from './common/comment/comment.component';
import {HomeComponent} from './pages/home/home.component';
import {ShopComponent} from './common/shop/shop.component';
import {NewnessComponent} from './pages/newness/newness.component';
import {ProductComponent} from './common/shop/product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './pages/registration/registration/registration.component';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './common/footer/footer.component';
import {SingleCommentComponent} from './common/comment/single-comment/single-comment.component';
import {HttpBaseConfigInterceptor} from './utils/http-base-config-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasketItemComponent} from './common/basket-item/basket-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from './common/order/order.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfileFormComponent } from './common/profile-form/profile-form.component';
import { PurchasingViewComponent } from './common/purchasing-view/purchasing-view.component';
import { PurchasingItemComponent } from './common/purchasing-view/purchasing-item/purchasing-item.component';
import { ProductItemComponent } from './common/purchasing-view/purchasing-item/product-item/product-item.component';
import { ProductFormComponent } from './common/product-form/product-form.component';
import { AdminPanelComponent } from './common/admin-panel/admin-panel.component';
import { CategoryFormComponent } from './common/category-form/category-form.component';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ConditionsComponent,
        SingleArticleComponent,
        ProfileComponent,
        LoginComponent,
        BasketComponent,
        CommentComponent,
        HomeComponent,
        ShopComponent,
        NewnessComponent,
        ProductComponent,
        RegistrationComponent,
        FooterComponent,
        SingleCommentComponent,
        BasketItemComponent,
        OrderComponent,
        ProfileFormComponent,
        PurchasingViewComponent,
        PurchasingItemComponent,
        ProductItemComponent,
        ProductFormComponent,
        AdminPanelComponent,
        CategoryFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpBaseConfigInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
