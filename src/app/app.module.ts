import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { UiSwitchComponent } from './components/ui-switch/ui-switch.component';
import { AppComponent } from './app.component';
import { HueService } from './services/hue.service';
import { ValuesPipe } from './pipes/values.pipe';
import { LightControlComponent } from './components/light-control/light-control.component';
import { TimerSetupComponent } from './components/timer-setup/timer-setup.component';
import { AlarmSetupComponent } from './components/alarm-setup/alarm-setup.component';
import { HueIconComponent } from './components/hue-icon/hue-icon.component';
import { BridgeSetupComponent } from './components/bridge-setup/bridge-setup.component';

const appRoutes: Routes = [
    { path: '', component: LightControlComponent },
    { path: 'alarms', component: AlarmSetupComponent },
    { path: 'timers', component: TimerSetupComponent },
    { path: 'bridge', component: BridgeSetupComponent }
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
        BridgeSetupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        HueService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
