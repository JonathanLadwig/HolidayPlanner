import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {

  constructor(public authService: AuthService, protected router: Router) {
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  goToLanding() {
    this.router.navigate(['landing']);
  }

  goToCalendar() {
    this.router.navigate(['calendar']);
  }

  logOut() {
    this.authService.logout();
  }
}
