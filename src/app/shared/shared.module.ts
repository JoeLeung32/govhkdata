import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MomentModule} from 'ngx-moment';
import {SwiperModule} from 'swiper/angular';
import {TopbarComponent} from './topbar/topbar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageWrapperComponent} from './page-wrapper/page-wrapper.component';
import {EleChangelogListComponent} from './elements/ele-changelog-list/ele-changelog-list.component';
import {LayFlexTwoOneComponent} from './layouts/lay-flex-two-one/lay-flex-two-one.component';
import {HkoLatestMinTemperatureComponent} from './hkgov/hko/hko-latest-min-temperature/hko-latest-min-temperature.component';

@NgModule({
    declarations: [
        TopbarComponent,
        FooterComponent,
        HeaderComponent,
        PageWrapperComponent,
        EleChangelogListComponent,
        LayFlexTwoOneComponent,
        HkoLatestMinTemperatureComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FontAwesomeModule,
        MomentModule,
        SwiperModule,
    ],
    exports: [
        TopbarComponent,
        HeaderComponent,
        FooterComponent,
        PageWrapperComponent,
        LayFlexTwoOneComponent,
        EleChangelogListComponent,
        HkoLatestMinTemperatureComponent,
    ],
})
export class SharedModule {
}
