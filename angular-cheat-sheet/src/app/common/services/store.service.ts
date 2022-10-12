import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _user: IUser | undefined;

  private _currentTopic$: BehaviorSubject<any>  = new BehaviorSubject(null);
  public currentTopic$ = this._currentTopic$.asObservable();

  constructor() { }

  get user(): IUser {
    return this._user as IUser;
  }

  set user(user: IUser) {
    this._user = user;
  }

  setSelectedTopic(topic: any) {
    this._currentTopic$.next(topic);
  }
}
