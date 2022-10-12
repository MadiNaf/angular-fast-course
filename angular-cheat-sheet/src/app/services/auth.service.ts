import { Injectable } from '@angular/core';
import { ISignInRequest } from '../model/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../model/user.model';
import { RestApiService } from '../common/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defaultValue: Array<any> = [];
  private _session$: BehaviorSubject<string []>  = new BehaviorSubject(this.defaultValue);
  public session$ = this._session$.asObservable();

  constructor(private commonRestApiService: RestApiService) { }

  public signIn(signInRequest: ISignInRequest): Observable<IUser> {
    return this.commonRestApiService.signIn(signInRequest);
  }

  public signUp(user: IUser): Observable<IUser> {
    return this.commonRestApiService.signUp(user);
  }

  public getUserSession(): boolean {
    const { accessToken } = this.commonRestApiService.getSessionStorage() || '';
    return !!accessToken;
  }
  

  onListenChatSession(): void {
    const currentSession = this._session$.getValue();
    this.commonRestApiService.socket.on('openSession', (session) => {
      currentSession.push(session);
      this._session$.next(currentSession);
    });

    this.commonRestApiService.socket.on('closeSession', (session) => {
      const index = currentSession.indexOf(session);
      if (index === - 1) return ;
      currentSession.slice(index, 1);
      this._session$.next(currentSession);
    });
  }
}
