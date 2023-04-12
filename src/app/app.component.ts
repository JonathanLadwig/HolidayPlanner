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

  constructor(public authService: AuthService, private router: Router) {
  }
  goHome() {
    this.router.navigate(['dashboard']);
  }

  logOut() {
    this.authService.logout();
  }
}
