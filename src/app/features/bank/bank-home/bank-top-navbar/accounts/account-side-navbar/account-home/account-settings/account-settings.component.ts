import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountTypeListRequestDto } from 'src/app/core/models/AccountTypeListRequestDto.model';
import { AccountTypeSetting } from 'src/app/core/models/AccountTypeSetting.model';
import { BankSettingDto } from 'src/app/core/models/BankSettingDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { CreateAccountSettingComponent } from '../create-account-setting/create-account-setting.component';
import { EditAccountSettingComponent } from '../edit-account-setting/edit-account-setting.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{

  accountTypeList: BankSettingDto[] = [];
  error: boolean = false;
  bankId! : any;
  shortName: string;
  hasAccount: boolean = true;

  constructor(
    private bankService: BankService,
    private notification: ToasterService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.shortName = params['shortName'];

    });

    this.bankId = StorageService.getUserIdFromToken();

    const accountTypeRequestDto: AccountTypeListRequestDto = {
      bankId: this.bankId,
      accountType: this.shortName
    };

    this.fetchAccountTypeSettingList(accountTypeRequestDto);

  }

  private fetchAccountTypeSettingList(accountTypeRequestDto: AccountTypeListRequestDto): void {
    this.bankService.getAccountSettingsListByBankIdAndAccountType(accountTypeRequestDto).subscribe(
      (banks) => {
        this.accountTypeList = banks;
        this.hasAccount = this.accountTypeList.length > 0;
        StorageService.setHasAccount(this.hasAccount);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }

  createAccount(): void {
    const modalRef = this.modalService.open(CreateAccountSettingComponent, { centered: true });
    modalRef.componentInstance.shortName = this.shortName;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      // Handle any logic after the form is submitted
      modalRef.close();
    });
  }

  viewAccounts(account: BankSettingDto): void {

    const modalRef = this.modalService.open(EditAccountSettingComponent, { centered: true });
    modalRef.componentInstance.shortName = this.shortName;
    modalRef.componentInstance.account = account; // Pass the selected accountType
    modalRef.componentInstance.onSubmit.subscribe(() => {
      // Handle any logic after the form is submitted
      modalRef.close();
    });
  }


}
