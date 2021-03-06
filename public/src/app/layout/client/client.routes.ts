import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { SearchComponent } from '../../components/search/search.component';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { TrackingComponent } from '../../components/tracking/tracking.component';
import { ProfilesComponent } from '../../components/profiles/profiles.component';
import { DetailproductComponent } from '../../components/detailproduct/detailproduct.component';
import { Routes, RouterModule } from '@angular/router';


export const CLIENT_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'profile', component: ProfilesComponent },
    {path: 'tracking', component: TrackingComponent },
    { path: 'search/:idproduct', component: SearchComponent },
    { path: 'detailproduct/:id', component: DetailproductComponent },
];