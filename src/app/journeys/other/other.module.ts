import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {LanguageService} from '../../services/language.service';
import {SharedModule} from '../../shared/shared.module';
import {OtherRoutingModule} from './other-routing.module';
import {AboutUsComponent} from './about-us/about-us.component';
import { AboutProjectComponent } from './about-project/about-project.component';

export function createTranslateLoader(http: HttpClient): MultiTranslateHttpLoader {
    return new MultiTranslateHttpLoader(http, [
        {prefix: './assets/i18n/', suffix: '.json'},
        {prefix: './assets/i18n/other/', suffix: '.json'},
    ]);
}

@NgModule({
    declarations: [
        AboutUsComponent,
        AboutProjectComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            },
            isolate: true
        }),
        SharedModule,
        OtherRoutingModule
    ]
})
export class OtherModule {

    language$ = this.languageService.language$;

    constructor(
        private translateService: TranslateService,
        private languageService: LanguageService,
    ) {
        this.language$.pipe(map(language => language.lang))
            .subscribe(lang => this.translateService.use(lang));
    }
}
