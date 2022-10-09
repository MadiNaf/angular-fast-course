import { Injectable } from '@angular/core';
import { IUser } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _user: IUser | undefined;

  constructor() { }

  get user(): IUser {
    return this._user as IUser;
  }

  set user(user: IUser) {
    this._user = user;
  }
}
