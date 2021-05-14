import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MarkdownService} from 'ngx-markdown';
import {LanguageService} from '../../../services/language.service';

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

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private markdownService: MarkdownService,
        private languageService: LanguageService,
    ) {
        this.activatedRoute.params.subscribe(params => {
            const {year, month, filename} = params;
            const filepath = `mds/${year}/${month}/${filename}.md`;
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
        });
    }

    ngOnInit(): void {
    }

}
