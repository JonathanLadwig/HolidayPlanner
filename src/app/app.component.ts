import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  displayName: string = '';

  constructor(public authService: AuthService, private router: Router, private afa: AngularFireAuth) {
    this.afa.currentUser.then((user) => {
      this.displayName = user?.displayName || '';
    });
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
