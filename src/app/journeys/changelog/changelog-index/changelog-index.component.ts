import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LanguageService} from '../../../services/language.service';
import {HttpService, ObserverType} from '../../../services/http.service';

interface ContentType {
    langCode: [];
    title: string;
    category: [];
    tag: [];
    remotePath: string;
    date: string;
}
interface ResponseType {
    title: string;
    urL: string;
    link?: [ContentType];
}

@Component({
    selector: 'app-changelog-index',
    templateUrl: './changelog-index.component.html',
    styleUrls: ['./changelog-index.component.scss']
})
export class ChangelogIndexComponent implements OnInit {

    language = this.languageService.translate.currentLang;
    public httpDocumentsJson: BehaviorSubject<[ContentType]> = new BehaviorSubject(null);
    public httpCategoriesJson: BehaviorSubject<ResponseType> = new BehaviorSubject(null);
    public httpTagsJson: BehaviorSubject<ResponseType> = new BehaviorSubject(null);
    public dataDocumentsJson;
    public dataCategoriesJson;
    public dataTagsJson;
    private urlDocumentsJson = 'mds/_meta/documents.json';
    private urlCategoriesJson = 'mds/_meta/categories.json';
    private urlTagsJson = 'mds/_meta/tags.json';

    constructor(
        private languageService: LanguageService,
        private httpService: HttpService,
    ) {
        languageService.translate.onLangChange.subscribe(({lang}) => {
            this.language = lang;
        });
        this.httpDocumentsJson.subscribe(data => {
            this.dataDocumentsJson = data;
        });
        this.httpCategoriesJson.subscribe(data => {
            this.dataCategoriesJson = data;
        });
        this.httpTagsJson.subscribe(data => {
            this.dataTagsJson = data;
        });
    }

    ngOnInit(): void {
        this.initial();
    }

    initial(): void {
        this.httpResponse(this.urlDocumentsJson, this.httpDocumentsJson);
        this.httpResponse(this.urlCategoriesJson, this.httpCategoriesJson);
        this.httpResponse(this.urlTagsJson, this.httpTagsJson);
    }

    private httpResponse(path, subject: ObserverType): void {
        this.httpService.getJson(path).subscribe({
            next: value => {
                subject.next({
                    status: 'success',
                    data: value,
                    complete: true,
                });
            },
            error: err => {
                subject.next({
                    status: 'failed',
                    data: err,
                    complete: true,
                });
            }
        });
    }

}
