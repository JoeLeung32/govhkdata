import {Component, HostListener} from '@angular/core';
import {LanguageService} from './services/language.service';
import {ThemeService} from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @HostListener('window:popstate', ['$event'])
    onPopState(): void {
        this.initial();
    }

    constructor(
        private languageService: LanguageService,
        private themeService: ThemeService,
    ) {
        this.initial();
    }

    initial(): void {
        this.languageService.setInitState();
        this.themeService.detect();
    }

}
