import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {MarkdownService} from 'ngx-markdown';
import {LanguageService} from '../../../services/language.service';
import {HttpService} from '../../../services/http.service';

interface Meta {
    title?: string;
    category?: string[];
    tag?: string[];
    date?: string;
}

@Component({
    selector: 'app-changelog-detail',
    templateUrl: './changelog-detail.component.html',
    styleUrls: ['./changelog-detail.component.scss']
})
export class ChangelogDetailComponent implements OnInit {

    language = this.languageService.translate.currentLang;
    mdMeta: Meta = {};
    mdContent: string;
    private urlDocumentsJson = 'mds/_meta/documents.json';
    private remotePath;
    private filepath: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private markdownService: MarkdownService,
        private languageService: LanguageService,
    ) {
        languageService.translate.onLangChange.subscribe(({lang}) => {
            this.language = lang;
        });
        this.activatedRoute.params.subscribe(params => {
            const {year, month, filename} = params;
            this.remotePath = `${year}/${month}/${filename}`;
            this.httpService.getJson(this.urlDocumentsJson).subscribe({
                next: data => {
                    const exist = data.find(d => d.remotePath === this.remotePath);
                    if (exist) {
                        let path = `mds/${this.remotePath}.md`;
                        if (exist.langCode) {
                            if (exist.langCode.includes(this.language)) {
                                path = `mds/${this.remotePath}.${this.language}.md`;
                            } else {
                                path = `mds/${this.remotePath}.${exist.langCode[0]}.md`;
                            }
                        }
                        this.filepath.next(path);
                    }
                },
                error: err => {
                    console.error(err);
                }
            });
            this.filepath.subscribe(path => {
                this.logic(path);
            });
        });
    }

    ngOnInit(): void {
    }

    logic(filepath): void {
        try {
            const process = (data) => {
                if (!data) {
                    return;
                }
                let inMeta = 0;
                const content = [];
                data.split(/\r|\n|\r\n/).forEach((line) => {
                    if (line === '---') {
                        inMeta++;
                        return;
                    }
                    if (inMeta < 2) {
                        const [key, value] = line.split(':');
                        switch (key) {
                            case 'category':
                            case 'tag': {
                                this.mdMeta[key] = value.split(',').map(s => s.trim());
                                break;
                            }
                            default: {
                                this.mdMeta[key] = value.trim();
                            }
                        }
                    } else {
                        content.push(line);
                    }
                });
                this.mdContent = this.markdownService.compile(content.join('\r\n'));
            };
            this.markdownService.getSource(filepath).subscribe({
                next: data => {
                    if (data.substr(0, 3) === '---') {
                        process(data);
                    }
                },
                error: err => {
                    console.error(err);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

}
