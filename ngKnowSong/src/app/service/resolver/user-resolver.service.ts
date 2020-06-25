import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../API/auth.service';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { UserService } from '../Data/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>{

  constructor(
    private authService: AuthService,
    private userStorage: UserService
    ) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    
    if(this.userStorage.getUser() === undefined){
      return this.authService.getUserData().pipe(
        catchError( (error) => {
        return empty();
        })
      );
    } else{
      return this.userStorage.getUser();
    }
    
  }
}
