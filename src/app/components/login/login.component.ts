import { Component, OnInit } from '@angular/core';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, { provide: PERSISTENCE, useValue: 'session' }]
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(public auth: AuthService, public router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.auth.checkIfLoggedIn();
  }

  login() {
    if (this.email && this.password) {
      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
    } else {
      alert('Please enter both an email and password');
    }
  }

  createNewAccount() {
    this.router.navigate(['register']);
  }
}
