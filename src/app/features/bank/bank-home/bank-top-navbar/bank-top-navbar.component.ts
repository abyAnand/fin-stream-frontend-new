import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-bank-top-navbar',
  templateUrl: './bank-top-navbar.component.html',
  styleUrls: ['./bank-top-navbar.component.css']
})
export class BankTopNavbarComponent implements OnInit{

  username: string;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
}

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  showNotifications: boolean = false;
  showProfile: boolean = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/bank/login'])
  }

}
