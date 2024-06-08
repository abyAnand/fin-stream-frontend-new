import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankInfoDto } from 'src/app/core/models/bank/BankInfoDto.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-all-bank',
  templateUrl: './all-bank.component.html',
  styleUrls: ['./all-bank.component.css']
})
export class AllBankComponent implements OnInit {

  banks: BankInfoDto[] = [];

  constructor(
    private bankService: BankService,
    private router: Router,
    private authService: AuthService,
    private notification: ToasterService
  ) { }

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
      response => {
        // Update the bank's verified status in the local array
        const index = this.banks.findIndex(b => b.id === bank.id);
        if (index !== -1) {
          this.banks[index].verified = true;
        }
      }
    );
  }

  viewDetails(bank: BankInfoDto): void {
    this.router.navigate(['admin/bank/single'], { queryParams: { bankData: JSON.stringify(bank) } });
  }

  editBank(bank: BankInfoDto): void {
    this.router.navigate(['admin/bank/edit', bank.id]);
  }

  deleteBank(bank: BankInfoDto): void {
    if (confirm(`Are you sure you want to delete the bank: ${bank.name}?`)) {
      this.bankService.verifyBankById(bank.id).subscribe(
        response => {
          this.banks = this.banks.filter(b => b.id !== bank.id);
        }
      );
    }
  }

  blockBank(bank: BankInfoDto): void {
    this.authService.blockUser(bank.id).subscribe(
      (res) =>{
        this.notification.success("Blocked User", "Success");
      },
      (err) =>{
        this.notification.error("User Blocking Failed", "Failed");
      }
    )
  }
}
