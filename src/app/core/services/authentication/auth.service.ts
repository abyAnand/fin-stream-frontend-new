import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AuthRequest } from '../../models/auth/AuthRequest.model';
import { Observable, catchError, map, tap } from 'rxjs';
import { RegisterRequest } from '../../models/auth/RegisterRequest.model';
import { BankRequest } from '../../models/auth/BankRequest.model';

const URL = ['http://localhost:8072/finStream/auth/auth/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService) { }

  login(authRequest: AuthRequest): Observable<any> {
    return this.http.post(URL + 'authenticate',
      authRequest
      , { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          this.storage.saveToken(res.body.access_token);
          this.storage.saveUser(res.body.user)
          this.storage.saveRefreshToken(res.body.refresh_token);

          return res;
        })
      )
  }

  logout(): Observable<any> {
    StorageService.logout(); // Clear local storage data

    return this.http.post(URL + 'logout', {}).pipe(
      catchError((error) => {
        console.error('Logout failed', error);
        throw error;
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(URL + 'register',
      registerRequest
      , { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          console.log(res.status)
          return res;
        })
      )
  }

  registerBank(bankData: BankRequest): Observable<any> {
    return this.http.post(URL + 'register/bank', bankData, { observe: 'response' })
      .pipe(
        tap((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  log(message: string) {
    console.log(message)
  }
}
