import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';
import {HttpService} from '../../http.service';
import {LanguageService} from "../../language.service";

interface ResponseType {
    latestMinTemperature: BehaviorSubject<any[]>;
}

export const WeatherStation = {
    hk: [
        {
            en: 'Happy Valley',
            tc: '跑馬地',
            sc: '跑马地',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Happy_Valley_Dusk_View_2016.jpg/2880px-Happy_Valley_Dusk_View_2016.jpg',
        },
        {
            en: 'HK Park',
            tc: '香港公園',
            sc: '香港公园',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Hong_Kong_Park_overview_2017.jpg/2880px-Hong_Kong_Park_overview_2017.jpg',
        },
        {
            en: 'Shau Kei Wan',
            tc: '筲箕灣',
            sc: '筲箕湾',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/DSC_3340_SKW.JPG/2880px-DSC_3340_SKW.JPG',
        },
        {
            en: 'Stanley',
            tc: '赤柱',
            sc: '赤柱',
            img: 'https://upload.wikimedia.org/wikipedia/commons/0/01/HK_Stanley_Buildings_201007.jpg',
        },
        {
            en: 'The Peak',
            tc: '山頂',
            sc: '山顶',
            img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Hong_Kong_Night_Skyline_from_Lugard_Road.jpg',
        },
        {
            en: 'Wong Chuk Hang',
            tc: '黄竹坑',
            sc: '黄竹坑',
            img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Wong_Chuk_Hang_Aerial_view_2018.jpg',
        },
    ],
    kl: [
        {
            en: 'HK Observatory',
            tc: '天文台',
            sc: '天文台',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/%E9%A6%99%E6%B8%AF%E5%A4%A9%E6%96%87%E5%8F%B0%E7%B8%BD%E9%83%A8.JPG/2880px-%E9%A6%99%E6%B8%AF%E5%A4%A9%E6%96%87%E5%8F%B0%E7%B8%BD%E9%83%A8.JPG',
        },
        {
            en: 'Kai Tak Runway Park',
            tc: '啟德跑道公園',
            sc: '启德跑道公园',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kai_Tak_Runway_Park_1.jpg/2880px-Kai_Tak_Runway_Park_1.jpg',
        },
        {
            en: 'King\'s Park',
            tc: '京士柏',
            sc: '京士柏',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/HK_King%27s_Park_201108.jpg',
        },
        {
            en: 'Kowloon City',
            tc: '九龍城',
            sc: '九龙城',
            img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Kowloon_City_aerial_view_201707.jpg',
        },
        {
            en: 'Kwun Tong',
            tc: '觀塘',
            sc: '观塘',
            img: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Kwun_Tong_Commercial_Buildings_201407.jpg',
        },
        {
            en: 'Wong Tai Sin',
            tc: '黄大仙',
            sc: '黄大仙',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Wong_Tai_Sin_Temple_Night_view_202103.jpg/2880px-Wong_Tai_Sin_Temple_Night_view_202103.jpg',
        },
    ],
    nt: [
        {
            en: 'Chek Lap Kok',
            tc: '赤鱲角',
            sc: '赤鱲角',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/A_bird%27s_eye_view_of_Hong_Kong_International_Airport.JPG/2880px-A_bird%27s_eye_view_of_Hong_Kong_International_Airport.JPG',
        },
        {
            en: 'Cheung Chau',
            tc: '長洲',
            sc: '长洲',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Blick_%C3%BCber_Cheung_Chau.JPG/540px-Blick_%C3%BCber_Cheung_Chau.JPG',
        },
        {
            en: 'Clear Water Bay',
            tc: '清水灣',
            sc: '清水湾',
            img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Clear_Water_Bay_1st_Beach.jpg',
        },
        {
            en: 'Kau Sai Chau',
            tc: '滘西洲',
            sc: '滘西洲',
            img: 'https://www.leighorange.com/wp-content/uploads/2018/01/5093_Kau-Sai-Chau-Glof-Club_03-2000x946.jpg',
        },
        {
            en: 'Lau Fau Shan',
            tc: '流浮山',
            sc: '流浮山',
            img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Shenzhen_Bay_Bridge_2012.jpg',
        },
        {
            en: 'Ngong Ping',
            tc: '昂坪',
            sc: '昂坪',
            img: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Ngong_Ping_2009.jpg',
        },
        {
            en: 'Pak Tam Chung',
            tc: '北潭涌',
            sc: '北潭涌',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/74/HK_Sai_Kung_Country_Park_Visitor_Centre_1.JPG',
        },
        {
            en: 'Peng Chau',
            tc: '坪洲',
            sc: '坪洲',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Above_Peng_Chau_2.jpg/2880px-Above_Peng_Chau_2.jpg',
        },
        {
            en: 'Sai Kung',
            tc: '西貢',
            sc: '西贡',
            img: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Sai_Kung_Hoi_201407.jpg',
        },
        {
            en: 'Sha Tin',
            tc: '沙田',
            sc: '沙田',
            img: 'https://upload.wikimedia.org/wikipedia/commons/5/53/HK_Shatin_New_Town_2008.jpg',
        },
        {
            en: 'Sham Shui Po',
            tc: '深水埗',
            sc: '深水埗',
            img: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Sham_Shui_Po_201810.jpg',
        },
        {
            en: 'Shek Kong',
            tc: '石崗',
            sc: '石岗',
            img: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Shek_Kong_Stabling_Sidings_Office_201710.jpg',
        },
        {
            en: 'Sheung Shui',
            tc: '上水',
            sc: '上水',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Sheung_Shui_201701.jpg',
        },
        {
            en: 'Ta Kwu Ling',
            tc: '打鼓嶺',
            sc: '打鼓岭',
            img: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Village_in_Ping_Che_2013.JPG',
        },
        {
            en: 'Tai Lung',
            tc: '大隴',
            sc: '大陇',
            img: 'http://www.bkkss.edu.hk/bkkgeo/old/New_Folder22/_018.jpg',
        },
        {
            en: 'Tai Mei Tuk',
            tc: '大美督',
            sc: '大美督',
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Tai_Mei_Tuk_2018.jpg',
        },
        {
            en: 'Tai Mo Shan',
            tc: '大帽山',
            sc: '大帽山',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tai_Mo_Shan_4.jpg/2880px-Tai_Mo_Shan_4.jpg',
        },
        {
            en: 'Tai Po',
            tc: '大埔',
            sc: '大埔',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Taipo_pano.jpg/2880px-Taipo_pano.jpg',
        },
        {
            en: 'Tate\'s Cairn',
            tc: '大老山',
            sc: '大老山',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Tates_Cairn_Tunnel.jpg',
        },
        {
            en: 'Tseung Kwan O',
            tc: '將軍澳',
            sc: '将军澳',
            img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Tseung_Kwan_O_Overview_201406.jpg',
        },
        {
            en: 'Tsing Yi',
            tc: '青衣',
            sc: '青衣',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tsing_Yi_Overview_2014.jpg/440px-Tsing_Yi_Overview_2014.jpg',
        },
        {
            en: 'Tsuen Wan Ho Koon',
            tc: '荃灣可觀',
            sc: '荃湾可观',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Hong_Kong_Tsuen_Wan_Tso_Kung_Tam_and_water_catchment.JPG',
        },
        {
            en: 'Tsuen Wan Shing Mun Valley',
            tc: '荃灣城門谷',
            sc: '荃湾城门谷',
            img: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Shing_Mun_Valley_view_201806.jpg',
        },
        {
            en: 'Tuen Mun',
            tc: '屯門',
            sc: '屯门',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Kau_Keng_Shan_1.jpg/550px-Kau_Keng_Shan_1.jpg',
        },
        {
            en: 'Waglan Island',
            tc: '橫瀾島',
            sc: '横澜岛',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Waglan_Island_Sung_Kong_Lo_Chau.jpg/550px-Waglan_Island_Sung_Kong_Lo_Chau.jpg',
        },
        {
            en: 'Wetland Park',
            tc: '濕地公園',
            sc: '湿地公园',
            img: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Hong_Kong_Wetland_Park_Overview_2017.jpg',
        },
        {
            en: 'Yuen Long Park',
            tc: '元朗公園',
            sc: '元朗公园',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Yuen_Long_Park%2C_Ornamental_Lake_%28Hong_Kong%29.jpg/2880px-Yuen_Long_Park%2C_Ornamental_Lake_%28Hong_Kong%29.jpg',
        },
    ],
};

@Injectable({
    providedIn: 'root'
})
export class HkoLatestService {

    public moment = moment;
    public response: ResponseType = {
        latestMinTemperature: new BehaviorSubject<any[]>([]),
    };
    private bridge = 'https://www.chunkit.hk/to/govhk/csv.php?csv=';
    /* https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation_tc.pdf */
    private resources = {
        weather: 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType={{dataType}}&lang={{lang}}',
        earthquake: 'https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php',
        opendata: 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php',
        latestMinTemperature: 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv',
        latestMinHumidity: 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity.csv',
        latestMinVisibility: 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=csv',
    };

    constructor(
        private httpService: HttpService,
        private languageService: LanguageService,
    ) {
    }

    requestRecentTemperature(): void {
        this.httpService.getCsv(this.bridge + this.resources.latestMinTemperature).subscribe({
            next: value => {
                if (!value) {
                    return;
                }
                const jsonDataObj = [];
                const mappedWithWeatherStation = [];
                value.split('\n')
                    .filter(v => v.split(',').length && parseInt(v.split(',')[0], 0))
                    .forEach(d => {
                        const [dateTime, location, temperature] = d.split(',');
                        const momentedValue = moment(dateTime, 'YYYYMMDDHHmm');
                        jsonDataObj.push({
                            location,
                            dateTime: {
                                en: momentedValue.locale('en-au').format('LLL'),
                                tc: momentedValue.locale('zh-tw').format('LLL'),
                                sc: momentedValue.locale('zh-cn').format('LLL'),
                            },
                            temperature,
                            humidity: null,
                        });
                    });
                ['hk', 'kl', 'nt'].forEach(district => {
                    WeatherStation[district].forEach(station => {
                        mappedWithWeatherStation.push({
                            station,
                            data: jsonDataObj.find(j => j.location === station.en),
                        });
                    });
                });
                this.response.latestMinTemperature.next(mappedWithWeatherStation);
                this.requestRecentHumidity();
            }
        });
    }

    requestRecentHumidity(): void {
        this.httpService.getCsv(this.bridge + this.resources.latestMinHumidity).subscribe({
            next: value => {
                if (!value) {
                    return;
                }
                const jsonDataObj = [];
                const mappedWithWeatherStation = [];
                value.split('\n')
                    .filter(v => v.split(',').length && parseInt(v.split(',')[0], 0))
                    .forEach(d => {
                        const [dateTime, location, humidity] = d.split(',');
                        const momentedValue = moment(dateTime, 'YYYYMMDDHHmm');
                        jsonDataObj.push({
                            location,
                            dateTime: {
                                en: momentedValue.locale('en-au').format('LLL'),
                                tc: momentedValue.locale('zh-tw').format('LLL'),
                                sc: momentedValue.locale('zh-cn').format('LLL'),
                            },
                            humidity
                        });
                    });
                ['hk', 'kl', 'nt'].forEach(district => {
                    WeatherStation[district].forEach(station => {
                        mappedWithWeatherStation.push({
                            station,
                            data: jsonDataObj.find(j => j.location === station.en),
                        });
                    });
                });
                if (this.response.latestMinTemperature.getValue()) {
                    const cached = [...this.response.latestMinTemperature.getValue()];
                    mappedWithWeatherStation.filter(s => s.data).forEach((s => {
                        const index = cached.findIndex(t => t.data.location === s.data.location);
                        cached[index].data.humidity = s.data.humidity;
                    }));
                    this.response.latestMinTemperature.next(cached);
                }
            }
        });
    }

    requestLocalWeatherForecast(): void {
        this.weatherAPI('flw').subscribe({
            next: value => {
                console.log(value.generalSituation); // 概況
                console.log(value.tcInfo); // 熱帶氣旋資訊
                console.log(value.fireDangerWarning); // 火災危險警告信息
                console.log(value.forecastPeriod); // 預測時段
                console.log(value.forecastDesc); // 預測內容
                console.log(value.outlook); // 展望
                console.log(value.updateTime); // 更新時間
            }
        });
    }

    requestNineDayForecast(): void {
        this.weatherAPI('fnd').subscribe({
            next: value => {
                console.log(value.generalSituation); // 概況
                console.log(value.seaTemp); // 海面溫度
                console.log(value.soilTemp); // 土壤溫度
                console.log(value.updateTime);
                console.log(value.weatherForecast); // 天氣預報
                // console.log(forecastDate); // 預報日期
                // console.log(forecastWeather); // 預測天氣
                // console.log(forecastMaxtemp); // 預測最高溫度
                // console.log(forecastMintemp); // 預測最低溫度
                // console.log(week); // 星期天數
                // console.log(forecastWind); // 預測風向風速
                // console.log(forecastMaxrh); // 預測最高相對濕度
                // console.log(forecastMinrh); // 預測最低相對濕度
                // console.log(ForecastIcon); // 預測天氣圖示
                // console.log(PSR); // 顯著降雨概率
            }
        });
    }

    requestCurrentWeatherReport(): void {
        this.weatherAPI('rhrread').subscribe({
            next: value => {
                console.log(value.lightning); // 閃電
                console.log(value.rainfall); // 雨量
                console.log(value.icon); // 圖示
                console.log(value.iconUpdateTime); // 圖示更新時間
                console.log(value.uvindex); // 紫外線指數
                console.log(value.updateTime); // 更新時間
                console.log(value.warningMessage); // 警告信息
                console.log(value.rainstormReminder); // 暴雨警告提醒
                console.log(value.specialWxTips); // 特別天氣提示
                console.log(value.tcmessage); // 熱帶氣旋位置的消息
                console.log(value.mintempFrom00To09); // 午夜至上午九時的最低溫度
                console.log(value.rainfallFrom00To12); // 香港天文台從午夜至中午累計降雨量
                console.log(value.rainfallLastMonth); // 上個月降雨量
                console.log(value.rainfallJanuaryToLastMonth); // 一月至上月累計降雨量
                console.log(value.temperature); // 分區氣溫
                console.log(value.humidity); // 濕度
            }
        });
    }

    requestWeatherWarningSummary(): void {
        this.weatherAPI('warnsum').subscribe({
            next: value => {
                console.log(value);
            }
        });
    }

    requestWeatherWarningInfo(): void {
        this.weatherAPI('warningInfo').subscribe({
            next: value => {
                console.log(value);
            }
        });
    }

    requestSpecialWeatherTips(): void {
        this.weatherAPI('swt').subscribe({
            next: value => {
                console.log(value);
            }
        });
    }

    private weatherAPI(dataType: 'flw' | 'fnd' | 'rhrread' | 'warnsum' | 'warningInfo' | 'swt'): Observable<any> {
        const replace = (i, data) => {
            return data[i.replace(/[{}]/g, '')];
        };
        const regex = /{{dataType}}|{{lang}}/g;
        const url = this.resources.weather.replace(regex, i => replace(i, {
            dataType,
            lang: this.languageService.translate.currentLang,
        }));
        return this.httpService.getJson(url);
    }

}
