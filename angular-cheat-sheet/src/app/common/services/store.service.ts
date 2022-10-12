import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Topic } from 'src/app/model/chat-room.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _user$: BehaviorSubject<User| undefined> = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this._user$.asObservable();

  private _currentTopic$: BehaviorSubject<Topic | undefined> = new BehaviorSubject<Topic | undefined>(undefined);
  public currentTopic$ = this._currentTopic$.asObservable();

  constructor() { }

  setUser(user: User) {
    this._user$.next(user);
  }

  setSelectedTopic(topic: Topic) {
    this._currentTopic$.next(topic);
  }
}
