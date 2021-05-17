import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LanguageService} from '../../../../services/language.service';
import {HkoLatestService, WeatherStation} from '../../../../services/hkgov/hko/hko-latest.service';

@Component({
    selector: 'app-hko-latest-min-temperature',
    templateUrl: './hko-latest-min-temperature.component.html',
    styleUrls: ['./hko-latest-min-temperature.component.scss']
})
export class HkoLatestMinTemperatureComponent implements OnInit {

    @ViewChild('carousel', {static: false}) carousel: any;
    language = this.languageService.translate.currentLang;
    public weatherStationList = [...WeatherStation.hk, ...WeatherStation.kl, ...WeatherStation.nt];
    public weatherStationDistrictList = WeatherStation;
    public swiperData: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private swipeTimeout;

    constructor(
        private languageService: LanguageService,
        private hkoLatestService: HkoLatestService,
    ) {
        languageService.translate.onLangChange.subscribe(({lang}) => {
            this.language = lang;
        });
        hkoLatestService.response.latestMinTemperature.subscribe(data => {
            this.swiperData.next(data);
        });
        hkoLatestService.requestRecentTemperature(this.language);
    }

    ngOnInit(): void {
    }

    onSwipe(event): void {
        const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'right' : 'left') : null;
        // const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? 'down' : 'up') : null;
        this.carousel.pause();
        if (x === 'right') {
            this.carousel.prev();
        } else {
            this.carousel.next();
        }
        this.swipeTimeout = setTimeout(() => {
            this.carousel.cycle();
        }, 1000);
    }

    onSlideTo(location: string): void {
        const index = this.swiperData.getValue().findIndex(data => data.station.en === location);
        this.carousel.select(`station${index}`);
    }

}
