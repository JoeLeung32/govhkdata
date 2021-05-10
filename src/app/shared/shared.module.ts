import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        TopbarComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ],
    exports: [
        TopbarComponent,
    ]
})
export class SharedModule {
}
