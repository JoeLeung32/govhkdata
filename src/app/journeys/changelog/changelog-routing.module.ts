import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ChangelogIndexComponent} from './changelog-index/changelog-index.component';
import {ChangelogDetailComponent} from './changelog-detail/changelog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChangelogIndexComponent,
  },
  {
    path: 'read/:year/:month/:filename',
    component: ChangelogDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangelogRoutingModule { }
