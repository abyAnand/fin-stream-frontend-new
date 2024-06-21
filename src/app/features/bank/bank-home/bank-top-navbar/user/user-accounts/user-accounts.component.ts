import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';
import { BankAccountDto, UserDto } from '../../../../../../core/models/account/BankAccountDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit{

  bankAccounts: BankAccountDto[] = [];
  bankId! : any;

  ngOnInit(): void {
    this.bankId = StorageService.getUserIdFromToken();
    this.fetchAccountList(this.bankId);
    console.log(this.bankAccounts)
  }

  constructor(
    private accountService: AccountService
  ){

  }

  private fetchAccountList(bankId: string){
    this.accountService.getUserAccountsByBankId(bankId).subscribe(
      accountList => {
        this.bankAccounts = accountList;
      }
    );
  }

  getUserFullName(user: UserDto): string {
    return user.firstName + ' ' + user.lastName;
  }

  // viewAccount(accountId: 
  // }




}
