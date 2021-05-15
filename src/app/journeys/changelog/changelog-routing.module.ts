import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChangelogIndexComponent} from './changelog-index/changelog-index.component';
import {ChangelogDetailComponent} from './changelog-detail/changelog-detail.component';
import {ChangelogCategoriesComponent} from './changelog-categories/changelog-categories.component';

const routes: Routes = [
    {
        path: '',
        component: ChangelogIndexComponent,
    },
    {
        path: 'read/:year/:month/:filename',
        component: ChangelogDetailComponent,
    },
    {
        path: 'category/:category',
        component: ChangelogCategoriesComponent,
    },
    {
        path: 'tag/:tag',
        component: ChangelogCategoriesComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangelogRoutingModule {
}
