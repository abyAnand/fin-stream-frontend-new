import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ToasterService } from '../toaster/toaster.service';
import { BankRequest } from '../../models/auth/BankRequest.model';
import { BankDto } from '../../models/bank/BankDto.model';
import { BankInfoDto } from '../../models/bank/BankInfoDto.model';
import { BankEntity } from '../../models/bank/BankEntity.model';

const URL = 'http://localhost:8072/finStream/bank/';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  getAllBanks(): Observable<BankDto[]> {
    return this.http.get<BankDto[]>(`${URL}/bank`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  getAllBankEntity(): Observable<BankEntity[]> {
    return this.http.get<BankEntity[]>(`${URL}/bank/all/bank`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  verifyBankById(bankId: string): Observable<boolean> {
    return this.http.get<boolean>(`${URL}/bank/verify/${bankId}`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  getAllBankInfos(): Observable<BankInfoDto[]> {
    return this.http.get<BankInfoDto[]>(`${URL}/bank/all`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number): Observable<BankDto> {

    return this.http.get<BankDto>(`${URL}bank/${userId}`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  updateBank(bankDto: BankDto): Observable<any> {
    const apiUrl = `${URL}/bank`;
    return this.http.put(apiUrl, bankDto, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  registerBank(bankData: BankRequest): Observable<any> {
    return this.http.post(URL + 'bank/register', bankData, { observe: 'response', headers: BankService.HEADERS }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 201) {
          const bankDto = res.body;
          this.notification.success('Bank Created Successfully', 'Success');
          console.log('Bank registered successfully:', bankDto);
        } else {
          console.error('Bank registration failed:', res);
          this.notification.info('Bank Registration Failed', 'Fail');
        }
      }),
      catchError(error => {
        console.error('Bank registration failed:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  log(message: string) {
    console.log(message);
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
    return throwError(errorMessage);
  }
}
