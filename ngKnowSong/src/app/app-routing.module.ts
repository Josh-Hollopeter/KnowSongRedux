import { KnowSongComponent } from './game/know-song/know-song.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { AdminGuard } from './admin/admin.guard';
import { UserResolverService } from './service/resolver/user-resolver.service';
import { ErrorComponent } from './error/error.component';
import { AudioResolverService } from './game/resolver/audio-resolver.service';
import { LyricResolverService } from './game/resolver/lyric-resolver.service';
import { LyricMatcherComponent } from './game/lyric-matcher/lyric-matcher.component';
import { AboutComponent } from './component/about/about.component';
import { FinishedgameComponent } from './game/finishedgame/finishedgame.component';


const routes: Routes = [
  
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent, resolve: {user: UserResolverService}, canActivate: [AdminGuard]},
  { path: 'creategame/:gameType', component: CreateGameComponent, canActivate: [AdminGuard]},
  { path: 'audio', component: KnowSongComponent, resolve: {game: AudioResolverService}, canActivate:[AdminGuard]},
  { path: 'lyric', component: LyricMatcherComponent, resolve: {questions: LyricResolverService}, canActivate:[AdminGuard]},
  { path: 'finishedgame', component: FinishedgameComponent, canActivate:[AdminGuard]},
  { path: 'error', component: ErrorComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
