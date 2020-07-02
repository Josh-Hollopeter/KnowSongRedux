import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LandingComponent } from './component/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { AuthService } from './service/API/auth.service';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { SpotifyAPIService } from './service/API/spotify-api.service';
import { MusixMatchService } from './service/API/musix-match.service';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { LyricMatcherComponent } from './game/lyric-matcher/lyric-matcher.component';
import { KnowSongComponent } from './game/know-song/know-song.component';
import { MusicDataService } from './game/data/music-data.service';
import { UserService } from './service/Data/user.service';
import { GameBuilderService } from './service/API/game-builder.service';
import { GameServiceService } from './game/data/game-service.service';
import { QuestionComponent } from './game/know-song/question/question.component';
import { AboutComponent } from './component/about/about.component';
import { GameHistoryComponent } from './component/game-history/game-history.component';
import { GameHistory } from './game/data/game-history';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    CreateGameComponent,
    ErrorComponent,
    LyricMatcherComponent,
    KnowSongComponent,
    QuestionComponent,
    AboutComponent,
    GameHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    SpotifyAPIService,
    MusixMatchService,
    MusicDataService,
    UserService,
    GameHistory,
    GameBuilderService,
    GameServiceService,

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

