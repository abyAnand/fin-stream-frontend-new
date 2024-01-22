import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ToasterService } from '../toaster/toaster.service';
import { BankRequest } from '../../models/BankRequest.model';
import { BankDto } from '../../models/BankDto.model';
import { Bank } from '../../models/Bank.model';
import { AccountTypeSetting } from '../../models/AccountTypeSetting.model';
import { AccountTypeListRequestDto } from '../../models/AccountTypeListRequestDto.model';
import { BankSettingDto, AccountType } from '../../models/BankSettingDto.model';

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

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${URL}/bank`, { headers: BankService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  getAccountTypes(bankId: number): Observable<AccountTypeSetting[]> {
    return this.http.get<AccountTypeSetting[]>(`${URL}/accounts/settings/${bankId}`, { headers: BankService.HEADERS });
  }

  getAccountSettingsListByBankIdAndAccountType(listRequestDto: AccountTypeListRequestDto): Observable<BankSettingDto[]> {
    return this.http.get<BankSettingDto[]>(`${URL}accounts/settings/list`, {
      headers: BankService.HEADERS,
      params: listRequestDto as any,
    }).pipe(
      catchError(this.handleError)
    );
  }

  createAccountSetting(bankSettingDto: BankSettingDto):Observable<any>{

    return this.http.post(URL + 'accounts/settings/', bankSettingDto, { observe: 'response', headers: BankService.HEADERS }).pipe(
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
