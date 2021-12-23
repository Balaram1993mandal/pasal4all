import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(route:any, state: RouterStateSnapshot):Observable <boolean> {
       return this.auth.user$.map(user => {
      if (user)
        return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;

    });
       
      }
 
}