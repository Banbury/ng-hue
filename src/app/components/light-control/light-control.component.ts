import { Component, OnInit, OnDestroy } from '@angular/core';
import { HueService, LightList } from '../../services/hue.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";

import { Light } from '../../hue/light';

@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.css']
})
export class LightControlComponent implements OnInit, OnDestroy {
    lights: LightList = {};
    lights_sub : Subscription;

    constructor(private hueService: HueService) {
    }

    ngOnInit() {
        this.reload();
    }

    ngOnDestroy() {
        if (this.lights_sub) {
            this.lights_sub.unsubscribe();
        }
    }

    reload() {
        if (this.lights_sub) {
            this.lights_sub.unsubscribe();
        }
        this.lights_sub = Observable.interval(5000).startWith(-1).switchMap(() => {
            return this.hueService.getLights();
        })
        .subscribe(
            lights => { this.lights = lights; },
            error =>  console.log(<any>error)
        );
    }

    toggle(id: string, state: boolean) {
        this.hueService.toggleLight(id, state).subscribe(
            o => this.reload()
        );
    }

    changeBrightness(id: string, value: string) {
        this.hueService.changeBrightness(id, value).subscribe(
            o => this.reload()
        );
    }
}
