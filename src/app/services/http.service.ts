import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export type ObserverType = {
    next?: (value) => void,
    error?: (err) => void,
    complete?: () => void
};

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private httpClient: HttpClient,
    ) {

    }

    getJson(url: string, observer?: ObserverType): Observable<any> {
        const call = this.httpClient.get(url);
        if (observer) {
            call.subscribe({
                next: value => {
                    if (observer.next && typeof observer.next === 'function') {
                        observer.next(value);
                    }
                },
                error: err => {
                    if (observer.error && typeof observer.error === 'function') {
                        observer.error(err);
                    }
                },
                complete: () => {
                    if (observer.complete && typeof observer.complete === 'function') {
                        observer.complete();
                    }
                }
            });
        } else {
            return call;
        }
    }
}
