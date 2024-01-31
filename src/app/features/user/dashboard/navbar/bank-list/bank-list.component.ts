import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bank } from 'src/app/core/models/Bank.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit{

  bankList: Bank[] = [];
  error: boolean = false;

  constructor(
    private bankService: BankService,
    private notification: ToasterService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.bankService.getAllBanks().subscribe(
      (banks) => {
        this.bankList = banks;
        console.log(this.bankList);

      },
      (error) => {
        this.notification.error(error, 'Error fetching banks:');
        this.error = true;
      }
    );
  }

  showBankAccounts(bankId: string): void {

    this.router.navigate(['/user/dashboard/accounts/', bankId]);
  }

}
