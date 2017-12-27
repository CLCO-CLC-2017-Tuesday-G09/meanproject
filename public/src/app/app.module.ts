import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { HeaderComponent } from './partials/header/header.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AdhomeComponent } from './admin/adhome/adhome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Layout
import { ClientComponent } from './layout/client/client.component';
import { AdministratorComponent } from './layout/administrator/administrator.component';
import { AdsidebarComponent } from './partials/adsidebar/adsidebar.component';
import { AdproductComponent } from './admin/adproduct/adproduct.component';
import { AdcatalogComponent } from './admin/adcatalog/adcatalog.component';
import { AdpromotionComponent } from './admin/adpromotion/adpromotion.component';
import { MenuComponent } from './admin/menu/menu.component';
import 'hammerjs';
import { AdbranchComponent } from './admin/adbranch/adbranch.component';
import { SearchComponent } from './components/search/search.component';
import { EditproductComponent } from './admin/adproduct/editproduct/editproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { OrderComponent } from './admin/order/order.component';
import { OrderdetailComponent } from './admin/order/orderdetail/orderdetail.component';
import { TrackingComponent } from './components/tracking/tracking.component';
//pipe
import { ProductpipePipe } from './pipe/productpipe.pipe';
import { cataloryPipe } from './pipe/productpipe.pipe';
import { sizePipe } from './pipe/productpipe.pipe';
import { CheckorderPipe } from './pipe/productpipe.pipe';
import { ProfilesComponent } from './components/profiles/profiles.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    AdhomeComponent,
    ClientComponent,
    AdministratorComponent,
    AdsidebarComponent,
    AdproductComponent,
    AdcatalogComponent,
    AdpromotionComponent,
    MenuComponent,
    AdbranchComponent,
    SearchComponent,
    EditproductComponent,
    ProductpipePipe,
    cataloryPipe,
    sizePipe,
    CheckorderPipe,
    CheckoutComponent,
    DetailproductComponent,
    OrderComponent,
    OrderdetailComponent,
    TrackingComponent,
    ProfilesComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [AuthService,SidebarComponent,SearchComponent,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
