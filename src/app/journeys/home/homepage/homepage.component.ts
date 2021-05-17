import {Component, Inject, OnDestroy, OnInit, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

    private renderer: Renderer2;

    constructor(
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'shadowHeader');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'shadowHeader');
    }

}
