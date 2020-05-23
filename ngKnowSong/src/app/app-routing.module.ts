import { LyricMatchComponent } from './game/lyric-match/lyric-match.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { AdminGuard } from './admin/admin.guard';
import { CallbackComponent } from './component/callback/callback.component';


const routes: Routes = [
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard]},
  { path: 'creategame', component: CreateGameComponent, canActivate: [AdminGuard]},
  { path: 'loggingIn', component: CallbackComponent, canActivate: [AdminGuard]},
  { path: 'LyricMatch', component: LyricMatchComponent, canActivate: [AdminGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
