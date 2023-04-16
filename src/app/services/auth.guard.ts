import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean = false;
  userID: string = "";

  constructor(public authService: AuthService, public router: Router, public fireAuth: AngularFireAuth) { }

  async canActivate(): Promise<boolean> {
    await this.authService.fireAuth.currentUser.then(user => {
      if (user) {
        this.loggedIn = true;
        this.userID = user.uid;
      }
      else {
        this.router.navigate(['login']);
        this.loggedIn = false;
        this.userID = "";
      }
    }
    );
    return this.loggedIn;
  }

  getCurrentUserID(): string {
    return this.userID;
  }

}
