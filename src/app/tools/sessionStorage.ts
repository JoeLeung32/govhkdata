export class SessionStorage {

    languageKey = 'od-local';

    ss = sessionStorage;

    constructor() {
        if (!this.ss.getItem(this.languageKey)) {
            this.set(this.languageKey, '');
        }
    }

    set(key: string, value: any): void {
        if (typeof value !== 'string') {
            this.ss.setItem(key, JSON.stringify(value));
            return;
        }
    }

    get(key: string): object | string {
        let data = this.ss.getItem(key);
        try {
            data = JSON.parse(data);
            return data;
        } catch (e) {
            return data;
        }
    }

    setLang(value: string): void {
        this.ss.setItem(this.languageKey, value);
    }

    getLang(): string | null {
        const value = this.ss.getItem(this.languageKey);
        return value && value.toString().length ? value : null;
    }
}
