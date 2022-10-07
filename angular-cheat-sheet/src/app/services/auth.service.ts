import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignInRequest } from '../model/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  public signIn(signInRequest: ISignInRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}user/login`, signInRequest)
  }

  public signUp(): void {

  }
}
