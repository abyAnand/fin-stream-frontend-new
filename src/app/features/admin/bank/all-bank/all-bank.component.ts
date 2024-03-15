import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankInfoDto } from 'src/app/core/models/bank/BankInfoDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';

@Component({
  selector: 'app-all-bank',
  templateUrl: './all-bank.component.html',
  styleUrls: ['./all-bank.component.css']
})
export class AllBankComponent implements OnInit{

  banks: BankInfoDto[] = [];

  constructor(
    private bankService: BankService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadBanks();
  }

  loadBanks(): void {
    this.bankService.getAllBankInfos().subscribe(
      banks => {
        this.banks = banks;
      }
    );
  }

  createBank(): void {
    this.router.navigate(['admin/bank/create']);
  }

  verifyBank(bank: BankInfoDto): void {
    this.bankService.verifyBankById(bank.id).subscribe(

    );
  }

  viewDetails(bank: BankInfoDto){
    this.router.navigate(['admin/bank/single'], {queryParams: {bankData: JSON.stringify(bank)}});
  }

}
