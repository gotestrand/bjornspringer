import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../app-settings';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class AuthService {

  private _accessToken: string;

  constructor(private _http: Http) { 
    if (localStorage.getItem('user')) {
      let accessToken = JSON.parse(localStorage.getItem('access_token'));
      this._accessToken = accessToken;
    }
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  public authorize(code:string): Observable<Response> {
      let url = 'https://www.strava.com/oauth/token';//?client_id=' + AppSettings.CLIENT_ID + '&client_secret=' + AppSettings.CLIENT_SECRET + '&code=' + code; 
      return this._http.post(url, {
        client_id: AppSettings.CLIENT_ID,
        client_secret: AppSettings.CLIENT_SECRET,
        code: code
      });
  }

  public setAccessToken(token: string) {
    this._accessToken = token;
    localStorage.setItem('access_token', JSON.stringify(token));
  }

}
