import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from './topbar/topbar.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [
        TopbarComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
    ],
    exports: [
        TopbarComponent,
    ]
})
export class SharedModule {
}
