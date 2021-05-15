import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService} from '../../../services/language.service';
import {HttpService} from '../../../services/http.service';
import {BehaviorSubject} from 'rxjs';

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
    selector: 'app-changelog-categories',
    templateUrl: './changelog-categories.component.html',
    styleUrls: ['./changelog-categories.component.scss']
})
export class ChangelogCategoriesComponent implements OnInit {

    language = this.languageService.translate.currentLang;
    public result: BehaviorSubject<ResponseType> = new BehaviorSubject(null);
    private urlCategoriesJson = 'mds/_meta/categories.json';
    private urlTagsJson = 'mds/_meta/tags.json';

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private languageService: LanguageService,
    ) {
        languageService.translate.onLangChange.subscribe(({lang}) => {
            this.language = lang;
        });
        this.activatedRoute.params.subscribe(params => {
            const {category, tag} = params;
            let urlJson;
            let keyword;
            if (category) {
                urlJson = this.urlCategoriesJson;
                keyword = category;
            }
            if (tag) {
                urlJson = this.urlTagsJson;
                keyword = tag;
            }
            this.httpService.getJson(urlJson).subscribe({
                next: data => {
                    const exist = data.find(d => d.title === keyword || d.url === keyword);
                    if (exist) {
                        this.result.next(exist);
                    }
                },
                error: err => {
                    console.error(err);
                }
            });
        });
    }

    get getValue(): ResponseType {
        return this.result.getValue();
    }

    ngOnInit(): void {
    }

}
