import { Athlete } from "./athlete";
import { Map } from "./map";
import { AppSettings } from "../../app-settings";
import * as moment from 'moment';
import * as _ from 'lodash';

export class Activity {
    achievement_count: number;
    athlete: Athlete;
    athlete_count:number;
    average_cadence: number;
    average_speed: number;
    average_temp: number
    comment_count: number;
    commute: boolean;
    distance:number;
    elapsed_time:number;
    elev_high: number;
    elev_low: number;
    end_latlng: number[];
    external_id: string;
    flagged: boolean;
    from_accepted_tag: boolean;
    gear_id:string;
    has_heartrate: boolean;
    has_kudoed: boolean;
    id: number;
    kudos_count: number;
    location_city: number;
    location_country: string;
    location_state: any;
    manual: boolean;
    map: Map;
    max_speed: number;
    moving_time: number;
    name: string;
    photo_count: number;
    pr_count: number;
    private: boolean;
    resource_state: number;
    start_date: Date;
    start_date_local: Date;
    start_latitude: number;
    start_latlng: number[];
    start_longitude: number;
    suffer_score: number;
    timezone: string;
    total_elevation_gain: number;
    total_photo_count: number;
    trainer: boolean;
    type: string;
    upload_id: number;
    utc_offset: number;
    workout_type: any;

    public get distanceKm(): number {
        return this.distance / 1000;
    }
    public get startTime(): moment.Moment {
        return moment(this.start_date_local, moment.ISO_8601);
    }
    private _steps;
    public get steps() {
        if (this._steps) {
            return this._steps;
        }
        let kmCount = Math.ceil(this.distance / 1000);
        let array = new Array(kmCount);
        _.each(array, (km, index) => {
            array[index] = {km: index+1};
        });
        this._steps = array;
        return this._steps;
        
    }
    public get mapThumbnail(): string {
        
        let size = 'l'
        let startColor = '000';
        let endColor = '000';
        let startPin = `pin-${size}-a+${startColor}`;
        let endPin = `pin-${size}-b+${endColor}`;
        let imageSize = '200x200';
        if (window.devicePixelRatio > 1) {
            imageSize += `@2x`;
        }

        let url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/`;
        if (this.end_latlng != null && this.start_latlng != null) {
            url += `${startPin}(${this.start_latlng[1]},${this.start_latlng[0]}),${endPin}(${this.end_latlng[1]},${this.end_latlng[0]}),`;
        }

        url += `path-5+f44-0.5(${this.map.summary_polyline})`;
        url += `/auto/${imageSize}?access_token=${AppSettings.MAPBOX_ACCESS_TOKEN}`;



        return url;
    }
}