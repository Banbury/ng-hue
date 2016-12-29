import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ConfigService {
    url: string;
    apikey: string;

    constructor(private http: Http) {
        this.url = environment.url;
        this.apikey = environment.apikey;
        this.getConfig();
    }

    private getConfig() {
        this.http.get('/config')
            .map(res => {
                let r = res.json();
                if (r["bridge-url"]) {
                    this.url = r["bridge-url"];
                }
                if (r["api-name"]) {
                    this.apikey = r["api-name"];
                }
            });
    }
}
