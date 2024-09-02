import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private logInServ: LoginService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.logInServ.logout();
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this.logInServ.isLoggedIn();
  }
}
