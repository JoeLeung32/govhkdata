import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
  ],
  exports: [
    TopbarComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule {
}
