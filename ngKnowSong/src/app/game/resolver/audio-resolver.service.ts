import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AudioResolverService implements Resolve<any>{

  constructor() { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    throw new Error("Method not implemented.");
  }
}
