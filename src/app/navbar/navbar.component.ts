import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router,private loginService:LoginService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Assuming your LoginService has a method to check if the user is logged in
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
