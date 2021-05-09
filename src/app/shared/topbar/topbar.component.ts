import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    constructor(
        public languageService: LanguageService,
        public translateService: TranslateService,
        public router: Router,
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

}
