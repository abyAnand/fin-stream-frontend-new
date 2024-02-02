import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-show-user-accounts',
  templateUrl: './show-user-accounts.component.html',
  styleUrls: ['./show-user-accounts.component.css']
})
export class ShowUserAccountsComponent  implements OnInit{

  userAccounts: AccountDto[];

  constructor(
    private accountService: AccountService,
    private notification: ToasterService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  fetchUserAccounts(): void {
    const userId = StorageService.getUserIdFromToken(); // Assuming you have a method like this in your StorageService
    this.accountService.getUserAccounts(userId).subscribe(
      (accounts) => {
        this.userAccounts = accounts;
      },
      (error) => {
        this.notification.error(error, 'Error fetching user accounts:');
      }
    );
  }

  viewAccount(account: AccountDto){
    this.router.navigate(['/user/dashboard/details'], { queryParams: { account: JSON.stringify(account) } });
  }


}
