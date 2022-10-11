import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISignInRequest, IUserSession } from 'src/app/model/auth.model';
import { IUser } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public signIn(signInRequest: ISignInRequest): Observable<IUser> {
    return this.http.post(`${this.apiUrl}auth/login`, signInRequest).pipe(
      map(userResponse  => {
        const user: IUser = userResponse as IUser;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as IUser;
      })
    );
  }

  public signUp(user: IUser): Observable<IUser> {
    return this.http.post(`${this.apiUrl}auth/signup`, user).pipe(
      map(userResponse  => {
        const user: IUser = userResponse as IUser;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as IUser;
      })
    );
  }

  public getSessionStorage(): IUserSession {
    const stringSession = sessionStorage.getItem('userInfo');
    const session = stringSession ? JSON.parse(stringSession) : null;
    return session;
  }

  public getHeaderRequest(): HttpHeaders {
    const { accessToken } = this.getSessionStorage() || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  }

  getUserById(id: number): Observable<IUser> {
    const headers = this.getHeaderRequest();
    return this.http.get(`${this.apiUrl}user/profile/${id}`, {headers: headers}) as Observable<IUser>;
  }
}
