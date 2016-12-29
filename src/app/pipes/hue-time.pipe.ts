import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hueTime'
})
export class HueTimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return new Date(value);
    }

}
