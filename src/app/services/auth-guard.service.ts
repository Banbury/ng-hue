import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ConfigService } from './config.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private config: ConfigService) {
    }

    canActivate(): boolean {
        return (this.config.apikey) ? true : false;
    }
}
