import { Component, OnInit, OnDestroy } from '@angular/core';
import { HueService, LightList } from '../../services/hue.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/takeWhile";

import { Light } from '../../hue/light';

@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.css']
})
export class LightControlComponent implements OnInit, OnDestroy {
    lights: LightList = {};
    lights_sub : Subscription;
    pause: boolean = false;

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
        this.lights_sub = Observable.interval(5000).startWith(-1)
        .takeWhile(x => !this.pause)
        .switchMap(() => {
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

    colorPickerClicked() {
        this.pause = true;
    }

    colorPickerClosed() {
        this.pause = false;
        this.reload();
    }

    colorSelected(id, color) {
        this.hueService.changeColor(id, color).subscribe(
            o => this.reload()
        );
    }
}
