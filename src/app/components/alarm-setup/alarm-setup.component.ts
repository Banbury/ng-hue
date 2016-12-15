import { Component, OnInit, OnDestroy } from '@angular/core';
import { HueService, ScheduleList } from '../../services/hue.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Schedule } from '../../hue/schedule';


@Component({
    selector: 'app-alarm-setup',
    templateUrl: './alarm-setup.component.html',
    styleUrls: ['./alarm-setup.component.css']
})
export class AlarmSetupComponent implements OnInit, OnDestroy {
    schedules: ScheduleList = {};
    sched_sub: Subscription;

    constructor(private hueService: HueService) { }

    ngOnInit() {
        this.reload();
    }

    ngOnDestroy() {
        if (this.sched_sub) {
            this.sched_sub.unsubscribe();
        }
    }

    reload() {
        if (this.sched_sub) {
            this.sched_sub.unsubscribe();
        }

        this.sched_sub = this.hueService.getSchedules()
            .subscribe(
                sched => { this.schedules = this.hueService.filterSchedules(sched, (s: Schedule) => {
                        return Schedule.isAlarm(s);
                    });
                },
                error =>  console.log(<any>error)
            );
    }

}
