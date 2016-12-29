import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';

import { Light } from '../hue/light';
import { Schedule } from '../hue/schedule';
import { Config } from '../hue/config';
import { Rule, RuleList } from '../hue/rule';

export type LightList =  { [id: string]: Light };
export type ScheduleList =  { [id: string]: Schedule };

@Injectable()
export class HueService {
    private baseUrl = "";

    constructor(private http: Http, private config: ConfigService) {
        this.baseUrl = `${config.url}${config.apikey}`;
    }

    getHeaders() : Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }

    createUser(name: string): Observable<string> {
        return this.http.post(this.baseUrl, { devicetype:  name})
            .map<string>(res => {
                let r = res.json();
                if (r.success) {
                    return r.success.username;
                }
                return null;
            })
            .catch(this.handleError);
    }

    deleteUser(name: string): Observable<boolean> {
        return this.http.delete(`${this.baseUrl}/config/whitelist/${name}`)
            .map<boolean>(res  => {
                let r = res.json();
                return r.success;
            })
            .catch(this.handleError);
    }

    getConfig(): Observable<Config> {
        return this.http.get(this.baseUrl + "/config")
            .map<Config>(res => {
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    getLights(): Observable<LightList> {
        return this.http.get(this.baseUrl + "/lights")
            .map<LightList>(res => {
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    getSchedules(): Observable<ScheduleList> {
        return this.http.get(this.baseUrl + "/schedules")
            .map<ScheduleList>(res => {
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    getRules(): Observable<RuleList> {
        return this.http.get(this.baseUrl + "/rules")
            .map<RuleList>(res => {
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    getLightById(id: string): Observable<Light> {
        return this.http.get(this.baseUrl + "/lights/" + id)
            .map(res => {
                return res.json() || {};
            })
            .catch(this.handleError);
    }

    toggleLight(id: string, state: boolean) {
        let payload = JSON.stringify({"on": state});
        let headers = this.getHeaders();
        headers.append("Content-Length", "" + (payload.length * 2));

        return this.http.put(this.baseUrl + "/lights/" + id + "/state", payload, { headers: headers })
            .map(
                res => res.json()
            )
            .catch(this.handleError);
    }

    changeBrightness(id: string, value: string) {
        let n = parseInt(value);
        let payload = JSON.stringify({"bri": n});
        let headers = this.getHeaders();
        headers.append("Content-Length", "" + (payload.length * 2));

        return this.http.put(this.baseUrl + "/lights/" + id + "/state", payload, { headers: headers })
            .map(
                res => res.json()
            )
            .catch(this.handleError);
    }

    changeColor(id: string, value: number[]) {
        let payload = JSON.stringify({"xy": value});
        let headers = this.getHeaders();
        return this.http.put(this.baseUrl + "/lights/" + id + "/state", payload, { headers: headers })
            .map(
                res => res.json()
            )
            .catch(this.handleError);
    }

    filterSchedules(schedules: ScheduleList, callback: (schedule: Schedule) => boolean) : ScheduleList {
        let ret: ScheduleList = {};

        for (let id in schedules) {
            if (callback(schedules[id] as Schedule)) {
                ret[id] = schedules[id];
            }
        }

        return ret;
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
