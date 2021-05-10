import {Component, OnInit, OnDestroy} from '@angular/core';
import {LanguageService} from '../../../services/language.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

    constructor(
        private languageService: LanguageService,
    ) {
        languageService.setPageTitle(['aboutUs']);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.languageService.resetPageTitle();
    }

}
