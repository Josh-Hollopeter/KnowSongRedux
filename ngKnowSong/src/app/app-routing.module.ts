import { LyricMatchComponent } from './game/lyric-match/lyric-match.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { AdminGuard } from './admin/admin.guard';
import { UserResolverService } from './service/resolver/user-resolver.service';
import { ReleaseYearComponent } from './game/release-year/release-year.component';
import { NameSongComponent } from './game/name-song/name-song.component';


const routes: Routes = [
  
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, resolve: {user: UserResolverService}, canActivate: [AdminGuard]},
  { path: 'creategame', component: CreateGameComponent, canActivate: [AdminGuard]},
  { path: 'LyricMatch', component: LyricMatchComponent, canActivate: [AdminGuard]},
  { path: 'ReleaseYear' , component: ReleaseYearComponent, canActivate:[AdminGuard]},
  { path: 'NameSong', component: NameSongComponent, canActivate:[AdminGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
