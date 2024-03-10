import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { LoanDto } from '../../models/loan/LoanDto.model';
import { Observable, catchError, tap, throwError } from 'rxjs';

const URL = 'http://localhost:8072/finStream/loan/loans';

@Injectable({
  providedIn: 'root'
})
export class UserloanService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  applyLoan(loanApplication: LoanDto): Observable<LoanDto> {
    console.log("This is from service");

    console.log(loanApplication);
    return this.http.post<LoanDto>(URL, loanApplication, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Applicaton Submitted Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  approveLoan(loanId: string): Observable<LoanDto> {
    return this.http.post<LoanDto>(`${URL}/approve/${loanId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
      }),
      catchError(this.handleError)
    );
  }

  rejectLoan(loanId: string): Observable<LoanDto> {
    return this.http.post<LoanDto>(`${URL}/reject/${loanId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
      }),
      catchError(this.handleError)
    );
  }

  getPendingLoans(userId: string): Observable<LoanDto[]> {
    return this.http.get<LoanDto[]>(`${URL}/pending/${userId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Applicaton Submitted Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  getRejectedLoans(userId: string): Observable<LoanDto[]> {
    return this.http.get<LoanDto[]>(`${URL}/rejected/${userId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Applicaton Submitted Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  getAllPendingUserLoans(userId: string): Observable<LoanDto[]> {
    return this.http.get<LoanDto[]>(`${URL}/pending/${userId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
      }),
      catchError(this.handleError)
    );
  }

  getAllUserLoans(userId: string): Observable<LoanDto[]> {
    return this.http.get<LoanDto[]>(`${URL}/user/${userId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
      }),
      catchError(this.handleError)
    );
  }

  getPendingLoansByBankId(bankId: string): Observable<LoanDto[]> {
    return this.http.get<LoanDto[]>(`${URL}/pending/bank/${bankId}`, { headers: UserloanService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Applicaton Retrieved Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status == 0) {
      errorMessage = 'Bank service is not available right now.';
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    this.notification.error(errorMessage, 'Error Occurred');
    return throwError(() => new Error(errorMessage));
  }
}
