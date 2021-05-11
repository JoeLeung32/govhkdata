import {Component, OnInit} from '@angular/core';
import {faCopyright} from '@fortawesome/free-regular-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyrightIcon = faCopyright;
  githubIcon = faGithub;

  constructor() {
  }

  ngOnInit(): void {
  }

}
