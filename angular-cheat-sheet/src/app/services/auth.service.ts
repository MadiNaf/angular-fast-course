import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignInRequest } from '../model/auth.model';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  public signIn(signInRequest: ISignInRequest): Observable<IUser> {
    return this.http.post(`${this.apiUrl}user/login`, signInRequest) as Observable<IUser>;
  }

  public signUp(user: IUser): Observable<IUser> {
    return this.http.post(`${this.apiUrl}user/new`, user) as Observable<IUser>;
  }
}
