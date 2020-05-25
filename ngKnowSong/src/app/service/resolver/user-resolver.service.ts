import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../API/auth.service';
import { UserService } from '../Data/user.service';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>{

  constructor(
    private authService: AuthService
    ) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.authService.getUserData().pipe(
      catchError( (error) => {
      return empty();
      })
    );
  }
}
