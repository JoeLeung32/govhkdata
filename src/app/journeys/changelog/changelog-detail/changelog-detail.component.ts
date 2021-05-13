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
    this.httpClient.get('mds/_meta/categories.json').subscribe(data => {
      console.log('~>', data);
    });
    this.activatedRoute.params.subscribe(params => {
      const {lang, year, month, filename} = params;
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
        this.markdownService.getSource(`mds/${year}/${month}/${filename}.${lang}.md`).subscribe({
          next: process,
          error: err => {
            const {status} = err;
            if (status !== 200) {
              this.markdownService.getSource(`mds/${year}/${month}/${filename}.md`).subscribe({
                next: process,
                error: () => {
                  this.mdContent = this.markdownService.compile('# Content Not Found');
                }
              });
            }
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
