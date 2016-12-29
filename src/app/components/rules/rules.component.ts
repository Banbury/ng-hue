import { Component, OnInit } from '@angular/core';

import { HueService } from '../../services/hue.service';
import { Rule, RuleList} from '../../hue/rule';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
    rules: RuleList = {};

    constructor(private hue: HueService) { }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.hue.getRules().subscribe(r => {
                this.rules = r;
            },
            error =>  console.log(<any>error)
        );
    }

}
