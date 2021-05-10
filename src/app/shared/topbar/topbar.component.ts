import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.service';
import {ThemeModeType, ThemeService} from '../../services/theme.service';
import {faGlobeAmericas, faMoon} from '@fortawesome/free-solid-svg-icons';
import {faMoon as faBorderMoon} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    themeModeIcon;
    menuIcon = faGlobeAmericas;

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
        this.themeService.themeMode.subscribe((data) => {
            if (data === ThemeModeType.dark) {
                this.themeModeIcon = faMoon;
            } else {
                this.themeModeIcon = faBorderMoon;
            }
        });
    }

    changeLanguageAndUrl(lang: string): void {
        this.languageService.setUrlLang(lang);
    }

    changeMode(): void {

        this.themeService.set(this.themeService.themeMode.getValue() === ThemeModeType.dark ? ThemeModeType.light : ThemeModeType.dark);
    }

}
