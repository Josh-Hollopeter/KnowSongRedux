import { MusicDataService } from './../../game/data/music-data.service';
import { KnowSongComponent } from './../../game/know-song/know-song.component';
import { ReleaseYearComponent } from './../../game/release-year/release-year.component';
import { LyricMatcherComponent } from './../../game/lyric-matcher/lyric-matcher.component';
import { SpotifyAPIService } from './../API/spotify-api.service';
import { CreateGameComponent } from './../../component/create-game/create-game.component';
import { LandingComponent } from './../../component/landing/landing.component';
import { HomeComponent } from './../../component/home/home.component';
import { AppComponent } from './../../app.component';
import { AppRoutingModule } from './../../app-routing.module';
import { MusixMatchService } from './../API/musix-match.service';
import { ErrorComponent } from './../../error/error.component';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { AuthService } from 'src/app/service/API/auth.service'
import { FormsModule } from '@angular/forms';

import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
