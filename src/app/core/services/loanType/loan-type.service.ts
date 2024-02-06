import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { LoanType } from '../../models/loan/LoanType.model';
import { Observable, catchError, tap, throwError } from 'rxjs';

const URL = 'http://localhost:8072/finStream/bank/loan/type';

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  getLoanTypeListByBankId(bankId: number): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(`${URL}/list/${bankId}`, { headers: LoanTypeService.HEADERS })
    .pipe(
      tap(() => {

      }),
      catchError(this.handleError)
    );
  }

  getAllLoanTypes(): Observable<LoanType[]> {
    return this.http.get<LoanType[]>(`${URL}/list`, { headers: LoanTypeService.HEADERS })
    .pipe(
      tap(() => {

      }),
      catchError(this.handleError)
    );
  }

  createLoanType(loanType: LoanType): Observable<LoanType> {
    console.log("This is from service");

    console.log(loanType);
    return this.http.post<LoanType>(URL, loanType, { headers: LoanTypeService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Setting Created Successfully', 'Success');
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
