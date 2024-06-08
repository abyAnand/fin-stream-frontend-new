import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
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
    private router: Router,
    private notification: ToasterService,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      users =>{
        this.users = users;

      }
    );
  }

  // viewUser(user: UserDto){

  //   this.router.navigate(['admin/user/single'], {queryParams: {userData: JSON.stringify(user)}});
  // }

  createUser(){
    this.router.navigate(['admin/user/create']);
  }

  deleteUser(user: UserDto){
    this.userService.deleteUserById(user.id).subscribe(
      (res)=>{
        this.notification.success("User Deleted", "Success");
      },
      (err) =>{
        this.notification.error("User Deletion", "Failed");
      }
    )
  }

  blockUser(user: UserDto) {
    this.authService.blockUser(user.id).subscribe(
      (res) => {
        this.notification.success("User Blocked", "Success");
      },
      (err) =>{
        this.notification.error("User Blocking Failed", "Failed");
      }
    )
  }

  editUser(user: UserDto) {
    console.log(user);

    this.router.navigate(['admin/user/edit'], {queryParams: {userData: JSON.stringify(user)}});
  }


}
