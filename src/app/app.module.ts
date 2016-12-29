import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ColorPickerModule } from 'angular2-color-picker';

import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';
import { AppComponent } from './app.component';
import { HueService } from './services/hue.service';
import { ConfigService } from './services/config.service';
import { AuthGuard } from './services/auth-guard.service';
import { ValuesPipe } from './pipes/values.pipe';
import { LightControlComponent } from './components/light-control/light-control.component';
import { TimerSetupComponent } from './components/timer-setup/timer-setup.component';
import { AlarmSetupComponent } from './components/alarm-setup/alarm-setup.component';
import { HueIconComponent } from './components/hue-icon/hue-icon.component';
import { BridgeSetupComponent } from './components/bridge-setup/bridge-setup.component';
import { HueTimePipe } from './pipes/hue-time.pipe';
import { SetupComponent } from './components/setup/setup.component';
import { RulesComponent } from './components/rules/rules.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/setup', pathMatch: 'full' },
    { path: 'lights', component: LightControlComponent, canActivate: [AuthGuard] },
    { path: 'alarms', component: AlarmSetupComponent, canActivate: [AuthGuard] },
    { path: 'timers', component: TimerSetupComponent, canActivate: [AuthGuard] },
    { path: 'bridge', component: BridgeSetupComponent, canActivate: [AuthGuard] },
    { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
    { path: 'setup', component: SetupComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        UiSwitchComponent,
        ValuesPipe,
        LightControlComponent,
        TimerSetupComponent,
        AlarmSetupComponent,
        HueIconComponent,
        BridgeSetupComponent,
        HueTimePipe,
        SetupComponent,
        RulesComponent,
        ColorPickerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        ColorPickerModule
    ],
    providers: [
        HueService,
        ConfigService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
