import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const USER = 'user';
const TOKEN = 'token';
const REFRESH = 'refresh';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static decodedToken: any;

  constructor() { }

  public saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    StorageService.decodedToken = jwtDecode(token);

  }

  public saveRefreshToken(refresh: any){
    window.localStorage.removeItem(REFRESH);
    window.localStorage.setItem(REFRESH, refresh);
  }

  static getToken(): string{
    return window.localStorage.getItem(TOKEN)! || '';
  }

  static getRefreshToken(): string{
    return window.localStorage.getItem(REFRESH)! || '';
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER)! || '');
  }

  static hasToken(): boolean{
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

  public static getUserId():string{
    const user = this.getUser();
    if( user == null){
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    if (StorageService.decodedToken.roles == null || StorageService.decodedToken.roles.length === 0) {
      return '';
    }
    return StorageService.decodedToken.roles[0];
  }

  static isAdminLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_ADMIN";
  }

  static isStudentLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_USER";
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(REFRESH);
    window.localStorage.removeItem(USER);
  }
}
