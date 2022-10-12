import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SignInRequest, AuthUserSession } from 'src/app/model/auth.model';
import { User } from 'src/app/model/user.model';
import { io } from 'socket.io-client'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  public readonly apiUrl = 'http://localhost:3000/';
  public readonly socket = io(this.apiUrl)

  constructor(private http: HttpClient, private router: Router) { }

  public signIn(signInRequest: SignInRequest): Observable<User> {
    return this.http.post(`${this.apiUrl}auth/login`, signInRequest).pipe(
      map(userResponse  => {
        const user: User = userResponse as User;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as User;
      })
    );
  }

  public signUp(user: User): Observable<User> {
    return this.http.post(`${this.apiUrl}auth/signup`, user).pipe(
      map(userResponse  => {
        const user: User = userResponse as User;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as User;
      })
    );
  }

  public getSessionStorage(): AuthUserSession {
    const stringSession = sessionStorage.getItem('userInfo');
    const session = stringSession ? JSON.parse(stringSession) : null;
    return session;
  }

  public getHeaderRequest(): HttpHeaders {
    const session = this.getSessionStorage();
    const { accessToken } = session ? session : {accessToken: ''};
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  }

  getUserById(id: number): Observable<User> {
    const headers = this.getHeaderRequest();
    return this.http.get(`${this.apiUrl}user/profile/${id}`, {headers: headers}) as Observable<User>;
  }

  hadleUnauthorizedRequest(errorRes: HttpErrorResponse): void {
    const error = errorRes.error;
    if (error?.statusCode === 401 && error?.message === 'Unauthorized') {
      sessionStorage.removeItem('userInfo');
      this.router.navigate(['/authentication']);
    }
  }
}
