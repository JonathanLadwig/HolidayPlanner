import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth, public router: Router,) {
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).
      then(() => {
        this.fireAuth.currentUser.then(user => {
          console.log("This user is logged in" + user?.metadata)
        });
        this.router.navigate(['dashboard']);
        console.log("Go to dashboard")
      }, error => {
        alert(error.message);
      })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.fireAuth.currentUser.then(user => {
          console.log("This user is logged in" + user?.metadata)
          this.router.navigate(['dashboard']);
        });
      }, error => {
        alert(error.message);
      })
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }

  googleAuth() {
    return
  }

}
