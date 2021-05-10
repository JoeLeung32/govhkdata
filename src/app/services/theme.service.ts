import {Inject, Injectable} from '@angular/core';
import {Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private renderer: Renderer2;

    isDark = false;

    constructor(
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.detect();
    }

    setDark(mode: string): void {
        this.isDark = mode === 'dark';
        this.renderer.addClass(document.body, this.isDark ? 'dark' : 'light');
        this.renderer.removeClass(document.body, this.isDark ? 'light' : 'dark');
    }

    detect(): void {
        this.isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.renderer.addClass(document.body, this.isDark ? 'dark' : 'light');
    }
}
