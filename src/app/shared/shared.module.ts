import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TopbarComponent} from './topbar/topbar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageWrapperComponent} from './page-wrapper/page-wrapper.component';

@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    HeaderComponent,
    PageWrapperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
  ],
  exports: [
    TopbarComponent,
    HeaderComponent,
    FooterComponent,
    PageWrapperComponent,
  ]
})
export class SharedModule {
}
