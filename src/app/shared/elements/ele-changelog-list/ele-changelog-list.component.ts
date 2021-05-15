import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/language.service';

interface ContentType {
    langCode?: [];
    title: string;
    category?: [];
    tag?: [];
    remotePath?: string;
    date?: string;
    link?: [];
}

interface ResponseType {
    status: string;
    data?: [ContentType];
    complete: boolean;
}

@Component({
    selector: 'app-ele-changelog-list',
    templateUrl: './ele-changelog-list.component.html',
    styleUrls: ['./ele-changelog-list.component.scss']
})
export class EleChangelogListComponent implements OnInit {

    @Input() response: ResponseType;
    @Input() displayMode: 'list' | 'categories' | 'tags';
    language = this.languageService.translate.currentLang;

    constructor(
        private languageService: LanguageService,
    ) {
        languageService.translate.onLangChange.subscribe(({lang}) => {
            this.language = lang;
        });
    }

    ngOnInit(): void {
    }

}
