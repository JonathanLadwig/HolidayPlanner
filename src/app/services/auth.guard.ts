import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public fireAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let loggedIn = true;
    //the code inside runs but the loggedIn variable is not updated
    this.authService.fireAuth.onAuthStateChanged(user => {
      console.log("Auth state changed!")
      console.log(user)
      if (!user) {
        console.log("Not logged in!")
        loggedIn = false;
      }
    });
    return loggedIn;
  }

}
