import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { HueService } from '../../services/hue.service';
import { Config } from '../../hue/config';

@Component({
    selector: 'app-bridge-setup',
    templateUrl: './bridge-setup.component.html',
    styleUrls: ['./bridge-setup.component.css']
})
export class BridgeSetupComponent implements OnInit {
    config: Config = new Config();
    bridge_sub: Subscription;


    constructor(private hue: HueService) { }

    ngOnInit() {
        this.reload();
    }

    ngOnDestroy() {
    }

    reload() {
        if (this.bridge_sub) {
            this.bridge_sub.unsubscribe();
        }

        this.bridge_sub = this.hue.getConfig()
            .subscribe(
                c =>  { this.config = c },
                error => console.log(<any>error)
            );
    }

    deleteUser(apikey: string) {
        this.hue.deleteUser(apikey).subscribe(
            r => {},
            error => console.log(<any>error),
            () => this.reload()
        );
    }
}
