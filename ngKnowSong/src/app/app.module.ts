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
import { AuthService } from './service/API/auth.service';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { SpotifyAPIService } from './service/API/spotify-api.service';
import { MusixMatchService } from './service/API/musix-match.service';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { LyricMatcherComponent } from './game/lyric-matcher/lyric-matcher.component';
import { ReleaseYearComponent } from './game/release-year/release-year.component';
import { KnowSongComponent } from './game/know-song/know-song.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    CreateGameComponent,
    ErrorComponent,
    LyricMatcherComponent,
    ReleaseYearComponent,
    KnowSongComponent,
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

