import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { TransactionDto, TransactionStatus } from 'src/app/core/models/transaction/TransactionDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

declare var Razorpay: any;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() depositCompleted: EventEmitter<any> = new EventEmitter();
  @Input() account: AccountDto;
  depositForm: FormGroup;
  savedTransactionDto: TransactionDto;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private notification: ToasterService
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.account);
  }

  createForm() {
    this.depositForm = this.fb.group({
      depositAmount: [null, Validators.required]
    });
  }

  payNow(transactionDto: TransactionDto): void {
    const RazorpayOptions = {
      description: 'Deposit to account',
      currency: 'INR',
      amount: transactionDto.amount * 100,
      name: 'Fin-Stream',
      key: 'rzp_test_ti4COoTWxp1e7t',
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        phone: '9999999999'
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        }
      }
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful:', paymentId);
      this.createTransaction(transactionDto);
    };

    const failureCallback = (error: any) => {
      console.error('Payment failed:', error);
      this.notification.error( 'Failed','Payment failed. Please try again.');
    };

    const rzp = new Razorpay(RazorpayOptions);
    rzp.open();
    rzp.on('payment.failed', failureCallback);
    rzp.on('payment.success', successCallback);
  }

  deposit() {
    const transactionDto: TransactionDto = {
      senderId: StorageService.getUserIdFromToken(),
      senderBankId: this.account.bankId,
      senderAccountId: this.account.id,
      amount: this.depositForm.get('depositAmount')!.value,
      receiverId: StorageService.getUserIdFromToken(),
      receiverAccountId: this.account.id,
      receiverBankId: this.account.bankId,
      receiverAccountName: '',
      status: TransactionStatus.PENDING
    };

    console.log(transactionDto);
    this.payNow(transactionDto);
  }

  createTransaction(transactionDto: TransactionDto) {
    this.transactionService.createTransaction(transactionDto).subscribe(
      (transaction) => {
        this.savedTransactionDto = transaction;
        console.log('Transaction completed:', transaction);
        this.onSubmit.emit();
        this.depositCompleted.emit();
        this.activeModal.close();
      },
      (error) => {
        console.error('Error occurred while transferring money:', error);
        this.notification.error('Failed','Error occurred while transferring money.');
      }
    );
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}
