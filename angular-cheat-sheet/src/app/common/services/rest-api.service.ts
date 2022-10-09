import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISignInRequest } from 'src/app/model/auth.model';
import { IUser } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  public signIn(signInRequest: ISignInRequest): Observable<IUser> {
    return this.http.post(`${this.apiUrl}user/login`, signInRequest).pipe(
      map(userResponse  => {
        const user: IUser = userResponse as IUser;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as IUser;
      })
    );
  }

  public signUp(user: IUser): Observable<IUser> {
    return this.http.post(`${this.apiUrl}user/new`, user).pipe(
      map(userResponse  => {
        const user: IUser = userResponse as IUser;
        const userInfo = {id: user?.id, accessToken: user?.token};
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        return user as IUser;
      })
    );
  }
}
