import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {ThemeService} from '../../services/theme.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    constructor(
        public router: Router,
        public translateService: TranslateService,
        public languageService: LanguageService,
        public themeService: ThemeService,
    ) {
    }

    get currentLanguage(): string {
        return this.languageService.translate.currentLang;
    }

    ngOnInit(): void {
    }

    changeLanguageAndUrl(lang: string): void{
        this.languageService.setUrlLang(lang);
    }

    changeMode(mode: string): void {
        this.themeService.set(mode);
    }

}
