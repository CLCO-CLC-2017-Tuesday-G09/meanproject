import { Routes, RouterModule } from '@angular/router';
import { AdhomeComponent } from '../../admin/adhome/adhome.component';
import { AdproductComponent } from '../../admin/adproduct/adproduct.component';
import { AdcatalogComponent } from '../../admin/adcatalog/adcatalog.component';
import { AdpromotionComponent } from '../../admin/adpromotion/adpromotion.component';
import { MenuComponent } from '../../admin/menu/menu.component';
import { AdbranchComponent } from '../../admin/adbranch/adbranch.component';
export const ADMINISTRATOR_ROUTES: Routes = [
    { path: 'adhome', component: AdhomeComponent },
    { path: 'products', component: AdproductComponent },
    { path: 'promotions', component: AdpromotionComponent },
    { path: 'menus', component: MenuComponent },
    { path: 'addbranchs/:idmenu', component: AdbranchComponent },
    { path: 'addcatalogs/:idbranch', component: AdcatalogComponent },
];