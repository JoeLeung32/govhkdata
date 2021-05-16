import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {Pagination, SwiperOptions} from 'swiper/core';
import {BehaviorSubject} from 'rxjs';
import {LanguageService} from '../../../../services/language.service';
import {HkoLatestService, WeatherStation} from '../../../../services/hkgov/hko/hko-latest.service';

@Component({
    selector: 'app-hko-latest-min-temperature',
    templateUrl: './hko-latest-min-temperature.component.html',
    styleUrls: ['./hko-latest-min-temperature.component.scss']
})
export class HkoLatestMinTemperatureComponent implements OnInit, AfterViewInit {

    @ViewChild('temperatureSwiper') temperatureSwiper: any;
    language = this.languageService.translate.currentLang;
    public weatherStationList = [...WeatherStation.hk, ...WeatherStation.kl, ...WeatherStation.nt];
    public weatherStationDistrictList = WeatherStation;
    public swiperData: BehaviorSubject<any[]> = new BehaviorSubject([]);
    public swiperConfig: SwiperOptions = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    };
    public swiperPagination = {
        dynamicBullets: true
    };
    private swiper;

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
        SwiperCore.use([Pagination]);
    }

    ngAfterViewInit(): void {
        console.log(this.temperatureSwiper.swiperRef.size);
    }

    onSwiper(swiper): void {
        this.swiper = swiper;
    }

    onSlideChange(): void {
        console.log('onSlideChange');
    }

    onSlideTo(location: string): void {
        const index = this.swiperData.getValue().findIndex(data => data.station.en === location);
        this.swiper.slideTo(index);
    }

}
