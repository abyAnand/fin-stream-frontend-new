import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{

  users: UserDto[] = [];


  constructor(
    private userService: UserService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      users =>{
        this.users = users;
      }
    );
  }

  viewUser(user: UserDto){

    this.router.navigate(['admin/user/single'], {queryParams: {userData: JSON.stringify(user)}});
  }

  createUser(){
    this.router.navigate(['admin/user/create']);
  }
}
