import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/timeInterval";
import "rxjs/add/operator/take";

import { ConfigService } from '../../services/config.service';
import { HueService } from '../../services/hue.service';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    appname: string = "";
    progress: number=0;
    isWaiting: boolean = false;

    constructor(
        private router: Router,
        private hue: HueService,
        private config: ConfigService) {
        if (config.apikey) {
            this.router.navigateByUrl('/lights');
        }
    }

    ngOnInit() {
    }

    createUser() {
        this.progress = 100;
        this.isWaiting = true;

        let sub = Observable.interval(250)
            .timeInterval().take(120)
            .subscribe( t => {
                    this.progress -=  0.83;
                },
                error => console.log("Error: ", error),
                () => {
                    this.progress = 0;
                    this.isWaiting = false;
                }
            );
        // this.hue.createUser(this.appname)
        //     .subscribe( b => {
        //
        //     }
        // );
    }
}
