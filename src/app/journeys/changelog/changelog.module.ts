import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {MarkdownModule} from 'ngx-markdown';
import {LanguageService} from '../../services/language.service';
import {SharedModule} from '../../shared/shared.module';
import {ChangelogRoutingModule} from './changelog-routing.module';
import {ChangelogIndexComponent} from './changelog-index/changelog-index.component';
import { ChangelogDetailComponent } from './changelog-detail/changelog-detail.component';

export function createTranslateLoader(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'},
    {prefix: './assets/i18n/changelog/', suffix: '.json'},
  ]);
}

@NgModule({
  declarations: [
    ChangelogIndexComponent,
    ChangelogDetailComponent
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
    MarkdownModule.forRoot(),
    ChangelogRoutingModule,
  ]
})
export class ChangelogModule {

  language$ = this.languageService.language$;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) {
    this.language$.pipe(map(language => language.lang))
      .subscribe(lang => this.translateService.use(lang));
  }
}
