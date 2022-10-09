import { Injectable } from '@angular/core';
import { ISignInRequest } from '../model/auth.model';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';
import { RestApiService } from '../common/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private commonRestApiService: RestApiService) { }

  public signIn(signInRequest: ISignInRequest): Observable<IUser> {
    return this.commonRestApiService.signIn(signInRequest);
  }

  public signUp(user: IUser): Observable<IUser> {
    return this.commonRestApiService.signUp(user);
  }

  public getUserSession(): boolean {
    const stringSession = sessionStorage.getItem('userInfo');
    const session = stringSession ? JSON.parse(stringSession) : null;
    console.log(session)
    return session && session?.accessToken ? true : false;
  }
}
