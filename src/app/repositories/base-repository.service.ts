import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';

export abstract class BaseRepository {

  private _baseUrl: string;

  constructor(protected _http: Http, protected _authService: AuthService) { 
    this._baseUrl = 'https://www.strava.com/api/v3';
  }

  protected extractData(response: Response) {
    return response.text() ? response.json() : {};
  }

  protected handleError(error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  protected httpGet(url: string): Observable<Response> {
    return this._http.get(this._baseUrl + url, this._options);
  }

  protected get _options(): RequestOptions {
    
    return new RequestOptions({ headers: this._headers });
  }

  protected get _headers(): Headers {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.accessToken);
    return headers;
  }
}
