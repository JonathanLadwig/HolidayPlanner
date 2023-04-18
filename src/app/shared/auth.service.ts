import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth, public router: Router, public store: Store<AppState>) {
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).
      then(() => {
        this.fireAuth.currentUser.then(user => {
          //set user data in state and local storage
          if (user?.email && user?.displayName) {
            //set local persistence
            this.fireAuth.setPersistence('local');
          }
        });
        this.router.navigate(['landing']);
        // this.store.dispatch(loadActivities())
        // this.store.dispatch(loadHolidays())
      }, error => {
        alert(error.message);
      })
  }

  register(email: string, password: string, displayName: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {

        this.fireAuth.currentUser.then(user => {
          user?.updateProfile({
            displayName: displayName
          });
          this.fireAuth.setPersistence('local');
          this.router.navigate(['landing']);
          // this.store.dispatch(loadActivities())
          // this.store.dispatch(loadHolidays())
        });
      }, error => {
        alert(error.message);
      })
  }

  logout() {
    this.router.navigate(['login']);
    this.fireAuth.signOut();
  }


  checkIfLoggedIn() {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['landing']);
      }
    }
    );
  }

}
