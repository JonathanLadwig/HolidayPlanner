import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = "";
  password = "";

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.email && this.password) {
      this.auth.register(this.email, this.password);
      this.email = "";
      this.password = "";
    } else {
      alert("Please enter both an email and password");
    }
  }
}
