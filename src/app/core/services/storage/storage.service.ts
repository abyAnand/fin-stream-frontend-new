import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AccountSettingDto } from '../../models/bank/settings/AccountSettingDto.model';

const USER = 'user';
const TOKEN = 'token';
const REFRESH = 'refresh';
const DECODED = 'decoded'
const DTOKEN = 'dToken';
const USERNAME = 'username';
const ROLE = 'role';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static decodedToken: any;

  constructor() { }

  public saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, user);
  }

  public saveToken(token: any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    StorageService.decodedToken = jwtDecode(token);
    if (StorageService.decodedToken) {
      localStorage.setItem(DECODED, StorageService.decodedToken.userId);
      localStorage.setItem(ROLE, StorageService.decodedToken.roles[0]);
      localStorage.setItem(DTOKEN, JSON.stringify(StorageService.decodedToken));
      localStorage.setItem(USERNAME, StorageService.decodedToken.sub);
      console.log(StorageService.getUserRole());
    } else {
      console.error('Decoded token is undefined');
    }
  }

  public saveRefreshToken(refresh: any){
    window.localStorage.removeItem(REFRESH);
    window.localStorage.setItem(REFRESH, refresh);
  }

  static setHasAccount(value: boolean) {
    window.localStorage.setItem('hasAccount', value.toString());
  }

  static getHasAccount(): boolean {
    const hasAccount = window.localStorage.getItem('hasAccount');
    return hasAccount !== null ? JSON.parse(hasAccount) : false;
  }

  static setAccount(value: AccountSettingDto) {
    window.localStorage.setItem('account', JSON.stringify(value));
  }

  static getAccount(): AccountSettingDto {
    const account = window.localStorage.getItem('account');
    return account !== null ? JSON.parse(account) : false;
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

  static hasToken(): boolean {
    return !!this.getToken(); // Returns true if token exists, false otherwise
  }

  static getUserIdFromToken(): string {

    if (this.hasToken()) {
      return localStorage.getItem(DECODED);
    } else {

      console.error('User ID not found in the decoded token.');
      return '';
    }
  }

  static getUserName(): string {
    return USERNAME;
  }

  static getUserRole(): string {
    const storedRole = localStorage.getItem(ROLE);
    return storedRole ? storedRole : '';
  }

  static isAdminLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_ADMIN";
  }

  static isUserLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_USER";
  }

  static isBankLoggedIn(): boolean {
    const role: string = this.getUserRole();
    console.log(role);
    return this.getToken() !== null && role === "ROLE_BANK";
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(REFRESH);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(DECODED);
    window.localStorage.removeItem(DTOKEN);
    window.localStorage.removeItem(USERNAME);
    window.localStorage.removeItem(ROLE);
  }
}
