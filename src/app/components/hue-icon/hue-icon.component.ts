import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-hue-icon',
    templateUrl: './hue-icon.component.html',
    styleUrls: ['./hue-icon.component.css']
})
export class HueIconComponent implements OnInit {
    @Input() modelid: String;
    @Input() width;
    @Input() height;

    @ViewChild('img') image: ElementRef;

    icon: String;

    constructor() { }

    ngOnInit() {
        if (this.width) {
            this.image.nativeElement.width = this.width;
        }

        if (this.height) {
            this.image.nativeElement.height = this.height;
        }

        switch (this.modelid) {
            case 'LWB006':
                this.icon = "white_e27.svg";
                break;
        }
    }

}
