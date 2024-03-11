import { Component, OnInit } from '@angular/core';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanTypeService } from '../../../../../../core/services/loanType/loan-type.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CreateLoanTypeComponent } from '../create-loan-type/create-loan-type.component';
import { CreateLoanComponent } from '../create-loan/create-loan.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { getAllLoanTypesAction, getAllLoanTypesByBankIdAction } from 'src/app/Store/LoanType/LoanType.action';
import { allLoanTypeLoadingSelector, allLoanTypesErrorSelector, allLoanTypesSelector, loanTypeSelector } from 'src/app/Store/LoanType/LoanType.selector';

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.css']
})
export class LoanTypeListComponent implements OnInit{


  loanTypeList$: Observable<LoanType[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  bankId! : any;

  constructor(
    private loanTypeService: LoanTypeService,
    private notification: ToasterService,
    private modalService: NgbModal,
    private router: Router,
    private store: Store<AppStateInterface>
  ){

  }

  ngOnInit(): void {
    this.bankId = StorageService.getUserIdFromToken();
    this.store.dispatch(getAllLoanTypesByBankIdAction({bankId: this.bankId}))
    this.fetchAll();

  }


  fetchAll(){
    this.isLoading$ = this.store.pipe(select(allLoanTypeLoadingSelector));
    this.error$ = this.store.pipe(select(allLoanTypesErrorSelector));
    this.loanTypeList$ = this.store.pipe(select(allLoanTypesSelector));
  }

  createLoanSetting(): void {
    const modalRef = this.modalService.open(CreateLoanTypeComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  viewLoans(loanType: LoanType){
    this.router.navigate(['/bank/loan/list'],{state: {loanType: loanType}});
  }
}
