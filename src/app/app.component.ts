import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router, private authGuard: AuthGuard, private afa: AngularFireAuth) {
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  goToCalendar() {
    this.router.navigate(['calendar']);
  }

  logOut() {
    this.authService.logout();
  }
}
