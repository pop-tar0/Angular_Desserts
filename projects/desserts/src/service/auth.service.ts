import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = 'http://presale.money-link.com.tw/sweetApi';
  private tokenKey = 'auth_token';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  hasLoggedIn:boolean = false;

  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    const initialLoggedInValue = this.isLoggedIn();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(initialLoggedInValue);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  //儲存 token 到 localstorage
  public storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true); 
  }

  //取得存在 localstorage 的 token
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //
  public isLoggedIn(): boolean {
    //這個上下文中，!! 是 JavaScript 中的一個慣用法，用於將值轉換為布林值。
    //如果值為 falsy（例如 null、undefined、0、false、'' 等），則 !! 會將其轉換為 false。
    return !!this.getToken();
  }

  //登出則移除儲存在 localstorage 的 token
  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }
  
  //Login API
  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError(error => throwError(error)),
        tap(
          (resp) => {
            this.storeToken(resp.data);
            this.router.navigate(['/']); 
          }
        )
      );
      
  }

  //CheckUserExist API
  public checkUserExist(username:string): Observable<any> {
    const body = {username};
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/checkUserExist`, body);
  }
  
  //Register API
  public register(username:string, password:string):Observable<any>{
    const body = { "username":username, "password":password };
    return this.http.post<any>(`${this.corsUrl}${this.apiUrl}/register`, body);
  }
}