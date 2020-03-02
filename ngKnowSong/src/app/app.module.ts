import {A11yModule} from '@angular/cdk/a11y';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { DataService } from './injectable/data.service';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from './models/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { Board1Component } from './game/board1/board1.component';
import { QuizComponent } from './game/quiz/quiz.component';
import { AuthorizeComponent } from './spotifyJSON/authorize/authorize.component';
import { CallbackComponent } from './spotifyJSON/callback/callback.component';
import { ErrorComponent } from './pages/error/error.component';
import { Httpinterceptor } from './services/interceptor/httpinterceptor';

import { MatchHistoryComponent } from './game/match-history/match-history.component';


import { CreateGameComponent } from './pages/create-game/create-game.component';
import { SongstreamService } from './spotifyJSON/services/songstream.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserpageComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    UserHomeComponent,
    Board1Component,
    QuizComponent,
    AuthorizeComponent,
    CallbackComponent,
    ErrorComponent,

    MatchHistoryComponent,

    CreateGameComponent,


    MatchHistoryComponent,
    CreateGameComponent,


  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    A11yModule,

  ],
  providers: [
    AuthService,
    UserService,
    SongstreamService,
    DataService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: Httpinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
