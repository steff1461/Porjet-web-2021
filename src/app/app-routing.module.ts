import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConditionsComponent} from './pages/conditions/conditions.component';
import {ContactComponent} from './pages/contact/contact.component';
import {SingleArticleComponent} from './pages/single-article-component/single-article.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {BasketComponent} from './pages/basket/basket.component';
import {HomeComponent} from './pages/home/home.component';
import {NewnessComponent} from './pages/newness/newness.component';
import {CommonModule} from '@angular/common';
import {AuthenticationGuard} from './utils/authentication.guard';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration/registration.component';

const routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'conditions', component: ConditionsComponent
    },
    {
        path: 'article/:id', component: SingleArticleComponent
    },
    {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthenticationGuard]

    },
    {
        path: 'basket', component: BasketComponent,
        canActivate: [AuthenticationGuard]

    },
    {
        path: 'new', component: NewnessComponent
    },

    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'registration', component: RegistrationComponent
    },

    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: '**', component: HomeComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
