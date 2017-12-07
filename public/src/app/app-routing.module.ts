import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdhomeComponent } from './admin/adhome/adhome.component';

import { ClientComponent, CLIENT_ROUTES } from './layout/client';
import { AdministratorComponent, ADMINISTRATOR_ROUTES } from './layout/administrator';
const appRoutes: Routes = [
    { path: '', redirectTo: 'home',pathMatch:'full'},
    //client
    { path: '', component: ClientComponent, children: CLIENT_ROUTES},
    //admin
    { path: '', component: AdministratorComponent, children: ADMINISTRATOR_ROUTES},
];
@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }) 
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
