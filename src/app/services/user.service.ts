import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private _user: User;

  constructor() {
    this.init();
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }

  public save(): void {
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  private init(): void {
      if (localStorage.getItem('user')) {
          let user = JSON.parse(localStorage.getItem('user'));
          this._user = user;
      } else {
          this._user = new User();
      }
  }
  
}
