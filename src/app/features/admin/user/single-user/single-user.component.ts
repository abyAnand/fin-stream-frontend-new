import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { LoanDto } from '../../../../core/models/loan/LoanDto.model';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit{

  user: UserDto | null = null;
  loanList : LoanDto[] = [];
  accountList : AccountDto[] = [];
  error: boolean = false;

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      if(params['userData']){
        this.user = JSON.parse(params['userData']);
      }
    });

    console.log(this.user);
    this.loanList = this.user.loanList;
    this.accountList = this.user.accountList;
    console.log(this.loanList);
    console.log(this.accountList);
      
  }

}
