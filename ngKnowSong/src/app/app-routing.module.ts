import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { CreateGameComponent } from './component/create-game/create-game.component';
import { AdminGuard } from './admin/admin.guard';
import { UserResolverService } from './service/resolver/user-resolver.service';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, resolve: {user: UserResolverService}, canActivate: [AdminGuard]},
  { path: 'creategame/:gameType', component: CreateGameComponent, canActivate: [AdminGuard]},
  { path: 'error', component: ErrorComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
