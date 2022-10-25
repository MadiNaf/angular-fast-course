import { Injectable } from '@angular/core';
import { SignInRequest } from '../model/auth.model';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { RestApiService } from '../common/services/rest-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defaultValue: Array<any> = [];
  private _session$: BehaviorSubject<string []>  = new BehaviorSubject(this.defaultValue);
  public session$ = this._session$.asObservable();

  constructor(private commonRestApiService: RestApiService, private http: HttpClient) { }

  public signIn(signInRequest: SignInRequest): Observable<User> {
    return this.commonRestApiService.signIn(signInRequest);
  }

  public signUp(user: User): Observable<User> {
    return this.commonRestApiService.signUp(user);
  }

  public getUserSession(): boolean {
    const session = this.commonRestApiService.getSessionStorage();
    const { accessToken, id } = session ? session : { accessToken: '', id: 0 };
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
