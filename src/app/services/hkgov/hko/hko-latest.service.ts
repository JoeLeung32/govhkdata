import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {HttpService} from '../../http.service';

interface ResponseType {
    latestMinTemperature: BehaviorSubject<any[]>;
}

export const WeatherStation = {
    hk: [
        {
            en: 'Happy Valley',
            tc: '跑馬地',
            sc: '跑马地',
        },
        {
            en: 'HK Park',
            tc: '香港公園',
            sc: '香港公园',
        },
        {
            en: 'Shau Kei Wan',
            tc: '筲箕灣',
            sc: '筲箕湾',
        },
        {
            en: 'Stanley',
            tc: '赤柱',
            sc: '赤柱',
        },
        {
            en: 'The Peak',
            tc: '山頂',
            sc: '山顶',
        },
        {
            en: 'Wong Chuk Hang',
            tc: '黄竹坑',
            sc: '黄竹坑',
        },
    ],
    kl: [
        {
            en: 'HK Observatory',
            tc: '天文台',
            sc: '天文台',
        },
        {
            en: 'Kai Tak Runway Park',
            tc: '啟德跑道公園',
            sc: '启德跑道公园',
        },
        {
            en: 'King\'s Park',
            tc: '京士柏',
            sc: '京士柏',
        },
        {
            en: 'Kowloon City',
            tc: '九龍城',
            sc: '九龙城',
        },
        {
            en: 'Kwun Tong',
            tc: '觀塘',
            sc: '观塘',
        },
        {
            en: 'Wong Tai Sin',
            tc: '黄大仙',
            sc: '黄大仙',
        },
    ],
    nt: [
        {
            en: 'Chek Lap Kok',
            tc: '赤鱲角',
            sc: '赤鱲角',
        },
        {
            en: 'Cheung Chau',
            tc: '長洲',
            sc: '长洲',
        },
        {
            en: 'Clear Water Bay',
            tc: '清水灣',
            sc: '清水湾',
        },
        {
            en: 'Kau Sai Chau',
            tc: '滘西洲',
            sc: '滘西洲',
        },
        {
            en: 'Lau Fau Shan',
            tc: '流浮山',
            sc: '流浮山',
        },
        {
            en: 'Ngong Ping',
            tc: '昂坪',
            sc: '昂坪',
        },
        {
            en: 'Pak Tam Chung',
            tc: '北潭涌',
            sc: '北潭涌',
        },
        {
            en: 'Peng Chau',
            tc: '坪洲',
            sc: '坪洲',
        },
        {
            en: 'Sai Kung',
            tc: '西貢',
            sc: '西贡',
        },
        {
            en: 'Sha Tin',
            tc: '沙田',
            sc: '沙田',
        },
        {
            en: 'Sham Shui Po',
            tc: '深水埗',
            sc: '深水埗',
        },
        {
            en: 'Shek Kong',
            tc: '石崗',
            sc: '石岗',
        },
        {
            en: 'Sheung Shui',
            tc: '上水',
            sc: '上水',
        },
        {
            en: 'Ta Kwu Ling',
            tc: '打鼓嶺',
            sc: '打鼓岭',
        },
        {
            en: 'Tai Lung',
            tc: '大隴',
            sc: '大陇',
        },
        {
            en: 'Tai Mei Tuk',
            tc: '大美督',
            sc: '大美督',
        },
        {
            en: 'Tai Mo Shan',
            tc: '大帽山',
            sc: '大帽山',
        },
        {
            en: 'Tai Po',
            tc: '大埔',
            sc: '大埔',
        },
        {
            en: 'Tate\'s Cairn',
            tc: '大老山',
            sc: '大老山',
        },
        {
            en: 'Tseung Kwan O',
            tc: '將軍澳',
            sc: '将军澳',
        },
        {
            en: 'Tsing Yi',
            tc: '青衣',
            sc: '青衣',
        },
        {
            en: 'Tsuen Wan Ho Koon',
            tc: '荃灣可觀',
            sc: '荃湾可观',
        },
        {
            en: 'Tsuen Wan Shing Mun Valley',
            tc: '荃灣城門谷',
            sc: '荃湾城门谷',
        },
        {
            en: 'Tuen Mun',
            tc: '屯门',
            sc: '屯门',
        },
        {
            en: 'Waglan Island',
            tc: '橫瀾島',
            sc: '横澜岛',
        },
        {
            en: 'Wetland Park',
            tc: '濕地公園',
            sc: '湿地公园',
        },
        {
            en: 'Yuen Long Park',
            tc: '元朗公園',
            sc: '元朗公园',
        },
    ],
};

@Injectable({
    providedIn: 'root'
})
export class HkoLatestService {

    public response: ResponseType = {
        latestMinTemperature: new BehaviorSubject<any[]>([]),
    };
    private resources = {
        latestMinTemperature: 'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv',
    };

    constructor(
        private httpService: HttpService,
    ) {
    }

    requestRecentTemperature(language): void {
        let langCode = 'en-au';
        if (language === 'tc') {
            langCode = 'zh-tw';
        } else if (language === 'sc') {
            langCode = 'zh-cn';
        }
        this.httpService.getCsv(this.resources.latestMinTemperature).subscribe({
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
                        jsonDataObj.push({
                            location,
                            dateTime: moment(dateTime, 'YYYYMMDDHHmm').locale(langCode).format('LLL'),
                            temperature
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
            }
        });
    }
}
