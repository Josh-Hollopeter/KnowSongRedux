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
import {HttpClientModule} from '@angular/common/http';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { Board1Component } from './game/board1/board1.component';
import { QuizComponent } from './game/quiz/quiz.component';
import { AuthorizeComponent } from './spotifyJSON/authorize/authorize.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
