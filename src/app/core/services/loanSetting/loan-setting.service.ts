import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoanSetting } from '../../models/loan/LoanSetting.model';
import { K8ExternalIp } from '../URL';

// const URL = 'http://localhost:8072/finStream/bank/loan/settings';

const URL = K8ExternalIp+'/finStream/bank/loan/settings';

@Injectable({
  providedIn: 'root'
})
export class LoanSettingService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  getLoanSettingListByTypeId(typeId: string): Observable<LoanSetting[]> {
    return this.http.get<LoanSetting[]>(`${URL}/list/${typeId}`, { headers: LoanSettingService.HEADERS })
    .pipe(
      tap(() => {

      }),
      catchError(this.handleError)
    );
  }

  createLoanSetting(loanSetting: LoanSetting): Observable<LoanSetting> {

    console.log(loanSetting);
    return this.http.post<LoanSetting>(URL, loanSetting, { headers: LoanSettingService.HEADERS })
    .pipe(
      tap(() => {
        this.notification.success('Loan Setting Created Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  updateLoanSetting(loanSetting: LoanSetting): Observable<LoanSetting>{
    return this.http.put<LoanSetting>(URL,loanSetting, {headers: LoanSettingService.HEADERS})
    .pipe(
      tap(()=>{
        this.notification.success('Loan Setting Updated Successfully', 'Success');
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
