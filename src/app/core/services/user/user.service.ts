import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../../models/user/UserDto.model';
import { Observable, catchError, throwError } from 'rxjs';

const URL = 'http://localhost:8072/finStream/user/users';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  updateUser( userDto: UserDto): Observable<any>{

    const apiUrl = `${URL}`;
    return this.http.put(apiUrl, userDto, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number | string):Observable<any>{

  return this.http.get<UserDto>(`${URL}/${userId}`, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(`${URL}`, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
