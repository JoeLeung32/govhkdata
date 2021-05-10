import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AboutUsComponent} from './about-us/about-us.component';
import {AboutProjectComponent} from './about-project/about-project.component';

const routes: Routes = [
    {
        path: '',
        component: AboutUsComponent
    },
    {
        path: 'project',
        component: AboutProjectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OtherRoutingModule {
}
