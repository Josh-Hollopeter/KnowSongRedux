import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LandingComponent } from './component/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule} from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { SpotifyAPIService } from './service/spotify-api.service';
import { MusixMatchService } from './service/musix-match.service';
import { FormsModule } from '@angular/forms';
import { CallbackComponent } from './component/callback/callback.component';
import { LyricMatchComponent } from './game/lyric-match/lyric-match.component';
import { ReleaseYearComponent } from './game/release-year/release-year.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    CreateGameComponent,
    CallbackComponent,
    LyricMatchComponent,
    ReleaseYearComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule
  ],
  providers: [
    AuthService,
    SpotifyAPIService,
    MusixMatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

