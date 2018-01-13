import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AuthService } from './services/auth.service';
import { StravaService } from './services/strava.service';
import { AtheleteRepository } from './repositories/athelete-repository.service';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TokenExchangeComponent } from './components/token-exchange/token-exchange.component';
import { UserService } from './services/user.service';
import { MapStateService } from './services/map-state.service';
import { MapService } from './services/map.service';
import { ActivityOverlayComponent } from './components/activity-overlay/activity-overlay.component';
import { ChartsModule } from 'ng2-charts';
import { ActivityElevationComponent } from './components/activity-elevation/activity-elevation.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ActivityListComponent,
    TokenExchangeComponent,
    ActivityOverlayComponent,
    ActivityElevationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    StravaService,
    MapService,
    MapStateService,
    AtheleteRepository,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
