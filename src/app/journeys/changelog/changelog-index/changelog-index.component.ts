import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/language.service';

@Component({
  selector: 'app-changelog-index',
  templateUrl: './changelog-index.component.html',
  styleUrls: ['./changelog-index.component.scss']
})
export class ChangelogIndexComponent implements OnInit {

  language = this.languageService.translate.currentLang;

  constructor(
    private languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
  }

}
