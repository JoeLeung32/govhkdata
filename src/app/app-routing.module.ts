import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/en'
    },
    {
        path: ':lang',
        loadChildren: () => import('./journeys/home/home.module').then(m => m.HomeModule)
    },
    {
        path: ':lang/about-us',
        loadChildren: () => import('./journeys/other/other.module').then(m => m.OtherModule)
    },
    {
        path: '**',
        loadChildren: () => import('./journeys/error/error.module').then(m => m.ErrorModule)
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
