import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit{

  username: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.username = localStorage.getItem('username');
  }

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
    this.router.navigate(['/'])
  }
}
