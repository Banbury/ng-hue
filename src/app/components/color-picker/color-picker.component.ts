import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPickerService } from 'angular2-color-picker';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {
    @Input() xy: number[];
    @Input() bri: number;

    color: any;

    @Output() colorSelected = new EventEmitter<number[]>();
    @Output() click = new EventEmitter();
    @Output() close = new EventEmitter();

    constructor(private cpService: ColorPickerService) { }

    ngOnInit() {
        this.color = this.getColor(this.xy, this.bri);
    }

    onClick() {
        this.click.emit();
    }

    onToggle(event) {
        if (!event) {
            this.close.emit();
        }
    }

    onChanged(event: string) {
        if (this.color !== event) {
            let pattern = /rgb\((\d+),(\d+),(\d+)\)/
            let m = event.match(pattern);
            if (m) {
                this.color = event;
                let xy = this.getXY(Number(m[1]), Number(m[2]), Number(m[3]));
                this.colorSelected.emit(xy);
            }
        }
    }

    getColor(xy: number[], bri: number): string {
        let x = xy[0];
        let y = xy[1];
        let z = 1.0 - x - y;
        let Y = bri / 255;
        let X = (Y / y) * x;
        let Z = (Y / y) * z;

        let r =  X * 1.656492 - Y * 0.354851 - Z * 0.255038;
        let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
        let b =  X * 0.051713 - Y * 0.121364 + Z * 1.011530;

        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

        r = Math.floor(Math.min(255, r * 255));
        g = Math.floor(Math.min(255, g * 255));
        b = Math.floor(Math.min(255, b * 255));

        return `rgb(${r},${g},${b})`;
    }

    getXY(r: number, g: number, b: number): number[] {
        let red = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
        let green = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
        let blue = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);

        let X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        let Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        let Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

        let x = X / (X + Y + Z);
        let y = Y / (X + Y + Z);

        return [x, y];
    }
}
