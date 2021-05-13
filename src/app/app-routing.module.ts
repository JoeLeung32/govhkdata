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
    path: ':lang/changelog',
    loadChildren: () => import('./journeys/changelog/changelog.module').then(m => m.ChangelogModule)
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
