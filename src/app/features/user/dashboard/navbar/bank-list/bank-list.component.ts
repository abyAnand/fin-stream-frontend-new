import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit{

  bankList: any[];
  error: boolean = false;

  constructor(
    private bankService: BankService,
    private notification: ToasterService
  ){}

  ngOnInit(): void {

    this.bankService.getAllBanks().subscribe(
      (banks) => {
        this.bankList = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching banks:');
        this.error = true;
      }
    );
  }

}
