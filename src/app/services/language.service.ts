import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    language$ = new ReplaySubject<LangChangeEvent>(1);
    translate = this.translateService;
    urlHasLang = false;
    urlLangCode = '';
    urlPathname = '';

    constructor(
        private translateService: TranslateService,
        private router: Router,
        private title: Title,
    ) {
        this.translateService.onLangChange.subscribe(() => {
            this.setPageTitle();
        });
    }

    setInitState(): void {
        this.translateService.addLangs(['en', 'tc', 'sc']);
        this.detectUrlLang();
        if (this.urlHasLang) {
            this.setLang(this.urlLangCode);
        } else {
            switch (!!this.translateService.getBrowserCultureLang()) {
                case ['zh-CN', 'zh-SG'].includes(this.translateService.getBrowserCultureLang()): {
                    this.setUrlLang('sc');
                    break;
                }
                case ['zh-HK', 'zh-TW', 'zh'].includes(this.translateService.getBrowserCultureLang()): {
                    this.setUrlLang('tc');
                    break;
                }
                default: {
                    this.setUrlLang('en');
                    break;
                }
            }
        }
    }

    setLang(lang: string): void {
        this.translateService.onLangChange.pipe(take(1)).subscribe(result => {
            this.language$.next(result);
        });
        this.translateService.use(lang);
    }

    setUrlLang(lang: string): void {
        this.translateService.onLangChange.pipe(take(1)).subscribe(result => {
            this.language$.next(result);
        });
        this.translateService.use(lang);
        this.detectUrlLang();
        if (this.urlPathname && this.urlPathname.toString().length) {
            this.router.navigate([lang, this.urlPathname], {replaceUrl: true}).then(r => r);
        } else {
            this.router.navigate([lang], {replaceUrl: true}).then(r => r);
        }
    }

    detectUrlLang(): void {
        const {pathname} = window.location;
        this.urlHasLang = pathname.search(/^\/(en|tc|sc)/) === 0;
        this.urlLangCode = pathname.substr(1, 2);
        this.urlPathname = pathname.substr(4);
    }

    setPageTitle(): void {
        this.title.setTitle(this.translateService.instant('webTitle'));
    }
}
