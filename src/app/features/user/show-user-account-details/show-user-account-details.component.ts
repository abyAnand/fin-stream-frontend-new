import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDto } from 'src/app/core/models/bank/account/AccountDto.model';

@Component({
  selector: 'app-show-user-account-details',
  templateUrl: './show-user-account-details.component.html',
  styleUrls: ['./show-user-account-details.component.css']
})
export class ShowUserAccountDetailsComponent implements OnInit{

  selectedAccount: AccountDto | undefined;
  transactions: null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
      const accountString = this.route.snapshot.queryParamMap.get('account');
      if(accountString){
        this.selectedAccount = JSON.parse(accountString) as AccountDto;
      }
      console.log(this.selectedAccount);

  }

  editAccount(account: AccountDto){
    this.router.navigate(['/user/dashboard/edit'], { queryParams: { account: JSON.stringify(account) } });
  }

}
