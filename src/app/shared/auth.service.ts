import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      }, (err: FirebaseError) => {
        alert("Invalid credentials");
        this.router.navigate(['/login']);
      })
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      }, (err: FirebaseError) => {
        alert("Invalid credentials");
        this.router.navigate(['/register']);
      })
  }

  logout() {
    this.fireAuth.signOut();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
