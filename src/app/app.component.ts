import {Component, HostListener} from '@angular/core';
import {LanguageService} from './services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @HostListener('window:popstate', ['$event'])
    onPopState(): void {
        this.languageService.setInitState();
    }

    constructor(
        private languageService: LanguageService,
    ) {
        this.languageService.setInitState();
    }

}
